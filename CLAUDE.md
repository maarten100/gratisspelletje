# Reken je Rot! — projectbrief voor Claude Code

Dit bestand beschrijft het project, de beslissingen die al genomen zijn en de werkwijze.
Lees het helemaal voordat je iets aanpast, en houd het bij als er beslissingen bijkomen.

## Over mij en hoe we samenwerken

- Ik ben Maarten. Ik heb **geen programmeerervaring**. Leg dus in gewoon Nederlands uit wat je doet en waarom, zonder jargon.
- Communiceer in het **Nederlands**. Code-commentaar ook in het Nederlands (zoals nu al).
- Werk **per fase** (zie hieronder). Maak aan het eind van elke fase een korte samenvatting: wat is er veranderd, hoe kan ik het testen, wat moet ik zelf doen. Wacht dan op mijn akkoord voordat je aan de volgende fase begint.
- Alles wat ik **zelf** moet doen (Supabase-dashboard, DNS bij TransIP, instellingen op GitHub), leg je stap voor stap uit, met waar ik moet klikken.
- Kies steeds de **eenvoudigste oplossing** die werkt en die ik later nog kan onderhouden. Geen frameworks of tools als het niet nodig is.
- Maak kleine commits met duidelijke berichten, zodat we altijd terug kunnen.
- **Pushen en pull requests doe ik zelf.** Claude pusht niet en maakt geen pull request, maar loodst me er aan het eind van een fase stap voor stap doorheen.
- Werk op een aparte branch per fase, nooit direct op `main`.

## Wat het is

Een gratis reken-oefensite en PWA voor Nederlandse basisschoolkinderen (groep 1 t/m 8).
Het begon om mijn zoon te helpen met rekenen; nu wil ik dat veel meer kinderen het kunnen gebruiken.

- **Nieuwe naam:** Reken je Rot! (de huidige app heet nog "Rekenraket"). Zet de naam op één centrale plek in de code, zodat hij makkelijk aan te passen is.
- **Productie:** rekenjerot.nl (GitHub Pages, DNS bij TransIP).
- **Test:** gratisspelletje.com (GitHub Pages, DNS bij TransIP). Hier draait nu de huidige versie.
- **GitHub-account:** maarten100. Huidige repo: `gratisspelletje`.

## Inhoud van de app

- 5 domeinen (Automatiseren, Getallen, Meten, Verhoudingen, Verbanden), 21 categorieën, 447 oefensoorten met willekeurig gegenereerde sommen, hints en uitleg.
- Modi: oefenen (hint na fout), op tijd (timer), toets (cijfer + nakijklijst).
- Koppelingen per blok voor de methodes Wereld in getallen, Pluspunt en Getal & Ruimte Junior, en toetstraining voor Cito LIB en IEP (`KOPPELINGEN`).
- Motivatie: sterren, dagen op rij, badges, "beheerst" (laatste 8+ pogingen ≥ 80% in één keer goed).
- 5 korte rekenspelletjes (Tafelrace, Ballonnen, Memory, Groter of kleiner, Getallenlijn).
- Eén profiel per apparaat (nog geen accounts).

**Belangrijk:** bestaande gebruikers hebben voortgang in localStorage (`rekenraket-v2`, sinds fase 1 overgenomen in `rekenjerot-v3`). Die mag nooit verloren gaan.

## Opbouw van de code (na fase 1)

Gewone bestanden zonder bouwstap: wat in de map staat, is wat er online komt.

```
index.html            kop, bovenbalk en de links naar CSS en js/app.js
manifest.json         PWA: naam, kleuren, iconen
sw.js                 service worker (offline). VERSIE + lijst BESTANDEN
css/                  basis.css + één bestand per domein
js/config.js          naam, logo, productiedomein (IS_TEST)
js/kern.js            hulpfuncties, vraag-bouwers (vraagformaat staat hier), register EX/CATS/DOMAINS
js/domeinen/*.js      getallen, bewerkingen, meten, verhoudingen, verbanden (registreren zich met defCat)
js/oefeningen.js      laadt alle domeinen; volgorde = volgorde in de app
js/koppelingen.js     KOPPELINGEN: methodeblokken en toetstraining
js/spellen.js         de rekenspelletjes (GAMES)
js/opslag.js          opslaglaag: S, save(), migratie van oude sleutels
js/voortgang.js       dagen op rij, sterren, record(), mastery()
js/scherm.js          $, $$, esc, fr, geluid, confetti, bovenbalk
js/speler.js          de sommen-speler (WIDGETS per vraagtype, runSession)
js/app.js             router en schermen; startpunt
iconen/               icoon.svg + PNG's (npm run iconen)
tests/                npm test
tools/server.mjs      npm start → http://localhost:8000
.github/workflows/    website.yml: tests + automatisch online zetten
```

