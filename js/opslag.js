/* Opslaglaag: hier — en alleen hier — wordt de voortgang gelezen en bewaard.

   De rest van de app werkt met het object S (het kind dat nu oefent) en roept save() aan na
   een wijziging. Waar het echt bewaard wordt, bepaalt de "bewaarplek". Nu is dat de browser van
   dit apparaat (localStorage). Straks komt daar het synchroniseren met de server bij.

   Wat staat er onder SLEUTEL ('rekenjerot-v4')?
   {
     versie: 4,
     apparaat: vaste code van dit apparaat (voor de sterren-tellers, zie kind.js),
     actief: id van het kind dat nu oefent,
     kinderen: { id: kind }      één of meer kinderen (het formaat staat in kind.js),
     installGevraagd: tijdstip waarop de melding "zet op je beginscherm" voor het laatst kwam
   }

   Overzetten van oude gegevens (migratie):
   - Versie 2 stond onder 'rekenraket-v2', versie 3 onder 'rekenjerot-v3'.
   - Is er nog geen nieuwe sleutel maar wel een oude? Dan zetten we de nieuwste oude om.
   - Oude sleutels blijven ALTIJD staan als reservekopie. We wissen ze nooit.
   - Kapotte gegevens worden apart bewaard onder SLEUTEL-kapot-<tijd>. */

import { aanvullenKind, nieuwId, nieuwKind, uitOudFormaat } from './kind.js';

export const SLEUTEL = 'rekenjerot-v4';
export const OUDE_SLEUTELS = ['rekenjerot-v3', 'rekenraket-v2'];     // nieuwste eerst
export const VERSIE = 4;

/* Bewaarplek: de browser van dit apparaat. Kan mislukken (bv. privé-venster); dan gaat de app gewoon door. */
export const lokaleOpslag = {
  lees(sleutel) { try { return localStorage.getItem(sleutel); } catch (e) { return null; } },
  schrijf(sleutel, tekst) { try { localStorage.setItem(sleutel, tekst); return true; } catch (e) { return false; } }
};

/* Een leeg apparaat met één (nog naamloos) kind */
export function nieuwApparaat() {
  const k = nieuwKind();
  return { versie: VERSIE, apparaat: nieuwId(), actief: k.id, kinderen: { [k.id]: k }, installGevraagd: null };
}

/* Vul ontbrekende velden aan en controleer dat er een actief kind is */
function aanvullen(d) {
  const a = Object.assign(nieuwApparaat(), d);
  if (!a.kinderen || typeof a.kinderen !== 'object' || !Object.keys(a.kinderen).length) {
    const k = nieuwKind(); a.kinderen = { [k.id]: k }; a.actief = k.id;
  }
  for (const [id, k] of Object.entries(a.kinderen)) a.kinderen[id] = aanvullenKind({ ...k, id });
  if (!a.kinderen[a.actief]) a.actief = Object.keys(a.kinderen)[0];
  a.versie = VERSIE;
  return a;
}
function leesJSON(tekst) {
  if (tekst == null) return null;
  try { const d = JSON.parse(tekst); return d && typeof d === 'object' ? d : null; } catch (e) { return undefined; }   // undefined = kapot
}

/* Lees alles uit een bewaarplek. Geeft { data, bron } terug; bron zegt waar het vandaan kwam. */
export function laadVoortgang(plek) {
  const tekst = plek.lees(SLEUTEL);
  const nieuw = leesJSON(tekst);
  if (nieuw && nieuw.kinderen) return { data: aanvullen(nieuw), bron: SLEUTEL };
  if (nieuw === undefined || nieuw) {
    /* Kapotte gegevens: bewaar een kopie, zodat er nooit iets echt verloren gaat, en probeer daarna de oude sleutels */
    plek.schrijf(SLEUTEL + '-kapot-' + Date.now(), tekst);
  }
  for (const oud of OUDE_SLEUTELS) {
    const d = leesJSON(plek.lees(oud));
    if (d) {
      const data = nieuwApparaat();
      const k = uitOudFormaat(d, data.apparaat);
      data.kinderen = { [k.id]: k }; data.actief = k.id;
      plek.schrijf(SLEUTEL, JSON.stringify(data));   // overzetten; de oude sleutel blijft staan
      return { data, bron: oud };
    }
  }
  return { data: nieuwApparaat(), bron: null };
}

let plek = lokaleOpslag;
const A = laadVoortgang(plek).data;

/* De vaste code van dit apparaat */
export const APPARAAT = A.apparaat;
/* Het kind dat nu oefent */
export let S = A.kinderen[A.actief];

/* Bewaar alles */
export function save() { A.kinderen[S.id] = S; plek.schrijf(SLEUTEL, JSON.stringify(A)); }

/* Instellingen van dit apparaat (niet van een kind) */
export const apparaatInstelling = naam => A[naam];
export function zetApparaatInstelling(naam, waarde) { A[naam] = waarde; save(); }

/* Alle voortgang van dit kind wissen, maar het profiel (naam, avatar, groep) en geluid houden */
export function wisVoortgang() {
  const k = nieuwKind(S.id);
  k.profile = S.profile; k.profielTijd = S.profielTijd; k.sound = S.sound;
  S = k; save();
}
