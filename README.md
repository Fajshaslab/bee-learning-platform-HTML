# BEE Learning Platform — geconsolideerd project

**Eén zelfstandig, downloadbaar project met herzien begeleid lesmateriaal.** Dit is een opnieuw opgebouwde statische webapp op basis van de eerder goedgekeurde BEE-functionele eisen en stijl. **Niet** een kopie van de eerdere lokale React/Vite-projectmap op jouw computer.

## Meteen beginnen

1. Pak de ZIP uit en open de hoofdmap in **Visual Studio Code**.
2. Node.js 20 of nieuwer is nodig.
3. Open een terminal in de hoofdmap en voer `npm run dev` uit.
4. Ga naar `http://localhost:5173/` en kies **Open demonstratie**.

Geen `npm install` nodig: deze versie gebruikt alleen Node.js en browser-API's. De applicatie gebruikt hash-routes, zodat GitHub Pages onder `/repositorynaam/` ook werkt.

## Nieuw: eerst uitleggen, dan oefenen

Elke les toont nu vóór de praktijkopdracht het leerdoel, voorkennis, nieuwe begrippen, een uitgewerkt codevoorbeeld met uitleg, concrete oefenstappen, verwachte uitkomst, veelgemaakte fout en zelfcontrolevragen. Bekijk `docs/LESSEN_DIDACTISCH_HERZIEN.md` voor de correcties en de openstaande inhoudelijke beperkingen.

## Functies

| Onderdeel | In dit pakket | Extra vereisten voor echte studenten |
|---|---|---|
| Inlogscherm, dashboard, modules, lessen, checks, afronding | Ja | Productietoegang en gebruikersflows testen |
| 8 modules / 40 lessen / 8 checks met 5 vragen | Ja; 40 begeleide gidsen met voorbeelden en concrete stappen | Didactische redactie, leerlingtests en uitbreiden van 60-minutenlesduur |
| HTML/CSS-editor + sandboxpreview | Ja, textarea-editor | Browsersandbox- en toegankelijkheidstests |
| JavaScript-code schrijven | Ja | **Uitvoeren nog uit** (eerst aparte origin/sandbox) |
| Lineaire leerroute | Demo lokaal; accountserver via SQL | Schema toepassen en RLS live testen |
| Accounts, e-mailverificatie, login/herstel | Integratiecode aanwezig | Supabase en werkende e-mail/redirects |
| Voortgang per student | Tabellen/RLS/RPC aanwezig | Supabase en live verificatie |
| Lokale conceptopslag, JSON import/export | Ja, IndexedDB | Privacy, browser- en crashtests |
| Concepten tussen apparaten | Optimistische serverrevisies en automatische sync na bewerken/herstel verbinding | Twee echte accounts, twee apparaten, conflictproeven |
| Offline heropenen | Service worker met applicatieshell | Eerst online laden; HTTPS of localhost; browsers testen |
| 115/120 min sessiewaarschuwing/verloop | Clientmechanisme met export bij mislukte opslag | Multi-device / echte Auth-test; geen directe JWT-intrekking |
| Wachtwoordherstel en e-mail wijzigen | Integratiecode | Echte e-mailflow testen; herstelcodes ontbreken |
| Account verwijderen | Eigen-account-RPC inclusief cascade, UI met dubbele bevestiging | Eerst in testdatabase controleren |

### Belangrijke veiligheidsgrenzen