- Modules importeren expliciet wat ze gebruiken. Domeinbestanden mogen geen browser-dingen (document, localStorage) gebruiken bij het laden, anders werken de tests niet.
- **Opslag:** alleen `js/opslag.js` leest/schrijft. Sleutel `rekenjerot-v3` (met `versie`). De oude sleutel `rekenraket-v2` wordt bij de eerste keer overgenomen en **nooit gewist** (reservekopie). Kapotte gegevens worden apart bewaard (`rekenjerot-v3-kapot-<tijd>`).
- **Service worker:** netwerk eerst, cache als terugval. Nieuw bestand? Zet het in `BESTANDEN` in `sw.js` (de test controleert dit) en verhoog `VERSIE`.
- **Naam wijzigen:** `js/config.js`, `index.html` (title, apple-mobile-web-app-title, bovenbalk) en `manifest.json`.

### Tests (`npm test`)
1. Elke oefening maakt 200 vragen: geen NaN, antwoord past bij het type, goede keuze staat ertussen.
2. Alle ID's in `KOPPELINGEN` bestaan.
3. Vingerafdruk (`tests/vingerafdruk.json`): met vast toeval moeten alle oefeningen dezelfde sommen maken, en de categorievolgorde moet gelijk blijven. Bewust een oefening toegevoegd of veranderd? Dan `npm test -- --bewaar`.
4. Opslag: oude voortgang komt goed over, reservekopie blijft staan.
5. PWA: alle bestanden staan in de offline-lijst, alle iconen bestaan.

### Nog open
- De ouderpagina zegt "alles blijft op dit apparaat, geen account nodig". Dat moet veranderen zodra er accounts zijn (fase 2).
- **Voortgang op gratisspelletje.com gaat niet vanzelf mee naar rekenjerot.nl.** De browser bewaart gegevens per website. Bestaande gebruikers van gratisspelletje.com houden hun voortgang daar. Oplossing kiezen vóór de lancering op rekenjerot.nl (bv. een overzetknop, of via de accounts uit fase 2).

## Omgevingen

| | Test | Productie |
|---|---|---|
| Adres | gratisspelletje.com | rekenjerot.nl |
| GitHub-repo | `maarten100/gratisspelletje` | `maarten100/rekenjerot` |
| Wordt bijgewerkt bij | merge/push naar `main` van gratisspelletje | `git push productie main` |
| Label in de app | TEST | geen |

- Werkwijze: branch → pull request (tests draaien automatisch) → merge naar `main` → staat op de testsite → bevalt het, dan `git push productie main` → staat op rekenjerot.nl.
- Beide repo's gebruiken dezelfde `.github/workflows/website.yml` (Pages-bron: "GitHub Actions"). Het domein staat in de repo-instellingen, niet in een bestand. Het `CNAME`-bestand wordt daardoor niet meer gebruikt.
- Waarom twee repo's: GitHub Pages geeft één website per repo.

## Beslissingen

### Accounts en voortgang
- **Een kind moet direct kunnen beginnen, zonder account.** Voortgang wordt eerst lokaal opgeslagen.
- Een account is optioneel en wordt aangemaakt door een **ouder** (e-mail, het liefst met een inloglink zonder wachtwoord). Kinderen hebben geen e-mail of eigen account.
- Na een paar sessies verschijnt een vriendelijke melding voor het kind ("Wil je je sterren bewaren, ook op een andere tablet? Vraag papa of mama"). Die leidt naar een **ouderpoort**. Gebruik daarvoor **geen rekensom** (kinderen kunnen rekenen!), maar bijvoorbeeld een voluit geschreven woord typen of een knop drie seconden ingedrukt houden.
- Bij het aanmaken van een account herkent de app de lokale voortgang en biedt aan die over te zetten naar een kindprofiel.
- Een ouder kan **meerdere kindprofielen** hebben (voornaam of bijnaam, avatar, groep, methode). Op een gedeeld apparaat kiest het kind zijn eigen avatar.
- De **ouderomgeving** zit achter een **pincode** die de ouder instelt.
- **Apparaten koppelen:** de ouder logt één keer in op een apparaat, daarna blijft het gekoppeld. Extra optie: een tijdelijke koppelcode of QR-code uit de ouderomgeving, zodat de ouder zijn e-mail niet op elk apparaat hoeft te gebruiken.
- **Lokaal blijft de basis:** de app werkt ook offline en synchroniseert zodra er verbinding is. Ontwerp duidelijke samenvoegregels voor als twee apparaten offline geoefend hebben (bijvoorbeeld: per oefening de record met de meeste pogingen, geschiedenis samenvoegen zonder dubbelingen, sterren niet dubbel tellen). Beschrijf de gekozen regels in dit bestand.
- **Backend:** Supabase, **EU-regio**, gratis tier. Row Level Security is verplicht: een ouder ziet alleen zijn eigen kinderen.
- **Privacy (AVG, kinderen):** sla zo weinig mogelijk op over een kind. Geen achternaam, geen geboortedatum, alleen voornaam/bijnaam, avatar, groep, methode en voortgang. Een ouder moet een kindprofiel en het hele account zelf kunnen verwijderen. Geen tracking, geen advertenties, geen cookies behalve wat strikt nodig is voor het inloggen. Schrijf een begrijpelijke privacyverklaring.

