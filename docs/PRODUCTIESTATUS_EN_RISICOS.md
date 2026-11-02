# BEE Learning Platform v2.3 — productiestatus en resterende risico's

**Peildatum:** 2 november 2026  
**Doel:** transparant overzicht voor de bootcampbegeleider en opdrachtgever. Geen voorstel om studenten als testers in te zetten.

## Wat al aantoonbaar is vastgesteld

| Onderdeel | Bewijs / waarneming | Status |
|---|---|---|
| Website gepubliceerd | GitHub Pages opent bij projecteigenaar | Bevestigd |
| Automatische projecttests | v2.3: 146 Node-tests geslaagd; volledige demo-leerroute 40 lessen / 8 modulechecks is getest | Bevestigd voor testbereik |
| GitHub Actions | Publicatie en browserworkflow zijn bij eerdere uitrol groen getoond; nieuwe commits opnieuw controleren | Bevestigd voor getoonde uitvoeringen |
| Eigen account | Registratie, verificatie en inloggen door eigenaar gebruikt | Bevestigd voor één account |
| Voortgang op tweede apparaat | Eerder afgeronde lessen zichtbaar op telefoon met hetzelfde account | Bevestigd voor één account |
| RLS-configuratie | Vijf tabellen met RLS; eigen-record-SELECT-regels voor voortgang en concepten gecontroleerd | Configuratie bevestigd |
| RPC-uitvoeringsrechten | Vier SECURITY DEFINER-functies: anoniem geen EXECUTE; ingelogd wel; `search_path` beperkt | Configuratie bevestigd |
| v2.2 SQL-migratie | Supabase SQL Editor toonde `Success. No rows returned` | Uitvoering bevestigd |
| Negatieve beoordelingstest | HTML-link zonder `href` in online omgeving afgekeurd | Eén praktijkgeval bevestigd |

## Risico's die hiermee niet verdwenen zijn

| Prioriteit | Risico | Waarom relevant | Redelijke beheersmaatregel |
|---|---|---|---|
| **Hoog** | Multi-accountisolatie niet live negatief getest | RLS-regels en functierechten zien er goed uit, maar bewijzen niet dat gebruiker A nooit gegevens van B kan lezen of wijzigen; `SECURITY DEFINER` vereist extra aandacht | Laat vóór gebruik met echte persoonsgegevens een onafhankelijke gerichte toegangscontrole uitvoeren (met geautoriseerde afzonderlijke identiteiten of een geïsoleerde auditomgeving), zonder bootcampstudenten te belasten |
| **Hoog** | Account- en herstelrandgevallen niet volledig geverifieerd | Wachtwoordherstel, e-mailwijziging, vervallen sessies en accountverwijdering kunnen misgaan bij een echt incident | Valideer de belangrijke herstelprocedures gecontroleerd, laat persoonsgegevens niet als testdata rondgaan |
| **Hoog** | Privacy-/AVG-afspraken en operationele ondersteuning nog niet aangetoond | E-mailadressen, studievoortgang en codeconcepten worden verwerkt | Regel intern privacy-informatie, verwerkersafspraken, bewaartermijnen, toegangsbeheer, contactpunt en incidentafhandeling |
| **Middel** | JavaScript wordt niet uitgevoerd | Een statische herkenningscontrole kan geen correcte werking of begrip bewijzen | Gebruik de automatische beoordeling als oefenminimum, niet als formele competentietoets; docent beoordeelt relevante eindopdracht zelfstandig |
| **Middel** | Modulecheck-antwoorden bestaan in de publieke clientbundel | Een leerling kan antwoorden achterhalen; niet fraudebestendig | Modulechecks expliciet als oefenchecks behandelen, niet als onafhankelijk certificeringsexamen |
| **Middel** | Conceptopslag heeft lokale en remote staten | Offline werken, meerdere apparaten en browserverlies kunnen conceptconflicten geven | Leer studenten opslagstatus, synchronisatie en JSON-export kennen; supportprocedure gebruiken |
| **Middel** | Tokenopslag en clientbeveiliging | Tokens in `localStorage`; een XSS-kwetsbaarheid kan daarmee meer impact krijgen | Onafhankelijke websecurityreview, strakke CSP en dependency-/codecontrole vóór grootschalig gebruik |
| **Middel** | Niet alle leertijd en toegankelijkheid beoordeeld | 35–40 uur lesduur en breedte van toegankelijkheid zijn nog geen gevalideerde uitkomst | Docentredactie op basis van bestaande lessen en gericht technisch toegankelijkheidsonderzoek zonder studentenpilot |
| **Laag / proces** | Geen volledig productie-monitoring- of restore-proces beschreven | Een incident kan langer duren als niemand eigenaar is | Wijs een beheerder aan en documenteer herstel, back-ups en communicatie |

## Beslisregel voor gebruik

- **Openbare demonstratie:** bruikbaar voor bekijken en oefenen, zolang duidelijk blijft dat demo-voortgang niet officieel is.
- **Eigen account van de begeleider:** de bevestigde login en synchronisatie tonen dat de kernstroom werkt.
- **Betaalde bootcamp met echte studenten:** geen onvoorwaardelijk 'volledig veilig / volledig getest'-stempel. Vooral multi-accountisolatie en operationele privacy-/herstelafspraken verdienen een gerichte beoordeling **vóór** het opslaan van echte deelnemersgegevens.

Deze beoordeling vereist **geen studentenpilot, geen nep-e-mailaccounts en geen nieuwe cursusversie**. Het gaat om de beveiligings- en operationele verantwoordelijkheid van de beheerder of een onafhankelijke technische reviewer, niet om proefgebruik door betalende deelnemers.

## Release- en beheerdiscipline

1. Houd `v2.3.0` als herkenbaar codeherstelpunt.
2. Verander `supabase/schema.sql` of al uitgevoerde migraties niet achteloos.
3. Laat bij een codewijziging beide GitHub Actions-workflows slagen.
4. Maak bij een storing eerst onderscheid tussen GitHub Pages (website), Supabase Auth (account), database/RPC (officiële voortgang) en lokale browseropslag (conceptcode).
5. Maak alleen gerichte bugfixes; registreer wat is veranderd en met welke test het is gecontroleerd.
