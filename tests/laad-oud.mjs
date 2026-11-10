/* Laadt de oefeningen uit een oude, ongesplitste index.html (alles in één bestand).
   Alleen nodig om oud en nieuw te vergelijken. */

import { readFileSync } from 'node:fs';
import vm from 'node:vm';

export function laadOud(pad) {
  const html = readFileSync(pad, 'utf8');
  const blokken = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  /* Alleen de blokken met oefeningen en koppelingen; de app en de spelletjes hebben een browser nodig. */
  const nodig = blokken.filter(b => !/Rekenraket – (app|spelletjes)/.test(b));
  const ctx = vm.createContext({ console });
  for (const b of nodig) vm.runInContext(b, ctx);
  return {
    EX: vm.runInContext('EX', ctx),
    KOPPELINGEN: vm.runInContext('KOPPELINGEN', ctx),
    CATS: vm.runInContext('CATS', ctx),
    mathObj: vm.runInContext('Math', ctx)
  };
}