- **Geen formele certificering:** clientcode bevat de antwoorden van de demonstratiemodulechecks. Die toetsen zijn leerhulpmiddelen, geen fraudebestendig examen; toegang en officiële registratie worden via de server gecontroleerd, maar de antwoorden zijn niet geheim. Voor formele examens zijn een privaat vragenbestand, servergegenereerde toetsen, rate limiting en beoordeling door de docent nodig.
- **Broncodecontrole is bewust eenvoudig.** Een HTML-tag herkennen is niet hetzelfde als begrip van een onderwerp toetsen. Een leerling kan syntactisch passende maar inhoudelijk onjuiste code invullen. Gebruik formele voortgang niet als kwaliteitsbewijs zonder de beoordelingscriteria te verbeteren.
- **JavaScript wordt niet uitgevoerd** in de preview; HTML/CSS wel, in een iframe zonder sandboxprivileges en met een strikte CSP. Een volwaardige JS-sandbox vereist isolatie op een aparte origin en aanvullende controles.
- **RLS en RPC moeten op een echte Supabase-database worden getest.** Het SQL-bestand wordt lokaal inhoudelijk gecontroleerd, maar zonder externe testdatabase niet daadwerkelijk door Postgres uitgevoerd.
- **Niet alle 846 acceptatiescenario's zijn uitgevoerd.** Het oorspronkelijke geplande register is opgenomen in `docs/`.
- **De lesbesteding is niet gevalideerd.** Er staan 40 lessen met een planningswaarde van 60 minuten; het is geen empirisch geteste cursus van 40 uur.
- **Geen garantie tegen browseropslageviction, plotselinge crashes of gelijktijdig editen vanaf meerdere tabbladen.** Exporteer belangrijk conceptwerk.
- **Tokens in localStorage** zijn een beheersbare prototypekeuze, geen ideale beveiliging voor een hoog-risico-applicatie. Laat een securityreview uitvoeren vóór grootschalig gebruik.

## Echte accounts: Supabase aansluiten (eenmalig)

