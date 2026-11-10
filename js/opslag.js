/* Opslaglaag: hier — en alleen hier — wordt de voortgang gelezen en bewaard.

   De rest van de app werkt met het object S en roept save() aan na een wijziging.
   Waar S echt bewaard wordt, bepaalt de "bewaarplek" (backend). Nu is dat de browser
   van dit apparaat (localStorage). In fase 2 kan er een bewaarplek bij komen die ook
   met de server synchroniseert, zonder dat de rest van de app hoeft te veranderen.

   Overzetten van oude gegevens (migratie):
   - Tot nu toe stond alles onder de sleutel 'rekenraket-v2'.
   - Nu staat het onder SLEUTEL ('rekenjerot-v3'), met een versienummer erin.
   - Is er nog geen nieuwe sleutel maar wel een oude? Dan nemen we de oude over.
   - De oude sleutel blijft ALTIJD staan als reservekopie. We wissen hem nooit. */

export const SLEUTEL = 'rekenjerot-v3';
export const OUDE_SLEUTELS = ['rekenraket-v2'];     // nieuwste eerst
export const VERSIE = 3;

/* Een lege voortgang voor een nieuw kind */
export const fresh = () => ({ versie: VERSIE, profile: null, filter: null, stars: 0, ex: {}, tests: {}, timed: {}, games: {}, sound: true, streak: 0, lastDay: null, history: [], counts: { practice: 0, tests: 0, perfect: 0, games: 0, timed: 0 } });

/* Bewaarplek: de browser van dit apparaat. Kan mislukken (bv. privé-venster); dan gaat de app gewoon door. */
export const lokaleOpslag = {
  lees(sleutel) { try { return localStorage.getItem(sleutel); } catch (e) { return null; } },
  schrijf(sleutel, tekst) { try { localStorage.setItem(sleutel, tekst); return true; } catch (e) { return false; } }
};

/* Vul ontbrekende velden aan, zodat oudere gegevens ook met nieuwere code werken */
function aanvullen(data) {
  const s = Object.assign(fresh(), data || {});
  s.counts = Object.assign(fresh().counts, data && data.counts);
  s.versie = VERSIE;
  return s;
}
function leesJSON(tekst) {
  if (tekst == null) return null;
  try { const d = JSON.parse(tekst); return d && typeof d === 'object' ? d : null; } catch (e) { return undefined; }   // undefined = kapot
}

/* Lees de voortgang uit een bewaarplek. Geeft { data, bron } terug; bron zegt waar het vandaan kwam. */
export function laadVoortgang(plek) {
  const tekst = plek.lees(SLEUTEL);
  const nieuw = leesJSON(tekst);
  if (nieuw) return { data: aanvullen(nieuw), bron: SLEUTEL };
  if (nieuw === undefined) {
    /* Kapotte gegevens: bewaar een kopie, zodat er nooit iets echt verloren gaat, en probeer daarna de oude sleutel */
    plek.schrijf(SLEUTEL + '-kapot-' + Date.now(), tekst);
  }
  for (const oud of OUDE_SLEUTELS) {
    const d = leesJSON(plek.lees(oud));
    if (d) {
      const data = aanvullen(d);
      plek.schrijf(SLEUTEL, JSON.stringify(data));   // overzetten; de oude sleutel blijft staan
      return { data, bron: oud };
    }
  }
  return { data: fresh(), bron: null };
}

let plek = lokaleOpslag;
export let S = laadVoortgang(plek).data;

/* Bewaar de huidige voortgang */
export function save() { plek.schrijf(SLEUTEL, JSON.stringify(S)); }

/* Alle voortgang wissen, maar het profiel (naam, avatar, groep) houden */
export function wisVoortgang() { const prof = S.profile; S = fresh(); S.profile = prof; save(); }
