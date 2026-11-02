# BEE — Automatische test van het volledige leertraject

**Uitgangspunt:** `BEE-Learning-Platform-HERZIENE-LESSEN.zip`. Deze testuitbreiding wijzigt geen lesinhoud, database-SQL of studenteninterface; ze voegt uitvoerbare tests, GitHub Actions en documentatie toe.

## Wat is in de huidige testomgeving uitgevoerd?

| Testlaag | Uitkomst | Grenzen |
|---|---|---|
| Bestaande Node-tests | **62/62 geslaagd** | Logica, contracten, broncode-/SQL-structuur; geen PostgreSQL-executie |
| Extra Node-testcontroles | **51/51 geslaagd** | Alle 40 regels van broncodecontrole met voorbeeldoplossing en leeg voorbeeld; 8 modulechecks qua datastructuur; gehele ontgrendelingsvolgorde; preview-CSP |
| Totaal Node-tests | **113/113 geslaagd** | Node `npm test` |
| Chromium: gasttoegang en blokkering | **Geslaagd** | UI getest met in-memory opslagvervanger; geen echte HTTP-navigatie |
| Chromium: HTML-oefening en codecontrole | **Geslaagd** | iframe vervangen door niet-uitvoerend placeholder **alleen tijdens deze interne inline-test** |
| Chromium: JSON-export, reset en import | **Geslaagd** | Echt UI-gebruik; opslagvervanger in het geheugen |
| Chromium: **40 lessen + 8 modulechecks** | **Geslaagd** | In één browserflow iedere les bewerkt, gecontroleerd en gemarkeerd; eerst fout antwoord op eerste check, daarna juiste antwoorden; bij afronding 100% |
| Chromium: 320px responsive weergave | **Geslaagd** | Geen documentbrede horizontale overflow in de gecontroleerde demo-schermen met inline-harnas |
| Browserbezoek aan `http://127.0.0.1:...` | **Geblokkeerd door omgeving** | `net::ERR_BLOCKED_BY_ADMINISTRATOR`, niet een vastgestelde applicatiefout |
| Echte IndexedDB-herlaadtest | **Niet in huidige omgeving geverifieerd** | Staat in de normale Playwright-suite voor lokale pc/GitHub Actions |
| Echte iframe-sandbox/CSP in browser | **Niet in huidige omgeving geverifieerd** | Staat in normale Playwright-suite voor lokale pc/GitHub Actions |
| Echte Supabase / RLS / OAuth / e-mailverificatie | **Niet uitgevoerd** | Live testproject en twee geverifieerde accounts nodig |
| Oorspronkelijke 846 scenario's | **Niet volledig uitgevoerd** | Apart geplande acceptatiescenario's |

## Wat doet de normale Playwright-suite op Windows of GitHub Actions?

- Openen van de echte lokale HTTP-app in een **geïsoleerd Chromium-profiel**.
- Directe URL's naar vergrendelde lessen, modulechecks en afsluiting controleren.
- HTML typen, indicatieve feedback lezen en controleren dat een script de ouderpagina niet wijzigt.
- IndexedDB-concept opslaan, pagina opnieuw laden en de herstelde code controleren.
- Export JSON, lokaal resetten, import JSON.
- In één doorloop door alle 40 lessen navigeren, een positieve broncodecontrole uitvoeren, elke les markeren, de vijf vragen van iedere modulecheck invullen, één foute inzending blokkeren, en het eindscherm en 100% voortgang verifiëren.
- Responsive controle bij een breedte van 320 CSS-pixels.

### Uitvoeren op jouw pc

Open in VS Code de map met `package.json` en voer in Command Prompt uit:

```cmd
py -m pip install -r requirements-e2e.txt
py -m playwright install chromium
py -m unittest discover -s tests/e2e -p "test_*.py" -v
```

De test start zelf een lokale BEE-server op een willekeurige vrije poort, zonder jouw bestaande lokaal draaiende website te overschrijven. **De tests wijzigen geen echte accounts**: ze gebruiken een geïsoleerde demonstratiecontext.

De workflow `.github/workflows/test-learning-journey.yml` voert dezelfde checks uit op GitHub bij push, pull request en handmatig starten (`Actions` → `Test volledige BEE-leerroute`). Foutscreenshots en het serverlog zijn opvraagbaar als Actions-artifact.

## Wat bewijzen deze tests nadrukkelijk NIET?

- Dat elke inhoudelijk correcte of creatieve oplossing door de technische oefencontrole wordt geaccepteerd. De checker is opzettelijk eenvoudig en kan vals-positieven/vals-negatieven opleveren.
- Dat de modulecheckvragen geheim zijn voor studenten; client-side antwoorden zijn inspecteerbaar.
- Dat de cursus werkelijk 35–40 uur effectieve lestijd biedt of dat beginners alles begrijpen.
- Dat offline sessies en echte online synchronisatie conflictvrij werken op twee apparaten.
- Dat databasepolicy's of Supabase-registratie veilig zijn zonder uitvoering tegen een echt testproject.
- Dat iedere oorspronkelijke ontwerpwaarde of elk van de 846 scenario's is bewezen.

### Belangrijkste volgende live controle

Configureer eerst een aparte Supabase-testomgeving, registreer twee bevestigde testaccounts en voer vervolgens `npm run pilot:live` uit volgens `docs/PILOT_SUPABASE_LIVE_TEST.md`. Dit is onafhankelijk van de demo-Playwright-suite.
