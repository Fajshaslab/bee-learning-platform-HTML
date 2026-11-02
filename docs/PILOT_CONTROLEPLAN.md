# BEE Learning Platform — pilotcontrole vóór echte studenten

**Status: nog UIT TE VOEREN.** In v1.2 zijn 44 automatische code-/contracttests uitgevoerd, inclusief gesimuleerde Auth-antwoorden, maar geen externe Supabase-database, publieke GitHub Pages-site of live browserflow is hier doorgelicht. Dit plan is een aanvullend controleplan en vervangt niet de 846 goedgekeurde acceptatiescenario's.

## 1. Snelle demonstratiecontrole

1. Open een schone browser, bezoek de lokale site (`npm run dev`, `http://localhost:5173/`).
2. Kies **Open demonstratie**. Het dashboard toont het eerste onafgeronde onderdeel.
3. Open de eerste les via **Verder leren**; wijzig HTML en wacht op **Alleen lokaal opgeslagen**.
4. Vernieuw de pagina, open de demonstratie opnieuw en open dezelfde les. Het eerdere concept moet terugkomen.
5. Voer de eerste les af in de demo, controleer dat de tweede les opent, maar de volgende module vergrendeld blijft.
6. Pas na vijf demo-lessen hoort modulecheck 1 beschikbaar te zijn. Controleer ook dat niet iedere vraag de eerste optie als antwoord heeft.
7. Controleer de scriptblokkering: voeg `<script>parent.document.body.textContent='misbruik'</script>` toe aan de HTML-preview. De hoofdapplicatie mag niet wijzigen.
8. Export en import: download een lokaal concept, pas code aan, importeer het juiste JSON-bestand en controleer de herstelde code.
9. Test 320 px breedte, toetsenbordnavigatie, foutmeldingen en hoge zoom. Dit zijn handmatige controles, geen resultaten in het acceptatieregister.

## 2. Supabase-inrichting en accountcontrole

Gebruik **uitsluitend een nieuw testproject** en twee afzonderlijke **testaccounts A en B**; geen echte persoonsgegevens.

1. Activeer emailverificatie in Supabase Auth, configureer de toegestane redirects en voer `supabase/schema.sql` uit.
2. Test A: register met een onbevestigd e-mailadres. Het account mag geen les registreren en geen concept met de RPC opslaan.
3. Bevestig e-mail van A, log in en haal `lesson_completions`, `module_completions`, `student_drafts` op. Deze lijsten moeten voor een nieuw account leeg zijn.
4. Probeer direct module 2, les 1 via de URL te openen: deze hoort vergrendeld te zijn.
5. Probeer een **directe RPC** voor `submit_lesson` met `p_lesson_id: 'm8-l5'`, en voor `save_student_draft` met `p_exercise_id: 'm8-l5'`. De server moet weigeren omdat de vereiste voorgeschiedenis ontbreekt. **Belangrijk**: alleen de zichtbare UI testen is hiervoor niet genoeg.
6. Test A: registreer les 1 met geldige broncode. Controleer dat het resultaat eigendom is van A; test B mag dat resultaat niet kunnen ophalen.
7. Log in als B en controleer via de Data API dat B de resultaten en concepten van A niet kan uitlezen of wijzigen.
8. Test een conceptconflict met hetzelfde testaccount op twee apparaten. Bewaar een nieuwe revisie op apparaat A en probeer een oudere revisie vanuit apparaat B te uploaden. De server hoort `conflict: true` terug te geven zonder overschrijven.
9. Controleer dat directe `INSERT`/`UPDATE`/`DELETE` op `lesson_completions`, `module_completions` en `student_drafts` met de publiek beschikbare sleutel worden afgewezen.
10. Probeer een modulecheck vóór het afronden van alle vijf lessen. De server moet weigeren.
11. Test password reset en controleer dat `logout?scope=global` is geslaagd en dat andere apparaten niet opnieuw kunnen refreshen. Bestaande kortlevende access tokens kunnen nog geldig blijven tot hun expiratie.
12. Test uitgeklapte accounts op meerdere apparaten, sessie-idle, en conflictmeldingen. Documenteer afwijzingen en console-/API-fouten.

**Waarschuwing:** correct-antwoorden en technische lescriteria zijn in de statische frontend zichtbaar. De modulecheck is een **zelfcontrole**, geen fraude-resistente toets en geen bewijs van beheersing. Voor formele resultaten moet toetsinhoud en beoordelingsproces opnieuw ontworpen worden.

## 3. Browserautomatisering en hosting

- Test aanmelding, e-mailbevestiging, wachtwoordherstel, login, voortgang, conceptopslag, modulechecks, sessieverloop en offline/herstel in een echte browser.
- Test Chrome/Brave, Firefox en Safari op desktop en mobiel. Controleer focus, toetsenbord en voorleesondersteuning.
- Configureer de GitHub Pages-publicatie (`Settings > Pages > GitHub Actions`), zorg voor HTTPS en verifieer dat alle routes en het herstelredirect werken op het definitieve domein.
- Controleer dat **geen** service-role-key of databasewachtwoord in `config.js`, `dist/` of de GitHub-repository staat.
- Zet privacybeleid, gegevensbewaartermijn, verwijderverzoeken, logging/monitoring en back-ups op vóór gebruik met echte studenten.

## 4. Releasecriterium

**Niet live voor echte studenten zolang de Supabase-negatievetests, privacy-/beveiligingsreview en browsercontroles niet zijn afgetekend.** De 846 acceptatiescenario's blijven afzonderlijk gepland en zijn niet door deze nieuwe 27 unit-tests als voltooid aangemerkt.

## Nieuw in v1.2 — uitvoerbare live RLS/API-controle

Lees `docs/PILOT_SUPABASE_LIVE_TEST.md` en draai pas na het maken van twee nieuwe geverifieerde testaccounts `npm run pilot:live`. Deze stap is niet hier uitgevoerd. Een geslaagde live smoke-test vervangt nog geen volledige browser-/security-audit.
