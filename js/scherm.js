/* Hulpmiddelen voor het scherm: elementen zoeken, tekst veilig maken, geluid, confetti en de bovenbalk */
import { fracHTML, pick } from './kern.js';
import { S } from './opslag.js';

export const $ = (s, el = document) => el.querySelector(s);
export const $$ = (s, el = document) => [...el.querySelectorAll(s)];
export const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const fr = (s, q) => (q && q.noFrac ? s : fracHTML(s));

/* ---------- geluid & confetti ---------- */
let actx;
export function beep(type) {
  if (!S.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = { good: [660, 990], bad: [260, 200], win: [523, 659, 784, 1046], tap: [500] }[type] || [440];
    notes.forEach((f, i) => {
      const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + i * 0.09;
      o.type = type === 'bad' ? 'triangle' : 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t + 0.22);
    });
  } catch (e) { /* geen audio */ }
}
export function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = document.createElement('canvas'), x = c.getContext('2d');
  c.className = 'confetti'; document.body.appendChild(c);
  const W = c.width = innerWidth, H = c.height = innerHeight;
  const cols = ['#FF5A5F', '#FFB800', '#2BB673', '#2D9CDB', '#6C4CF1', '#E94C89'];
  const P = Array.from({ length: 140 }, () => ({ x: W / 2, y: H / 3, vx: (Math.random() - 0.5) * 14, vy: Math.random() * -14 - 4, s: Math.random() * 8 + 4, c: pick(cols), r: Math.random() * 6 }));
  let f = 0;
  (function draw() {
    x.clearRect(0, 0, W, H);
    for (const p of P) { p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.r += 0.1; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); x.restore(); }
    if (++f < 150) requestAnimationFrame(draw); else c.remove();
  })();
}

/* ---------- bovenbalk ---------- */
export function updateTop() {
  $('#stars').textContent = S.stars;
  $('#sound').textContent = S.sound ? '🔊' : '🔇';
  $('#sound').setAttribute('aria-label', S.sound ? 'Geluid uit' : 'Geluid aan');
  $('#me').textContent = S.profile ? S.profile.avatar : '🙂';
}
