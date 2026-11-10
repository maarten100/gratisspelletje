/* Klein testservertje om de app lokaal te bekijken: npm start → http://localhost:8000
   Nodig omdat browsers losse JavaScript-modules niet rechtstreeks van je schijf laden. */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const MAP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const POORT = Number(process.env.PORT) || 8000;
const SOORT = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8'
};

createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const bestand = path.join(MAP, p);
  if (!bestand.startsWith(MAP + path.sep)) { res.writeHead(403).end(); return; }
  try {
    const data = await readFile(bestand);
    res.writeHead(200, { 'Content-Type': SOORT[path.extname(bestand)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Niet gevonden: ' + p);
  }
}).on('error', fout => {
  if (fout.code === 'EADDRINUSE') {
    console.error(`\nPoort ${POORT} is al in gebruik. Draait de app misschien al in een ander Terminal-venster?`);
    console.error(`Stop die eerst met Ctrl+C, of start op een andere poort:  PORT=8080 npm start\n`);
    process.exit(1);
  }
  throw fout;
}).listen(POORT, () => console.log(`Reken je Rot! draait op http://localhost:${POORT}  (stoppen: Ctrl+C)`));
