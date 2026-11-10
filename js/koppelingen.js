/* Koppelingen: oefenen per blok van een rekenmethode of per onderdeel van een toets. */

export const KOPPELINGEN = [
  { id: 'wig', kind: 'methode', title: 'Wereld in getallen', short: 'WIG', emoji: '🌍', color: '#2D9CDB',
    desc: 'Oefen per blok, groep 3 t/m 8',
    note: 'Gebaseerd op de blokindeling van de methode. Werkt jouw school met een andere editie? Kies dan het onderwerp dat je in de klas hebt gehad.',
    sections: [
      { groep: 3, title: 'Blok 1', items: [
        { label: 'Getallenrij invullen tot 10', ids: ['getal100.tot10.rij'] },
        { label: 'Plaatjes tellen tot 10', ids: ['getal100.tot10.tellen'] },
        { label: 'Splitsen met plaatjes tot 10', ids: ['getal100.tot10.splitsplaatjes'] },
        { label: 'Hele uren aflezen', ids: ['klok.uren.ana'] },
        { label: 'Hele uren goedzetten', ids: ['klok.uren.anaset'] }
      ] },
      { groep: 3, title: 'Blok 2', items: [
        { label: 'Getallenrij invullen tot 20', ids: ['getal100.tot20.rij'] },
        { label: 'Plaatjes tellen tot 20', ids: ['getal100.tot20.tellen'] },
        { label: 'Splitsen met plaatjes tot 5', ids: ['getal100.tot5.splitsplaatjes'] },
        { label: 'Splitsen tot 5', ids: ['getal100.tot5.splitsen', 'plusmin.tot6.splitsen'] },
        { label: 'Blokken tellen tot 10 blokken', ids: ['meetkunde.tot10.tellen'] }
      ] },
      { groep: 3, title: 'Blok 3', items: [
        { label: 'Handig tellen met groepjes van 5', ids: ['getal100.tot100.vijftallen', 'getal100.tot20.tellen'] },
        { label: 'Getallenrij invullen tot 20', ids: ['getal100.tot20.rij'] },
        { label: 'Getallen van klein naar groot tot 20', ids: ['getal100.tot20.ordenen'] },
        { label: 'Splitsen met plaatjes tot 10', ids: ['getal100.tot10.splitsplaatjes'] },
        { label: 'Splitsen tot 10', ids: ['getal100.tot10.splitsen', 'plusmin.tot10.splitsen', 'plusmin.tot10.split10'] },
        { label: 'Splitsen tot 20', ids: ['getal100.tot20.splitsen'] },
        { label: 'Halve uren aflezen', ids: ['klok.half.ana'] },
        { label: 'Halve uren goedzetten', ids: ['klok.half.anaset'] }
      ] },
      { groep: 3, title: 'Blok 4', items: [
        { label: 'Van klein naar groot tot 100', ids: ['getal100.tot100.ordenen'] },
        { label: 'Getallenrij invullen tot 100', ids: ['getal100.tot100.rij'] },
        { label: 'Plussommen met plaatjes tot 10', ids: ['bplusmin.tot10.pplus'] },
        { label: 'Minsommen met plaatjes tot 6', ids: ['bplusmin.tot6.pmin'] },
        { label: 'Plussommen tot 10', ids: ['plusmin.tot10.plus', 'bplusmin.tot10.plus'] },
        { label: 'Minsommen tot 10', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min'] },
        { label: 'Geld betalen tot 10 euro', ids: ['geld.tot10.betalen'] }
      ] },
      { groep: 3, title: 'Blok 5', items: [
        { label: 'Splitsen tot 10', ids: ['getal100.tot10.splitsen', 'plusmin.tot10.splitsen', 'plusmin.tot10.split10'] },
        { label: 'Getallen van klein naar groot', ids: ['getal100.tot20.ordenen', 'getal100.tot100.ordenen'] },
        { label: 'Getallenrij invullen tot 100', ids: ['getal100.tot100.rij'] },
        { label: 'Splitsen in tientallen en lossen tot 20', ids: ['getal100.tot20.tl'] },
        { label: 'Tijdsduur later of vroeger', ids: ['tijd.duurana.uren'] },
        { label: 'Plattegrond kiezen bij bouwsel', ids: ['meetkunde.tot10.plat'] }
      ] },
      { groep: 3, title: 'Blok 6', items: [
        { label: 'Splitsen tot 10', ids: ['getal100.tot10.splitsen', 'plusmin.tot10.splitsen', 'plusmin.tot10.split10'] },
        { label: 'Minsommen tot 10', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min'] },
        { label: 'Minsommen met plaatjes tot 10', ids: ['bplusmin.tot10.pmin'] },
        { label: 'Plattegrond kiezen bij blokkenbouwsel', ids: ['meetkunde.tot10.plat'] },
        { label: 'Blokken tellen tot 10 blokken', ids: ['meetkunde.tot10.tellen'] }
      ] },
      { groep: 3, title: 'Blok 7', items: [
        { label: 'Splitsen tot 10', ids: ['getal100.tot10.splitsen', 'plusmin.tot10.splitsen', 'plusmin.tot10.split10'] },
        { label: 'Splitsen met hulp van plaatjes tot 10', ids: ['getal100.tot10.splitsplaatjes'] },
        { label: 'Getallenrij invullen tot 100', ids: ['getal100.tot100.rij'] },
        { label: 'Plussommen tot 10', ids: ['plusmin.tot10.plus', 'bplusmin.tot10.plus'] },
        { label: 'Tijdsduur - hoeveel uur later?', ids: ['tijd.duurana.uren'] },
        { label: 'Tijdsduur - begin-/eindtijd goedzetten', ids: ['tijd.duurana.uren'] },
        { label: 'Blokken tellen tot 10 blokken', ids: ['meetkunde.tot10.tellen'] }
      ] },
      { groep: 3, title: 'Blok 8', items: [
        { label: 'Plussommen tot 10', ids: ['plusmin.tot10.plus', 'bplusmin.tot10.plus'] },
        { label: 'Minsommen tot 10', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min'] },
        { label: 'Juiste plaats op de getallenlijn tot 100', ids: ['getal100.tot100.lijn'] },
        { label: 'Aflezen van de getallenlijn tot 100', ids: ['getal100.tot100.aflezen'] },
        { label: 'Plussommen tot 20 met hulpsom', ids: ['plusmin.tot20.plusbin', 'bplusmin.tot20.plusbin', 'plusmin.tot20.plusover', 'bplusmin.tot20.plusover'] },
        { label: 'Minsommen tot 20 met hulpsom', ids: ['plusmin.tot20.minbin', 'bplusmin.tot20.minbin', 'plusmin.tot20.minover', 'bplusmin.tot20.minover'] },
        { label: 'Geld betalen tot 20 euro', ids: ['geld.tot20.betalen'] }
      ] },
      { groep: 4, title: 'Blok 1', items: [
        { label: 'Splitsen tot 10', ids: ['getal100.tot10.splitsen', 'plusmin.tot10.splitsen', 'plusmin.tot10.split10'] },
        { label: 'Aflezen van de getallenlijn tot 100', ids: ['getal100.tot100.aflezen'] },
        { label: 'Plussommen tot 10', ids: ['plusmin.tot10.plus', 'bplusmin.tot10.plus'] },
        { label: 'Minsommen tot 10', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min'] },
        { label: 'Plussommen over het tiental met tussenstap', ids: ['plusmin.tot20.plusover', 'bplusmin.tot20.plusover'] },
        { label: 'Minsommen over het tiental met tussenstap', ids: ['plusmin.tot20.minover', 'bplusmin.tot20.minover'] },
        { label: 'Tijdsduur hele uren', ids: ['tijd.duurana.uren'] }
      ] },
      { groep: 4, title: 'Blok 2', items: [
        { label: 'Plussommen tot 10', ids: ['plusmin.tot10.plus', 'bplusmin.tot10.plus'] },
        { label: 'Minsommen tot 10', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min'] },
        { label: 'Splitsen tot 100', ids: ['getal100.tot100.tl'] },
        { label: 'Juiste plaats op de getallenlijn tot 100', ids: ['getal100.tot100.lijn'] },
        { label: 'Plussommen tot 20', ids: ['plusmin.tot20.plusbin', 'bplusmin.tot20.plusbin', 'plusmin.tot20.plusover', 'bplusmin.tot20.plusover'] },
        { label: 'Minsommen tot 20', ids: ['plusmin.tot20.minbin', 'bplusmin.tot20.minbin', 'plusmin.tot20.minover', 'bplusmin.tot20.minover'] },
        { label: 'Tijdsduur analoog uur later of vroeger', ids: ['tijd.duurana.uren'] },
        { label: 'Tijdsduur hele uren', ids: ['tijd.duurana.uren'] },
        { label: 'Tijdsduur hele en halve uren', ids: ['tijd.duurana.half'] }
      ] },
      { groep: 4, title: 'Blok 3', items: [
        { label: 'Plussommen tot 10', ids: ['plusmin.tot10.plus', 'bplusmin.tot10.plus'] },
        { label: 'Minsommen tot 10', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min'] },
        { label: 'Tientallen invullen', ids: ['getal100.tot100.tientallen'] },
        { label: 'Tellen met sprongen van 10', ids: ['getal100.tot100.sprong10'] },
        { label: 'Juiste plaats op de getallenlijn tot 100', ids: ['getal100.tot100.lijn'] },
        { label: 'Tientallen eraf en erbij tot 100', ids: ['plusmin.tot100.tienplus', 'plusmin.tot100.tienmin', 'bplusmin.tot100.tien'] },
        { label: 'Geld betalen tot 100 euro', ids: ['geld.tot100.betalen'] },
        { label: 'Aanzicht bepalen', ids: ['meetkunde.tot10.aanzicht'] },
        { label: 'Tijdsduur hele uren', ids: ['tijd.duurana.uren'] },
        { label: 'Tijdsduur hele en halve uren', ids: ['tijd.duurana.half'] }
      ] },
      { groep: 4, title: 'Blok 4', items: [
        { label: 'Plussommen binnen het tiental tot 20', ids: ['plusmin.tot20.plusbin', 'bplusmin.tot20.plusbin'] },
        { label: 'Minsommen binnen het tiental tot 20', ids: ['plusmin.tot20.minbin', 'bplusmin.tot20.minbin'] },
        { label: 'Tellen met sprongen van 10', ids: ['getal100.tot100.sprong10'] },
        { label: 'Tientallen eraf en erbij - 58 + 20 / 74 − 30', ids: ['plusmin.tot100.tienplus', 'plusmin.tot100.tienmin', 'bplusmin.tot100.tien'] },
        { label: 'Analoog kwartieren aflezen', ids: ['klok.kwart.ana'] },
        { label: 'Analoog kwartieren goedzetten', ids: ['klok.kwart.anaset'] },
        { label: 'Analoog hele en halve uren aflezen', ids: ['klok.half.ana'] },
        { label: 'Analoog hele en halve uren goedzetten', ids: ['klok.half.anaset'] }
      ] },
      { groep: 4, title: 'Blok 5', items: [
        { label: 'Aanvullen tot 10', ids: ['bplusmin.tot10.aanvul', 'plusmin.tot10.split10'] },
        { label: 'Plussommen tot 100 binnen tiental', ids: ['plusmin.tot100.plusbin', 'bplusmin.tot100.plusbin'] },
        { label: 'Minsommen tot 100 binnen tiental', ids: ['plusmin.tot100.minbin', 'bplusmin.tot100.minbin'] },
        { label: 'Minsommen over het tiental tot 100', ids: ['plusmin.tot100.minover', 'bplusmin.tot100.minover'] },
        { label: 'Plussommen over het tiental tot 100', ids: ['plusmin.tot100.plusover', 'bplusmin.tot100.plusover'] },
        { label: 'Analoog kwartieren aflezen', ids: ['klok.kwart.ana'] },
        { label: 'Analoog kwartieren goedzetten', ids: ['klok.kwart.anaset'] }
      ] },
      { groep: 4, title: 'Blok 6', items: [
        { label: 'Plus over het tiental tot 20', ids: ['plusmin.tot20.plusover', 'bplusmin.tot20.plusover'] },
        { label: 'Min over het tiental tot 20', ids: ['plusmin.tot20.minover', 'bplusmin.tot20.minover'] },
        { label: 'Digitale tijd hele uren aflezen', ids: ['klok.uren.dig'] },
        { label: 'Digitale tijd halve uren aflezen', ids: ['klok.half.dig'] },
        { label: 'Digitale tijd kwartieren aflezen', ids: ['klok.kwart.dig'] },
        { label: 'Plus over het tiental tot 100', ids: ['plusmin.tot100.plusover', 'bplusmin.tot100.plusover'] },
        { label: 'Min over het tiental tot 100', ids: ['plusmin.tot100.minover', 'bplusmin.tot100.minover'] },
        { label: 'Min binnen het tiental tot 100', ids: ['plusmin.tot100.minbin', 'bplusmin.tot100.minbin'] },
        { label: 'Tafels van 2, 5 en 10', ids: ['keer.tafels10.t2', 'keer.tafels10.t5', 'keer.tafels10.t10'] },
        { label: 'Digitaal en analoog kwartieren omzetten', ids: ['klok.kwart.omzet'] }
      ] },
      { groep: 4, title: 'Blok 7', items: [
        { label: 'Geld tellen en betalen tot 5 euro', ids: ['geld.tot5.tellen', 'geld.tot5.betalen'] },
        { label: 'Geld tellen en betalen tot 1 euro', ids: ['geld.tot1.tellen', 'geld.tot1.betalen'] },
        { label: 'Plus en min, eenheden over tiental tot 100', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'bplusmin.tot100.eenover'] },
        { label: 'Digitale tijd aflezen tot kwartieren', ids: ['klok.kwart.dig'] },
        { label: 'Tafels 1 tot 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] }
      ] },
      { groep: 4, title: 'Blok 8', items: [
        { label: 'Tientallen eraf en erbij tot 100', ids: ['plusmin.tot100.tienplus', 'plusmin.tot100.tienmin', 'bplusmin.tot100.tien'] },
        { label: 'Plus en min, eenheden binnen tiental tot 100', ids: ['plusmin.tot100.pluseen', 'plusmin.tot100.mineen', 'bplusmin.tot100.een'] },
        { label: 'Plus en min, eenheden over tiental tot 100', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'bplusmin.tot100.eenover'] },
        { label: 'Kalender - juiste dag zoeken', ids: ['tijd.kalender.dag'] },
        { label: 'De kalender begrijpen', ids: ['tijd.kalender.begrip'] },
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] }
      ] },
      { groep: 5, title: 'Blok 1', items: [
        { label: 'Plus en min, eenheden binnen tiental tot 100', ids: ['plusmin.tot100.pluseen', 'plusmin.tot100.mineen', 'bplusmin.tot100.een'] },
        { label: 'Plus en min, eenheden over tiental tot 100', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'bplusmin.tot100.eenover'] },
        { label: 'Getallen van klein naar groot tot 1000', ids: ['getalgroot.t1000.ordenen'] },
        { label: 'Tellen met sprongen van 1, 10 en 100', ids: ['getalgroot.t1000.sprongen'] },
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Digitale tijd hele/halve uren en kwartieren aflezen', ids: ['klok.kwart.dig', 'klok.half.dig'] },
        { label: 'Staafdiagrammen', ids: ['diagrammen.staaf.g56'] },
        { label: 'Plattegrond kiezen bij blokkenbouwsels', ids: ['meetkunde.tot10.plat', 'meetkunde.tot25.plat'] },
        { label: 'Geld betalen in hele euro\'s', ids: ['geld.tot20.betalen', 'geld.tot50.betalen', 'geld.tot100.betalen'] },
        { label: 'Hoeveel is het getal waard', ids: ['getalgroot.t1000.positie'] }
      ] },
      { groep: 5, title: 'Blok 2', items: [
        { label: 'Plus en min, eenheden binnen tiental tot 100', ids: ['plusmin.tot100.pluseen', 'plusmin.tot100.mineen', 'bplusmin.tot100.een'] },
        { label: 'Plus en min, eenheden over tiental tot 100', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'bplusmin.tot100.eenover'] },
        { label: 'Getallen van klein naar groot tot 1000', ids: ['getalgroot.t1000.ordenen'] },
        { label: 'Juiste plaats op de getallenlijn tot 1000', ids: ['getalgroot.t1000.lijn'] },
        { label: 'Sommen als 4 × 70 met hulpsom', ids: ['keer.nullen.n1', 'bkeer.nullen.n1'] },
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Aanzicht bepalen', ids: ['meetkunde.tot10.aanzicht', 'meetkunde.tot25.aanzicht'] }
      ] },
      { groep: 5, title: 'Blok 3', items: [
        { label: 'Sommen als 4 × 70', ids: ['keer.nullen.n1', 'bkeer.nullen.n1'] },
        { label: 'Sommen als 350 + 580 / 810 − 350', ids: ['bplusmin.tot1000.htop', 'bplusmin.tot1000.htom'] },
        { label: 'Splitssommen 5 × 19 met splitsing', ids: ['bkeer.splitsen.s1'] },
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Aanzicht bepalen van blokkenbouwsels', ids: ['meetkunde.tot10.aanzicht', 'meetkunde.tot25.aanzicht'] },
        { label: 'Plattegrond kiezen bij bouwsel', ids: ['meetkunde.tot10.plat', 'meetkunde.tot25.plat'] },
        { label: 'Analoge klok aflezen tot 5 minuten', ids: ['klok.min5.ana'] },
        { label: 'Digitale klok aflezen tot 5 minuten', ids: ['klok.min5.dig'] }
      ] },
      { groep: 5, title: 'Blok 4', items: [
        { label: 'Plus over het tiental tot 100', ids: ['plusmin.tot100.plusover', 'bplusmin.tot100.plusover'] },
        { label: 'Min over het tiental tot 100', ids: ['plusmin.tot100.minover', 'bplusmin.tot100.minover'] },
        { label: 'Splitssommen 6 × 76 met splitsing', ids: ['bkeer.splitsen.s2'] },
        { label: 'Geld tellen en betalen tot 100 euro', ids: ['geld.tot100.tellen', 'geld.tot100.betalen'] },
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Keersommen als 5 × 40', ids: ['keer.nullen.n1', 'bkeer.nullen.n1'] },
        { label: 'Analoge en digitale tijd omzetten tot 5 minuten', ids: ['klok.min5.omzet'] }
      ] },
      { groep: 5, title: 'Blok 5', items: [
        { label: 'Splitssommen 5 × 19', ids: ['bkeer.splitsen.s1'] },
        { label: 'Splitssommen 5 × 39', ids: ['bkeer.splitsen.s1', 'bkeer.splitsen.s2'] },
        { label: 'Sommen als 152 + 230 / 763 − 340', ids: ['bplusmin.tot1000.htep', 'bplusmin.tot1000.htem'] },
        { label: 'Delen met rest met hulpsom', ids: ['bdelen.rest.rest'] },
        { label: 'Analoge klok tot 5 minuten', ids: ['klok.min5.ana', 'klok.min5.anaset'] },
        { label: 'Digitale klok tot 5 minuten', ids: ['klok.min5.dig', 'klok.min5.digset'] },
        { label: 'Geld tellen tot 100 euro', ids: ['geld.tot100.tellen'] },
        { label: 'Aanzicht bepalen', ids: ['meetkunde.tot10.aanzicht', 'meetkunde.tot25.aanzicht'] }
      ] },
      { groep: 5, title: 'Blok 6', items: [
        { label: 'Minsommen tot 100 over het tiental', ids: ['plusmin.tot100.minover', 'bplusmin.tot100.minover'] },
        { label: 'Sommen als 170 + 50 / 430 − 80', ids: ['bplusmin.tot1000.top', 'bplusmin.tot1000.tom'] },
        { label: 'Delen met rest met hulpsom', ids: ['bdelen.rest.rest'] },
        { label: 'Splitssommen 6 × 76', ids: ['bkeer.splitsen.s2'] },
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Welke dag is het?', ids: ['tijd.kalender.dag'] },
        { label: 'De kalender begrijpen', ids: ['tijd.kalender.begrip'] },
        { label: 'Digitale tijd aflezen tot 5 minuten', ids: ['klok.min5.dig'] }
      ] },
      { groep: 5, title: 'Blok 7', items: [
        { label: 'Deelsommen als 560 : 8 met hulpsom', ids: ['delen.nullen.n1', 'bdelen.nullen.n1'] },
        { label: 'Delen door te splitsen 42 : 3', ids: ['bdelen.rest.split1'] },
        { label: 'Geld tellen tot 100 euro', ids: ['geld.tot100.tellen'] },
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Plus- en minsommen tot 1000', ids: ['bplusmin.tot1000.alle', 'plusmin.tot1000.htbin', 'plusmin.tot1000.htover'] },
        { label: 'Geld tellen tot 100 euro', ids: ['geld.tot100.tellen'] },
        { label: 'De kalender begrijpen', ids: ['tijd.kalender.begrip'] }
      ] },
      { groep: 5, title: 'Blok 8', items: [
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Delen door te splitsen 234 : 6', ids: ['bdelen.rest.split2'] },
        { label: 'Omrekenen mm, cm, dm en m', ids: ['metriek.lengte.omr1'] },
        { label: 'Begrip mm, cm, dm en m', ids: ['metriek.lengte.begrip'] },
        { label: 'Plus- en minsommen tot 1000', ids: ['bplusmin.tot1000.alle', 'plusmin.tot1000.htbin', 'plusmin.tot1000.htover'] }
      ] },
      { groep: 6, title: 'Blok 1', items: [
        { label: 'Splitssommen 6 × 76', ids: ['bkeer.splitsen.s2'] },
        { label: 'Delen door te splitsen 42 : 3', ids: ['bdelen.rest.split1'] },
        { label: 'Analoge klok aflezen tot de minuut', ids: ['klok.min1.ana'] },
        { label: 'Klokken omzetten analoog en digitaal', ids: ['klok.min1.omzet', 'klok.min5.omzet'] },
        { label: 'Digitale klok aflezen tot de minuut', ids: ['klok.min1.dig'] },
        { label: 'Sommen als 152 + 230 / 763 − 340', ids: ['bplusmin.tot1000.htep', 'bplusmin.tot1000.htem'] },
        { label: 'Staafdiagrammen', ids: ['diagrammen.staaf.g56'] }
      ] },
      { groep: 6, title: 'Blok 2', items: [
        { label: 'Keersommen als 6 × 40', ids: ['keer.nullen.n1', 'bkeer.nullen.n1'] },
        { label: 'Positiewaarden tot 10.000', ids: ['getalgroot.t10000.positie'] },
        { label: 'Sommen als 600 + 5000 + 3 + 30', ids: ['bplusmin.groot.pos4'] },
        { label: 'Tellen met sprongen van 1, 10, 100 en 1000', ids: ['getalgroot.t10000.sprongen'] },
        { label: 'Juiste plaats op de getallenlijn tot 10.000', ids: ['getalgroot.t10000.lijn'] },
        { label: 'Afronden op tien-, honderd- en duizendtallen tot 100.000', ids: ['getalgroot.t100000.afronden'] },
        { label: 'Keersommen als 60 × 40 / 6 × 400 met hulpsom', ids: ['keer.nullen.n3', 'bkeer.nullen.n2', 'keer.nullen.n2'] },
        { label: 'Plus- en minsommen met honderdtallen tot 10.000', ids: ['bplusmin.groot.h10k'] },
        { label: 'Getallen tot 10.000 als woord', ids: ['getalgroot.t10000.woord'] },
        { label: 'Begrippen metriek stelsel met plaatjes', ids: ['metriek.lengte.begrip', 'metriek.gewicht.begrip', 'metriek.inhoud.begrip'] }
      ] },
      { groep: 6, title: 'Blok 3', items: [
        { label: 'Breuken - welk deel is gekleurd?', ids: ['breuken.begrip.welk'] },
        { label: 'Delen door te splitsen 234 : 6', ids: ['bdelen.rest.split2'] },
        { label: 'Tijdsduur tot 5 minuten', ids: ['tijd.duurana.min5', 'tijd.duurdig.min5'] },
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Tellen met sprongen van 1, 10, 100 en 1000 tot 10.000', ids: ['getalgroot.t10000.sprongen'] },
        { label: 'Plus- en minsommen met honderdtallen tot 10.000', ids: ['bplusmin.groot.h10k'] },
        { label: 'Sommen optellen als 368 + 257', ids: ['bplusmin.tot1000.alle', 'bplusmin.cijferen.pmet'] }
      ] },
      { groep: 6, title: 'Blok 4', items: [
        { label: 'Minsommen tot 100', ids: ['plusmin.tot100.minbin', 'plusmin.tot100.minover'] },
        { label: 'Breuken - welk deel is gekleurd?', ids: ['breuken.begrip.welk'] },
        { label: 'Breuken - kleur het juiste deel', ids: ['breuken.begrip.kleur'] },
        { label: 'Breuken op de getallenlijn plaatsen tot 1', ids: ['breuken.begrip.lijn'] },
        { label: 'Breuken op de getallenlijn plaatsen boven 1', ids: ['breuken.begrip.lijn'] },
        { label: 'Begrip gram/kilogram met plaatjes', ids: ['metriek.gewicht.begrip'] },
        { label: 'Begrip ml, cl, dl en l met plaatjes', ids: ['metriek.inhoud.begrip'] },
        { label: 'Omrekenen ml, cl, dl en l', ids: ['metriek.inhoud.omr1'] },
        { label: 'Breuken aanvullen tot een hele', ids: ['breuken.anders.aanvul'] },
        { label: 'Cijferend optellen tot 1000', ids: ['bplusmin.cijferen.pzonder', 'bplusmin.cijferen.pmet', 'bplusmin.cijferen.pnul'] }
      ] },
      { groep: 6, title: 'Blok 5', items: [
        { label: 'Tellen met sprongen van 1, 10, 100, 1000 en 10.000', ids: ['getalgroot.t100000.sprongen'] },
        { label: 'Juiste plaats op de getallenlijn tot 100.000', ids: ['getalgroot.t100000.lijn'] },
        { label: 'Getallenrij tienden', ids: ['komma.tienden.rij'] },
        { label: 'Getallenrij honderdsten', ids: ['komma.honderdsten.rij'] },
        { label: 'Omschrijving naar getal (3 hele en 5 tienden = 3,5)', ids: ['komma.tienden.omschrijving'] },
        { label: 'Analoog en digitaal omzetten tot 1 minuut', ids: ['klok.min1.omzet'] },
        { label: 'Digitale klok goedzetten tot 1 minuut', ids: ['klok.min1.digset'] },
        { label: 'Van woord naar getal en andersom tot 100.000', ids: ['getalgroot.t100000.woord'] },
        { label: 'Getallen van klein naar groot tot 100.000', ids: ['getalgroot.t100000.ordenen'] },
        { label: 'Minsommen als 463 − 248', ids: ['bplusmin.cijferen.mmet', 'bplusmin.tot1000.alle'] }
      ] },
      { groep: 6, title: 'Blok 6', items: [
        { label: 'Deelsommen als 560 : 8', ids: ['delen.nullen.n1', 'bdelen.nullen.n1'] },
        { label: 'Een deel van een geheel bepalen - 1/4 van 80', ids: ['breuken.anders.van', 'breuken.anders.deel'] },
        { label: 'Welk deel is gekleurd?', ids: ['breuken.begrip.welk'] },
        { label: 'Keersommen als 50 × 60 / 20 × 900 met hulpsom', ids: ['keer.nullen.n3', 'bkeer.nullen.n2', 'keer.nullen.n4', 'bkeer.nullen.n3'] },
        { label: 'Deelsommen als 5600 : 800 / 18.000 : 3 met hulpsom', ids: ['delen.nullen.n5', 'bdelen.nullen.n2', 'delen.nullen.n3', 'bdelen.nullen.n3'] },
        { label: 'Delen door te splitsen 234 : 6', ids: ['bdelen.rest.split2'] },
        { label: 'Omrekenen mm, cm, dm en m', ids: ['metriek.lengte.omr1'] },
        { label: 'Omtrek van rechthoeken', ids: ['metriek.omtrek.rechthoek'] },
        { label: 'Cirkeldiagrammen', ids: ['diagrammen.cirkel.g6'] }
      ] },
      { groep: 6, title: 'Blok 7', items: [
        { label: 'Plus- en minsommen tot 100', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'plusmin.tot100.tienplus', 'plusmin.tot100.tienmin'] },
        { label: 'Verhoudingstabellen', ids: ['vtabel.heel.onder', 'vtabel.heel.beide', 'vtabel.heel.tabel'] },
        { label: 'De kalender begrijpen', ids: ['tijd.kalender.begrip'] },
        { label: 'Keersommen als 50 × 60 / 20 × 900', ids: ['keer.nullen.n3', 'bkeer.nullen.n2', 'keer.nullen.n4', 'bkeer.nullen.n3'] },
        { label: 'Deelsommen als 5600 : 800 / 18.000 : 3', ids: ['delen.nullen.n5', 'bdelen.nullen.n2', 'delen.nullen.n3', 'bdelen.nullen.n3'] },
        { label: 'Cirkeldiagrammen', ids: ['diagrammen.cirkel.g6'] },
        { label: 'Omrekenen mm, cm, dm en m', ids: ['metriek.lengte.omr1'] },
        { label: 'Cijferend aftrekken als 432 − 263', ids: ['bplusmin.cijferen.mmet'] },
        { label: 'Cijferend aftrekken als 1705 − 346', ids: ['bplusmin.cijferen.m10k'] }
      ] },
      { groep: 6, title: 'Blok 8', items: [
        { label: 'Kommagetallen op de getallenlijn', ids: ['komma.tienden.lijn', 'komma.honderdsten.lijn'] },
        { label: 'Kommagetallen invullen in de getallenrij', ids: ['komma.tienden.rij', 'komma.honderdsten.rij'] },
        { label: 'Kommagetallen van klein naar groot zetten', ids: ['komma.tienden.ordenen', 'komma.honderdsten.ordenen'] },
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Afronden van kommagetallen', ids: ['komma.tienden.afronden', 'komma.honderdsten.afronden'] },
        { label: 'Delen door te splitsen 234 : 6', ids: ['bdelen.rest.split2'] },
        { label: 'Omrekenen ml, cl, dl en l', ids: ['metriek.inhoud.omr1'] },
        { label: 'Cijferend vermenigvuldigen als 7 × 829', ids: ['bkeer.cijferen.c3'] }
      ] },
      { groep: 7, title: 'Blok 1', items: [
        { label: 'Sommen als 5400 − 1800 en 4500 + 1300', ids: ['bplusmin.groot.h10k'] },
        { label: 'Sommen als 5600 : 80 en 60 × 500 met hulpsom', ids: ['delen.nullen.n4', 'bdelen.nullen.n2', 'keer.nullen.n4', 'bkeer.nullen.n3'] },
        { label: 'Een deel van een geheel bepalen - 1/4 van 80', ids: ['breuken.anders.van', 'breuken.anders.deel'] },
        { label: 'Totaal berekenen op basis van een deel', ids: ['breuken.anders.totaal'] },
        { label: 'Helen uit de breuk halen', ids: ['breuken.vereenv.helen'] },
        { label: 'Breuken van klein naar groot zetten', ids: ['breuken.begrip.orde'] },
        { label: 'Omtrek van rechthoeken en samengestelde figuren', ids: ['metriek.omtrek.rechthoek', 'metriek.omtrek.samen'] },
        { label: 'Oppervlakte uitrekenen van rechthoeken en samengestelde figuren', ids: ['metriek.opp.rechthoek', 'metriek.opp.samen'] },
        { label: 'Lijndiagrammen', ids: ['diagrammen.lijn.g7'] },
        { label: 'Beelddiagrammen', ids: ['diagrammen.beeld.complex'] }
      ] },
      { groep: 7, title: 'Blok 2', items: [
        { label: 'Positiewaarden tot 1 miljoen', ids: ['getalgroot.t1000000.positie'] },
        { label: 'Juiste plaats op de getallenlijn tot 1 miljoen', ids: ['getalgroot.t1000000.lijn'] },
        { label: 'Van woord naar getal en andersom tot 1 miljoen', ids: ['getalgroot.t1000000.woord'] },
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Sommen als 154.600 + 58.000 en 890.000 − 122.500', ids: ['bplusmin.groot.h1m'] },
        { label: 'Sommen als 300 × 500 en 30.000 × 6', ids: ['keer.nullen.n5', 'bkeer.nullen.groot'] },
        { label: 'Deelsommen met grotere getallen 540.000: 90', ids: ['delen.nullen.n4', 'bdelen.nullen.n4'] },
        { label: 'Plus- en minsommen kommagetallen', ids: ['bplusmin.komma.tienden', 'bplusmin.komma.honderdsten'] },
        { label: 'De kalender begrijpen', ids: ['tijd.kalender.begrip'] }
      ] },
      { groep: 7, title: 'Blok 3', items: [
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Van woord naar getal en andersom tot 1 miljoen', ids: ['getalgroot.t1000000.woord'] },
        { label: 'Juiste plaats op de getallenlijn tot miljarden', ids: ['getalgroot.miljard.lijn'] },
        { label: 'Plus- en minsommen kommagetallen tot duizendsten', ids: ['bplusmin.komma.tienden', 'bplusmin.komma.honderdsten', 'bplusmin.komma.duizendsten'] },
        { label: 'Gelijknamige breuken optellen en aftrekken - onder de 1', ids: ['breuken.optel.gelijk'] },
        { label: 'Gelijknamige breuken optellen en aftrekken - boven de 1', ids: ['breuken.optel.gelijk'] },
        { label: 'Ongelijknamige breuken optellen en aftrekken - onder de 1', ids: ['breuken.optel.eenv', 'breuken.optel.moeil'] },
        { label: 'Ongelijknamige breuken optellen en aftrekken - boven de 1', ids: ['breuken.optel.eenv', 'breuken.optel.moeil'] },
        { label: 'Breuken en kommagetallen omzetten', ids: ['relatie.basis.bk'] },
        { label: 'Lengte berekenen met schaal', ids: ['schaal.lengte.gelijk', 'schaal.lengte.cmm', 'schaal.lengte.km'] }
      ] },
      { groep: 7, title: 'Blok 4', items: [
        { label: 'Delen met rest', ids: ['bdelen.rest.rest'] },
        { label: 'Splitssommen 6 × 76 met splitsing', ids: ['bkeer.splitsen.s2'] },
        { label: 'Percentage van aantal berekenen', ids: ['procenten.n1.van', 'procenten.n2.van'] },
        { label: 'Breuken en procenten omzetten', ids: ['relatie.basis.bp'] },
        { label: 'Omrekenen mm, cm, dm, m met kommagetallen', ids: ['metriek.lengte.omr1'] },
        { label: 'Omrekenen m, dam, hm en km met kommagetallen', ids: ['metriek.lengte.omr2'] },
        { label: 'Cirkeldiagrammen', ids: ['diagrammen.cirkel.g7'] },
        { label: 'Eenvoudige ongelijknamige breuken optellen en aftrekken', ids: ['breuken.optel.eenv'] },
        { label: 'Schaal berekenen met verschillende maateenheden', ids: ['schaal.bereken.cmdm', 'schaal.bereken.km'] },
        { label: 'Cijferend vermenigvuldigen', ids: ['bkeer.cijferen.c2', 'bkeer.cijferen.c3', 'bkeer.cijferen.c4', 'bkeer.cijferen.c5'] }
      ] },
      { groep: 7, title: 'Blok 5', items: [
        { label: 'Breuken vermenigvuldigen heel getal × breuk', ids: ['breuken.verm.heelbreuk'] },
        { label: 'Breuken vermenigvuldigen heel getal × heel getal + breuk', ids: ['breuken.verm.heelgem'] },
        { label: 'Percentage deel van geheel berekenen', ids: ['procenten.n1.deel', 'procenten.n2.deel'] },
        { label: 'Breuken, kommagetallen, procenten en verhoudingen omzetten', ids: ['relatie.basis.mix'] },
        { label: 'Omrekenen naar km/u', ids: ['tijd.snelheid.kmu'] },
        { label: 'Omrekenen m, dam, hm en km met kommagetallen', ids: ['metriek.lengte.omr2'] },
        { label: 'Deelsommen als 3726 : 23', ids: ['bdelen.cijferen.c3', 'bdelen.cijferen.c4'] }
      ] },
      { groep: 7, title: 'Blok 6', items: [
        { label: 'Plus- en minsommen tot 100', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'plusmin.tot100.tienplus', 'plusmin.tot100.tienmin'] },
        { label: 'Miljoenen van kommagetal naar cijfers en andersom', ids: ['getalgroot.miljoen.komma'] },
        { label: 'Miljarden van kommagetal naar cijfers en andersom', ids: ['getalgroot.miljard.komma'] },
        { label: 'Afronden tot 1 miljoen', ids: ['getalgroot.t1000000.afronden'] },
        { label: 'Vermenigvuldigen met breuken: heel getal × heel getal + breuk', ids: ['breuken.verm.heelgem'] },
        { label: 'Vermenigvuldigen met breuken: heel getal × breuk', ids: ['breuken.verm.heelbreuk'] },
        { label: 'Oppervlakte van driehoeken', ids: ['metriek.opp.driehoek'] },
        { label: 'Oppervlakte van rechthoeken', ids: ['metriek.opp.rechthoek'] },
        { label: 'Rekenen met vierkante kilometers, are en hectare', ids: ['metriek.opp.are'] }
      ] },
      { groep: 7, title: 'Blok 7', items: [
        { label: 'Delen door te splitsen 42 : 3', ids: ['bdelen.rest.split1'] },
        { label: 'Keersommen kommagetallen - de komma verplaatsen', ids: ['bkeer.komma.verplaats'] },
        { label: 'Deelsommen kommagetallen - de komma verplaatsen', ids: ['bdelen.komma.d10'] },
        { label: 'Nieuw bedrag na korting berekenen', ids: ['procenten.n1.nieuw', 'procenten.n2.nieuw'] },
        { label: 'Percentage deel van totaal berekenen', ids: ['procenten.n1.deel', 'procenten.n2.deel'] },
        { label: 'Korting berekenen in euro\'s', ids: ['procenten.n1.korting', 'procenten.n2.korting'] },
        { label: 'Staafdiagrammen', ids: ['diagrammen.staaf.g7'] },
        { label: 'Cirkeldiagrammen', ids: ['diagrammen.cirkel.g7'] },
        { label: 'Oppervlakte van rechthoeken', ids: ['metriek.opp.rechthoek'] }
      ] },
      { groep: 7, title: 'Blok 8', items: [
        { label: 'Deelsommen als 560 : 8', ids: ['delen.nullen.n1', 'bdelen.nullen.n1'] },
        { label: 'Vermenigvuldigen kommagetallen', ids: ['bkeer.komma.verplaats', 'bkeer.komma.split1', 'bkeer.komma.split2'] },
        { label: 'Delen kommagetallen', ids: ['bdelen.komma.tienden', 'bdelen.komma.honderdsten', 'bdelen.komma.d10'] },
        { label: 'Breuken, procenten en kommagetallen omzetten', ids: ['relatie.basis.bk', 'relatie.basis.bp', 'relatie.basis.kp'] },
        { label: 'Breuken, kommagetallen en procenten omzetten', ids: ['relatie.basis.bk', 'relatie.basis.bp', 'relatie.basis.kp'] },
        { label: 'Percentage van aantal berekenen', ids: ['procenten.n1.van', 'procenten.n2.van'] },
        { label: 'Inhoud berekenen', ids: ['metriek.inhbereken.gelijk', 'metriek.inhbereken.versch', 'metriek.inhbereken.liter'] },
        { label: 'Staafdiagrammen', ids: ['diagrammen.staaf.g7'] },
        { label: 'Deelsommen als 3726 : 23', ids: ['bdelen.cijferen.c3', 'bdelen.cijferen.c4'] }
      ] },
      { groep: 8, title: 'Blok 1', items: [
        { label: 'Plus- en minsommen tot 100', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'plusmin.tot100.tienplus', 'plusmin.tot100.tienmin'] }, // herhaling: deze oefening hoort in de app bij een lagere groep
        { label: 'Vermenigvuldigen van kommagetallen', ids: ['bkeer.komma.verplaats', 'bkeer.komma.split1', 'bkeer.komma.split2'] },
        { label: 'Delen kommagetallen', ids: ['bdelen.komma.tienden', 'bdelen.komma.honderdsten', 'bdelen.komma.d10'] },
        { label: 'Breuken, kommagetallen en procenten omzetten', ids: ['relatie.basis.bk', 'relatie.basis.bp', 'relatie.basis.kp', 'relatie.lastig.bk', 'relatie.lastig.bp', 'relatie.lastig.kp'] },
        { label: 'Korting, oude prijs en nieuwe prijs berekenen', ids: ['procenten.n2.korting', 'procenten.n3.korting', 'procenten.n2.nieuw', 'procenten.n3.nieuw', 'procenten.n2.oud', 'procenten.n3.oud'] },
        { label: 'Geheel berekenen op basis van deel', ids: ['procenten.n2.geheel', 'procenten.n3.geheel'] },
        { label: 'Lijndiagrammen', ids: ['diagrammen.lijn.g8'] },
        { label: 'Oppervlakte uitrekenen van driehoeken en samengestelde figuren', ids: ['metriek.opp.driehoek', 'metriek.opp.samen'] },
        { label: 'Inhoud berekenen, ook in liters', ids: ['metriek.inhbereken.gelijk', 'metriek.inhbereken.liter'] },
        { label: 'Omrekenen inhoudsmaten', ids: ['metriek.inhoud.omr1', 'metriek.inhoud.kub', 'metriek.inhoud.kubl', 'metriek.inhoud.alles'] }
      ] },
      { groep: 8, title: 'Blok 2', items: [
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Plus- en min eenvoudige ongelijknamige breuken', ids: ['breuken.optel.eenv'] },
        { label: 'Plus- en min moeilijke ongelijknamige breuken', ids: ['breuken.optel.moeil'] },
        { label: 'Breuk × breuk', ids: ['breuken.verm.breukbreuk'] },
        { label: 'Tijdsduur tot 5 minuten', ids: ['tijd.duurana.min5', 'tijd.duurdig.min5'] },
        { label: 'Korting berekenen', ids: ['procenten.n2.korting', 'procenten.n3.korting'] },
        { label: 'Inhoud berekenen in liters', ids: ['metriek.inhbereken.liter'] }
      ] },
      { groep: 8, title: 'Blok 3', items: [
        { label: 'Delen met rest', ids: ['bdelen.rest.rest'] },
        { label: 'Miljoenen van kommagetal naar cijfers en andersom', ids: ['getalgroot.miljoen.komma'] },
        { label: 'Miljarden van kommagetal naar cijfers en andersom', ids: ['getalgroot.miljard.komma'] },
        { label: 'Afronden', ids: ['getalgroot.t1000000.afronden', 'getalgroot.t100000.afronden'] },
        { label: 'Breuken en procenten omzetten', ids: ['relatie.basis.bp', 'relatie.lastig.bp'] },
        { label: 'Toe- en afname berekenen', ids: ['procenten.n2.nieuw', 'procenten.n3.nieuw', 'procenten.n2.oud', 'procenten.n3.oud'] },
        { label: 'Oude prijs berekenen', ids: ['procenten.n2.oud', 'procenten.n3.oud'] },
        { label: 'Schaal berekenen met maateenheden tot en met km', ids: ['schaal.bereken.km'] },
        { label: 'Lengte berekenen met schaal', ids: ['schaal.lengte.gelijk', 'schaal.lengte.cmm', 'schaal.lengte.km'] },
        { label: 'Juiste plaats op de getallenlijn tot miljoenen', ids: ['getalgroot.miljoen.lijn', 'getalgroot.t1000000.lijn'] }
      ] },
      { groep: 8, title: 'Blok 4', items: [
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Ongelijknamige breuken delen', ids: ['breuken.delen.ongelijk'] },
        { label: 'Deelsommen kommagetallen', ids: ['bdelen.komma.tienden', 'bdelen.komma.honderdsten', 'bdelen.komma.d10'] },
        { label: 'Omrekenen milligram, gram en kilogram', ids: ['metriek.gewicht.omr1', 'metriek.gewicht.omr2'] },
        { label: 'Breuken, kommagetallen en procenten omzetten', ids: ['relatie.basis.bk', 'relatie.basis.bp', 'relatie.basis.kp', 'relatie.lastig.bk', 'relatie.lastig.bp', 'relatie.lastig.kp'] },
        { label: 'Cijferend vermenigvuldigen als 22 × 65', ids: ['bkeer.cijferen.c4'] },
        { label: 'Cijferend vermenigvuldigen als 6 × 346', ids: ['bkeer.cijferen.c3'] }
      ] },
      { groep: 8, title: 'Blok 5', items: [
        { label: 'Keersommen als 6 × 40', ids: ['keer.nullen.n1', 'bkeer.nullen.n1'] },
        { label: 'Korting berekenen', ids: ['procenten.n2.korting', 'procenten.n3.korting'] },
        { label: 'Nieuw bedrag na korting berekenen', ids: ['procenten.n2.nieuw', 'procenten.n3.nieuw'] },
        { label: 'Lijndiagrammen', ids: ['diagrammen.lijn.g8'] },
        { label: 'Breuken, kommagetallen, procenten en verhoudingen omzetten', ids: ['relatie.basis.mix', 'relatie.lastig.mix'] },
        { label: 'Oppervlakte van rechthoeken', ids: ['metriek.opp.rechthoek'] },
        { label: 'Staafdiagrammen', ids: ['diagrammen.staaf.g8'] },
        { label: 'Cirkeldiagrammen', ids: ['diagrammen.cirkel.g8'] }
      ] },
      { groep: 8, title: 'Blok 6', items: [
        { label: 'Delen door te splitsen 42 : 3', ids: ['bdelen.rest.split1'] },
        { label: 'Breuken, kommagetallen en procenten omzetten', ids: ['relatie.basis.bk', 'relatie.basis.bp', 'relatie.basis.kp', 'relatie.lastig.bk', 'relatie.lastig.bp', 'relatie.lastig.kp'] },
        { label: 'Nieuw bedrag na korting berekenen', ids: ['procenten.n2.nieuw', 'procenten.n3.nieuw'] },
        { label: 'Optellen en aftrekken moeilijke ongelijknamige breuken', ids: ['breuken.optel.moeil'] },
        { label: 'Een deel van een geheel bepalen - 1/4 van 80', ids: ['breuken.anders.van', 'breuken.anders.deel'] },
        { label: 'Vermenigvuldigen breuk × breuk', ids: ['breuken.verm.breukbreuk'] },
        { label: 'Omtrek van samengestelde figuren', ids: ['metriek.omtrek.samen'] },
        { label: 'Oppervlakte uitrekenen van samengestelde figuren en rechthoeken', ids: ['metriek.opp.rechthoek', 'metriek.opp.samen'] },
        { label: 'Cirkeldiagrammen en lijndiagrammen', ids: ['diagrammen.lijn.g8', 'diagrammen.cirkel.g8'] }
      ] },
      { groep: 8, title: 'Blok 7', items: [
        { label: 'Delen door te splitsen 42 : 3', ids: ['bdelen.rest.split1'] },
        { label: 'Miljoenen van kommagetal naar cijfers en andersom', ids: ['getalgroot.miljoen.komma'] },
        { label: 'Miljarden van kommagetal naar cijfers en andersom', ids: ['getalgroot.miljard.komma'] },
        { label: 'Juiste plaats op de getallenlijn tot miljoenen', ids: ['getalgroot.miljoen.lijn', 'getalgroot.t1000000.lijn'] },
        { label: 'Inhoud berekenen met gelijke maateenheden', ids: ['metriek.inhbereken.gelijk'] },
        { label: 'Inhoud berekenen met verschillende maateenheden', ids: ['metriek.inhbereken.versch'] }
      ] },
      { groep: 8, title: 'Blok 8', items: [
        { label: 'Keersommen als 6 × 40', ids: ['keer.nullen.n1', 'bkeer.nullen.n1'] },
        { label: 'Plus- en minsommen kommagetallen', ids: ['bplusmin.komma.honderdsten', 'bplusmin.komma.duizendsten'] },
        { label: 'Keersommen kommagetallen', ids: ['bkeer.komma.verplaats', 'bkeer.komma.split1', 'bkeer.komma.split2'] },
        { label: 'Deelsommen met kommagetallen', ids: ['bdelen.komma.tienden', 'bdelen.komma.honderdsten', 'bdelen.komma.d10'] },
        { label: 'Oppervlakte van samengestelde figuren met driehoeken', ids: ['metriek.opp.samendrie'] },
        { label: 'Staartdeling', ids: ['bdelen.cijferen.c1', 'bdelen.cijferen.c2', 'bdelen.cijferen.c3', 'bdelen.cijferen.c4'] }
      ] }
    ] },
  { id: 'pluspunt', kind: 'methode', title: 'Pluspunt', short: 'Pluspunt', emoji: '➕', color: '#FF8A3D',
    desc: 'Oefen per blok, groep 3 t/m 8',
    note: 'Gebaseerd op de blokindeling van Pluspunt. Werkt jouw school met een andere editie? Kies dan het onderwerp dat je in de klas hebt gehad.',
    sections: [
      { groep: 3, title: 'Blok 1', items: [
        { label: 'Getallenrij invullen tot 20', ids: ['getal100.tot20.rij'] },
        { label: 'Juiste plaats op de getallenlijn tot 20', ids: ['getal100.tot20.lijn'] },
        { label: 'Aflezen van de getallenlijn tot 20', ids: ['getal100.tot20.aflezen'] },
        { label: 'Het juiste aantal plaatjes slepen', ids: ['getal100.tot20.slepen'] },
        { label: 'Plaatjes tellen tot 20', ids: ['getal100.tot20.tellen'] },
        { label: 'Hele uren aflezen', ids: ['klok.uren.ana'] },
        { label: 'Hele uren goedzetten', ids: ['klok.uren.anaset'] }
      ] },
      { groep: 3, title: 'Blok 2', items: [
        { label: 'Getallenrij invullen tot 20', ids: ['getal100.tot20.rij'] },
        { label: 'Plaatjes tellen tot 20', ids: ['getal100.tot20.tellen'] },
        { label: 'Splitsen met plaatjes tot 10', ids: ['getal100.tot10.splitsplaatjes'] },
        { label: 'Splitsen tot 10', ids: ['getal100.tot10.splitsen', 'plusmin.tot10.splitsen', 'plusmin.tot10.split10'] },
        { label: 'Blokken tellen tot 10 blokken', ids: ['meetkunde.tot10.tellen'] }
      ] },
      { groep: 3, title: 'Blok 3', items: [
        { label: 'Handig tellen met groepjes van 5', ids: ['getal100.tot100.vijftallen', 'getal100.tot20.tellen'] },
        { label: 'Getallenrij invullen tot 20', ids: ['getal100.tot20.rij'] },
        { label: 'Getallen van klein naar groot tot 20', ids: ['getal100.tot20.ordenen'] },
        { label: 'Splitsen met plaatjes tot 10', ids: ['getal100.tot10.splitsplaatjes'] },
        { label: 'Splitsen tot 10', ids: ['getal100.tot10.splitsen', 'plusmin.tot10.splitsen', 'plusmin.tot10.split10'] },
        { label: 'Halve uren aflezen', ids: ['klok.half.ana'] },
        { label: 'Halve uren goedzetten', ids: ['klok.half.anaset'] },
        { label: 'Plussommen met plaatjes tot 10', ids: ['bplusmin.tot10.pplus'] },
        { label: 'Minsommen met plaatjes tot 10', ids: ['bplusmin.tot10.pmin'] }
      ] },
      { groep: 3, title: 'Blok 4', items: [
        { label: 'Plussommen met plaatjes tot 10', ids: ['bplusmin.tot10.pplus'] },
        { label: 'Minsommen met plaatjes tot 10', ids: ['bplusmin.tot10.pmin'] },
        { label: 'Plussommen tot 10', ids: ['plusmin.tot10.plus', 'bplusmin.tot10.plus'] },
        { label: 'Minsommen tot 10', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min'] },
        { label: 'Geld betalen tot 10 euro', ids: ['geld.tot10.betalen'] },
        { label: 'Geld tellen tot 10 euro', ids: ['geld.tot10.tellen'] },
        { label: 'Splitsen met hulp van plaatjes tot 10', ids: ['getal100.tot10.splitsplaatjes'] },
        { label: 'Splitsen tot 10', ids: ['getal100.tot10.splitsen', 'plusmin.tot10.splitsen', 'plusmin.tot10.split10'] }
      ] },
      { groep: 3, title: 'Blok 5', items: [
        { label: 'Splitsen tot 10', ids: ['getal100.tot10.splitsen', 'plusmin.tot10.splitsen', 'plusmin.tot10.split10'] },
        { label: 'Getallen van klein naar groot', ids: ['getal100.tot20.ordenen', 'getal100.tot100.ordenen'] },
        { label: 'Getallenrij invullen tot 100', ids: ['getal100.tot100.rij'] },
        { label: 'Splitsen in tientallen en lossen tot 20', ids: ['getal100.tot20.tl'] },
        { label: 'Tijdsduur uren later of vroeger', ids: ['tijd.duurana.uren'] },
        { label: 'Plattegrond kiezen bij bouwsel tot 10 blokken', ids: ['meetkunde.tot10.plat'] }
      ] },
      { groep: 3, title: 'Blok 6', items: [
        { label: 'Splitsen tot 10', ids: ['getal100.tot10.splitsen', 'plusmin.tot10.splitsen', 'plusmin.tot10.split10'] },
        { label: 'Minsommen tot 10', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min'] },
        { label: 'Minsommen met plaatjes tot 10', ids: ['bplusmin.tot10.pmin'] },
        { label: 'Splitsen in tientallen en lossen tot 20', ids: ['getal100.tot20.tl'] },
        { label: 'Plattegrond kiezen bij blokkenbouwsel tot 10 blokken', ids: ['meetkunde.tot10.plat'] },
        { label: 'Blokken tellen tot 10 blokken', ids: ['meetkunde.tot10.tellen'] },
        { label: 'Getallen van klein naar groot tot 100', ids: ['getal100.tot100.ordenen'] },
        { label: 'Getallenrij invullen tot 100', ids: ['getal100.tot100.rij'] }
      ] },
      { groep: 3, title: 'Blok 7', items: [
        { label: 'Splitsen tot 10', ids: ['getal100.tot10.splitsen', 'plusmin.tot10.splitsen', 'plusmin.tot10.split10'] },
        { label: 'Splitsen met hulp van plaatjes tot 10', ids: ['getal100.tot10.splitsplaatjes'] },
        { label: 'Getallenrij invullen tot 100', ids: ['getal100.tot100.rij'] },
        { label: 'Plussommen tot 10', ids: ['plusmin.tot10.plus', 'bplusmin.tot10.plus'] },
        { label: 'Minsommen tot 10', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min'] },
        { label: 'Minsommen met plaatjes tot 10', ids: ['bplusmin.tot10.pmin'] },
        { label: 'Tijdsduur uren later of vroeger', ids: ['tijd.duurana.uren'] }
      ] },
      { groep: 3, title: 'Blok 8 en 9', items: [
        { label: 'Plussommen tot 10', ids: ['plusmin.tot10.plus', 'bplusmin.tot10.plus'] },
        { label: 'Minsommen tot 10', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min'] },
        { label: 'Plussommen tot 20 met hulpsom', ids: ['plusmin.tot20.plusbin', 'bplusmin.tot20.plusbin', 'plusmin.tot20.plusover', 'bplusmin.tot20.plusover'] },
        { label: 'Minsommen tot 20 met hulpsom', ids: ['plusmin.tot20.minbin', 'bplusmin.tot20.minbin', 'plusmin.tot20.minover', 'bplusmin.tot20.minover'] },
        { label: 'Juiste plaats op de getallenlijn tot 100', ids: ['getal100.tot100.lijn'] },
        { label: 'Aflezen van de getallenlijn tot 100', ids: ['getal100.tot100.aflezen'] },
        { label: 'Geld betalen tot 20 euro', ids: ['geld.tot20.betalen'] },
        { label: 'Aanvullen tot 10', ids: ['bplusmin.tot10.aanvul', 'plusmin.tot10.split10'] }
      ] },
      { groep: 4, title: 'Blok 1', items: [
        { label: 'Splitsen in tientallen en lossen tot 100', ids: ['getal100.tot100.tl'] },
        { label: 'Juiste plaats op de getallenlijn tot 100', ids: ['getal100.tot100.lijn'] },
        { label: 'Plussommen tot 10', ids: ['plusmin.tot10.plus', 'bplusmin.tot10.plus'] },
        { label: 'Minsommen tot 10', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min'] },
        { label: 'Plussommen over het tiental met splitsing', ids: ['plusmin.tot20.plusover', 'bplusmin.tot20.plusover'] },
        { label: 'Minsommen over het tiental met splitsing', ids: ['plusmin.tot20.minover', 'bplusmin.tot20.minover'] },
        { label: 'Tijdsduur analoog hele/halve uren later of vroeger', ids: ['tijd.duurana.half', 'tijd.duurana.uren'] }
      ] },
      { groep: 4, title: 'Blok 2', items: [
        { label: 'Plussommen tot 10', ids: ['plusmin.tot10.plus', 'bplusmin.tot10.plus'] },
        { label: 'Minsommen tot 10', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min'] },
        { label: 'Plussommen over het tiental met splitsing', ids: ['plusmin.tot20.plusover', 'bplusmin.tot20.plusover'] },
        { label: 'Minsommen over het tiental met splitsing', ids: ['plusmin.tot20.minover', 'bplusmin.tot20.minover'] },
        { label: 'Splitsen in tientallen en lossen', ids: ['getal100.tot100.tl'] },
        { label: 'Tellen met sprongen van 10', ids: ['getal100.tot100.sprong10'] },
        { label: 'Juiste plaats op de getallenlijn tot 100', ids: ['getal100.tot100.lijn'] },
        { label: 'Aanzicht bepalen tot 10 blokken', ids: ['meetkunde.tot10.aanzicht'] }
      ] },
      { groep: 4, title: 'Blok 3', items: [
        { label: 'Plussommen tot 20 binnen het tiental', ids: ['plusmin.tot20.plusbin', 'bplusmin.tot20.plusbin'] },
        { label: 'Minsommen tot 20 binnen het tiental', ids: ['plusmin.tot20.minbin', 'bplusmin.tot20.minbin'] },
        { label: 'Plussommen over een tiental met splitsing', ids: ['plusmin.tot20.plusover', 'bplusmin.tot20.plusover'] },
        { label: 'Minsommen over een tiental met splitsing', ids: ['plusmin.tot20.minover', 'bplusmin.tot20.minover'] },
        { label: 'Tellen met sprongen van 10', ids: ['getal100.tot100.sprong10'] },
        { label: 'Juiste plaats op de getallenlijn tot 100', ids: ['getal100.tot100.lijn'] },
        { label: 'Aanvullen tot 10', ids: ['bplusmin.tot10.aanvul', 'plusmin.tot10.split10'] },
        { label: 'Geld betalen tot 100 euro', ids: ['geld.tot100.betalen'] },
        { label: 'Kwartieren aflezen analoge klok', ids: ['klok.kwart.ana'] },
        { label: 'Kwartieren goedzetten analoge klok', ids: ['klok.kwart.anaset'] }
      ] },
      { groep: 4, title: 'Blok 4', items: [
        { label: 'Plussommen binnen het tiental tot 20', ids: ['plusmin.tot20.plusbin', 'bplusmin.tot20.plusbin'] },
        { label: 'Minsommen binnen het tiental tot 20', ids: ['plusmin.tot20.minbin', 'bplusmin.tot20.minbin'] },
        { label: 'Geld betalen tot 100 euro', ids: ['geld.tot100.betalen'] },
        { label: 'Tientallen eraf en erbij', ids: ['plusmin.tot100.tienplus', 'plusmin.tot100.tienmin', 'bplusmin.tot100.tien'] }
      ] },
      { groep: 4, title: 'Blok 5', items: [
        { label: 'Plussommen tot 100 binnen tiental', ids: ['plusmin.tot100.plusbin', 'bplusmin.tot100.plusbin'] },
        { label: 'Minsommen tot 100 binnen tiental', ids: ['plusmin.tot100.minbin', 'bplusmin.tot100.minbin'] },
        { label: 'Minsommen tot 100 over het tiental met splitsing', ids: ['plusmin.tot100.minover', 'bplusmin.tot100.minover'] },
        { label: 'Analoog en digitaal kwartieren aflezen', ids: ['klok.kwart.ana', 'klok.kwart.dig'] },
        { label: 'Analoog en digitaal kwartieren goedzetten', ids: ['klok.kwart.anaset', 'klok.kwart.digset'] },
        { label: 'Analoge en digitale tijd omzetten', ids: ['klok.kwart.omzet'] }
      ] },
      { groep: 4, title: 'Blok 6', items: [
        { label: 'Plus- en minsommen tot 100 (38 + 29)', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'bplusmin.tot100.eenover'] },
        { label: 'Tafels van 2, 5 en 10', ids: ['keer.tafels10.t2', 'keer.tafels10.t5', 'keer.tafels10.t10'] },
        { label: 'Digitaal en analoog kwartieren omzetten', ids: ['klok.kwart.omzet'] },
        { label: 'Digitale tijd hele uren aflezen', ids: ['klok.uren.dig'] },
        { label: 'Digitale tijd halve uren aflezen', ids: ['klok.half.dig'] },
        { label: 'Digitale tijd kwartieren aflezen', ids: ['klok.kwart.dig'] },
        { label: 'Plattegrond kiezen bij blokkenbouwsel', ids: ['meetkunde.tot10.plat'] }
      ] },
      { groep: 4, title: 'Blok 7', items: [
        { label: 'Plus en min, eenheden over tiental tot 100', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'bplusmin.tot100.eenover'] },
        { label: 'Tientallen eraf en erbij tot 100', ids: ['plusmin.tot100.tienplus', 'plusmin.tot100.tienmin', 'bplusmin.tot100.tien'] },
        { label: 'Digitale tijd aflezen tot kwartieren', ids: ['klok.kwart.dig'] },
        { label: 'Tafels 1 tot 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'De kalender begrijpen', ids: ['tijd.kalender.begrip'] },
        { label: 'Welke dag is het?', ids: ['tijd.kalender.dag'] }
      ] },
      { groep: 4, title: 'Blok 8 en 9', items: [
        { label: 'Tientallen eraf en erbij tot 100', ids: ['plusmin.tot100.tienplus', 'plusmin.tot100.tienmin', 'bplusmin.tot100.tien'] },
        { label: 'Plus en min, eenheden binnen tiental tot 100', ids: ['plusmin.tot100.pluseen', 'plusmin.tot100.mineen', 'bplusmin.tot100.een'] },
        { label: 'Plus en min, eenheden over tiental tot 100', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'bplusmin.tot100.eenover'] },
        { label: 'Welke dag is het?', ids: ['tijd.kalender.dag'] },
        { label: 'Geld tellen en betalen tot 1 euro', ids: ['geld.tot1.tellen', 'geld.tot1.betalen'] },
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] }
      ] },
      { groep: 5, title: 'Blok 1', items: [
        { label: 'Plus en min, eenheden binnen tiental tot 100', ids: ['plusmin.tot100.pluseen', 'plusmin.tot100.mineen', 'bplusmin.tot100.een'] },
        { label: 'Positiewaarden tot 1000', ids: ['getalgroot.t1000.positie'] },
        { label: 'Getallen van klein naar groot tot 1000', ids: ['getalgroot.t1000.ordenen'] },
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Digitale tijd hele/halve uren en kwartieren aflezen', ids: ['klok.kwart.dig', 'klok.half.dig'] },
        { label: 'Analoge en digitale tijd omzetten', ids: ['klok.min5.omzet'] }
      ] },
      { groep: 5, title: 'Blok 2', items: [
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Juiste plaats op de getallenlijn tot 1000', ids: ['getalgroot.t1000.lijn'] },
        { label: 'Keersommen als 6 × 40 met hulpsom', ids: ['keer.nullen.n1', 'bkeer.nullen.n1'] },
        { label: 'Aanzicht bepalen van blokkenbouwsel', ids: ['meetkunde.tot10.aanzicht', 'meetkunde.tot25.aanzicht'] },
        { label: 'Deeltafels 1 t/m 10 met hulpsom', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Begrip gram/kilogram', ids: ['metriek.gewicht.begrip'] }
      ] },
      { groep: 5, title: 'Blok 3', items: [
        { label: 'Keersommen als 6 × 40', ids: ['keer.nullen.n1', 'bkeer.nullen.n1'] },
        { label: 'Sommen als 350 + 580 / 810 − 350', ids: ['bplusmin.tot1000.htop', 'bplusmin.tot1000.htom'] },
        { label: 'Sommen als 5 × 19 met splitsing', ids: ['bkeer.splitsen.s1'] },
        { label: 'Deeltafels 1 t/m 10 met hulpsom', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Analoge klok aflezen tot 5 minuten', ids: ['klok.min5.ana'] },
        { label: 'Digitale klok aflezen tot 5 minuten', ids: ['klok.min5.dig'] },
        { label: 'Analoge klok goedzetten tot 5 minuten', ids: ['klok.min5.anaset'] }
      ] },
      { groep: 5, title: 'Blok 4', items: [
        { label: 'Plus over het tiental tot 100: 68 + 7', ids: ['plusmin.tot100.plusover', 'bplusmin.tot100.plusover'] },
        { label: 'Min over het tiental tot 100: 32 − 9', ids: ['plusmin.tot100.minover', 'bplusmin.tot100.minover'] },
        { label: 'Sommen als 350 + 580 / 810 − 350', ids: ['bplusmin.tot1000.htop', 'bplusmin.tot1000.htom'] },
        { label: 'Splitssommen 6 × 76 met hulpsom', ids: ['bkeer.splitsen.s2'] },
        { label: 'Geld tellen en betalen tot 100 euro', ids: ['geld.tot100.tellen', 'geld.tot100.betalen'] },
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Delen met rest met hulpsom', ids: ['bdelen.rest.rest'] }
      ] },
      { groep: 5, title: 'Blok 5', items: [
        { label: 'Splitssommen 5 × 19', ids: ['bkeer.splitsen.s1'] },
        { label: 'Splitssommen 6 × 76', ids: ['bkeer.splitsen.s2'] },
        { label: 'Sommen als 152 + 230 / 763 − 340', ids: ['bplusmin.tot1000.htep', 'bplusmin.tot1000.htem'] },
        { label: 'Deeltafels 1 t/m 10 met hulpsom', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Analoge klok tot 5 minuten', ids: ['klok.min5.ana', 'klok.min5.anaset'] },
        { label: 'Digitale klok tot 5 minuten', ids: ['klok.min5.dig', 'klok.min5.digset'] }
      ] },
      { groep: 5, title: 'Blok 6', items: [
        { label: 'Minsommen tot 100 over het tiental: 32 − 9', ids: ['plusmin.tot100.minover', 'bplusmin.tot100.minover'] },
        { label: 'Sommen als 152 + 230 / 763 − 340', ids: ['bplusmin.tot1000.htep', 'bplusmin.tot1000.htem'] },
        { label: 'Splitssommen 6 × 76 met splitsing', ids: ['bkeer.splitsen.s2'] },
        { label: 'Delen met rest met hulpsom', ids: ['bdelen.rest.rest'] }
      ] },
      { groep: 5, title: 'Blok 7', items: [
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Delen met rest met hulpsom', ids: ['bdelen.rest.rest'] },
        { label: 'De kalender begrijpen', ids: ['tijd.kalender.begrip'] },
        { label: 'Welke dag is het?', ids: ['tijd.kalender.dag'] },
        { label: 'Plus- en minsommen tot 1000', ids: ['bplusmin.tot1000.alle', 'plusmin.tot1000.htbin', 'plusmin.tot1000.htover'] }
      ] },
      { groep: 5, title: 'Blok 8 en 9', items: [
        { label: 'Plus- en minsommen tot 1000', ids: ['bplusmin.tot1000.alle', 'plusmin.tot1000.htbin', 'plusmin.tot1000.htover'] },
        { label: 'Begrip mm, cm, dm en m', ids: ['metriek.lengte.begrip'] },
        { label: 'Omrekenen mm, cm, dm en m', ids: ['metriek.lengte.omr1'] },
        { label: 'Splitssommen 6 × 76 met hulpsom', ids: ['bkeer.splitsen.s2'] },
        { label: 'Sommen als 560 : 8 met hulpsom', ids: ['delen.nullen.n1', 'bdelen.nullen.n1'] },
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Geld tellen en betalen tot 100 euro', ids: ['geld.tot100.tellen', 'geld.tot100.betalen'] }
      ] },
      { groep: 6, title: 'Blok 1', items: [
        { label: 'Keersommen als 60 × 40 en 6 × 400', ids: ['keer.nullen.n3', 'bkeer.nullen.n2', 'keer.nullen.n2'] },
        { label: 'Positiewaarden tot 10.000', ids: ['getalgroot.t10000.positie'] },
        { label: 'Getal naar woord en andersom tot 10.000', ids: ['getalgroot.t10000.woord'] },
        { label: 'Sommen als 600 + 5000 + 3 + 30', ids: ['bplusmin.groot.pos4'] },
        { label: 'Sommen tot 10.000 met honderdtallen (5400 − 1800 / 4500 + 1300)', ids: ['bplusmin.groot.h10k'] },
        { label: 'Deelsommen met hulpsom (560 : 80 / 5600 : 8)', ids: ['delen.nullen.n2', 'bdelen.nullen.n1', 'delen.nullen.n3', 'bdelen.nullen.n2'] },
        { label: 'Breuken: welk deel is gekleurd?', ids: ['breuken.begrip.welk'] },
        { label: 'Breuken: kleur het juiste deel', ids: ['breuken.begrip.kleur'] },
        { label: 'Analoge klok aflezen en goedzetten tot één minuut', ids: ['klok.min1.anaset', 'klok.min1.ana'] },
        { label: 'Digitale klok aflezen en goedzetten tot één minuut', ids: ['klok.min1.digset', 'klok.min1.dig'] }
      ] },
      { groep: 6, title: 'Blok 2', items: [
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Tellen met sprongen van 1, 10, 100 en 1000', ids: ['getalgroot.t10000.sprongen'] },
        { label: 'Juiste plaats op de getallenlijn tot 10.000', ids: ['getalgroot.t10000.lijn'] },
        { label: 'Getallen van klein naar groot tot 10.000', ids: ['getalgroot.t10000.ordenen'] },
        { label: 'Positiewaarden tot 10.000', ids: ['getalgroot.t10000.positie'] },
        { label: 'Breuken: welk deel is gekleurd?', ids: ['breuken.begrip.welk'] },
        { label: 'Breuken: kleur het juiste deel', ids: ['breuken.begrip.kleur'] },
        { label: 'Lengte berekenen met schaal van cm en m', ids: ['schaal.lengte.gelijk', 'schaal.lengte.cmm'] },
        { label: 'Begrip ml, cl, dl en l met plaatjes', ids: ['metriek.inhoud.begrip'] },
        { label: 'Begrip gram/kilogram met plaatjes', ids: ['metriek.gewicht.begrip'] }
      ] },
      { groep: 6, title: 'Blok 3', items: [
        { label: 'Afronden op tien-, honderd- en duizendtallen tot 100.000', ids: ['getalgroot.t100000.afronden'] },
        { label: 'Delen door te splitsen 234 : 6 met splitsing', ids: ['bdelen.rest.split2'] },
        { label: 'Tijdsduur tot 5 minuten', ids: ['tijd.duurana.min5', 'tijd.duurdig.min5'] },
        { label: 'Breuken aanvullen tot een hele', ids: ['breuken.anders.aanvul'] },
        { label: 'Breuken: welk deel is gekleurd?', ids: ['breuken.begrip.welk'] },
        { label: 'Breuken: kleur het juiste deel', ids: ['breuken.begrip.kleur'] }
      ] },
      { groep: 6, title: 'Blok 4', items: [
        { label: 'Sommen als 6 × 42', ids: ['bkeer.splitsen.s1'] },
        { label: 'Breuken op de getallenlijn plaatsen tot 1', ids: ['breuken.begrip.lijn'] },
        { label: 'Breuken op de getallenlijn plaatsen boven 1', ids: ['breuken.begrip.lijn'] },
        { label: 'Kleur het juiste deel', ids: ['breuken.begrip.kleur'] },
        { label: 'Begrip ml, cl, dl en l met plaatjes', ids: ['metriek.inhoud.begrip'] },
        { label: 'Begrip gram/kilogram met plaatjes', ids: ['metriek.gewicht.begrip'] },
        { label: 'Omrekenen ml, cl, dl en l', ids: ['metriek.inhoud.omr1'] },
        { label: 'Cijferend optellen tot 1000 zonder overschrijdingen', ids: ['bplusmin.cijferen.pzonder'] },
        { label: 'Cijferend optellen tot 1000 met overschrijdingen', ids: ['bplusmin.cijferen.pmet'] }
      ] },
      { groep: 6, title: 'Blok 5', items: [
        { label: 'Deelsommen als 560 : 8', ids: ['delen.nullen.n1', 'bdelen.nullen.n1'] },
        { label: 'Breuken: kleur het juiste deel', ids: ['breuken.begrip.kleur'] },
        { label: 'Analoog en digitaal omzetten tot 1 minuut', ids: ['klok.min1.omzet'] },
        { label: 'Lengte berekenen met schaal van cm en m', ids: ['schaal.lengte.gelijk', 'schaal.lengte.cmm'] },
        { label: 'Minsommen zoals 463 − 248', ids: ['bplusmin.cijferen.mmet', 'bplusmin.tot1000.alle'] }
      ] },
      { groep: 6, title: 'Blok 6', items: [
        { label: 'Sommen tot 100 over het tiental (38 + 29)', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover'] },
        { label: 'Tellen met sprongen van 1, 10, 100, 1000 en 10.000', ids: ['getalgroot.t100000.sprongen'] },
        { label: 'Juiste plaats op de getallenlijn tot 100.000', ids: ['getalgroot.t100000.lijn'] },
        { label: 'Van woord naar getal en andersom tot 100.000', ids: ['getalgroot.t100000.woord'] },
        { label: 'Delen door te splitsen 234 : 6', ids: ['bdelen.rest.split2'] },
        { label: 'Getallenrij invullen - kommagetallen', ids: ['komma.tienden.rij', 'komma.honderdsten.rij'] },
        { label: 'Schrijf als kommagetal: tienden, honderdsten en duizendsten', ids: ['komma.tienden.omschrijving', 'komma.honderdsten.omschrijving', 'komma.duizendsten.omschrijving'] },
        { label: 'Omrekenen mm, cm, dm en m', ids: ['metriek.lengte.omr1'] },
        { label: 'Omtrek van rechthoeken en samengestelde figuren', ids: ['metriek.omtrek.rechthoek', 'metriek.omtrek.samen'] },
        { label: 'Minsommen zoals 463 − 248', ids: ['bplusmin.cijferen.mmet', 'bplusmin.tot1000.alle'] }
      ] },
      { groep: 6, title: 'Blok 7', items: [
        { label: 'Breuken: deel van geheel bepalen: 1/4 van 80', ids: ['breuken.anders.van', 'breuken.anders.deel'] },
        { label: 'Breuken: welk deel is gekleurd?', ids: ['breuken.begrip.welk'] },
        { label: 'Cijferend aftrekken tot 1000 met overschrijdingen', ids: ['bplusmin.cijferen.mmet'] },
        { label: 'Cijferend aftrekken tot 10.000', ids: ['bplusmin.cijferen.m10k'] }
      ] },
      { groep: 6, title: 'Blok 8 en 9', items: [
        { label: 'Kommagetallen op de getallenlijn plaatsen', ids: ['komma.tienden.lijn', 'komma.honderdsten.lijn'] },
        { label: 'Getallenrij invullen kommagetallen', ids: ['komma.tienden.rij', 'komma.honderdsten.rij'] },
        { label: 'Deelsommen als 5600 : 800 met hulpsom', ids: ['delen.nullen.n5', 'bdelen.nullen.n2'] },
        { label: 'Keersommen als 700 × 50 met hulpsom', ids: ['keer.nullen.n4', 'bkeer.nullen.n3'] },
        { label: 'Delen door te splitsen met splitsing: 234 : 6', ids: ['bdelen.rest.split2'] },
        { label: 'Oppervlakte van samengestelde figuren, rechthoeken en driehoeken', ids: ['metriek.opp.rechthoek', 'metriek.opp.driehoek', 'metriek.opp.samen'] },
        { label: 'Omtrek van samengestelde figuren en rechthoeken', ids: ['metriek.omtrek.rechthoek', 'metriek.omtrek.samen'] },
        { label: 'Omrekenen ml, cl, dl en l', ids: ['metriek.inhoud.omr1'] },
        { label: 'Breuken: totaal berekenen op basis van een deel', ids: ['breuken.anders.totaal'] },
        { label: 'Breuken: deel van geheel bepalen: 1/4 van 80', ids: ['breuken.anders.van', 'breuken.anders.deel'] }
      ] },
      { groep: 7, title: 'Blok 1', items: [
        { label: 'Breuken van klein naar groot zetten', ids: ['breuken.begrip.orde'] },
        { label: 'Helen uit de breuk halen', ids: ['breuken.vereenv.helen'] },
        { label: 'Sommen als 5400 − 1800 en 4500 + 1300', ids: ['bplusmin.groot.h10k'] },
        { label: 'Sommen tot 1 miljoen (154.600 + 58.000 / 890.000 − 122.500)', ids: ['bplusmin.groot.h1m'] },
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Positiewaarden tot miljoenen', ids: ['getalgroot.t1000000.positie'] },
        { label: 'Tot 1 miljoen op de getallenlijn en getallen op volgorde zetten', ids: ['getalgroot.t1000000.lijn', 'getalgroot.t1000000.ordenen'] },
        { label: 'Van woord naar getal en andersom tot miljoenen', ids: ['getalgroot.t1000000.woord'] },
        { label: 'Tijdsduur digitaal', ids: ['tijd.duurdig.min5', 'tijd.duurdig.min1'] },
        { label: 'Deel- en keersommen als 500 × 1200 en 18.000 : 300', ids: ['delen.nullen.n5', 'bdelen.nullen.n3', 'keer.nullen.n5', 'bkeer.nullen.groot'] }
      ] },
      { groep: 7, title: 'Blok 2', items: [
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Kommagetallen optellen en aftrekken', ids: ['bplusmin.komma.tienden', 'bplusmin.komma.honderdsten'] },
        { label: 'Lengte berekenen met schaal', ids: ['schaal.lengte.gelijk', 'schaal.lengte.cmm', 'schaal.lengte.km'] },
        { label: 'Schaal berekenen', ids: ['schaal.bereken.gelijk', 'schaal.bereken.cmdm', 'schaal.bereken.km'] }
      ] },
      { groep: 7, title: 'Blok 3', items: [
        { label: 'Kommagetallen optellen en aftrekken', ids: ['bplusmin.komma.tienden', 'bplusmin.komma.honderdsten'] },
        { label: 'Juiste plaats op de getallenlijn met miljoenen', ids: ['getalgroot.miljoen.lijn', 'getalgroot.t1000000.lijn'] },
        { label: 'Getallen van klein naar groot tot miljoenen', ids: ['getalgroot.t1000000.ordenen'] },
        { label: 'Positiewaarden tot miljoenen', ids: ['getalgroot.t1000000.positie'] },
        { label: 'Optellen en aftrekken van gelijknamige breuken', ids: ['breuken.optel.gelijk'] },
        { label: 'Optellen en aftrekken van eenvoudige ongelijknamige breuken', ids: ['breuken.optel.eenv'] },
        { label: 'Lengtematen omrekenen', ids: ['metriek.lengte.omr1', 'metriek.lengte.omr2'] }
      ] },
      { groep: 7, title: 'Blok 4', items: [
        { label: 'Percentage van strook kleuren', ids: ['procenten.n1.strook', 'procenten.n2.strook'] },
        { label: 'Percentage van aantal berekenen', ids: ['procenten.n1.van', 'procenten.n2.van'] },
        { label: 'Breuken en kommagetallen omzetten', ids: ['relatie.basis.bk'] },
        { label: 'Breuken en procenten omzetten', ids: ['relatie.basis.bp'] },
        { label: 'Snelheid omrekenen naar km/u', ids: ['tijd.snelheid.kmu'] },
        { label: 'Snelheid omrekenen van km/u naar tijdsduur', ids: ['tijd.snelheid.duur'] }
      ] },
      { groep: 7, title: 'Blok 5', items: [
        { label: 'Verhoudingstabellen', ids: ['vtabel.heel.onder', 'vtabel.heel.beide', 'vtabel.heel.tabel', 'vtabel.komma.beide'] },
        { label: 'Percentage van aantal berekenen', ids: ['procenten.n1.van', 'procenten.n2.van'] },
        { label: 'Breuken, kommagetallen, procenten en verhoudingen omzetten', ids: ['relatie.basis.mix'] },
        { label: 'Cirkeldiagrammen groep 7', ids: ['diagrammen.cirkel.g7'] },
        { label: 'Oppervlakte van rechthoeken', ids: ['metriek.opp.rechthoek'] },
        { label: 'Oppervlakte van driehoeken', ids: ['metriek.opp.driehoek'] },
        { label: 'Oppervlakte van samengestelde figuren', ids: ['metriek.opp.samen'] }
      ] },
      { groep: 7, title: 'Blok 6', items: [
        { label: 'Afronden tot 1 miljoen', ids: ['getalgroot.t1000000.afronden'] },
        { label: 'Miljoenen van kommagetal naar cijfers en andersom', ids: ['getalgroot.miljoen.komma'] },
        { label: 'Miljarden van kommagetal naar cijfers en andersom', ids: ['getalgroot.miljard.komma'] },
        { label: 'Vermenigvuldigen met breuken: heel getal × breuk', ids: ['breuken.verm.heelbreuk'] },
        { label: 'Vermenigvuldigen met breuken: heel getal × heel getal + breuk', ids: ['breuken.verm.heelgem'] },
        { label: 'Percentage deel van totaal berekenen', ids: ['procenten.n1.deel', 'procenten.n2.deel'] },
        { label: 'Breuken, kommagetallen, procenten en verhoudingen omzetten', ids: ['relatie.basis.mix'] },
        { label: 'Staafdiagrammen groep 7', ids: ['diagrammen.staaf.g7'] },
        { label: 'Cirkeldiagrammen groep 7', ids: ['diagrammen.cirkel.g7'] },
        { label: 'Aanzicht bepalen', ids: ['meetkunde.tot25.aanzicht'] } // herhaling: deze oefening hoort in de app bij een lagere groep
      ] },
      { groep: 7, title: 'Blok 7', items: [
        { label: 'Keersommen kommagetallen, de komma verplaatsen', ids: ['bkeer.komma.verplaats'] },
        { label: 'Deelsommen kommagetallen, de komma verplaatsen', ids: ['bdelen.komma.d10'] },
        { label: 'Inhoud berekenen', ids: ['metriek.inhbereken.gelijk', 'metriek.inhbereken.versch', 'metriek.inhbereken.liter'] },
        { label: 'Inhoud berekenen in liters', ids: ['metriek.inhbereken.liter'] },
        { label: 'Verhoudingstabellen', ids: ['vtabel.heel.onder', 'vtabel.heel.beide', 'vtabel.heel.tabel', 'vtabel.komma.beide'] }
      ] },
      { groep: 7, title: 'Blok 8 en 9', items: [
        { label: 'Korting berekenen met een percentage', ids: ['procenten.n1.korting', 'procenten.n2.korting'] },
        { label: 'Omrekenen milligram, gram en kilogram', ids: ['metriek.gewicht.omr1', 'metriek.gewicht.omr2'] },
        { label: 'Keersommen breuken: heel getal × breuk', ids: ['breuken.verm.heelbreuk'] },
        { label: 'Keersommen breuken: heel getal × heel getal + breuk', ids: ['breuken.verm.heelgem'] },
        { label: 'Keersommen met kommagetallen: 8 × 4,1 en 8 × 4,35', ids: ['bkeer.komma.split1', 'bkeer.komma.split2'] },
        { label: 'Deelsommen met kommagetallen: 55,8 : 9 en 32,48 : 8', ids: ['bdelen.komma.tienden', 'bdelen.komma.honderdsten'] },
        { label: 'Plattegrond kiezen bij bouwsel', ids: ['meetkunde.tot25.plat'] } // herhaling: deze oefening hoort in de app bij een lagere groep
      ] },
      { groep: 8, title: 'Blok 1', items: [
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Korting berekenen', ids: ['procenten.n2.korting', 'procenten.n3.korting'] },
        { label: 'Procenten: geheel op basis van deel berekenen', ids: ['procenten.n2.geheel', 'procenten.n3.geheel'] },
        { label: 'Percentage van aantal berekenen', ids: ['procenten.n2.van', 'procenten.n3.van'] },
        { label: 'Oude prijs berekenen (op basis van nieuwe prijs en korting)', ids: ['procenten.n2.oud', 'procenten.n3.oud'] },
        { label: 'Tijdsduur berekenen', ids: ['tijd.duurana.min5', 'tijd.duurana.min1', 'tijd.duurdig.min5', 'tijd.duurdig.min1'] }
      ] },
      { groep: 8, title: 'Blok 2', items: [
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Miljoenen van kommagetal naar cijfers en andersom', ids: ['getalgroot.miljoen.komma'] },
        { label: 'Miljarden van kommagetal naar cijfers en andersom', ids: ['getalgroot.miljard.komma'] },
        { label: 'Afronden op tien-, honderd- en duizendtallen', ids: ['getalgroot.t1000000.afronden', 'getalgroot.t100000.afronden'] },
        { label: 'Plus- en min eenvoudige ongelijknamige breuken', ids: ['breuken.optel.eenv'] },
        { label: 'Plus- en min moeilijke ongelijknamige breuken', ids: ['breuken.optel.moeil'] },
        { label: 'Breuken, kommagetallen, procenten en verhoudingen omzetten', ids: ['relatie.basis.mix', 'relatie.lastig.mix'] },
        { label: 'Lengte berekenen op schaal', ids: ['schaal.lengte.gelijk', 'schaal.lengte.cmm', 'schaal.lengte.km'] },
        { label: 'Schaal berekenen', ids: ['schaal.bereken.gelijk', 'schaal.bereken.cmdm', 'schaal.bereken.km'] },
        { label: 'Verhoudingstabellen', ids: ['vtabel.heel.onder', 'vtabel.heel.beide', 'vtabel.heel.tabel', 'vtabel.komma.beide'] }
      ] },
      { groep: 8, title: 'Blok 3', items: [
        { label: 'Delen met rest', ids: ['bdelen.rest.rest'] },
        { label: 'Keersommen breuken: breuk × breuk', ids: ['breuken.verm.breukbreuk'] },
        { label: 'Procenten: geheel op basis van deel berekenen', ids: ['procenten.n2.geheel', 'procenten.n3.geheel'] },
        { label: 'Procenten: oude prijs berekenen (op basis van nieuwe prijs en korting)', ids: ['procenten.n2.oud', 'procenten.n3.oud'] },
        { label: 'Procenten: nieuw bedrag na korting berekenen', ids: ['procenten.n2.nieuw', 'procenten.n3.nieuw'] },
        { label: 'Omrekenen milligram, gram en kilogram', ids: ['metriek.gewicht.omr1', 'metriek.gewicht.omr2'] },
        { label: 'Verhoudingstabellen met kommagetallen', ids: ['vtabel.komma.beide', 'vtabel.komma.tabel'] },
        { label: 'Tijd omrekenen naar km/u', ids: ['tijd.snelheid.kmu'] }
      ] },
      { groep: 8, title: 'Blok 4', items: [
        { label: 'Plus- en minsommen tot 100', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'plusmin.tot100.tienplus', 'plusmin.tot100.tienmin'] }, // herhaling: deze oefening hoort in de app bij een lagere groep
        { label: 'Ongelijknamige breuken delen', ids: ['breuken.delen.ongelijk'] },
        { label: 'Procenten: korting berekenen', ids: ['procenten.n2.korting', 'procenten.n3.korting'] },
        { label: 'Verhoudingstabellen kommagetallen', ids: ['vtabel.komma.beide', 'vtabel.komma.tabel'] },
        { label: 'Oppervlakte berekenen van rechthoeken', ids: ['metriek.opp.rechthoek'] }
      ] },
      { groep: 8, title: 'Blok 5', items: [
        { label: 'Plus- en minsommen tot 100', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'plusmin.tot100.tienplus', 'plusmin.tot100.tienmin'] }, // herhaling: deze oefening hoort in de app bij een lagere groep
        { label: 'Deelsommen kommagetallen', ids: ['bdelen.komma.tienden', 'bdelen.komma.honderdsten', 'bdelen.komma.d10'] },
        { label: 'Procenten: nieuw bedrag na korting berekenen', ids: ['procenten.n2.nieuw', 'procenten.n3.nieuw'] },
        { label: 'Procenten: oude prijs berekenen (op basis van nieuwe prijs en korting)', ids: ['procenten.n2.oud', 'procenten.n3.oud'] },
        { label: 'Staafdiagrammen', ids: ['diagrammen.staaf.g8'] },
        { label: 'Cirkeldiagrammen', ids: ['diagrammen.cirkel.g8'] },
        { label: 'Lijndiagrammen', ids: ['diagrammen.lijn.g8'] }
      ] },
      { groep: 8, title: 'Blok 6', items: [
        { label: 'Keersommen als 6 × 40', ids: ['keer.nullen.n1', 'bkeer.nullen.n1'] },
        { label: 'Schaal berekenen', ids: ['schaal.bereken.gelijk', 'schaal.bereken.cmdm', 'schaal.bereken.km'] },
        { label: 'Lengte berekenen met schaal', ids: ['schaal.lengte.gelijk', 'schaal.lengte.cmm', 'schaal.lengte.km'] },
        { label: 'Oppervlakte van samengestelde figuren en rechthoeken', ids: ['metriek.opp.rechthoek', 'metriek.opp.samen'] },
        { label: 'Omtrek van samengestelde figuren', ids: ['metriek.omtrek.samen'] },
        { label: 'Inhoud berekenen met gelijke maateenheden', ids: ['metriek.inhbereken.gelijk'] },
        { label: 'Inhoud berekenen met verschillende maateenheden', ids: ['metriek.inhbereken.versch'] },
        { label: 'Inhoud berekenen in liters', ids: ['metriek.inhbereken.liter'] },
        { label: 'Omrekenen mm³, cm³, dm³, m³, ml, cl, dl, l', ids: ['metriek.inhoud.alles', 'metriek.inhoud.kubl'] }
      ] },
      { groep: 8, title: 'Blok 7', items: [
        { label: 'Breuken, kommagetallen en procenten omzetten', ids: ['relatie.basis.bk', 'relatie.basis.bp', 'relatie.basis.kp', 'relatie.lastig.bk', 'relatie.lastig.bp', 'relatie.lastig.kp'] },
        { label: 'Ongelijknamige breuken optellen en aftrekken', ids: ['breuken.optel.eenv', 'breuken.optel.moeil'] },
        { label: 'Breuken vermenigvuldigen', ids: ['breuken.verm.heelbreuk', 'breuken.verm.heelgem', 'breuken.verm.breukbreuk'] },
        { label: 'Een deel van een geheel bepalen: 1/4 van 80', ids: ['breuken.anders.van', 'breuken.anders.deel'] },
        { label: 'Procenten: nieuw bedrag na korting berekenen', ids: ['procenten.n2.nieuw', 'procenten.n3.nieuw'] },
        { label: 'Procenten: oude prijs berekenen (op basis van nieuwe prijs en korting)', ids: ['procenten.n2.oud', 'procenten.n3.oud'] },
        { label: 'Cirkeldiagrammen', ids: ['diagrammen.cirkel.g8'] }
      ] },
      { groep: 8, title: 'Blok 8 en 9', items: [
        { label: 'Miljoenen: van kommagetal naar cijfers en andersom', ids: ['getalgroot.miljoen.komma'] },
        { label: 'Miljarden: van kommagetal naar cijfers en andersom', ids: ['getalgroot.miljard.komma'] },
        { label: 'Miljoenen: juiste plaats op de getallenlijn', ids: ['getalgroot.miljoen.lijn', 'getalgroot.t1000000.lijn'] },
        { label: 'Deelsommen met kommagetallen', ids: ['bdelen.komma.tienden', 'bdelen.komma.honderdsten', 'bdelen.komma.d10'] }
      ] }
    ] },
  { id: 'gr', kind: 'methode', title: 'Getal & Ruimte Junior', short: 'G&R Junior', emoji: '📐', color: '#2BB673',
    desc: 'Oefen per blok, groep 3 t/m 8',
    note: 'Gebaseerd op de blokindeling van Getal & Ruimte Junior. Werkt jouw school met een andere editie? Kies dan het onderwerp dat je in de klas hebt gehad.',
    sections: [
      { groep: 3, title: 'Blok 1', items: [
        { label: 'Getallenrij invullen tot 10', ids: ['getal100.tot10.rij'] },
        { label: 'Juiste plaats op de getallenlijn', ids: ['getal100.tot10.lijn', 'getal100.tot20.lijn'] },
        { label: 'Plaatjes tellen tot 10', ids: ['getal100.tot10.tellen'] },
        { label: 'Splitsen met plaatjes tot 10', ids: ['getal100.tot10.splitsplaatjes'] },
        { label: 'Getallen van minder naar meer', ids: ['getal100.tot10.ordenen'] },
        { label: 'Plussommen met plaatjes', ids: ['bplusmin.tot6.pplus', 'bplusmin.tot10.pplus'] },
        { label: 'Minsommen met plaatjes', ids: ['bplusmin.tot6.pmin', 'bplusmin.tot10.pmin'] },
        { label: 'Plussommen tot 10', ids: ['plusmin.tot10.plus', 'bplusmin.tot10.plus'] },
        { label: 'Minsommen tot 10', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min'] }
      ] },
      { groep: 3, title: 'Blok 2', items: [
        { label: 'Juiste plaats op de getallenlijn', ids: ['getal100.tot10.lijn', 'getal100.tot20.lijn'] },
        { label: 'Splitsen met plaatjes tot 10', ids: ['getal100.tot10.splitsplaatjes'] },
        { label: 'Splitsen tot 10', ids: ['getal100.tot10.splitsen', 'plusmin.tot10.splitsen', 'plusmin.tot10.split10'] },
        { label: 'Plussommen tot 10', ids: ['plusmin.tot10.plus', 'bplusmin.tot10.plus'] },
        { label: 'Plussommen met plaatjes', ids: ['bplusmin.tot6.pplus', 'bplusmin.tot10.pplus'] },
        { label: 'Minsommen met plaatjes', ids: ['bplusmin.tot6.pmin', 'bplusmin.tot10.pmin'] }
      ] },
      { groep: 3, title: 'Blok 3', items: [
        { label: 'Juiste plaats op de getallenlijn tot 20', ids: ['getal100.tot20.lijn'] },
        { label: 'Getallenrij invullen tot 20', ids: ['getal100.tot20.rij'] },
        { label: 'Getallen tot 20 van klein naar groot', ids: ['getal100.tot20.ordenen'] },
        { label: 'Splitsen tot 10', ids: ['getal100.tot10.splitsen', 'plusmin.tot10.splitsen', 'plusmin.tot10.split10'] },
        { label: 'Minsommen tot 10', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min'] },
        { label: 'Aanvullen tot 10', ids: ['bplusmin.tot10.aanvul', 'plusmin.tot10.split10'] },
        { label: 'Hele uren aflezen - analoog en digitaal', ids: ['klok.uren.ana', 'klok.uren.dig'] },
        { label: 'Hele uren goedzetten - analoog en digitaal', ids: ['klok.uren.anaset', 'klok.uren.digset'] }
      ] },
      { groep: 3, title: 'Blok 4', items: [
        { label: 'Getallenrij invullen tot 20', ids: ['getal100.tot20.rij'] },
        { label: 'Getallen tot 20 van klein naar groot', ids: ['getal100.tot20.ordenen'] },
        { label: 'Plussommen tot 20 binnen het tiental', ids: ['plusmin.tot20.plusbin', 'bplusmin.tot20.plusbin'] },
        { label: 'Plussommen tot 10', ids: ['plusmin.tot10.plus', 'bplusmin.tot10.plus'] },
        { label: 'Minsommen tot 10', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min'] },
        { label: 'Plussommen met plaatjes tot 10', ids: ['bplusmin.tot10.pplus'] },
        { label: 'Aanvullen tot 10', ids: ['bplusmin.tot10.aanvul', 'plusmin.tot10.split10'] }
      ] },
      { groep: 3, title: 'Blok 5', items: [
        { label: 'Splitsen in tientallen en lossen tot 20', ids: ['getal100.tot20.tl'] },
        { label: 'Minsommen tot 20 binnen het tiental', ids: ['plusmin.tot20.minbin', 'bplusmin.tot20.minbin'] },
        { label: 'Geld tellen tot 20 in hele euro\'s', ids: ['geld.tot20.tellen'] },
        { label: 'Geld betalen tot 20 in hele euro\'s', ids: ['geld.tot20.betalen'] },
        { label: 'Over het tiental met splitshulp', ids: ['plusmin.tot20.plusover', 'bplusmin.tot20.plusover', 'plusmin.tot20.minover', 'bplusmin.tot20.minover'] }
      ] },
      { groep: 3, title: 'Blok 6', items: [
        { label: 'Splitsen tot 20', ids: ['getal100.tot20.splitsen'] },
        { label: 'Plus over het tiental met splitshulp', ids: ['plusmin.tot20.plusover', 'bplusmin.tot20.plusover'] },
        { label: 'Min over het tiental met splitshulp', ids: ['plusmin.tot20.minover', 'bplusmin.tot20.minover'] },
        { label: 'Splitsen in tientallen en lossen tot 20', ids: ['getal100.tot20.tl'] },
        { label: 'Klokkijken hele uren aflezen', ids: ['klok.uren.ana'] }
      ] },
      { groep: 3, title: 'Blok 7', items: [
        { label: 'Tientallen invullen tot 100', ids: ['getal100.tot100.tientallen'] },
        { label: 'Tijdsduur - hoeveel uur later?', ids: ['tijd.duurana.uren'] },
        { label: 'Tijdsduur - begin-/eindtijd goedzetten', ids: ['tijd.duurana.uren'] },
        { label: 'Klokkijken digitaal en analoog - halve uren', ids: ['klok.half.ana', 'klok.half.dig'] },
        { label: 'Analoge en digitale klok omzetten - halve uren', ids: ['klok.half.omzet'] },
        { label: 'Minsommen over het tiental met splitshulp', ids: ['plusmin.tot20.minover', 'bplusmin.tot20.minover'] },
        { label: 'Plussommen over het tiental', ids: ['plusmin.tot20.plusover', 'bplusmin.tot20.plusover'] }
      ] },
      { groep: 3, title: 'Blok 8', items: [
        { label: 'Getallen van klein naar groot tot 100', ids: ['getal100.tot100.ordenen'] },
        { label: 'Minsommen tot 20 met tientalpassering', ids: ['plusmin.tot20.minover', 'bplusmin.tot20.minover'] },
        { label: 'Plussommen tot 20 met tientalpassering', ids: ['plusmin.tot20.plusover', 'bplusmin.tot20.plusover'] },
        { label: 'Splitsen in tientallen en lossen tot 100', ids: ['getal100.tot100.tl'] },
        { label: 'Blokkenbouwsels - blokken tellen', ids: ['meetkunde.tot10.tellen'] },
        { label: 'Geld betalen met hele euro\'s tot 20', ids: ['geld.tot20.betalen'] }
      ] },
      { groep: 4, title: 'Blok 1', items: [
        { label: 'Juiste plaats op de getallenlijn tot 100', ids: ['getal100.tot100.lijn'] },
        { label: 'Aflezen van de getallenlijn tot 100', ids: ['getal100.tot100.aflezen'] },
        { label: 'Getallen van klein naar groot tot 100', ids: ['getal100.tot100.ordenen'] },
        { label: 'Blokkenbouwsels - blokken tellen', ids: ['meetkunde.tot10.tellen'] },
        { label: 'Het dubbele en de helft tot 20', ids: ['getal100.tot20.dubbel'] },
        { label: 'Minsommen tot 20 met tientalpassering', ids: ['plusmin.tot20.minover', 'bplusmin.tot20.minover'] },
        { label: 'Plussommen tot 20 met tientalpassering', ids: ['plusmin.tot20.plusover', 'bplusmin.tot20.plusover'] },
        { label: 'Geld tellen en betalen met hele euro\'s tot 50', ids: ['geld.tot50.tellen', 'geld.tot50.betalen'] },
        { label: 'Hele en halve uren aflezen analoge en digitale klok', ids: ['klok.half.ana', 'klok.half.dig'] },
        { label: 'Tijdsduur hele en halve uren', ids: ['tijd.duurana.half'] }
      ] },
      { groep: 4, title: 'Blok 2', items: [
        { label: 'Tientallen invullen tot 100', ids: ['getal100.tot100.tientallen'] },
        { label: 'Plussommen binnen het tiental tot 100 met hulpsom', ids: ['plusmin.tot100.plusbin', 'bplusmin.tot100.plusbin'] },
        { label: 'Minsommen binnen het tiental tot 100 met hulpsom', ids: ['plusmin.tot100.minbin', 'bplusmin.tot100.minbin'] },
        { label: 'Welke dag is het?', ids: ['tijd.kalender.dag'] },
        { label: 'Analoog en digitaal kwartieren aflezen', ids: ['klok.kwart.ana', 'klok.kwart.dig'] },
        { label: 'Analoge klok kwartieren goedzetten', ids: ['klok.kwart.anaset'] },
        { label: '100 splitsen in tiental en lossen', ids: ['getal100.tot100.tl'] }
      ] },
      { groep: 4, title: 'Blok 3', items: [
        { label: 'Juiste plaats op de getallenlijn tot 100', ids: ['getal100.tot100.lijn'] },
        { label: 'Plussommen over het tiental tot 100', ids: ['plusmin.tot100.plusover', 'bplusmin.tot100.plusover'] },
        { label: 'Minsommen over het tiental tot 100', ids: ['plusmin.tot100.minover', 'bplusmin.tot100.minover'] },
        { label: 'Keersommen met plaatjes', ids: ['bkeer.begrip.plaatjes'] },
        { label: 'Tafels van 2 en 10', ids: ['keer.tafels10.t2', 'keer.tafels10.t10'] },
        { label: 'Geld tellen tot 1 euro', ids: ['geld.tot1.tellen'] },
        { label: 'Geld betalen tot 1 euro', ids: ['geld.tot1.betalen'] }
      ] },
      { groep: 4, title: 'Blok 4', items: [
        { label: 'Tafels van 1, 2, 5 en 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t5', 'keer.tafels10.t10'] },
        { label: 'Sprongen van 10 (54 – 64 – 74)', ids: ['getal100.tot100.sprong10'] },
        { label: 'Tientallen eraf en erbij tot 100', ids: ['plusmin.tot100.tienplus', 'plusmin.tot100.tienmin', 'bplusmin.tot100.tien'] },
        { label: 'Begrip ml, cl, dl, l', ids: ['metriek.inhoud.begrip'] }, // dichtstbijzijnde oefening; zit in de app pas in een hogere groep
        { label: 'Begrip mm, cm, dm, m', ids: ['metriek.lengte.begrip'] },
        { label: 'Analoog/digitale klok goedzetten tot kwartieren', ids: ['klok.kwart.anaset', 'klok.kwart.digset'] }
      ] },
      { groep: 4, title: 'Blok 5', items: [
        { label: 'Tafel van 3', ids: ['keer.tafels10.t3'] },
        { label: 'Positiewaarden tot 1000', ids: ['getalgroot.t1000.positie'] },
        { label: 'Plus- en minsommen tot 100 binnen tiental', ids: ['plusmin.tot100.plusbin', 'bplusmin.tot100.plusbin', 'plusmin.tot100.minbin', 'bplusmin.tot100.minbin'] },
        { label: 'Aflezen van de getallenlijn tot 100', ids: ['getal100.tot100.aflezen'] }
      ] },
      { groep: 4, title: 'Blok 6', items: [
        { label: 'Tafel van 4', ids: ['keer.tafels10.t4'] },
        { label: 'Tafel van 8', ids: ['keer.tafels10.t8'] },
        { label: 'Positiewaarden tot 1000', ids: ['getalgroot.t1000.positie'] },
        { label: 'Digitale tijd kwartieren aflezen', ids: ['klok.kwart.dig'] },
        { label: 'Digitale tijd halve uren aflezen', ids: ['klok.half.dig'] },
        { label: 'Digitaal en analoog kwartieren omzetten', ids: ['klok.kwart.omzet'] },
        { label: 'Tafels van 2, 5 en 10', ids: ['keer.tafels10.t2', 'keer.tafels10.t5', 'keer.tafels10.t10'] },
        { label: 'Begrip ml, cl, dl, l', ids: ['metriek.inhoud.begrip'] }, // dichtstbijzijnde oefening; zit in de app pas in een hogere groep
        { label: 'Plus en min, eenheden binnen tiental tot 100', ids: ['plusmin.tot100.pluseen', 'plusmin.tot100.mineen', 'bplusmin.tot100.een'] }
      ] },
      { groep: 4, title: 'Blok 7', items: [
        { label: 'Tafel van 6', ids: ['keer.tafels10.t6'] },
        { label: 'Plus en min, eenheden over tiental tot 100', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'bplusmin.tot100.eenover'] },
        { label: 'Geld betalen tot 100 euro met hele euro\'s', ids: ['geld.tot100.betalen'] },
        { label: 'Geld tellen tot 100 euro met hele euro\'s', ids: ['geld.tot100.tellen'] },
        { label: 'Geld tellen en betalen tot 1 euro', ids: ['geld.tot1.tellen', 'geld.tot1.betalen'] },
        { label: 'Tafels 1 tot 5 en 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t10'] }
      ] },
      { groep: 4, title: 'Blok 8', items: [
        { label: 'Tafel van 7', ids: ['keer.tafels10.t7'] },
        { label: 'Plus en min, eenheden over tiental tot 100', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'bplusmin.tot100.eenover'] },
        { label: 'Aanzicht bepalen tot 10 blokken', ids: ['meetkunde.tot10.aanzicht'] },
        { label: 'De kalender begrijpen', ids: ['tijd.kalender.begrip'] },
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Omrekenen m, cm, dm en mm', ids: ['metriek.lengte.omr1'] },
        { label: 'Juiste plaats op de getallenlijn tot 1000', ids: ['getalgroot.t1000.lijn'] }
      ] },
      { groep: 5, title: 'Blok 1', items: [
        { label: 'Plus en min, eenheden binnen tiental tot 100', ids: ['plusmin.tot100.pluseen', 'plusmin.tot100.mineen', 'bplusmin.tot100.een'] },
        { label: 'Plus en min, eenheden over tiental tot 100', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'bplusmin.tot100.eenover'] },
        { label: 'Omrekenen m, dm, cm, mm', ids: ['metriek.lengte.omr1'] },
        { label: 'Omrekenen l, dl, cl, ml', ids: ['metriek.inhoud.omr1'] },
        { label: 'Het dubbele en de helft tot 100', ids: ['getal100.tot100.dubbel'] },
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Analoge klok goedzetten tot kwartieren', ids: ['klok.kwart.anaset'] },
        { label: 'Welke dag is het?', ids: ['tijd.kalender.dag'] },
        { label: 'Geld betalen tot 1 euro', ids: ['geld.tot1.betalen'] },
        { label: 'Positiewaarden tot 1000', ids: ['getalgroot.t1000.positie'] }
      ] },
      { groep: 5, title: 'Blok 2', items: [
        { label: 'Positiewaarden tot 1000', ids: ['getalgroot.t1000.positie'] },
        { label: 'Getallen van klein naar groot tot 1000', ids: ['getalgroot.t1000.ordenen'] },
        { label: 'Juiste plaats op de getallenlijn tot 1000', ids: ['getalgroot.t1000.lijn'] },
        { label: 'Sommen als 170 + 50 / 430 − 80 tot 1000', ids: ['bplusmin.tot1000.top', 'bplusmin.tot1000.tom'] },
        { label: 'Sommen als 350 + 640 / 880 − 350 tot 1000', ids: ['bplusmin.tot1000.htbp', 'bplusmin.tot1000.htbm'] },
        { label: 'Geld tellen tot 50 euro', ids: ['geld.tot50.tellen'] },
        { label: 'Geld betalen tot 500 euro met hele euro\'s', ids: ['geld.tot500.betalen'] },
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Blokkenbouwsels tellen tot 25 blokjes', ids: ['meetkunde.tot25.tellen'] }
      ] },
      { groep: 5, title: 'Blok 3', items: [
        { label: 'Aflezen van de getallenlijn tot 1000', ids: ['getalgroot.t1000.aflezen'] },
        { label: 'Tellen met sprongen van 1, 10 en 100 tot 1000', ids: ['getalgroot.t1000.sprongen'] },
        { label: 'Sommen als 170 + 50 / 430 − 80', ids: ['bplusmin.tot1000.top', 'bplusmin.tot1000.tom'] },
        { label: 'Sommen als 152 + 230 / 763 − 340', ids: ['bplusmin.tot1000.htep', 'bplusmin.tot1000.htem'] },
        { label: 'Analoge klok aflezen en goedzetten tot 5 minuten', ids: ['klok.min5.anaset', 'klok.min5.ana'] },
        { label: 'Digitale klok aflezen en goedzetten tot 5 minuten', ids: ['klok.min5.digset', 'klok.min5.dig'] },
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] }
      ] },
      { groep: 5, title: 'Blok 4', items: [
        { label: 'Plus en min, eenheden over tiental (38 + 29)', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'bplusmin.tot100.eenover'] },
        { label: 'Sommen als 152 + 230 / 763 − 340', ids: ['bplusmin.tot1000.htep', 'bplusmin.tot1000.htem'] },
        { label: 'Analoge en digitale tijd omzetten tot 5 minuten', ids: ['klok.min5.omzet'] },
        { label: 'Omrekenen m, dm, cm, mm', ids: ['metriek.lengte.omr1'] },
        { label: 'Omrekenen l, dl, cl, ml', ids: ['metriek.inhoud.omr1'] },
        { label: 'Begrip m, dm, cm, mm', ids: ['metriek.lengte.begrip'] },
        { label: 'Juiste plaats op de getallenlijn tot 1000', ids: ['getalgroot.t1000.lijn'] }
      ] },
      { groep: 5, title: 'Blok 5', items: [
        { label: 'Keersommen met 1 nul: 40 × 4', ids: ['keer.nullen.n1', 'bkeer.nullen.n1'] },
        { label: 'Keersommen met 2 nullen: 60 × 40', ids: ['keer.nullen.n3', 'bkeer.nullen.n2'] },
        { label: 'Keersommen met splitsing: 5 × 19', ids: ['bkeer.splitsen.s1'] },
        { label: 'Juiste plaats op de getallenlijn tot 1000', ids: ['getalgroot.t1000.lijn'] },
        { label: 'Digitale en analoge klok goedzetten tot 5 minuten', ids: ['klok.min5.anaset', 'klok.min5.digset'] },
        { label: 'Geld betalen tot 1 euro', ids: ['geld.tot1.betalen'] },
        { label: 'Delen met plaatjes', ids: ['bdelen.begrip.plaatjes'] },
        { label: 'Deeltafels 1 t/m 5 en 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d10'] }
      ] },
      { groep: 5, title: 'Blok 6', items: [
        { label: 'Juiste plaats op de getallenlijn tot 10.000', ids: ['getalgroot.t10000.lijn'] },
        { label: 'Welke dag is het?', ids: ['tijd.kalender.dag'] },
        { label: 'De kalender begrijpen', ids: ['tijd.kalender.begrip'] },
        { label: 'Volgorde van de maanden', ids: ['tijd.kalender.maanden'] },
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Plus- en minsommen tot 1000', ids: ['bplusmin.tot1000.alle', 'plusmin.tot1000.htbin', 'plusmin.tot1000.htover'] },
        { label: 'Analoge en digitale klok aflezen tot 5 minuten', ids: ['klok.min5.ana', 'klok.min5.dig'] },
        { label: 'Positiewaarden tot 1000', ids: ['getalgroot.t1000.positie'] },
        { label: 'Cijferend optellen tot 1000', ids: ['bplusmin.cijferen.pzonder', 'bplusmin.cijferen.pmet', 'bplusmin.cijferen.pnul'] } // dichtstbijzijnde oefening; zit in de app pas in een hogere groep
      ] },
      { groep: 5, title: 'Blok 7', items: [
        { label: 'Omrekenen mg, g en kg', ids: ['metriek.gewicht.omr1', 'metriek.gewicht.omr2'] },
        { label: 'Omrekenen ml, cl, dl en l', ids: ['metriek.inhoud.omr1'] },
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Getallen tot 1000 van klein naar groot', ids: ['getalgroot.t1000.ordenen'] },
        { label: 'Analoge en digitale klok aflezen tot 5 minuten', ids: ['klok.min5.ana', 'klok.min5.dig'] },
        { label: 'Omrekenen mm, cm, dm en m', ids: ['metriek.lengte.omr1'] },
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Plus- en minsommen tot 1000', ids: ['bplusmin.tot1000.alle', 'plusmin.tot1000.htbin', 'plusmin.tot1000.htover'] },
        { label: 'Aflezen van de getallenlijn tot 10.000', ids: ['getalgroot.t10000.aflezen'] },
        { label: 'Cijferend optellen tot 1000', ids: ['bplusmin.cijferen.pzonder', 'bplusmin.cijferen.pmet', 'bplusmin.cijferen.pnul'] } // dichtstbijzijnde oefening; zit in de app pas in een hogere groep
      ] },
      { groep: 5, title: 'Blok 8', items: [
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Delen met rest en een hulpsom', ids: ['bdelen.rest.rest'] },
        { label: 'Splitssommen als 6 × 76', ids: ['bkeer.splitsen.s2'] },
        { label: 'Blokkenbouwsel aanzicht bepalen', ids: ['meetkunde.tot10.aanzicht', 'meetkunde.tot25.aanzicht'] },
        { label: 'Plus- en minsommen tot 1000', ids: ['bplusmin.tot1000.alle', 'plusmin.tot1000.htbin', 'plusmin.tot1000.htover'] },
        { label: 'Tafels 1 t/m 10', ids: ['keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'keer.tafels10.t10'] },
        { label: 'Blokkenbouwsel tellen tot 25 blokjes', ids: ['meetkunde.tot25.tellen'] },
        { label: 'Tellen met sprongen tot 10.000', ids: ['getalgroot.t10000.sprongen'] },
        { label: 'Cijferend vermenigvuldigen als 8 × 39', ids: ['bkeer.cijferen.c2'] } // dichtstbijzijnde oefening; zit in de app pas in een hogere groep
      ] },
      { groep: 6, title: 'Blok 1', items: [
        { label: 'Sommen als 152 + 230 / 763 − 340', ids: ['bplusmin.tot1000.htep', 'bplusmin.tot1000.htem'] },
        { label: 'Omrekenen mm, cm, dm, m', ids: ['metriek.lengte.omr1'] },
        { label: 'Omrekenen ml, cl, dl, l', ids: ['metriek.inhoud.omr1'] },
        { label: 'Positiewaarden tot 10.000', ids: ['getalgroot.t10000.positie'] },
        { label: 'Tellen met sprongen tot 10.000', ids: ['getalgroot.t10000.sprongen'] },
        { label: 'Analoge en digitale tijd omzetten tot 5 minuten', ids: ['klok.min5.omzet'] },
        { label: 'Geld betalen tot 500 euro', ids: ['geld.tot500.betalen'] },
        { label: 'Keersommen als 6 × 40', ids: ['keer.nullen.n1', 'bkeer.nullen.n1'] },
        { label: 'Cijferend optellen tot 1000', ids: ['bplusmin.cijferen.pzonder', 'bplusmin.cijferen.pmet', 'bplusmin.cijferen.pnul'] }
      ] },
      { groep: 6, title: 'Blok 2', items: [
        { label: 'Afronden op tien-, honderd- en duizendtallen tot 1000', ids: ['getalgroot.t1000.afronden'] },
        { label: 'Positiewaarden tot 10.000', ids: ['getalgroot.t10000.positie'] },
        { label: 'Juiste plaats op de getallenlijn tot 10.000', ids: ['getalgroot.t10000.lijn'] },
        { label: 'Plus- en minsommen tot 1000', ids: ['bplusmin.tot1000.alle', 'plusmin.tot1000.htbin', 'plusmin.tot1000.htover'] },
        { label: 'Analoge en digitale klok goedzetten tot 5 minuten', ids: ['klok.min5.anaset', 'klok.min5.digset'] },
        { label: 'Tellen met sprongen tot 10.000', ids: ['getalgroot.t10000.sprongen'] },
        { label: 'Lijn- en staafdiagrammen', ids: ['diagrammen.staaf.g56', 'diagrammen.lijn.g56'] },
        { label: 'Geld betalen tot 500 euro', ids: ['geld.tot500.betalen'] },
        { label: 'Cijferend vermenigvuldigen als 7 × 829', ids: ['bkeer.cijferen.c3'] },
        { label: 'Cijferend optellen tot 1000', ids: ['bplusmin.cijferen.pzonder', 'bplusmin.cijferen.pmet', 'bplusmin.cijferen.pnul'] }
      ] },
      { groep: 6, title: 'Blok 3', items: [
        { label: 'Analoge en digitale klok omzetten tot 1 minuut', ids: ['klok.min1.omzet'] },
        { label: 'Tijdsduur digitale tijd tot 5 minuten', ids: ['tijd.duurdig.min5'] },
        { label: 'Deelsommen als 560 : 80', ids: ['delen.nullen.n2', 'bdelen.nullen.n1'] },
        { label: 'Plus- en minsommen tot 1000', ids: ['bplusmin.tot1000.alle', 'plusmin.tot1000.htbin', 'plusmin.tot1000.htover'] },
        { label: 'Aflezen van de getallenlijn tot 10.000', ids: ['getalgroot.t10000.aflezen'] },
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Tellen met sprongen van 1, 10, 100 en 1000 tot 10.000', ids: ['getalgroot.t10000.sprongen'] },
        { label: 'De kalender begrijpen', ids: ['tijd.kalender.begrip'] },
        { label: 'Cijferend delen als 693 : 7', ids: ['bdelen.cijferen.c1', 'bdelen.cijferen.c2'] },
        { label: 'Cijferend aftrekken tot 1000', ids: ['bplusmin.cijferen.mzonder', 'bplusmin.cijferen.mmet', 'bplusmin.cijferen.mnul'] }
      ] },
      { groep: 6, title: 'Blok 4', items: [
        { label: 'Omrekenen m, dam, hm, km', ids: ['metriek.lengte.omr2'] },
        { label: 'Bereken de omtrek', ids: ['metriek.omtrek.rechthoek', 'metriek.omtrek.samen'] },
        { label: 'Deelsommen als 234 : 6 met hulpsom', ids: ['bdelen.rest.split2'] },
        { label: 'Tijdsduur digitale tijd tot 5 minuten', ids: ['tijd.duurdig.min5'] },
        { label: 'Van woord naar getal en andersom tot 100.000', ids: ['getalgroot.t100000.woord'] },
        { label: 'Eenvoudige beelddiagrammen aflezen', ids: ['diagrammen.beeld.eenv'] },
        { label: 'Afronden op tien-, honderd- en duizendtallen tot 10.000', ids: ['getalgroot.t10000.afronden'] },
        { label: 'Cijferend optellen tot 1000', ids: ['bplusmin.cijferen.pzonder', 'bplusmin.cijferen.pmet', 'bplusmin.cijferen.pnul'] },
        { label: 'Cijferend aftrekken tot 1000', ids: ['bplusmin.cijferen.mzonder', 'bplusmin.cijferen.mmet', 'bplusmin.cijferen.mnul'] },
        { label: 'Cijferend delen als 693 : 7', ids: ['bdelen.cijferen.c1', 'bdelen.cijferen.c2'] }
      ] },
      { groep: 6, title: 'Blok 5', items: [
        { label: 'Breuken: welk deel is gekleurd?', ids: ['breuken.begrip.welk'] },
        { label: 'Breuken: helen uit de breuk halen', ids: ['breuken.vereenv.helen'] },
        { label: 'Breuken: optellen en aftrekken gelijknamig', ids: ['breuken.optel.gelijk'] },
        { label: 'Breuken: op de getallenlijn plaatsen tot 1', ids: ['breuken.begrip.lijn'] },
        { label: 'Keersommen als 6 × 400', ids: ['keer.nullen.n2', 'bkeer.nullen.n2'] },
        { label: 'Analoog en digitaal omzetten tot 1 minuut', ids: ['klok.min1.omzet'] },
        { label: 'Digitale klok goedzetten tot 1 minuut', ids: ['klok.min1.digset'] },
        { label: 'Cijferend vermenigvuldigen als 7 × 829', ids: ['bkeer.cijferen.c3'] },
        { label: 'Cijferend optellen tot 10.000', ids: ['bplusmin.cijferen.p10k'] },
        { label: 'Cijferend aftrekken tot 10.000', ids: ['bplusmin.cijferen.m10k'] }
      ] },
      { groep: 6, title: 'Blok 6', items: [
        { label: 'Verhoudingstabel beide rijen invullen', ids: ['vtabel.heel.beide'] },
        { label: 'Omrekenen ml, cl, dl en l', ids: ['metriek.inhoud.omr1'] },
        { label: 'Omrekenen mg, g en kg', ids: ['metriek.gewicht.omr1', 'metriek.gewicht.omr2'] },
        { label: 'Breuken: op de getallenlijn plaatsen', ids: ['breuken.begrip.lijn'] },
        { label: 'Breuken: optellen en aftrekken gelijknamig', ids: ['breuken.optel.gelijk'] },
        { label: 'Staafdiagrammen', ids: ['diagrammen.staaf.g56'] },
        { label: 'Plus- en minsommen als 350 + 640', ids: ['bplusmin.tot1000.htbp'] },
        { label: 'Aflezen van de getallenlijn tot 10.000', ids: ['getalgroot.t10000.aflezen'] },
        { label: 'Cijferend delen als 810 : 45', ids: ['bdelen.cijferen.c3'] }
      ] },
      { groep: 6, title: 'Blok 7', items: [
        { label: 'Delen met rest', ids: ['bdelen.rest.rest'] },
        { label: 'Aanzicht bepalen blokkenbouwsel', ids: ['meetkunde.tot25.aanzicht'] },
        { label: 'Keersommen als 5 × 19', ids: ['bkeer.splitsen.s1'] },
        { label: 'Deeltafels 1 t/m 10', ids: ['delen.deel10.d1', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'delen.deel10.d10'] },
        { label: 'Afronden op tien-, honderd- en duizendtallen', ids: ['getalgroot.t10000.afronden', 'getalgroot.t100000.afronden'] },
        { label: 'Breuken: op de getallenlijn plaatsen', ids: ['breuken.begrip.lijn'] },
        { label: 'Analoge klok aflezen tot 1 minuut', ids: ['klok.min1.ana'] },
        { label: 'Geld tellen tot 500 euro', ids: ['geld.tot500.tellen'] },
        { label: 'Positiewaarden tot 1000', ids: ['getalgroot.t1000.positie'] },
        { label: 'Cijferend vermenigvuldigen als 48 × 35', ids: ['bkeer.cijferen.c4'] }
      ] },
      { groep: 6, title: 'Blok 8', items: [
        { label: 'Kommagetallen op de getallenlijn', ids: ['komma.tienden.lijn', 'komma.honderdsten.lijn'] },
        { label: 'Optellen en aftrekken breuken ook boven de 1', ids: ['breuken.optel.gelijk', 'breuken.optel.eenv'] },
        { label: 'Oppervlakte van rechthoeken en samengestelde figuren', ids: ['metriek.opp.rechthoek', 'metriek.opp.samen'] },
        { label: 'Verhoudingstabellen beide rijen invullen', ids: ['vtabel.heel.beide'] },
        { label: 'Deel van geheel bepalen', ids: ['breuken.anders.van', 'breuken.anders.deel'] },
        { label: 'Analoog en digitaal omzetten', ids: ['klok.min1.omzet', 'klok.min5.omzet'] },
        { label: 'Breuken van klein naar groot', ids: ['breuken.begrip.orde'] },
        { label: 'Breuken op de getallenlijn', ids: ['breuken.begrip.lijn'] },
        { label: 'Cijferend delen als 810 : 45', ids: ['bdelen.cijferen.c3'] }
      ] },
      { groep: 7, title: 'Blok 1', items: [
        { label: 'Juiste plaats op de getallenlijn tot 100.000', ids: ['getalgroot.t100000.lijn'] },
        { label: 'Positiewaarden tot 100.000', ids: ['getalgroot.t100000.positie'] },
        { label: 'Omrekenen ml, cl, dl en l', ids: ['metriek.inhoud.omr1'] },
        { label: 'Omrekenen mg, g en kg', ids: ['metriek.gewicht.omr1', 'metriek.gewicht.omr2'] },
        { label: 'Omtrek van rechthoeken en samengestelde figuren', ids: ['metriek.omtrek.rechthoek', 'metriek.omtrek.samen'] },
        { label: 'Oppervlakte uitrekenen van rechthoeken en samengestelde figuren', ids: ['metriek.opp.rechthoek', 'metriek.opp.samen'] },
        { label: 'Breuken: welk deel is gekleurd en van klein naar groot', ids: ['breuken.begrip.welk', 'breuken.begrip.orde'] },
        { label: 'Optellen en aftrekken gelijknamige breuken', ids: ['breuken.optel.gelijk'] },
        { label: 'Breuken: deel van een geheel', ids: ['breuken.anders.van', 'breuken.anders.deel'] },
        { label: 'Optellen en aftrekken kommagetallen tot honderdste', ids: ['bplusmin.komma.tienden', 'bplusmin.komma.honderdsten'] }
      ] },
      { groep: 7, title: 'Blok 2', items: [
        { label: 'Optellen en aftrekken ongelijknamige breuken', ids: ['breuken.optel.eenv', 'breuken.optel.moeil'] },
        { label: 'Breuken van klein naar groot', ids: ['breuken.begrip.orde'] },
        { label: 'Schaal berekenen met cm en m', ids: ['schaal.bereken.cmdm'] },
        { label: 'Schaal berekenen met cm, m en km', ids: ['schaal.bereken.km'] },
        { label: 'Getallen van klein naar groot tot 100.000', ids: ['getalgroot.t100000.ordenen'] },
        { label: 'Positiewaarden tot 100.000', ids: ['getalgroot.t100000.positie'] },
        { label: 'Cijferend optellen boven de 10.000', ids: ['bplusmin.cijferen.pgroot'] },
        { label: 'Cijferend aftrekken boven de 10.000', ids: ['bplusmin.cijferen.mgroot'] },
        { label: 'Cijferend delen als 5778 : 6', ids: ['bdelen.cijferen.c5'] }
      ] },
      { groep: 7, title: 'Blok 3', items: [
        { label: 'Kommagetallen tot tienden aflezen van de getallenlijn', ids: ['komma.tienden.aflezen'] },
        { label: 'Kommagetallen tot honderdsten aflezen van de getallenlijn', ids: ['komma.honderdsten.aflezen'] },
        { label: 'Optellen en aftrekken kommagetallen tot tienden', ids: ['bplusmin.komma.tienden'] },
        { label: 'Keersommen kommagetallen als 10 × 5,62', ids: ['bkeer.komma.verplaats'] },
        { label: 'Keersommen kommagetallen door splitsen', ids: ['bkeer.komma.split1', 'bkeer.komma.split2'] },
        { label: 'Tijdsduur analoog tot 1 minuut', ids: ['tijd.duurana.min1'] },
        { label: 'Lijndiagrammen groep 7', ids: ['diagrammen.lijn.g7'] },
        { label: 'Aflezen van de getallenlijn tot 1 miljoen', ids: ['getalgroot.t1000000.aflezen'] },
        { label: 'Cijferend optellen boven de 10.000', ids: ['bplusmin.cijferen.pgroot'] },
        { label: 'Cijferend aftrekken boven de 10.000', ids: ['bplusmin.cijferen.mgroot'] }
      ] },
      { groep: 7, title: 'Blok 4', items: [
        { label: 'Breuken en kommagetallen omzetten', ids: ['relatie.basis.bk'] },
        { label: 'Breuken op volgorde zetten', ids: ['breuken.begrip.orde'] },
        { label: 'Percentage van aantal berekenen', ids: ['procenten.n1.van', 'procenten.n2.van'] },
        { label: 'Percentage van strook kleuren', ids: ['procenten.n1.strook', 'procenten.n2.strook'] },
        { label: 'Kommagetallen tot honderdsten afronden', ids: ['komma.honderdsten.afronden'] },
        { label: 'Kommagetallen tot duizendsten van klein naar groot', ids: ['komma.duizendsten.ordenen'] },
        { label: 'Oppervlakte berekenen', ids: ['metriek.opp.rechthoek', 'metriek.opp.driehoek', 'metriek.opp.samen', 'metriek.opp.mix'] },
        { label: 'Omrekenen mm², cm², dm² en m²', ids: ['metriek.opp.omr1'] },
        { label: 'Omrekenen m², dam², hm² en km²', ids: ['metriek.opp.omr2'] },
        { label: 'Rekenen vierkante km, are en hectare', ids: ['metriek.opp.are'] }
      ] },
      { groep: 7, title: 'Blok 5', items: [
        { label: 'Kommagetallen tot duizendsten van klein naar groot', ids: ['komma.duizendsten.ordenen'] },
        { label: 'Kommagetallen tot duizendsten afronden', ids: ['komma.duizendsten.afronden'] },
        { label: 'Kommagetallen tot duizendsten', ids: ['komma.duizendsten.rij', 'komma.duizendsten.lijn', 'komma.duizendsten.omschrijving'] },
        { label: 'Keersommen met kommagetallen als 8 × 4,35', ids: ['bkeer.komma.split2'] },
        { label: 'Getallenlijn aflezen tot 100.000', ids: ['getalgroot.t100000.aflezen'] },
        { label: 'Nieuwe prijs berekenen na korting', ids: ['procenten.n1.nieuw', 'procenten.n2.nieuw'] },
        { label: 'Percentage van aantal berekenen', ids: ['procenten.n1.van', 'procenten.n2.van'] },
        { label: 'Oppervlakte berekenen van samengestelde figuren', ids: ['metriek.opp.samen'] },
        { label: 'Plus- en minsommen met ongelijknamige breuken', ids: ['breuken.optel.eenv', 'breuken.optel.moeil'] }
      ] },
      { groep: 7, title: 'Blok 6', items: [
        { label: 'Kommagetallen delen tot honderdsten', ids: ['bdelen.komma.honderdsten'] },
        { label: 'Kommagetallen keersommen zoals 10 × 5,62', ids: ['bkeer.komma.verplaats'] },
        { label: 'Inhoud berekenen met gelijke maateenheden', ids: ['metriek.inhbereken.gelijk'] },
        { label: 'Omrekenen inhoudsmaten', ids: ['metriek.inhoud.omr1', 'metriek.inhoud.kub', 'metriek.inhoud.kubl', 'metriek.inhoud.alles'] },
        { label: 'Inhoud berekenen in liters', ids: ['metriek.inhbereken.liter'] },
        { label: 'Positiewaarden tot 100.000', ids: ['getalgroot.t100000.positie'] },
        { label: 'Percentage van aantal berekenen zoals 50% van 290', ids: ['procenten.n1.van', 'procenten.n2.van'] },
        { label: 'Blokken tellen tot 25 blokken', ids: ['meetkunde.tot25.tellen'] }, // herhaling: deze oefening hoort in de app bij een lagere groep
        { label: 'Lijn- en staafdiagrammen groep 7', ids: ['diagrammen.staaf.g7', 'diagrammen.lijn.g7'] },
        { label: 'Omschrijving naar getal tot duizendsten', ids: ['komma.duizendsten.omschrijving'] }
      ] },
      { groep: 7, title: 'Blok 7', items: [
        { label: 'Kommagetallen tot duizendsten van klein naar groot', ids: ['komma.duizendsten.ordenen'] },
        { label: 'Breuken vereenvoudigen', ids: ['breuken.vereenv.vereenv'] },
        { label: 'Breuken en kommagetallen omzetten', ids: ['relatie.basis.bk'] },
        { label: 'Breuk × breuk', ids: ['breuken.verm.breukbreuk'] },
        { label: 'Verhoudingstabellen kommagetallen beide rijen invullen', ids: ['vtabel.komma.beide'] },
        { label: 'Breuken: deel van geheel als 1/4 van 80', ids: ['breuken.anders.van', 'breuken.anders.deel'] },
        { label: 'Staafdiagrammen', ids: ['diagrammen.staaf.g7'] },
        { label: 'Snelheid omrekenen naar km/u', ids: ['tijd.snelheid.kmu'] }
      ] },
      { groep: 7, title: 'Blok 8', items: [
        { label: 'Keersommen kommagetallen', ids: ['bkeer.komma.verplaats', 'bkeer.komma.split1', 'bkeer.komma.split2'] },
        { label: 'Deelsommen kommagetallen', ids: ['bdelen.komma.tienden', 'bdelen.komma.honderdsten', 'bdelen.komma.d10'] },
        { label: 'Kommagetallen plaatsen op de getallenlijn', ids: ['komma.honderdsten.lijn', 'komma.duizendsten.lijn'] },
        { label: 'Kommagetallen van klein naar groot', ids: ['komma.honderdsten.ordenen', 'komma.duizendsten.ordenen'] },
        { label: 'Nieuw bedrag na korting berekenen', ids: ['procenten.n1.nieuw', 'procenten.n2.nieuw'] },
        { label: 'Breuk × breuk', ids: ['breuken.verm.breukbreuk'] },
        { label: 'Inhoud berekenen', ids: ['metriek.inhbereken.gelijk', 'metriek.inhbereken.versch', 'metriek.inhbereken.liter'] },
        { label: 'Staafdiagrammen groep 7', ids: ['diagrammen.staaf.g7'] },
        { label: 'Schaal berekenen in cm, m en km', ids: ['schaal.bereken.km'] },
        { label: 'Cijferend vermenigvuldigen als 34 × 229', ids: ['bkeer.cijferen.c5'] }
      ] },
      { groep: 8, title: 'Blok 1', items: [
        { label: 'Getalbegrip tot 1 miljoen', ids: ['getalgroot.t1000000.rij', 'getalgroot.t1000000.lijn', 'getalgroot.t1000000.positie', 'getalgroot.t1000000.woord', 'getalgroot.t1000000.afronden'] },
        { label: 'Omrekenen inhouds- gewichts- en oppervlaktematen', ids: ['metriek.inhoud.alles', 'metriek.gewicht.omr2', 'metriek.opp.omr1', 'metriek.opp.omr2'] },
        { label: 'Breuken en procenten omzetten', ids: ['relatie.basis.bp', 'relatie.lastig.bp'] },
        { label: 'Optellen en aftrekken breuken', ids: ['breuken.optel.gelijk', 'breuken.optel.eenv', 'breuken.optel.moeil'] },
        { label: 'Keersommen breuken', ids: ['breuken.verm.heelbreuk', 'breuken.verm.heelgem', 'breuken.verm.breukbreuk'] },
        { label: 'Verhoudingen omzetten', ids: ['relatie.basis.mix', 'relatie.lastig.mix'] },
        { label: 'Snelheid omrekenen naar km/uur', ids: ['tijd.snelheid.kmu'] },
        { label: 'Oppervlakte van rechthoeken', ids: ['metriek.opp.rechthoek'] }
      ] },
      { groep: 8, title: 'Blok 2', items: [
        { label: 'Miljoen van kommagetal naar cijfers', ids: ['getalgroot.miljoen.komma'] },
        { label: 'Deelsommen ongelijknamige breuken', ids: ['breuken.delen.ongelijk'] },
        { label: 'Inhoud berekenen in liters', ids: ['metriek.inhbereken.liter'] },
        { label: 'Plus- en minsommen tot 1 miljoen', ids: ['bplusmin.groot.h1m'] },
        { label: 'Keersommen breuken', ids: ['breuken.verm.heelbreuk', 'breuken.verm.heelgem', 'breuken.verm.breukbreuk'] },
        { label: 'Oppervlakte berekenen', ids: ['metriek.opp.rechthoek', 'metriek.opp.driehoek', 'metriek.opp.samen', 'metriek.opp.mix'] },
        { label: 'Breuken, kommagetallen, procenten en verhoudingen omzetten', ids: ['relatie.basis.mix', 'relatie.lastig.mix'] },
        { label: 'Cijferend optellen en aftrekken tot 10.000', ids: ['bplusmin.cijferen.p10k', 'bplusmin.cijferen.m10k'] }
      ] },
      { groep: 8, title: 'Blok 3', items: [
        { label: 'Breuken van klein naar groot', ids: ['breuken.begrip.orde'] },
        { label: 'Plus- en minsommen ongelijknamige breuken', ids: ['breuken.optel.eenv', 'breuken.optel.moeil'] },
        { label: 'Nieuwe prijs na korting', ids: ['procenten.n2.nieuw', 'procenten.n3.nieuw'] },
        { label: 'Percentage deel van totaal berekenen', ids: ['procenten.n2.deel', 'procenten.n3.deel'] },
        { label: 'Kommagetallen delen door 10, 100 en 1000', ids: ['bdelen.komma.d10'] },
        { label: 'Aflezen van de getallenlijn tot 1 miljoen', ids: ['getalgroot.t1000000.aflezen'] },
        { label: 'Staafdiagrammen groep 8', ids: ['diagrammen.staaf.g8'] },
        { label: 'Oppervlakte van rechthoeken met kommagetallen', ids: ['metriek.opp.rechthoek', 'metriek.opp.mix'] }
      ] },
      { groep: 8, title: 'Blok 4', items: [
        { label: 'Plus- en minsommen kommagetallen', ids: ['bplusmin.komma.honderdsten', 'bplusmin.komma.duizendsten'] },
        { label: 'Lijndiagram groep 8', ids: ['diagrammen.lijn.g8'] },
        { label: 'Staafdiagram groep 8', ids: ['diagrammen.staaf.g8'] },
        { label: 'Cirkeldiagram groep 8', ids: ['diagrammen.cirkel.g8'] },
        { label: 'Verhoudingstabellen met kommagetallen', ids: ['vtabel.komma.beide', 'vtabel.komma.tabel'] },
        { label: 'Optellen en aftrekken met breuken', ids: ['breuken.optel.gelijk', 'breuken.optel.eenv', 'breuken.optel.moeil'] },
        { label: 'Miljoenen aflezen van de getallenlijn', ids: ['getalgroot.miljoen.aflezen', 'getalgroot.t1000000.aflezen'] },
        { label: 'Tijdsduur digitale tijd', ids: ['tijd.duurdig.min5', 'tijd.duurdig.min1'] },
        { label: 'Getallenrij invullen tot 1 miljoen', ids: ['getalgroot.t1000000.rij'] }
      ] },
      { groep: 8, title: 'Blok 5', items: [
        { label: 'Schaal berekenen met gegeven maten', ids: ['schaal.bereken.gelijk', 'schaal.bereken.cmdm', 'schaal.bereken.km'] },
        { label: 'Percentage van totaal berekenen', ids: ['procenten.n2.deel', 'procenten.n3.deel'] },
        { label: 'Verhoudingstabellen', ids: ['vtabel.heel.onder', 'vtabel.heel.beide', 'vtabel.heel.tabel', 'vtabel.komma.beide'] },
        { label: 'Staafdiagrammen', ids: ['diagrammen.staaf.g8'] },
        { label: 'Getal naar woorden tot 1 miljoen', ids: ['getalgroot.t1000000.woord'] },
        { label: 'Breuken en kommagetallen omzetten', ids: ['relatie.basis.bk', 'relatie.lastig.bk'] },
        { label: 'Breuken en procenten omzetten', ids: ['relatie.basis.bp', 'relatie.lastig.bp'] },
        { label: 'Cirkeldiagrammen', ids: ['diagrammen.cirkel.g8'] },
        { label: 'Kommagetallen tot duizendsten afronden', ids: ['komma.duizendsten.afronden'] }
      ] },
      { groep: 8, title: 'Blok 6', items: [
        { label: 'Breuken vereenvoudigen', ids: ['breuken.vereenv.vereenv'] },
        { label: 'Breuken: deel van geheel bepalen', ids: ['breuken.anders.van', 'breuken.anders.deel'] },
        { label: 'Ongelijknamige breuken delen', ids: ['breuken.delen.ongelijk'] },
        { label: 'Cirkeldiagrammen en lijndiagrammen', ids: ['diagrammen.lijn.g8', 'diagrammen.cirkel.g8'] },
        { label: 'Km/uur berekenen', ids: ['tijd.snelheid.kmu', 'tijd.snelheid.duur'] },
        { label: 'Tijdsduur analoge tijd berekenen', ids: ['tijd.duurana.min5', 'tijd.duurana.min1'] },
        { label: 'Tijdsduur digitale tijd berekenen', ids: ['tijd.duurdig.min5', 'tijd.duurdig.min1'] },
        { label: 'Omtrek van samengestelde figuren', ids: ['metriek.omtrek.samen'] },
        { label: 'Kommagetallen tot duizendsten van klein naar groot', ids: ['komma.duizendsten.ordenen'] }
      ] },
      { groep: 8, title: 'Blok 7', items: [
        { label: 'Plus- en minsommen kommagetallen', ids: ['bplusmin.komma.honderdsten', 'bplusmin.komma.duizendsten'] },
        { label: 'Keersommen met kommagetallen', ids: ['bkeer.komma.verplaats', 'bkeer.komma.split1', 'bkeer.komma.split2'] },
        { label: 'Deelsommen met kommagetallen', ids: ['bdelen.komma.tienden', 'bdelen.komma.honderdsten', 'bdelen.komma.d10'] },
        { label: 'Oppervlakte berekenen met samengestelde figuren', ids: ['metriek.opp.samen'] },
        { label: 'Kommagetallen tot duizendste aflezen van getallenlijn', ids: ['komma.duizendsten.aflezen'] },
        { label: 'Km/uur berekenen', ids: ['tijd.snelheid.kmu', 'tijd.snelheid.duur'] },
        { label: 'Staafdiagrammen groep 7', ids: ['diagrammen.staaf.g7'] }
      ] },
      { groep: 8, title: 'Blok 8', items: [
        { label: 'Oppervlaktes omrekenen', ids: ['metriek.opp.omr1', 'metriek.opp.omr2'] },
        { label: 'Inhoudsmaten omrekenen', ids: ['metriek.inhoud.omr1', 'metriek.inhoud.kub', 'metriek.inhoud.kubl', 'metriek.inhoud.alles'] },
        { label: 'Inhoud berekenen met verschillende maateenheden', ids: ['metriek.inhbereken.versch'] },
        { label: 'Schaal berekenen met verschillende maten', ids: ['schaal.bereken.cmdm', 'schaal.bereken.km'] },
        { label: 'Verhoudingstabel helemaal invullen', ids: ['vtabel.heel.tabel', 'vtabel.komma.tabel'] },
        { label: 'Keersommen breuken', ids: ['breuken.verm.heelbreuk', 'breuken.verm.heelgem', 'breuken.verm.breukbreuk'] }
      ] }
    ] },
  { id: 'cito', kind: 'toets', title: 'Cito LIB', short: 'Cito', emoji: '📋', color: '#6C4CF1',
    desc: 'Leerling in beeld: M3 t/m E7 en doorstroomtoets',
    note: 'Oefen per onderdeel van de toets. Dit zijn oefenopgaven in dezelfde stijl, geen echte toetsvragen.',
    sections: [
      { groep: 3, title: 'M3', items: [
        { label: 'Optellen tot 20', ids: ['plusmin.tot10.plus', 'bplusmin.tot10.plus', 'plusmin.tot20.dubbel', 'plusmin.tot20.plusbin', 'plusmin.tot20.plusover', 'bplusmin.tot20.plusover'] },
        { label: 'Aftrekken tot 20', ids: ['plusmin.tot10.min', 'bplusmin.tot10.min', 'plusmin.tot20.minbin', 'plusmin.tot20.minover', 'bplusmin.tot20.minover'] },
        { label: 'Getalbegrip en getalrelaties', ids: ['getal100.tot20.rij', 'getal100.tot20.ordenen', 'getal100.tot20.lijn', 'getal100.tot20.splitsen', 'getal100.tot20.tl', 'getal100.tot100.rij'] },
        { label: 'Tijd', ids: ['klok.uren.ana', 'klok.uren.anaset', 'klok.uren.dig', 'klok.half.ana', 'tijd.duurana.uren'] }
      ] },
      { groep: 3, title: 'E3', items: [
        { label: 'Optellen tot 20', ids: ['plusmin.tot20.plusbin', 'plusmin.tot20.plusover', 'plusmin.tot20.dubbel', 'bplusmin.tot20.plusbin', 'bplusmin.tot20.plusover', 'plusmin.tot10.stipplus'] },
        { label: 'Aftrekken tot 20', ids: ['plusmin.tot20.minbin', 'plusmin.tot20.minover', 'plusmin.tot20.minboven', 'bplusmin.tot20.minbin', 'bplusmin.tot20.minover', 'plusmin.tot10.stipmin'] },
        { label: 'Optellen en aftrekken tot 100', ids: ['getal100.tot100.sprong10', 'getal100.tot100.tl', 'plusmin.tot100.tienplus', 'plusmin.tot100.tienmin', 'plusmin.tot100.pluseen', 'plusmin.tot100.mineen'] }, // plus/min tot 100 zit in de app vanaf groep 4
        { label: 'Getalbegrip en getalrelaties', ids: ['getal100.tot100.rij', 'getal100.tot100.ordenen', 'getal100.tot100.lijn', 'getal100.tot100.aflezen', 'getal100.tot100.tl', 'getal100.tot20.splitsen'] },
        { label: 'Geld', ids: ['geld.tot5.tellen', 'geld.tot5.betalen', 'geld.tot10.tellen', 'geld.tot10.betalen'] },
        { label: 'Tijd', ids: ['klok.uren.ana', 'klok.uren.dig', 'klok.half.ana', 'klok.half.dig', 'klok.half.anaset', 'tijd.duurana.uren'] },
        { label: 'Blokken tellen', ids: ['meetkunde.tot10.tellen', 'meetkunde.tot25.tellen'] }
      ] },
      { groep: 4, title: 'M4', items: [
        { label: 'Optellen en aftrekken', ids: ['plusmin.tot20.plusover', 'plusmin.tot20.minover', 'plusmin.tot100.tienplus', 'plusmin.tot100.tienmin', 'plusmin.tot100.plusbin', 'plusmin.tot100.minbin'] },
        { label: 'Vermenigvuldigen', ids: ['bkeer.begrip.plaatjes', 'keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t5', 'keer.tafels10.t10'] },
        { label: 'Getalbegrip en getalrelaties', ids: ['getal100.tot100.rij', 'getal100.tot100.ordenen', 'getal100.tot100.lijn', 'getal100.tot100.tientallen', 'getal100.tot100.sprong10', 'getal100.tot100.tl'] },
        { label: 'Meten en meetkunde', ids: ['klok.half.ana', 'klok.kwart.ana', 'geld.tot20.betalen', 'metriek.lengte.begrip', 'meetkunde.tot10.aanzicht', 'meetkunde.tot10.plat', 'tijd.kalender.dag'] }
      ] },
      { groep: 4, title: 'E4', items: [
        { label: 'Optellen en aftrekken', ids: ['plusmin.tot100.plusbin', 'plusmin.tot100.minbin', 'plusmin.tot100.plusover', 'plusmin.tot100.minover', 'bplusmin.tot100.tien', 'bplusmin.tot100.eenover'] },
        { label: 'Vermenigvuldigen', ids: ['bkeer.begrip.plaatjes', 'keer.tafels10.t2', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t5', 'keer.tafels10.t6', 'keer.tafels10.t10'] },
        { label: 'Getalbegrip en getalrelaties', ids: ['getal100.tot100.lijn', 'getal100.tot100.aflezen', 'getal100.tot100.woord', 'getal100.tot100.dubbel', 'getal100.tot100.vijftallen', 'getal100.tot100.ordenen'] },
        { label: 'Meten en meetkunde', ids: ['klok.kwart.ana', 'klok.kwart.dig', 'tijd.duurana.half', 'geld.tot50.betalen', 'metriek.lengte.begrip', 'metriek.lengte.omr1', 'meetkunde.tot25.tellen'] }
      ] },
      { groep: 5, title: 'M5', items: [
        { label: 'Optellen en aftrekken', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'plusmin.tot1000.honderd', 'plusmin.tot1000.tienbin', 'bplusmin.tot1000.tbp', 'bplusmin.tot1000.tbm'] },
        { label: 'Vermenigvuldigen en delen', ids: ['keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'delen.deel10.d5', 'delen.deel10.d10', 'bkeer.nullen.n1'] },
        { label: 'Getalbegrip en getalrelaties', ids: ['getalgroot.t1000.rij', 'getalgroot.t1000.ordenen', 'getalgroot.t1000.lijn', 'getalgroot.t1000.aflezen', 'getalgroot.t1000.positie', 'getalgroot.t1000.sprongen'] },
        { label: 'Meten en meetkunde', ids: ['klok.kwart.dig', 'klok.min5.ana', 'geld.tot100.betalen', 'metriek.lengte.omr1', 'metriek.gewicht.begrip', 'meetkunde.tot25.aanzicht', 'tijd.kalender.begrip'] },
        { label: 'Verbanden', ids: ['diagrammen.beeld.eenv', 'diagrammen.beeld.complex', 'diagrammen.staaf.g56', 'tabellen.niveau.g5'] }
      ] },
      { groep: 5, title: 'E5', items: [
        { label: 'Optellen en aftrekken', ids: ['plusmin.tot1000.tienover', 'plusmin.tot1000.htbin', 'plusmin.tot1000.htover', 'bplusmin.tot1000.htop', 'bplusmin.tot1000.htom', 'bplusmin.tot1000.alle'] },
        { label: 'Vermenigvuldigen en delen', ids: ['delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'bkeer.nullen.n1', 'bkeer.splitsen.s1', 'bdelen.rest.rest', 'bdelen.nullen.n1'] },
        { label: 'Getalbegrip en getalrelaties', ids: ['getalgroot.t1000.afronden', 'getalgroot.t1000.woord', 'getalgroot.t10000.ordenen', 'getalgroot.t10000.lijn', 'getalgroot.t10000.positie', 'getalgroot.t10000.sprongen'] },
        { label: 'Meten en meetkunde', ids: ['klok.min5.dig', 'klok.min5.omzet', 'tijd.duurdig.half', 'geld.tot100.tellen', 'metriek.gewicht.omr1', 'metriek.lengte.omr1', 'meetkunde.tot25.plat'] },
        { label: 'Verbanden', ids: ['diagrammen.staaf.g56', 'diagrammen.lijn.g56', 'diagrammen.beeld.complex', 'tabellen.niveau.g5'] }
      ] },
      { groep: 6, title: 'M6', items: [
        { label: 'Optellen en aftrekken', ids: ['bplusmin.tot1000.alle', 'plusmin.tot1000.htover', 'bplusmin.tot1000.htom', 'bplusmin.groot.h10k', 'bplusmin.groot.pos4'] },
        { label: 'Vermenigvuldigen en delen', ids: ['keer.nullen.n1', 'keer.nullen.n2', 'delen.nullen.n1', 'bkeer.splitsen.s2', 'bdelen.rest.split1', 'keer.handig.m10'] },
        { label: 'Getalbegrip en getalrelaties', ids: ['getalgroot.t10000.positie', 'getalgroot.t10000.lijn', 'getalgroot.t10000.afronden', 'getalgroot.t100000.lijn', 'getalgroot.t100000.woord', 'komma.tienden.lijn'] },
        { label: 'Meten en meetkunde', ids: ['klok.min1.ana', 'tijd.duurdig.min5', 'metriek.lengte.omr2', 'metriek.gewicht.omr1', 'metriek.inhoud.begrip', 'metriek.omtrek.rechthoek', 'meetkunde.tot25.aanzicht'] },
        { label: 'Verbanden', ids: ['diagrammen.staaf.g56', 'diagrammen.lijn.g56', 'diagrammen.beeld.complex', 'tabellen.niveau.g6'] },
        { label: 'Verhoudingen', ids: ['breuken.begrip.welk', 'breuken.begrip.kleur', 'breuken.begrip.lijn', 'breuken.anders.van', 'vtabel.heel.onder', 'vtabel.heel.beide'] }
      ] },
      { groep: 6, title: 'E6', items: [
        { label: 'Optellen en aftrekken', ids: ['bplusmin.groot.h10k', 'bplusmin.groot.h1m', 'bplusmin.groot.pos4', 'bplusmin.groot.pos6', 'bplusmin.tot1000.alle', 'plusmin.tot1000.htover'] },
        { label: 'Vermenigvuldigen en delen', ids: ['keer.nullen.n3', 'delen.nullen.n2', 'delen.nullen.n3', 'bkeer.splitsen.s2', 'bdelen.rest.split2', 'bdelen.rest.rest', 'keer.handig.m25'] },
        { label: 'Getalbegrip en getalrelaties', ids: ['getalgroot.t100000.ordenen', 'getalgroot.t100000.positie', 'getalgroot.t100000.afronden', 'komma.tienden.rij', 'komma.tienden.omschrijving', 'komma.honderdsten.lijn'] },
        { label: 'Meten en meetkunde', ids: ['klok.min1.omzet', 'tijd.duurana.min5', 'metriek.inhoud.omr1', 'metriek.gewicht.omr2', 'metriek.lengte.omr2', 'metriek.omtrek.samen', 'geld.tot500.betalen'] },
        { label: 'Verhoudingen', ids: ['breuken.begrip.orde', 'breuken.anders.aanvul', 'breuken.anders.van', 'breuken.anders.deel', 'vtabel.heel.beide', 'vtabel.heel.tabel'] },
        { label: 'Verbanden', ids: ['diagrammen.staaf.g56', 'diagrammen.lijn.g56', 'diagrammen.cirkel.g6', 'tabellen.niveau.g6'] }
      ] },
      { groep: 7, title: 'M7', items: [
        { label: 'Bewerkingen', ids: ['bplusmin.komma.tienden', 'bplusmin.komma.honderdsten', 'bplusmin.cijferen.pmet', 'bplusmin.cijferen.mmet', 'bkeer.cijferen.c2', 'bkeer.komma.verplaats', 'bdelen.cijferen.c1', 'bdelen.komma.d10'] },
        { label: 'Getalbegrip en getalrelaties', ids: ['getalgroot.t1000000.positie', 'getalgroot.t1000000.lijn', 'getalgroot.t1000000.woord', 'getalgroot.t1000000.afronden', 'komma.honderdsten.ordenen', 'komma.duizendsten.lijn'] },
        { label: 'Meten en meetkunde', ids: ['metriek.lengte.omr2', 'metriek.gewicht.omr2', 'metriek.inhoud.kub', 'metriek.omtrek.samen', 'metriek.opp.rechthoek', 'klok.min1.omzet', 'tijd.duurdig.min1', 'tijd.snelheid.kmu'] },
        { label: 'Verhoudingen', ids: ['procenten.n1.strook', 'procenten.n1.van', 'relatie.basis.bk', 'relatie.basis.bp', 'breuken.optel.gelijk', 'breuken.anders.van', 'vtabel.komma.beide', 'schaal.lengte.gelijk'] },
        { label: 'Verbanden', ids: ['diagrammen.lijn.g7', 'diagrammen.staaf.g7', 'diagrammen.cirkel.g7', 'tabellen.niveau.g7'] }
      ] },
      { groep: 7, title: 'E7', items: [
        { label: 'Bewerkingen', ids: ['bplusmin.komma.duizendsten', 'bplusmin.cijferen.m10k', 'bplusmin.groot.h1m', 'bkeer.cijferen.c4', 'bkeer.komma.split1', 'bdelen.cijferen.c3', 'bdelen.komma.tienden'] },
        { label: 'Getalbegrip en getalrelaties', ids: ['getalgroot.miljoen.komma', 'getalgroot.miljard.lijn', 'getalgroot.t1000000.ordenen', 'komma.duizendsten.ordenen', 'komma.duizendsten.afronden', 'komma.duizendsten.omschrijving'] },
        { label: 'Meten en meetkunde', ids: ['metriek.opp.driehoek', 'metriek.opp.samen', 'metriek.opp.omr1', 'metriek.opp.are', 'metriek.inhbereken.gelijk', 'metriek.inhoud.kubl', 'tijd.snelheid.duur'] },
        { label: 'Verhoudingen', ids: ['procenten.n2.van', 'procenten.n2.korting', 'relatie.basis.mix', 'breuken.optel.eenv', 'breuken.vereenv.vereenv', 'schaal.bereken.cmdm', 'vtabel.komma.tabel'] },
        { label: 'Verbanden', ids: ['diagrammen.lijn.g7', 'diagrammen.staaf.g7', 'diagrammen.cirkel.g7', 'diagrammen.beeld.complex', 'tabellen.niveau.g7'] }
      ] },
      { groep: 8, title: 'Doorstroomtoets', items: [
        { label: 'Bewerkingen - cijferen', ids: ['bplusmin.cijferen.pgroot', 'bplusmin.cijferen.mgroot', 'bkeer.cijferen.c4', 'bkeer.cijferen.c5', 'bdelen.cijferen.c4', 'bdelen.cijferen.c6', 'bdelen.cijferen.c8'] },
        { label: 'Bewerkingen', ids: ['bplusmin.komma.duizendsten', 'bplusmin.groot.h1m', 'bkeer.komma.split2', 'bdelen.komma.honderdsten', 'keer.handig.m25', 'delen.nullen.n5'] },
        { label: 'Getalbegrip en getalrelaties', ids: ['getalgroot.miljoen.komma', 'getalgroot.miljard.komma', 'getalgroot.miljard.lijn', 'getalgroot.t1000000.afronden', 'komma.duizendsten.ordenen', 'komma.duizendsten.afronden'] },
        { label: 'Meten - metriek stelsel', ids: ['metriek.lengte.omr2', 'metriek.gewicht.omr2', 'metriek.inhoud.alles', 'metriek.opp.omr2', 'metriek.opp.are', 'metriek.inhbereken.versch'] },
        { label: 'Meten - meetkunde', ids: ['metriek.omtrek.samen', 'metriek.opp.driehoek', 'metriek.opp.samen', 'metriek.opp.samendrie', 'metriek.inhbereken.gelijk'] },
        { label: 'Meten - klokkijken/tijd', ids: ['klok.min1.ana', 'klok.min1.omzet', 'tijd.duurana.min1', 'tijd.duurdig.min1', 'tijd.snelheid.kmu', 'tijd.snelheid.duur'] },
        { label: 'Verhoudingen - procenten', ids: ['procenten.n2.van', 'procenten.n3.van', 'procenten.n3.deel', 'procenten.n3.korting', 'procenten.n3.nieuw', 'procenten.n3.oud', 'relatie.lastig.kp'] },
        { label: 'Verhoudingen - verhoudingstabellen/schaal', ids: ['vtabel.heel.tabel', 'vtabel.komma.beide', 'vtabel.komma.tabel', 'schaal.lengte.km', 'schaal.bereken.cmdm', 'schaal.bereken.km'] },
        { label: 'Verhoudingen - breuken', ids: ['breuken.optel.moeil', 'breuken.verm.heelgem', 'breuken.verm.breukbreuk', 'breuken.delen.ongelijk', 'breuken.vereenv.vereenv', 'breuken.anders.totaal', 'relatie.lastig.bk'] },
        { label: 'Verbanden - diagrammen', ids: ['diagrammen.lijn.g8', 'diagrammen.staaf.g8', 'diagrammen.cirkel.g8', 'tabellen.niveau.g8'] }
      ] }
    ] },
  { id: 'iep', kind: 'toets', title: 'IEP', short: 'IEP', emoji: '🎯', color: '#E94C89',
    desc: 'Leerlingvolgsysteem: E3 t/m groep 7',
    note: 'Oefen per onderdeel van de toets. Dit zijn oefenopgaven in dezelfde stijl, geen echte toetsvragen.',
    sections: [
      { groep: 3, title: 'E3', items: [
        { label: 'Bewerkingen - plus- en minsommen tot 10', ids: ['plusmin.tot10.plus', 'plusmin.tot10.min', 'plusmin.tot10.stipplus', 'plusmin.tot10.stipmin', 'bplusmin.tot10.plus', 'bplusmin.tot10.min'] },
        { label: 'Bewerkingen - plus- en minsommen tot 20', ids: ['plusmin.tot20.dubbel', 'plusmin.tot20.plusbin', 'plusmin.tot20.minbin', 'plusmin.tot20.plusover', 'plusmin.tot20.minover'] },
        { label: 'Bewerkingen - vermenigvuldigen', ids: ['getal100.tot20.dubbel', 'plusmin.tot20.dubbel', 'getal100.tot100.vijftallen', 'getal100.tot100.sprong10', 'bkeer.begrip.plaatjes'] }, // vermenigvuldigen zit in de app vanaf groep 4
        { label: 'Getalbegrip tot 100', ids: ['getal100.tot100.rij', 'getal100.tot100.ordenen', 'getal100.tot100.lijn', 'getal100.tot100.aflezen', 'getal100.tot100.tl', 'getal100.tot100.woord'] },
        { label: 'Meten - geld', ids: ['geld.tot5.tellen', 'geld.tot5.betalen', 'geld.tot10.tellen', 'geld.tot10.betalen'] },
        { label: 'Meten - tijd', ids: ['klok.uren.ana', 'klok.half.ana', 'klok.half.dig', 'tijd.duurana.uren', 'tijd.duurana.half'] },
        { label: 'Meten - meetkunde', ids: ['meetkunde.tot10.tellen', 'meetkunde.tot10.plat', 'meetkunde.tot10.aanzicht'] }
      ] },
      { groep: 4, title: 'M4', items: [
        { label: 'Bewerkingen - optellen en aftrekken tot 100', ids: ['plusmin.tot20.plusover', 'plusmin.tot20.minover', 'plusmin.tot100.tienplus', 'plusmin.tot100.tienmin', 'plusmin.tot100.plusbin', 'plusmin.tot100.minbin'] },
        { label: 'Bewerkingen - vermenigvuldigen', ids: ['bkeer.begrip.plaatjes', 'keer.tafels10.t1', 'keer.tafels10.t2', 'keer.tafels10.t5', 'keer.tafels10.t10'] },
        { label: 'Bewerkingen - delen', ids: ['bdelen.begrip.plaatjes', 'getal100.tot20.dubbel', 'getal100.tot100.dubbel'] },
        { label: 'Getalbegrip en getalrelaties', ids: ['getal100.tot100.rij', 'getal100.tot100.ordenen', 'getal100.tot100.lijn', 'getal100.tot100.tientallen', 'getal100.tot100.sprong10', 'getal100.tot100.tl'] },
        { label: 'Meten - tijd', ids: ['klok.half.ana', 'klok.half.dig', 'klok.kwart.ana', 'klok.kwart.anaset', 'tijd.duurana.half', 'tijd.kalender.dag'] },
        { label: 'Meten - geld', ids: ['geld.tot10.tellen', 'geld.tot10.betalen', 'geld.tot20.tellen', 'geld.tot20.betalen'] },
        { label: 'Meten - metriek stelsel', ids: ['metriek.lengte.begrip', 'metriek.lengte.omr1'] },
        { label: 'Meten - meetkunde', ids: ['meetkunde.tot10.tellen', 'meetkunde.tot10.plat', 'meetkunde.tot10.aanzicht', 'meetkunde.tot25.tellen', 'meetkunde.tot25.plat', 'meetkunde.tot25.aanzicht'] }
      ] },
      { groep: 4, title: 'E4', items: [
        { label: 'Bewerkingen - optellen en aftrekken tot 100', ids: ['plusmin.tot100.plusbin', 'plusmin.tot100.minbin', 'plusmin.tot100.plusover', 'plusmin.tot100.minover', 'bplusmin.tot100.tien', 'bplusmin.tot100.eenover'] },
        { label: 'Bewerkingen - vermenigvuldigen', ids: ['bkeer.begrip.plaatjes', 'keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9'] },
        { label: 'Bewerkingen - delen', ids: ['bdelen.begrip.plaatjes', 'getal100.tot20.dubbel', 'getal100.tot100.dubbel'] },
        { label: 'Getalbegrip en getalrelaties', ids: ['getal100.tot100.lijn', 'getal100.tot100.aflezen', 'getal100.tot100.woord', 'getal100.tot100.dubbel', 'getal100.tot100.vijftallen', 'getal100.tot100.ordenen'] },
        { label: 'Meten - tijd', ids: ['klok.kwart.ana', 'klok.kwart.dig', 'klok.kwart.omzet', 'tijd.duurana.kwart', 'tijd.kalender.dag', 'tijd.kalender.begrip'] },
        { label: 'Meten - meetkunde', ids: ['meetkunde.tot10.tellen', 'meetkunde.tot10.plat', 'meetkunde.tot10.aanzicht', 'meetkunde.tot25.tellen', 'meetkunde.tot25.plat', 'meetkunde.tot25.aanzicht'] },
        { label: 'Meten - geld', ids: ['geld.tot20.tellen', 'geld.tot20.betalen', 'geld.tot50.tellen', 'geld.tot50.betalen'] },
        { label: 'Meten - metriek stelsel', ids: ['metriek.lengte.begrip', 'metriek.lengte.omr1'] }
      ] },
      { groep: 5, title: 'M5', items: [
        { label: 'Bewerkingen - optellen en aftrekken', ids: ['plusmin.tot100.plusover', 'plusmin.tot100.minover', 'plusmin.tot1000.honderd', 'plusmin.tot1000.tienbin', 'bplusmin.tot1000.tbp', 'bplusmin.tot1000.tbm'] },
        { label: 'Bewerkingen - delen', ids: ['bdelen.begrip.plaatjes', 'delen.deel10.d2', 'delen.deel10.d3', 'delen.deel10.d4', 'delen.deel10.d5', 'delen.deel10.d10'] },
        { label: 'Bewerkingen - vermenigvuldigen', ids: ['keer.tafels10.t3', 'keer.tafels10.t4', 'keer.tafels10.t6', 'keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'bkeer.nullen.n1'] },
        { label: 'Getalbegrip en getalrelaties', ids: ['getalgroot.t1000.rij', 'getalgroot.t1000.ordenen', 'getalgroot.t1000.lijn', 'getalgroot.t1000.aflezen', 'getalgroot.t1000.positie', 'getalgroot.t1000.sprongen'] },
        { label: 'Meten - geld', ids: ['geld.tot20.betalen', 'geld.tot50.betalen', 'geld.tot100.tellen', 'geld.tot100.betalen', 'geld.tot500.tellen'] },
        { label: 'Meten - tijd', ids: ['klok.kwart.dig', 'klok.min10.ana', 'klok.min5.ana', 'tijd.duurana.kwart', 'tijd.duurdig.half', 'tijd.kalender.begrip'] },
        { label: 'Meten - meetkunde', ids: ['meetkunde.tot10.aanzicht', 'meetkunde.tot25.tellen', 'meetkunde.tot25.plat', 'meetkunde.tot25.aanzicht'] },
        { label: 'Meten - metriek stelsel', ids: ['metriek.lengte.begrip', 'metriek.lengte.omr1', 'metriek.gewicht.begrip', 'metriek.gewicht.omr1'] }
      ] },
      { groep: 5, title: 'E5', items: [
        { label: 'Bewerkingen - optellen en aftrekken', ids: ['plusmin.tot1000.tienover', 'plusmin.tot1000.htbin', 'plusmin.tot1000.htover', 'bplusmin.tot1000.htop', 'bplusmin.tot1000.htom', 'bplusmin.tot1000.alle'] },
        { label: 'Bewerkingen - vermenigvuldigen', ids: ['keer.tafels10.t7', 'keer.tafels10.t8', 'keer.tafels10.t9', 'bkeer.nullen.n1', 'bkeer.nullen.n2', 'bkeer.splitsen.s1', 'bkeer.splitsen.s2'] },
        { label: 'Bewerkingen - delen', ids: ['delen.deel10.d6', 'delen.deel10.d7', 'delen.deel10.d8', 'delen.deel10.d9', 'bdelen.rest.rest', 'bdelen.nullen.n1'] },
        { label: 'Getalbegrip tot 10.000', ids: ['getalgroot.t10000.rij', 'getalgroot.t10000.ordenen', 'getalgroot.t10000.lijn', 'getalgroot.t10000.aflezen', 'getalgroot.t10000.positie', 'getalgroot.t10000.afronden', 'getalgroot.t10000.woord'] },
        { label: 'Meten - klokkijken', ids: ['klok.min10.ana', 'klok.min5.ana', 'klok.min5.anaset', 'klok.min5.dig', 'klok.min5.digset', 'klok.min5.omzet'] },
        { label: 'Meten - geld', ids: ['geld.tot20.betalen', 'geld.tot50.betalen', 'geld.tot100.tellen', 'geld.tot100.betalen', 'geld.tot500.tellen'] },
        { label: 'Meten - tijd', ids: ['tijd.duurana.kwart', 'tijd.duurana.min5', 'tijd.duurdig.kwart', 'tijd.duurdig.min5', 'tijd.kalender.begrip', 'tijd.kalender.maanden'] },
        { label: 'Meten - metriek stelsel', ids: ['metriek.lengte.begrip', 'metriek.lengte.omr1', 'metriek.gewicht.begrip', 'metriek.gewicht.omr1'] },
        { label: 'Meten - meetkunde', ids: ['meetkunde.tot10.aanzicht', 'meetkunde.tot25.tellen', 'meetkunde.tot25.plat', 'meetkunde.tot25.aanzicht'] },
        { label: 'Verhoudingen - schaal', ids: ['schaal.lengte.gelijk', 'metriek.lengte.omr1'] } // schaal zit in de app vanaf groep 7: dichtstbijzijnde oefeningen
      ] },
      { groep: 6, title: 'M6', items: [
        { label: 'Bewerkingen - optellen en aftrekken', ids: ['bplusmin.tot1000.alle', 'plusmin.tot1000.htover', 'bplusmin.tot1000.htom', 'bplusmin.groot.h10k', 'bplusmin.groot.pos4'] },
        { label: 'Bewerkingen - delen', ids: ['delen.nullen.n1', 'delen.nullen.n2', 'bdelen.nullen.n2', 'bdelen.rest.rest', 'bdelen.rest.split1', 'bdelen.rest.split2'] },
        { label: 'Bewerkingen - vermenigvuldigen', ids: ['keer.nullen.n1', 'keer.nullen.n2', 'keer.nullen.n3', 'bkeer.splitsen.s1', 'bkeer.splitsen.s2', 'keer.handig.m10', 'keer.handig.m25'] },
        { label: 'Bewerkingen - cijferen', ids: ['bplusmin.cijferen.pzonder', 'bplusmin.cijferen.pmet', 'bplusmin.cijferen.mzonder', 'bplusmin.cijferen.mmet', 'bkeer.cijferen.c1', 'bdelen.cijferen.c1'] }, // cijferen zit in de app vanaf groep 7: dichtstbijzijnde oefeningen
        { label: 'Getalbegrip tot 10.000', ids: ['getalgroot.t10000.rij', 'getalgroot.t10000.ordenen', 'getalgroot.t10000.lijn', 'getalgroot.t10000.aflezen', 'getalgroot.t10000.positie', 'getalgroot.t10000.afronden', 'getalgroot.t10000.woord'] },
        { label: 'Meten - metriek stelsel', ids: ['metriek.lengte.omr1', 'metriek.lengte.omr2', 'metriek.gewicht.omr1', 'metriek.inhoud.begrip', 'metriek.inhoud.omr1', 'metriek.omtrek.rechthoek'] },
        { label: 'Meten - geld/tijd', ids: ['geld.tot100.tellen', 'geld.tot500.betalen', 'klok.min1.ana', 'klok.min1.omzet', 'tijd.duurana.min5', 'tijd.duurdig.min5'] },
        { label: 'Meten - meetkunde', ids: ['meetkunde.tot25.tellen', 'meetkunde.tot25.plat', 'meetkunde.tot25.aanzicht', 'metriek.omtrek.rechthoek', 'metriek.omtrek.samen'] },
        { label: 'Verbanden - diagrammen', ids: ['diagrammen.staaf.g56', 'diagrammen.lijn.g56', 'diagrammen.cirkel.g6', 'diagrammen.beeld.complex', 'tabellen.niveau.g6'] },
        { label: 'Verhoudingen', ids: ['breuken.begrip.welk', 'breuken.begrip.kleur', 'breuken.begrip.lijn', 'breuken.anders.van', 'vtabel.heel.onder', 'vtabel.heel.beide'] }
      ] },
      { groep: 6, title: 'E6', items: [
        { label: 'Bewerkingen - optellen en aftrekken', ids: ['bplusmin.groot.h10k', 'bplusmin.groot.h1m', 'bplusmin.groot.pos4', 'bplusmin.groot.pos6', 'bplusmin.tot1000.alle', 'plusmin.tot1000.htover'] },
        { label: 'Bewerkingen - delen/vermenigvuldigen', ids: ['keer.nullen.n3', 'keer.handig.m25', 'bkeer.splitsen.s2', 'delen.nullen.n3', 'bdelen.rest.rest', 'bdelen.rest.split2'] },
        { label: 'Bewerkingen - cijferen', ids: ['bplusmin.cijferen.pmet', 'bplusmin.cijferen.p10k', 'bplusmin.cijferen.mmet', 'bplusmin.cijferen.m10k', 'bkeer.cijferen.c2', 'bkeer.cijferen.c3', 'bdelen.cijferen.c1'] }, // cijferen zit in de app vanaf groep 7: dichtstbijzijnde oefeningen
        { label: 'Getalbegrip kommagetallen', ids: ['komma.tienden.rij', 'komma.tienden.lijn', 'komma.tienden.aflezen', 'komma.tienden.omschrijving', 'komma.tienden.ordenen', 'komma.honderdsten.lijn', 'komma.honderdsten.ordenen'] },
        { label: 'Meten - metriek stelsel', ids: ['metriek.lengte.omr2', 'metriek.gewicht.omr2', 'metriek.inhoud.omr1', 'metriek.inhoud.kub', 'metriek.omtrek.rechthoek', 'metriek.omtrek.samen'] },
        { label: 'Meten - tijd', ids: ['klok.min1.ana', 'klok.min1.digset', 'klok.min1.omzet', 'tijd.duurana.min5', 'tijd.duurdig.min5', 'tijd.duurdig.min1'] },
        { label: 'Verhoudingen - breuken', ids: ['breuken.begrip.welk', 'breuken.begrip.kleur', 'breuken.begrip.lijn', 'breuken.begrip.orde', 'breuken.anders.aanvul', 'breuken.anders.van', 'breuken.anders.deel'] },
        { label: 'Verhoudingen - procenten', ids: ['procenten.n1.strook', 'procenten.n1.van', 'breuken.anders.van', 'breuken.begrip.kleur'] }, // procenten zitten in de app vanaf groep 7: dichtstbijzijnde oefeningen
        { label: 'Verhoudingen - schaal', ids: ['schaal.lengte.gelijk', 'schaal.lengte.cmm', 'vtabel.heel.onder', 'vtabel.heel.beide'] }, // schaal zit in de app vanaf groep 7: dichtstbijzijnde oefeningen
        { label: 'Verbanden - diagrammen', ids: ['diagrammen.staaf.g56', 'diagrammen.lijn.g56', 'diagrammen.cirkel.g6', 'diagrammen.beeld.complex', 'tabellen.niveau.g6'] }
      ] },
      { groep: 7, title: '<1F - 1F - 1S', items: [
        { label: 'Bewerkingen - vermenigvuldigen/delen', ids: ['bkeer.komma.verplaats', 'bkeer.komma.split1', 'bkeer.splitsen.s2', 'keer.handig.m25', 'bdelen.komma.d10', 'bdelen.komma.tienden', 'delen.nullen.n4', 'bdelen.rest.split2'] },
        { label: 'Bewerkingen - cijferen', ids: ['bplusmin.cijferen.pmet', 'bplusmin.cijferen.p10k', 'bplusmin.cijferen.mmet', 'bplusmin.cijferen.m10k', 'bkeer.cijferen.c2', 'bkeer.cijferen.c4', 'bdelen.cijferen.c1', 'bdelen.cijferen.c3'] },
        { label: 'Bewerkingen - optellen/aftrekken', ids: ['bplusmin.groot.h10k', 'bplusmin.groot.h1m', 'bplusmin.groot.pos6', 'bplusmin.komma.tienden', 'bplusmin.komma.honderdsten', 'bplusmin.komma.duizendsten'] },
        { label: 'Getalbegrip kommagetallen', ids: ['komma.honderdsten.lijn', 'komma.honderdsten.ordenen', 'komma.honderdsten.afronden', 'komma.duizendsten.lijn', 'komma.duizendsten.aflezen', 'komma.duizendsten.ordenen', 'komma.duizendsten.omschrijving'] },
        { label: 'Meten - klokkijken/tijd/geld', ids: ['klok.min1.ana', 'klok.min1.omzet', 'tijd.duurana.min1', 'tijd.duurdig.min1', 'tijd.snelheid.kmu', 'geld.tot500.betalen'] },
        { label: 'Meten - metriek stelsel', ids: ['metriek.lengte.omr2', 'metriek.gewicht.omr2', 'metriek.inhoud.kubl', 'metriek.omtrek.samen', 'metriek.opp.rechthoek', 'metriek.opp.omr1', 'metriek.inhbereken.gelijk'] },
        { label: 'Verhoudingen - breuken', ids: ['breuken.optel.gelijk', 'breuken.optel.eenv', 'breuken.vereenv.vereenv', 'breuken.vereenv.helen', 'breuken.anders.van', 'breuken.anders.totaal', 'relatie.basis.bk'] },
        { label: 'Verhoudingen - procenten', ids: ['procenten.n1.van', 'procenten.n1.deel', 'procenten.n1.korting', 'procenten.n2.van', 'procenten.n2.nieuw', 'relatie.basis.bp', 'relatie.basis.kp'] },
        { label: 'Verhoudingen - schaal', ids: ['schaal.lengte.gelijk', 'schaal.lengte.cmm', 'schaal.lengte.km', 'schaal.bereken.gelijk', 'schaal.bereken.cmdm', 'vtabel.komma.beide'] },
        { label: 'Verbanden - diagrammen', ids: ['diagrammen.lijn.g7', 'diagrammen.staaf.g7', 'diagrammen.cirkel.g7', 'tabellen.niveau.g7'] }
      ] }
    ] }
];