1. Maak een [Supabase-project](https://supabase.com/dashboard), bij voorkeur **eerst een afzonderlijk testproject**. De database en Auth draaien niet in dit ZIP-bestand.
2. In **Authentication → Providers → Email** zet je e-mailverificatie aan. Zorg voor werkende uitgaande e-mail (voor een echte pilot meestal een eigen SMTP-provider).
3. Open **SQL Editor** en voer `supabase/schema.sql` uit. Het schema maakt lesson/module-completions en concepten met RLS, serverfuncties voor volgorde en checks, conflictversies en accountverwijdering. Controleer de SQL vooraf en maak backups van bestaande databases; dit schema is opgesteld voor een nieuwe installatie.
4. Ga naar de API-instellingen van het Supabase-project. Zet in `config.js` **alleen** jouw project-URL en de **publieke** anon- of publishable-key. Gebruik NOOIT service-role, `sb_secret_`, databasewachtwoord of andere geheime sleutels. `npm run check` voert een extra herkenbare-secretcontrole uit.
5. Zet **Authentication → URL Configuration → Site URL** op de exacte publicatie-URL (`https://GEBRUIKER.github.io/REPO/`). Voeg `http://localhost:5173/` en de definitieve publicatie-URL toe aan de toegestane redirect-URL's voor verificatie en wachtwoordherstel. Zorg dat de redirect bij dezelfde hostingbasis uitkomt.
6. Test eerst registreren, bevestigingsmail openen, login, herstelmail, nieuw wachtwoord, e-mailwijziging, uitloggen en opnieuw inloggen. Daarna pas echte studenten.
7. Volg `docs/PILOT_SUPABASE_LIVE_TEST.md` met twee **nieuwe, afzonderlijke, bevestigde** testaccounts voor RLS en revisieconflicten. `npm run pilot:live` doet rechtstreeks toegangscontroles via HTTP. Het script wijzigt testgegevens; gebruik geen echte studentaccounts.
8. Laat tijdens de pilot iemand de uitgevoerde acceptatiescenario's vastleggen en beoordeel privacy/AVG, bewaartermijnen, herstelbaarheid, backups en toegankelijkheid.

**LET OP bij schemawijzigingen:** de generator scripts uit oudere ZIP-bestanden zijn bewust niet meer inbegrepen. Dit is de autoritatieve eindversie van `data/curriculum.js` en `supabase/schema.sql`; het opnieuw draaien van oude generators zou nieuwe inhoud en beveiligingsaanpassingen overschrijven.

## GitHub Pages: eenmalige publicatie

Maak een lege repository op GitHub, bijvoorbeeld `bee-learning-platform`. In VS Code onder deze uitgepakte map:

```cmd
git init
git branch -M main
git add .
git commit -m "BEE Learning Platform - consolidated project"
git remote add origin https://github.com/JE-GITHUB-NAAM/JE-REPO.git
git push -u origin main
```

Ga naar **GitHub → repository → Settings → Pages → Source: GitHub Actions**. De workflow in `.github/workflows/deploy-pages.yml` draait test, check en build en publiceert de statische `dist`-map.

**Let op:** Github Pages publiceert de applicatie; Supabase moet afzonderlijk worden ingesteld voor echte accounts en servervoortgang. Open de demo eerst op de gepubliceerde URL. GitHub Pages kan geen custom HTTP response headers toevoegen zoals een volledig beheerde webserver; de app heeft daarom ook een basis-CSP in `index.html`. Controleer toekomstige hostingbeveiliging apart.

## Tests en commando's

```cmd
npm run dev       rem Start de lokale app op http://localhost:5173/
npm test          rem Unit-, contract- en HTTP-servercontroles
npm run check     rem JavaScript-syntax + publieke-sleutelcontrole
npm run build     rem Checks + statische productiebuild naar dist/
npm run pilot:live  rem Vereist echte, verse Supabase-testaccounts
```

De automatische tests bestrijken leerroute, voorbeeldinhoud, feedback, account-API-contract, serverrechten in SQL-tekst, mobiele navigatiecontracten, lokale HTTP server, serviceworkerbestanden en buildstructuur. **Dat is niet gelijk aan browser-e2e, echte PostgreSQL-executie, penetratietest of de 846 acceptatiescenario's.** In deze bouwomgeving was Chromium-navigatie geblokkeerd; die browserflows zijn dus niet als geslaagd aangemerkt.

## Projectstructuur

- `index.html` — statische startpagina en CSP.
- `assets/styles.css` — Dark Modern/Bee Yellow, responsive layout en Floating Labels.
- `src/main.js` — zes hoofdschermen, routes, editor, online/offline, conceptworkflow en Auth-formulieren.
- `src/auth.js` — Supabase REST Auth en geauthenticeerde API-aanroepen.
- `src/learning.js` — lineaire leerroute, lokale feedback en veilige HTML/CSS-preview.
- `src/storage.js` — IndexedDB-concepten en afzonderlijke demo-voortgang.
- `data/curriculum.js` — acht modules, 40 afzonderlijke lesplannen, hints, praktijkopdrachten, reflectie en 40 modulecheckvragen.
- `service-worker.js` — offline app-shell zonder opslag van API-verkeer.
- `supabase/schema.sql` — PostgreSQL-tabellen, RLS en afgeschermde functies.
- `scripts/` — ontwikkelserver, build, configuratiecontrole en live pilot-test.
- `tests/` — automatische tests.
- `docs/` — geplande acceptatiescenario's en controleplannen.

## Niet vergeten

De aanmeldpagina is visueel opgebouwd volgens de Dark Modern BEE-afspraken, maar een formele pixelmeting van de compacte Floating Label-groep binnen 64 px is nog niet gedaan. De exacte aanpassingen aan alle 846 oorspronkelijke scenario's zijn niet bevestigd. Dit pakket is **een sterke technische pilotbasis die nog externe verificatie nodig heeft**, geen gecertificeerd of volledig geaudit productieplatform.

## Geautomatiseerde volledige leerroute (toegevoegd)

Er is nu een Playwright-test voor de **volledige demonstratieroute door alle 40 lessen en acht modulechecks**, inclusief code typen, foutieve modulecheck, voortgang, vergrendelingen, export/import en de 320px-weergave. Op GitHub draait deze bij push en pull request via `.github/workflows/test-learning-journey.yml`.

**Eenmalig op Windows installeren** (Python 3 vereist):

```cmd
py -m pip install -r requirements-e2e.txt
py -m playwright install chromium
```

**Uitvoeren:**

```cmd
py -m unittest discover -s tests/e2e -p "test_*.py" -v
```

De Playwright-tests openen automatisch een eigen lokale server en testbrowser, zonder Supabase te gebruiken. Zie **`docs/AUTOTEST_VOLLEDIGE_LEERROUTE.md`** voor uitgevoerde resultaten en beperkingen. Deze tests **bewijzen niet** dat de Supabase-productieflows en de 846 oorspronkelijke acceptatiescenario's zijn geslaagd.