### Ouderomgeving
- Voortgang per kind bekijken: beheersing per domein en categorie, sterren, dagen op rij, oefentijd.
- Geschiedenis zien: gemaakte toetsen met cijfers en datums.
- Groep en methode van een kind aanpassen.
- **Oefeningen klaarzetten (optioneel):** de ouder kan oefeningen of hele methodeblokken klaarzetten. Die verschijnen bij het kind in een aparte sectie "Oefeningen van [naam ouder]". Het kind blijft daarnaast vrij oefenen; de ouder hoeft niets klaar te zetten. Een oefensessie is in de code al een lijst oefening-ID's, dus bouw hierop voort.

### Overig
- **Donaties:** nog niet besloten. Reserveer een plek in de ouderomgeving en op de ouderpagina, maar bouw nog niets. Donatieknoppen komen **nooit** in het deel dat het kind ziet.
- **Leerkrachtomgeving:** komt later. Houd er in het datamodel rekening mee dat het later kan, maar bouw het niet.
- **Spellen:** later meer korte rekenspelletjes, in dezelfde stijl als de huidige.

## Fases

### Fase 1 — Fundament
1. Splits `index.html` op in losse bestanden: CSS per onderdeel, JavaScript-modules per domein, spellen, koppelingen, de app (routes en schermen), de sommen-speler en een opslaglaag. Voorkeur: gewone ES-modules zonder bouwstap, tenzij je een goede reden hebt.
2. Voeg tests toe die je zonder browser kunt draaien:
   - elke oefening (`EX`) genereert 200 keer een geldige vraag (geen `NaN`, antwoord past bij het type, keuzevragen bevatten het goede antwoord);
   - alle oefening-ID's in `KOPPELINGEN` bestaan echt.
   Draai deze tests vóór en na het opsplitsen: het gedrag mag niet veranderen.
3. Maak er een echte PWA van: `manifest.json` met iconen (ook PNG's voor Android en iOS), een werkende service worker met offline-caching en versiebeheer zodat updates goed doorkomen.
4. Zet alle opslag achter één opslaglaag, zodat lokaal en later de server uitwisselbaar zijn. Migreer de bestaande sleutel `rekenraket-v2` zonder dat er voortgang verloren gaat.
5. Voer de nieuwe naam "Reken je Rot!" door (centraal instelbaar).
6. Zet de omgevingen op: de test op gratisspelletje.com, productie op rekenjerot.nl. Stel de eenvoudigste opzet voor die ik kan begrijpen (bijvoorbeeld één repo met een testbranch en een productiebranch die automatisch naar de juiste site gaan) en leg uit wat ik bij GitHub en TransIP moet doen.

### Fase 2 — Accounts
Supabase-project (ik maak het aan met jouw uitleg), datamodel, inloggen voor ouders, kindprofielen, pincode, ouderpoort, apparaten koppelen, synchroniseren met samenvoegregels, en het overzetten van lokale voortgang bij de eerste login. Pas de privacytekst aan.

### Fase 3 — Ouderomgeving
Voortgang en geschiedenis per kind, groep en methode aanpassen, oefeningen klaarzetten met de sectie "Oefeningen van [naam ouder]", kindprofiel en account verwijderen.

### Fase 4 — Uitbreiden
Meer korte rekenspelletjes en oefenvormen. Later eventueel de leerkrachtomgeving en een donatieoptie.

## Logboek van beslissingen

(Vul hier aan wat we onderweg besluiten, met datum.)

- **2026-11-10 — Fase 1**
  - Gewone ES-modules zonder bouwstap; opgesplitst langs de bestaande blokken. Tests bewijzen dat alle 447 oefeningen precies dezelfde sommen maken als vóór het opsplitsen.
  - Opslag onder nieuwe sleutel `rekenjerot-v3`; `rekenraket-v2` blijft altijd staan als reservekopie.
  - Service worker met netwerk-eerst (updates komen meteen door; offline uit de cache).
  - PNG-iconen worden met `npm run iconen` gemaakt uit `iconen/icoon.svg`.
  - Omgevingen: twee repo's (test en productie) met dezelfde GitHub Actions-workflow. Live zetten op productie is een bewuste stap (`git push productie main`).
  - De badge "Rekenraket" (alles van je groep beheerst) houdt zijn naam.
  - Op elk adres behalve rekenjerot.nl toont de app een label TEST.
  - Pushen en pull requests doet Maarten zelf, met uitleg.
