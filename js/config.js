/* Instellingen op één plek.

   De naam van de app staat hier. Verander je hem, pas dan ook deze bestanden aan
   (die kunnen niet uit dit bestand lezen, omdat de browser ze vóór de code nodig heeft):
   - index.html      → <title>, apple-mobile-web-app-title en de tekst in de bovenbalk
   - manifest.json   → "name" en "short_name"  */

export const NAAM = 'Reken je Rot!';
export const LOGO = '🚀';   // het plaatje vóór de naam in de bovenbalk

/* Het echte adres. Op elk ander adres (de testsite, je eigen computer) toont de app een
   label "TEST", zodat je altijd ziet in welke omgeving je zit. */
export const PRODUCTIE_DOMEIN = 'rekenjerot.nl';
export const IS_TEST = typeof location !== 'undefined'
  && location.hostname !== PRODUCTIE_DOMEIN && location.hostname !== 'www.' + PRODUCTIE_DOMEIN;
