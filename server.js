import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { ensureCertificates } from './generate-cert.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Port configurations
const HTTPS_PORT = parseInt(process.env.HTTPS_PORT || process.env.PORT || '8443', 10);
const HTTP_PORT = parseInt(process.env.HTTP_PORT || '8080', 10);

// Determine root directory to serve (prioritize built 'dist' folder)
const distDir = path.join(__dirname, 'dist');
const serveDir = fs.existsSync(distDir) ? distDir : __dirname;

console.log(`[eChipHub Server] Serving static root from: ${serveDir}`);

// MIME type map
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.map': 'application/json; charset=UTF-8'
};

// Security headers middleware
function setSecurityHeaders(res) {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:; media-src 'self' https: data: blob:;"
  );
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
}

// Request handler for server
function handleRequest(req, res) {
  setSecurityHeaders(res);

  let parsedUrl;
  try {
    parsedUrl = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  } catch (err) {
    res.statusCode = 400;
    res.end('Bad Request');
    return;
  }

  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Normalize path to prevent directory traversal
  let filePath = path.normalize(path.join(serveDir, pathname));
  if (!filePath.startsWith(serveDir)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  // Check if file exists or directory (append index.html)
  let stats;
  try {
    stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      stats = fs.statSync(filePath);
    }
  } catch (err) {
    // SPA fallback: return index.html for non-asset HTML routes
    filePath = path.join(serveDir, 'index.html');
    try {
      stats = fs.statSync(filePath);
    } catch (fallbackErr) {
      res.statusCode = 404;
      res.end('File Not Found');
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.setHeader('Content-Type', contentType);

  // Caching headers
  if (['.html', '.json'].includes(ext)) {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  } else {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Compression support (gzip/deflate)
  const acceptEncoding = req.headers['accept-encoding'] || '';
  const fileStream = fs.createReadStream(filePath);

  fileStream.on('error', () => {
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  if (/\bgzip\b/.test(acceptEncoding) && ['.html', '.js', '.css', '.json', '.svg'].includes(ext)) {
    res.setHeader('Content-Encoding', 'gzip');
    res.writeHead(200);
    fileStream.pipe(zlib.createGzip()).pipe(res);
  } else if (/\bdeflate\b/.test(acceptEncoding) && ['.html', '.js', '.css', '.json', '.svg'].includes(ext)) {
    res.setHeader('Content-Encoding', 'deflate');
    res.writeHead(200);
    fileStream.pipe(zlib.createDeflate()).pipe(res);
  } else {
    res.setHeader('Content-Length', stats.size);
    res.writeHead(200);
    fileStream.pipe(res);
  }
}

// Start HTTPS server with graceful HTTP fallback
let httpsActive = false;
try {
  const credentials = ensureCertificates();
  const httpsServer = https.createServer(
    {
      cert: credentials.cert,
      key: credentials.key
    },
    handleRequest
  );

  httpsServer.on('error', (err) => {
    console.warn('[eChipHub Server] HTTPS server error, falling back to HTTP:', err.message);
    startHttpFallback();
  });

  httpsServer.listen(HTTPS_PORT, () => {
    httpsActive = true;
    console.log(`
============================================================
  eChipHub Live Production HTTPS/SSL Server Active
============================================================
  HTTPS Server:  https://localhost:${HTTPS_PORT}/
  Secure Host:   https://127.0.0.1:${HTTPS_PORT}/
============================================================
    `);
  });
} catch (err) {
  console.warn('[eChipHub Server] HTTPS initialization warning:', err.message);
  startHttpFallback();
}

function startHttpFallback() {
  if (httpsActive) return;
  const httpServer = http.createServer(handleRequest);
  httpServer.listen(HTTPS_PORT, () => {
    console.log(`
============================================================
  eChipHub Live Production Server Active (HTTP Mode)
============================================================
  Server URL:    http://localhost:${HTTPS_PORT}/
============================================================
    `);
  });
}

// Create HTTP-to-HTTPS Redirection Server on HTTP_PORT
const redirectServer = http.createServer((req, res) => {
  const host = (req.headers.host || 'localhost').split(':')[0];
  const redirectUrl = httpsActive
    ? `https://${host}:${HTTPS_PORT}${req.url}`
    : `http://${host}:${HTTPS_PORT}${req.url}`;
  res.writeHead(301, { Location: redirectUrl });
  res.end(`Redirecting to ${redirectUrl}`);
});

redirectServer.listen(HTTP_PORT, () => {
  console.log(`  HTTP Redirect: http://localhost:${HTTP_PORT}/ -> ${HTTPS_PORT}`);
});
