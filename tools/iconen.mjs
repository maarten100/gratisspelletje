/* Maakt de PNG-iconen voor de app uit iconen/icoon.svg:  npm run iconen

   Het icoon is eenvoudig (rechthoeken en cirkels), dus dit script tekent het zelf; er is geen
   extra programma nodig. Het kent alleen <rect> (x, y, width, height, rx, fill) en <circle>
   (cx, cy, r, fill). Krijg je later een echt ontworpen logo met andere vormen? Laat de
   ontwerper dan de PNG's in deze maten aanleveren en zet ze in de map iconen/.

   - icoon-192.png / icoon-512.png : gewoon icoon, met afgeronde hoeken
   - icoon-maskable-512.png        : vierkant; Android knipt er zelf een vorm uit
   - apple-touch-icon.png (180)    : vierkant; iOS rondt zelf de hoeken af */

import { readFileSync, writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const MAP = fileURLToPath(new URL('../iconen/', import.meta.url));
const svg = readFileSync(MAP + 'icoon.svg', 'utf8');
const vb = svg.match(/viewBox="([\d.\s-]+)"/)[1].trim().split(/\s+/).map(Number);   // [x, y, breedte, hoogte]

const attr = (el, n, std = 0) => { const m = el.match(new RegExp(`\\s${n}="([^"]*)"`)); return m ? m[1] : std; };
const kleur = h => { h = h.replace('#', ''); if (h.length === 3) h = [...h].map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
const vormen = [...svg.matchAll(/<(rect|circle)\b[^>]*>/g)].map(([el, soort]) => soort === 'rect'
  ? { soort, x: +attr(el, 'x'), y: +attr(el, 'y'), w: +attr(el, 'width'), h: +attr(el, 'height'), rx: +attr(el, 'rx'), kleur: kleur(attr(el, 'fill', '#000')) }
  : { soort, cx: +attr(el, 'cx'), cy: +attr(el, 'cy'), r: +attr(el, 'r'), kleur: kleur(attr(el, 'fill', '#000')) });

/* Ligt punt (px, py) binnen de vorm? */
function binnen(v, px, py, vierkant) {
  if (v.soort === 'circle') return (px - v.cx) ** 2 + (py - v.cy) ** 2 <= v.r ** 2;
  const isAchtergrond = v.x === vb[0] && v.y === vb[1] && v.w === vb[2] && v.h === vb[3];
  const rx = vierkant && isAchtergrond ? 0 : Math.min(v.rx, v.w / 2, v.h / 2);
  if (px < v.x || px > v.x + v.w || py < v.y || py > v.y + v.h) return false;
  const dx = Math.max(v.x + rx - px, 0, px - (v.x + v.w - rx)), dy = Math.max(v.y + rx - py, 0, py - (v.y + v.h - rx));
  return dx * dx + dy * dy <= rx * rx;
}

/* Teken het icoon op maat×maat pixels, met 4×4 monsters per pixel voor gladde randen */
function teken(maat, vierkant) {
  const N = 4, pix = Buffer.alloc(maat * maat * 4);
  for (let y = 0; y < maat; y++) for (let x = 0; x < maat; x++) {
    let r = 0, g = 0, b = 0, a = 0;
    for (let sy = 0; sy < N; sy++) for (let sx = 0; sx < N; sx++) {
      const px = vb[0] + (x + (sx + 0.5) / N) / maat * vb[2], py = vb[1] + (y + (sy + 0.5) / N) / maat * vb[3];
      let c = null;
      for (const v of vormen) if (binnen(v, px, py, vierkant)) c = v.kleur;   // laatste vorm ligt bovenop
      if (c) { r += c[0]; g += c[1]; b += c[2]; a++; }
    }
    const i = (y * maat + x) * 4;
    if (a) { pix[i] = Math.round(r / a); pix[i + 1] = Math.round(g / a); pix[i + 2] = Math.round(b / a); pix[i + 3] = Math.round(a / (N * N) * 255); }
  }
  return pix;
}

/* PNG-bestand maken (RGBA) */
const CRC = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc32 = buf => { let c = 0xFFFFFFFF; for (const x of buf) c = CRC[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
function blok(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function png(maat, pix) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(maat, 0); ihdr.writeUInt32BE(maat, 4); ihdr[8] = 8; ihdr[9] = 6;
  const rauw = Buffer.alloc(maat * (maat * 4 + 1));
  for (let y = 0; y < maat; y++) pix.copy(rauw, y * (maat * 4 + 1) + 1, y * maat * 4, (y + 1) * maat * 4);
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), blok('IHDR', ihdr), blok('IDAT', deflateSync(rauw, { level: 9 })), blok('IEND', Buffer.alloc(0))]);
}

for (const [naam, maat, vierkant] of [['icoon-192.png', 192, false], ['icoon-512.png', 512, false], ['icoon-maskable-512.png', 512, true], ['apple-touch-icon.png', 180, true]]) {
  writeFileSync(MAP + naam, png(maat, teken(maat, vierkant)));
  console.log('✓ iconen/' + naam);
}
