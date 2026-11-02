# BEE Learning Platform v2.3 — kwaliteitsronde

## Doel en scope

Een gerichte, backwards-compatible verbetering van de ervaring voor absolute beginners, bovenop de reeds geïnstalleerde v2.2-beoordelingsmigratie. Er zijn **geen wijzigingen aan tabellen, RLS-regels, SQL-functies, login of accountgegevens**. Studenten hoeven niet opnieuw te beginnen.

## Verbeteringen

1. **De juiste editor bij de juiste les.** Bij een CSS-oefening staat `style.css` open; bij JavaScript staat `script.js` open; bij HTML `index.html`. De opdracht noemt het bestand expliciet.
2. **Minder scrollfrictie.** Lespositie (`Les X van 40`, `Module Y van 8`) en een directe knop naar de praktijkopdracht.
3. **Betere leerorde.** De verdiepings-/reflectievragen staan nu na de opdracht en codecontrole, niet vóór de eerste poging.
4. **Foutfeedback die daadwerkelijk helpt.** De browser beschrijft de vereiste HTML-tags of specifieke attributen (`href`, `alt`, `for/id`), CSS-selector/eigenschap of JavaScript-instructie. Dit wijzigt *niet* of een oplossing slaagt; de v2.2-validatiecriteria blijven gehandhaafd.
5. **Geen verouderde feedback.** Als code wordt aangepast, verdwijnen oude beoordelingsmeldingen.
6. **Consistente lokale reset.** `Begin lokaal opnieuw` vraagt bevestiging, bewaart de oorspronkelijke lescode onmiddellijk in de lokale browseropslag en laat de online versie ongemoeid totdat de gebruiker bewust synchroniseert. De bekende serverversie wordt behouden voor veilig versiebeheer. Een bestaand opslagconflict wordt niet heimelijk gewist.
7. **Vaste regressietests.** Er zijn vier extra Node-testcases en een zesde Playwright-test toegevoegd. De 40-lessenroute controleert nu ook dat het juiste editor-tabblad standaard geselecteerd is.

## Testresultaten (deze build)

| Controle | Resultaat |
|---|---|
| `npm run check` | Geslaagd |
| `npm test` | **146/146 geslaagd** |
| `npm run build` | Geslaagd |
| Chromium, volledige 40-lessen-/8-checkroute (afgeschermde testmodus) | Geslaagd |
| Chromium, beginneroefening, feedback en reset (afgeschermde testmodus) | Geslaagd |
| Chromium, preview/werkende lokale opslag (afgeschermde testmodus) | Afzonderlijke UI-test geslaagd, maar géén bewijs voor echte IndexedDB of iframe-navigatie |
| Live account-/RLS-isolatie met verschillende gebruikers | **Niet opnieuw uitgevoerd** |
| Alle 846 oorspronkelijk geplande acceptatiescenario's | **Niet uitgevoerd** |

**Belangrijk:** De afgeschermde Chromium-test laadt de daadwerkelijke UI- en curriculumcode zonder normaal netwerkverkeer, met een tijdelijke opslagshim en een preview-placeholder. De echte HTTP/IndexedDB/eind-tot-eind-tests draaien via `.github/workflows/test-learning-journey.yml` na een push. Een groene CI-run bevestigt de demo-browserflows, niet de live Supabase-accountisolatie.

## Nog bestaande grenzen

- Een statische codecontrole kan niet vaststellen of JavaScript functioneel het beoogde resultaat bereikt, of of een student begrip heeft. De browser en de server voeren momenteel minimumcontroles uit, geen semantische beoordeling.
- Het lesmateriaal en de tijdsduur van 35–40 uur zijn niet gevalideerd met leerprestatiedata.
- De database toont ingestelde RLS-regels en functieprivileges; tegenproeven met twee echte gescheiden accounts zijn niet uitgevoerd. Dit blijft een beveiligingsvoorbehoud voordat een volledige groep studenten toegang krijgt.
- `schema.sql` of de v2.2-migratie moet voor deze v2.3-interface-update **niet opnieuw** uitgevoerd worden.
- De publicatie op GitHub Pages en de daadwerkelijke Supabase-accountregistratie zijn eerder door de projecteigenaar bevestigd, maar deze release is niet opnieuw rechtstreeks op zijn productieproject uitgerold vanuit deze omgeving.

## Uitrol

Zie `UPDATE_V23_LEES_MIJ.txt`. Dit ZIP-pakket bevat alleen de gewijzigde bron-, stijl-, test- en documentatiebestanden. Het bevat bewust geen `config.js`, geen SQL-migratie en geen databasegegevens.
