# Handleiding Reken je Rot!

Voor Maarten: hoe je de app bekijkt, test en online zet. Typ de opdrachten in de Terminal, in de map van het project.

## De app op je eigen computer bekijken

```bash
npm start
```

Open daarna **http://localhost:8000** in je browser. Linksboven staat dan het label **TEST**. Stoppen doe je met `Ctrl + C` in de Terminal.

(Dubbelklikken op `index.html` werkt niet meer. Browsers laden de losse codebestanden alleen via zo'n servertje.)

## Testen

```bash
npm test
```

Je ziet vijf controles met een ✓. Staat er ergens een ✗, dan is er iets kapot. Zet die versie dan niet online.

## Twee omgevingen

| | Test | Productie (echt) |
|---|---|---|
| Adres | gratisspelletje.com | rekenjerot.nl |
| Repo op GitHub | gratisspelletje | rekenjerot |
| Zo komt het online | pull request mergen naar `main` | `git push productie main` |

Normale werkwijze:
1. Werk op een aparte branch en open een pull request. GitHub draait dan de tests. Een groen vinkje betekent dat het in orde is.
2. Merge de pull request. Na een paar minuten staat de nieuwe versie op **gratisspelletje.com**.
3. Probeer het daar uit. Bevalt het, typ dan:
   ```bash
   git push productie main
   ```
   Na een paar minuten staat dezelfde versie op **rekenjerot.nl**.

## Eenmalig instellen

### A. De testsite (gratisspelletje) overzetten naar automatisch online zetten
Doe dit vlak vóór je de pull request van fase 1 merget.
1. Ga op github.com naar de repo **gratisspelletje**, dan **Settings** (tandwiel, bovenaan) en links **Pages**.
2. Kies bij **Build and deployment → Source**: **GitHub Actions**.
3. Controleer dat bij **Custom domain** nog `gratisspelletje.com` staat.
4. Merge daarna de pull request. Onder het tabblad **Actions** zie je "Website" draaien. Groen betekent dat het online staat.

### B. De productie-repo aanmaken
1. Klik op github.com rechtsboven op **+** en dan **New repository**.
2. Name: `rekenjerot`, kies **Public** en vink niets aan (geen README). Klik **Create repository**.
3. Typ in de Terminal, in de projectmap:
   ```bash
   git remote add productie https://github.com/maarten100/rekenjerot.git
   ```
4. Zet de site er de eerste keer op (pas als fase 1 op de testsite goed werkt):
   ```bash
   git push productie main
   ```
5. In de repo **rekenjerot**: ga naar **Settings → Pages → Source** en kies **GitHub Actions**.
6. Ga naar **Actions**, kies links **Website** en klik **Run workflow**. Daarna staat de site eerst op `maarten100.github.io/rekenjerot`.

### C. Het domein rekenjerot.nl koppelen (TransIP en GitHub)
1. **Domein verifiëren bij GitHub** (dan kan niemand anders het domein voor een eigen GitHub-site gebruiken):
   klik op github.com rechtsboven op je profielfoto en kies **Settings → Pages → Add a domain**. Vul `rekenjerot.nl` in. GitHub laat dan een TXT-record zien (naam begint met `_github-pages-challenge-maarten100`). Laat die pagina open.
2. **Bij TransIP**: log in en ga naar **Domeinen → rekenjerot.nl → DNS**.
   - Haal de bestaande regels voor `@` en `www` weg (type A, AAAA en CNAME). Laat MX-regels voor e-mail staan.
   - Voeg deze regels toe:

     | Naam | Type | Waarde |
     |---|---|---|
     | @ | A | 185.199.108.153 |
     | @ | A | 185.199.109.153 |
     | @ | A | 185.199.110.153 |
     | @ | A | 185.199.111.153 |
     | @ | AAAA | 2606:50c0:8000::153 |
     | @ | AAAA | 2606:50c0:8001::153 |
     | @ | AAAA | 2606:50c0:8002::153 |
     | @ | AAAA | 2606:50c0:8003::153 |
     | www | CNAME | maarten100.github.io. (met de punt erachter) |
     | (naam van GitHub) | TXT | (waarde van GitHub) |
   - Klik **Opslaan**. Het kan tot een paar uur duren voordat het overal werkt.
3. Klik terug bij GitHub op **Verify**.
4. In de repo **rekenjerot**: ga naar **Settings → Pages → Custom domain**, vul `rekenjerot.nl` in en klik **Save**. Wacht tot de controle groen is en vink dan **Enforce HTTPS** aan.

## Goed om te weten
- **Voortgang van kinderen** staat in hun eigen browser, per website. Kinderen die nu op gratisspelletje.com oefenen, zien hun sterren dus niet vanzelf op rekenjerot.nl. Hiervoor kiezen we nog een oplossing vóór de echte lancering.
- **Een nieuw bestand toegevoegd?** Zet het in de lijst `BESTANDEN` in `sw.js` en verhoog `VERSIE`. `npm test` waarschuwt als je het vergeet.
- **Naam veranderen?** Pas `js/config.js`, `index.html` en `manifest.json` aan.
- **App-icoon veranderen?** Pas `iconen/icoon.svg` aan en typ `npm run iconen`.
