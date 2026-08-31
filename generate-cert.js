import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function ensureCertificates() {
  const certPath = path.join(__dirname, 'cert.pem');
  const keyPath = path.join(__dirname, 'key.pem');

  try {
    if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
      const cert = fs.readFileSync(certPath, 'utf8');
      const key = fs.readFileSync(keyPath, 'utf8');
      if (cert.includes('BEGIN CERTIFICATE') && key.includes('BEGIN PRIVATE KEY') && cert.length > 600) {
        return { cert, key };
      }
    }
  } catch (e) {
    // regenerate
  }

  console.log('[SSL Setup] Generating valid X.509 self-signed HTTPS certificate...');

  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });

  const certPem = buildSelfSignedCert(publicKey, privateKey);
  
  try {
    fs.writeFileSync(keyPath, privateKey);
    fs.writeFileSync(certPath, certPem);
  } catch (err) {
    console.error('Warning: could not write cert files to disk:', err.message);
  }

  return { cert: certPem, key: privateKey };
}

function asn1Len(len) {
  if (len < 128) return Buffer.from([len]);
  if (len < 256) return Buffer.from([0x81, len]);
  return Buffer.from([0x82, (len >> 8) & 0xff, len & 0xff]);
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
  let src = buf;
  if (src[0] & 0x80) src = Buffer.concat([Buffer.from([0x00]), src]);
  return Buffer.concat([Buffer.from([0x02]), asn1Len(src.length), src]);
}

function asn1BitString(buf) {
  const body = Buffer.concat([Buffer.from([0x00]), buf]);
  return Buffer.concat([Buffer.from([0x03]), asn1Len(body.length), body]);
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

function buildSelfSignedCert(pubKeyPem, privKeyPem) {
  // Extract raw SPKI DER bytes from PEM
  const pubDer = Buffer.from(
    pubKeyPem.replace(/-----\w+ PUBLIC KEY-----|\s/g, ''),
    'base64'
  );

  // 8-byte random serial number
  const serialNumber = crypto.randomBytes(8);
  serialNumber[0] &= 0x7f;

  const notBefore = formatUTCTime(new Date());
  const notAfter = formatUTCTime(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000));

  // Subject / Issuer Name (CN=localhost, O=eChipHub)
  const nameDer = asn1Seq([
    asn1Set([
      asn1Seq([
        Buffer.from([0x06, 0x03, 0x55, 0x04, 0x03]),
        Buffer.from([0x0c, 0x09, ...Buffer.from('localhost')])
      ])
    ]),
    asn1Set([
      asn1Seq([
        Buffer.from([0x06, 0x03, 0x55, 0x04, 0x0a]),
        Buffer.from([0x0c, 0x08, ...Buffer.from('eChipHub')])
      ])
    ])
  ]);

  // sha256WithRSAEncryption
  const sigAlg = asn1Seq([
    Buffer.from([0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x0b]),
    Buffer.from([0x05, 0x00])
  ]);

  const validity = asn1Seq([notBefore, notAfter]);

  // TBS Certificate
  const tbs = asn1Seq([
    Buffer.from([0xa0, 0x03, 0x02, 0x01, 0x02]),
    asn1Int(serialNumber),
    sigAlg,
    nameDer,
    validity,
    nameDer,
    pubDer
  ]);

  // Sign TBS Certificate
  const signer = crypto.createSign('SHA256');
  signer.update(tbs);
  signer.end();
  const signature = signer.sign(privKeyPem);

  // Signed Certificate DER
  const certDer = asn1Seq([
    tbs,
    sigAlg,
    asn1BitString(signature)
  ]);

  const certB64 = certDer.toString('base64').match(/.{1,64}/g).join('\n');
  return `-----BEGIN CERTIFICATE-----\n${certB64}\n-----END CERTIFICATE-----\n`;
}

if (process.argv[1] && process.argv[1].endsWith('generate-cert.js')) {
  ensureCertificates();
}
