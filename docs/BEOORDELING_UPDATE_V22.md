# Beoordelingsupdate v2.2

De browser gebruikt `src/assessment.js`. De officiële afronding gebruikt onafhankelijk daarvan de Supabase `public.bee_validate_exercise`-functie binnen `public.submit_lesson`. Beide controleren een zinvolle minimale structuur per oefening.

## Controles

- HTML: niet alleen een losse openingstag, maar niet-lege inhoud en de vereiste structuur. Voor links tellen bestemming en beschrijvende tekst; voor afbeeldingen `src` en zinvolle `alt`; voor een label de koppeling `for`/`id`. HTML-commentaar telt niet.
- CSS: alleen de juiste selector met de gevraagde eigenschap en bruikbare waarde; `display:flex` en `display:grid` zijn onderscheiden. CSS-commentaar telt niet.
- JavaScript: eenvoudige structurele patronen i.p.v. losse trefwoorden; comments en geciteerde API-tekst worden genegeerd. De code wordt nooit uitgevoerd in de les-preview.
- SQL: dezelfde basisvoorwaarden bij officiële registratie; behoud van bestaande servercontrole op sessie, verificatie en lineaire leerroute. Migratie is één transactie.

## Regressie

- 40 uitgewerkte lesvoorbeelden moeten in de browser geaccepteerd worden.
- Minstens 26 ongeldige voorbeelden moeten geweigerd worden.
- SQL-migratie bevat 40 positieve en 8 negatieve checks die de uitrol bij een fout rollbacken.
- `npm test` test lokaal alleen broncode en servercontracten; **geen live PostgreSQL**.
- End-to-endtests voor demomodus zitten in `tests/e2e`, maar kunnen alleen in een browseromgeving uitgevoerd worden die lokaal netwerk toestaat.

## Beperkingen

Statische patrooncontroles zijn geen parser, geen runtime-test en geen betekenisvolle beoordeling van de eigen tekst van de student. Een opzettelijk slimme poging kan de controle mogelijk nog omzeilen; geldige maar exotische syntax kan afgewezen worden. Modulecheck-antwoorden zijn client-side zichtbaar en daardoor geen fraudebestendige toets. Echte twee-gebruikers-RLS-test is niet uitgevoerd. Dit pakket wijzigt geen van die onderdelen.

## Live toepassing

1. Patchcode samenvoegen; `npm run check`, `npm test`, `npm run build`.
2. Commit en push. GitHub Actions moet groen zijn.
3. SQL Editor: `supabase/migrations/20261102_strengere_beoordeling.sql` uitvoeren. Geen `schema.sql` opnieuw draaien.
4. Nieuwe les met het eigen account afronden; controleren of voortgang behouden blijft na opnieuw inloggen.
