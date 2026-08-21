import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import tls from 'tls';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function ensureCertificates() {
  const certPath = path.join(__dirname, 'cert.pem');
  const keyPath = path.join(__dirname, 'key.pem');

  // Validate existing certificate files if present
  if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
    try {
      const cert = fs.readFileSync(certPath, 'utf8');
      const key = fs.readFileSync(keyPath, 'utf8');
      if (cert.includes('BEGIN CERTIFICATE') && key.includes('BEGIN PRIVATE KEY')) {
        // Validate with Node.js TLS context
        tls.createSecureContext({ cert, key });
        return { cert, key };
      }
    } catch (e) {
      console.log('[SSL Setup] Cached certificate failed TLS validation. Regenerating...');
      try { fs.unlinkSync(certPath); } catch (err) {}
      try { fs.unlinkSync(keyPath); } catch (err) {}
    }
  }

  console.log('[SSL Setup] Generating self-signed HTTPS certificate for localhost...');

  // Method 1: System OpenSSL CLI (if available)
  try {
    const cmd = `openssl req -x509 -newkey rsa:2048 -keyout "${keyPath}" -out "${certPath}" -days 365 -nodes -subj "/CN=localhost/O=eChipHub" -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"`;
    execSync(cmd, { stdio: 'ignore' });
    const cert = fs.readFileSync(certPath, 'utf8');
    const key = fs.readFileSync(keyPath, 'utf8');
    tls.createSecureContext({ cert, key });
    return { cert, key };
  } catch (err) {
    // Fallback to pure Node.js ASN.1 certificate generator
  }

  // Method 2: Pure Node.js RSA + X.509 DER Certificate Generator
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });

  const certPem = buildX509Cert(publicKey, privateKey);

  try {
    fs.writeFileSync(keyPath, privateKey);
    fs.writeFileSync(certPath, certPem);
  } catch (err) {
    console.error('Warning: could not write cert files to disk:', err.message);
  }

  return { cert: certPem, key: privateKey };
}

function buildX509Cert(pubKeyPem, privKeyPem) {
  // Extract SubjectPublicKeyInfo DER from SPKI PEM
  const pubDer = Buffer.from(
    pubKeyPem.replace(/-----\w+ PUBLIC KEY-----|\s/g, ''),
    'base64'
  );

  // Serial Number
  const serialNumber = crypto.randomBytes(8);
  serialNumber[0] &= 0x7f; // Positive integer

  // Validity: 365 days
  const notBefore = formatUTCTime(new Date());
  const notAfter = formatUTCTime(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000));
  const validity = asn1Seq([notBefore, notAfter]);

  // Subject / Issuer: CN=localhost, O=eChipHub
  const nameDer = asn1Seq([
    asn1Set([
      asn1Seq([
        Buffer.from([0x06, 0x03, 0x55, 0x04, 0x03]), // commonName
        Buffer.from([0x0c, 0x09, ...Buffer.from('localhost')])
      ])
    ]),
    asn1Set([
      asn1Seq([
        Buffer.from([0x06, 0x03, 0x55, 0x04, 0x0a]), // organizationName
        Buffer.from([0x0c, 0x08, ...Buffer.from('eChipHub')])
      ])
    ])
  ]);

  // sha256WithRSAEncryption
  const sigAlg = asn1Seq([
    Buffer.from([0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x0b]),
    Buffer.from([0x05, 0x00])
  ]);

  // Subject Alternative Name (SAN): DNS:localhost, IP:127.0.0.1
  const sanVal = asn1Seq([
    Buffer.from([0x82, 0x09, ...Buffer.from('localhost')]),
    Buffer.from([0x87, 0x04, 127, 0, 0, 1])
  ]);

  const sanExt = asn1Seq([
    Buffer.from([0x06, 0x03, 0x55, 0x1d, 0x11]), // id-ce-subjectAltName
    Buffer.concat([Buffer.from([0x04]), asn1Len(sanVal.length), sanVal])
  ]);

  const extensionsSeq = asn1Seq([sanExt]);
  const extensions = Buffer.concat([
    Buffer.from([0xa3]), // [3] EXPLICIT
    asn1Len(extensionsSeq.length),
    extensionsSeq
  ]);

  // TBS Certificate
  const tbs = asn1Seq([
    Buffer.from([0xa0, 0x03, 0x02, 0x01, 0x02]), // Version v3
    asn1Int(serialNumber),
    sigAlg,
    nameDer,
    validity,
    nameDer,
    pubDer,
    extensions
  ]);

  // Sign TBS with SHA256 + RSA private key
  const signer = crypto.createSign('SHA256');
  signer.update(tbs);
  signer.end();
  const signature = signer.sign(privKeyPem);

  // Full Signed Certificate DER
  const certDer = asn1Seq([
    tbs,
    sigAlg,
    asn1BitString(signature)
  ]);

  const certB64 = certDer.toString('base64').match(/.{1,64}/g).join('\n');
  return `-----BEGIN CERTIFICATE-----\n${certB64}\n-----END CERTIFICATE-----\n`;
}

function asn1Len(len) {
  if (len < 128) return Buffer.from([len]);
  const bytes = [];
  while (len > 0) {
    bytes.unshift(len & 0xff);
    len >>= 8;
  }
  return Buffer.from([0x80 | bytes.length, ...bytes]);
}

function asn1Seq(items) {
  const body = Buffer.concat(items);
  return Buffer.concat([Buffer.from([0x30]), asn1Len(body.length), body]);
}

function asn1Set(items) {
  const body = Buffer.concat(items);
  return Buffer.concat([Buffer.from([0x31]), asn1Len(body.length), body]);
}

function asn1Int(buf) {
  if (buf[0] & 0x80) buf = Buffer.concat([Buffer.from([0x00]), buf]);
  return Buffer.concat([Buffer.from([0x02]), asn1Len(buf.length), buf]);
}

function asn1BitString(buf) {
  const body = Buffer.concat([Buffer.from([0x00]), buf]);
  return Buffer.concat([Buffer.from([0x03]), asn1Len(buf.length), body]);
}

function formatUTCTime(date) {
  const pad = (n) => String(n).padStart(2, '0');
  const str =
    String(date.getUTCFullYear()).slice(2) +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z';
  const buf = Buffer.from(str, 'ascii');
  return Buffer.concat([Buffer.from([0x17]), asn1Len(buf.length), buf]);
}

if (process.argv[1] && process.argv[1].endsWith('generate-cert.js')) {
  ensureCertificates();
}
