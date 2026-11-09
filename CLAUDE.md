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

## Wat het is

Een gratis reken-oefensite en PWA voor Nederlandse basisschoolkinderen (groep 1 t/m 8).
Het begon om mijn zoon te helpen met rekenen; nu wil ik dat veel meer kinderen het kunnen gebruiken.

- **Nieuwe naam:** Reken je Rot! (de huidige app heet nog "Rekenraket"). Zet de naam op één centrale plek in de code, zodat hij makkelijk aan te passen is.
- **Productie:** rekenjerot.nl (GitHub Pages, DNS bij TransIP).
- **Test:** gratisspelletje.com (GitHub Pages, DNS bij TransIP). Hier draait nu de huidige versie.
- **GitHub-account:** maarten100. Huidige repo: `gratisspelletje`.

## Huidige situatie (vóór fase 1)

- De hele app staat in één groot `index.html` (CSS en JavaScript inline), plus `sw.js` en `CNAME`.
- Inhoud: 5 domeinen (Automatiseren, Getallen, Meten, Verhoudingen, Verbanden), ± 20 categorieën, honderden oefensoorten met willekeurig gegenereerde sommen, hints en uitleg.
- Modi: oefenen (hint na fout), op tijd (timer), toets (cijfer + nakijklijst).
- Koppelingen per blok voor de methodes Wereld in getallen, Pluspunt en Getal & Ruimte Junior, en toetstraining voor Cito LIB en IEP (`KOPPELINGEN`).
- Motivatie: sterren, dagen op rij, badges, "beheerst" (laatste 8+ pogingen ≥ 80% in één keer goed).
- 5 korte rekenspelletjes (Tafelrace, Ballonnen, Memory, Groter of kleiner, Getallenlijn).
- Opslag: één object `S` in localStorage onder de sleutel `rekenraket-v2`. Eén profiel per apparaat.
- **Bekende problemen:**
  - De service worker staat uit (`if (false)` rond de registratie) en er is geen `manifest.json`. Offline werkt dus niet en installeren op Android/Chrome ook niet.
  - Commentaar verwijst naar losse bestanden (`SPEC.md`, `js/ex-getallen.js`, `css/ex-meten.css`) die niet meer bestaan.
  - De ouderpagina zegt "alles blijft op dit apparaat, geen account nodig". Dat moet veranderen zodra er accounts zijn.

**Belangrijk:** bestaande gebruikers hebben voortgang in localStorage (`rekenraket-v2`). Die mag nooit verloren gaan.

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
