# BEE Learning Platform — Ontwerp- en acceptatieoverzicht
**Batch ter goedkeuring | 28 oktober 2026 | Geen bouwcode, geen uitgevoerde tests**

## Besluit in één oogopslag

Ik heb het bestaande aantal van **846 geplande acceptatiescenario’s** omgezet in één controleerbaar register. Elk scenario heeft een uniek ID, ontwerpstap, concrete voorbereiding, testhandeling, verwacht resultaat, testtype, prioriteit en uitvoering-/resultaatstatus. **Geen enkele controle is daadwerkelijk uitgevoerd.**

| Onderdeel | Aantal | Goedkeuringsstatus |
|---|---:|---|
| Fase 2A — Algemene visuele richtlijnen | 224 | Ontwerprichtlijnen definitief |
| Fase 2B.1-1 t/m -28 — Inlogscherm | 598 | Ontwerprichtlijnen definitief |
| Fase 2B.1-29 — E-mailfout naar wachtwoordveld | 24 | **Zelfstandig voorgesteld, akkoord nog vereist** |
| **Totaal** | **846** | **Plan ter gebundelde goedkeuring** |

**Historisch onderscheid:** de exacte oorspronkelijke formulering van alle 822 eerdere individuele scenario’s was niet volledig beschikbaar. Ik heb daarom de scenario’s opnieuw toetsbaar uitgeschreven vanuit de wel bekende definitief goedgekeurde ontwerpregels en de bestaande aantallen per stap. Dit register is een **heruitgewerkt toetsplan**, niet een woordelijke kopie van de oude scenarioformuleringen. Het blijft trouw aan de goedgekeurde ontwerpwaarden en verklaart geen ongeteste eisen als geslaagd.

## 1. Wat is zelfstandig ingevuld?

De enige nog open ontwerpstap die voor het bestaande getal 846 ontbreekt, is **2B.1-29**. Mijn voorstel om die zelfstandig op te nemen: **Balanced, exact 16 px** tussen de **onderzijde van het laatste fouttekstregelkader onder `E-mailadres`** en de **bovenzijde van de normale buitenrand van `Wachtwoord`**. De afstand geldt uitsluitend bij zichtbare e-mailfout. Zonder e-mailfout blijft de eerdere 16 px tussen de twee normale veldbuitenranden gelden. De ruimte na een foutmelding bij `Wachtwoord` richting een volgend formulierelement blijft buiten deze keuze.

De 24 bijbehorende scenario’s zijn volledig opgenomen, maar gemarkeerd als **voorstel** totdat je de complete bundel goedkeurt. Ik heb daarnaast de bestaande scenario’s logisch geherformuleerd, prioriteiten en controles toegevoegd, en de documenten zo georganiseerd dat we later efficiënt kunnen testen.

## 2. Vaste uitgangspunten — niet stilzwijgend gewijzigd

- **Stijl:** Dark Modern; achtergrond `#17191C`, kaart `#23262B`, verhoogd/veld `#30343A`, Bee Yellow `#FFD43B`; Inter voor UI en JetBrains Mono voor code. Bestaande contrastdoelen, subtiele interacties en reduced motion blijven gelden.
- **Spacing:** algemene schaal 4, 8, 12, 16, 24, 32 en 48 px. Twee *aparte* lokale uitzonderingen van 2 px blijven beperkt tot (a) compact label / invoertekst en (b) grijze veldrand / gele focusring.
- **Inlogscherm:** centrale donkere kaart, nominaal rond 420 px breed, flexibel bij kleinere vensters; normaal 24 px kaartpadding, 16 px waar nodig; branding/titel/ondersteuning en velden volgens eerdere goedkeuringen.
- **Invoervelden:** normale buitenhoogte 64 px inclusief uniforme grijze 1 px-rand, 8 px boven-/onderpadding, 16 px linker-/rechterpadding; buitenhoekradius 8 px. Zonder tussenliggende foutinformatie 16 px tussen de beide normale veldbuitenranden.
- **Floating Labels:** normaal Inter 16/20 alleen bij leeg en niet gefocust. Compact bij focus of aanwezige waarde (ook autofill): label Inter 14/21 + 2 px vrij + invoer Inter 16/20 = 43 px groep; als geheel verticaal gecentreerd.
- **Focus:** 2 px Bee Yellow buiten de normale grijze rand, exact 2 px vrije tussenruimte, buitenste hoekafronding 12 px; op rechte segmenten 4 px buitenwaarts. Focus blijft zichtbaar naast fouten; geen ongecontroleerde layoutverschuiving.
- **Fouten:** eigen melding onder eigen veld, links. Eerste fouttekstregelkader exact 8 px onder de normale veldbuitenrand. Linker inset 0 px vanaf linker veldbuitenrand en rechtergrens beschikbare fouttekstzone 0 px vanaf rechter veldbuitenrand. Meerdere regels mogen veldgroepen extern hoger maken. Geen vaste fouttypografie, iconen, foutomlijning, rechter letterpositie of maat na een wachtwoordfout vastgelegd.
- **Nog niet bewezen:** binnen het normale veld: 64 − (2 × 1 rand) − (2 × 8 padding) = 46 px beschikbare hoogte. Compacte groep 43 px; **3 px is slechts theoretische reserve**, géén browsertest en géén bewezen volledige inpassing. Conflict vereist expliciete herbeoordeling.

## 3. Aantal scenario’s per goedgekeurde of voorgestelde ontwerpstap

| Stap | Onderdeel | Scenario’s |
|---|---|---:|
| 2A.1 | Dark Modern | 40 |
| 2A.2 | Kleurenpalet | 64 |
| 2A.3 | Typografie | 44 |
| 2A.4 | Balanced Workspace en componenten | 60 |
| 2A.5 | Guided Hierarchy | 16 |
| 2B.1-1 | Centered Login | 18 |
| 2B.1-2 | Balanced Card Width | 20 |
| 2B.1-3 | Balanced Card Padding | 20 |
| 2B.1-4 | Left-Aligned Stack | 18 |
| 2B.1-5 | Brand-to-Title Spacing | 16 |
| 2B.1-6 | Friendly Guidance | 18 |
| 2B.1-7 | Title-to-Guidance Spacing | 16 |
| 2B.1-8 | Learning-Focused Copy | 16 |
| 2B.1-9 | Title-to-Form Spacing | 18 |
| 2B.1-10 | Floating Labels | 22 |
| 2B.1-11 | Balanced Input Height | 22 |
| 2B.1-12 | Horizontal Input Padding | 20 |
| 2B.1-13 | Vertical Input Field Spacing | 20 |
| 2B.1-14 | Vertical Input Padding | 24 |
| 2B.1-15 | Compact Label Typography | 22 |
| 2B.1-16 | Input Text Line Height | 22 |
| 2B.1-17 | Normal Label Typography | 22 |
| 2B.1-18 | Compact Label-to-Input Gap | 24 |
| 2B.1-19 | Compact Content Group Centering | 24 |
| 2B.1-20 | Normal Label Centering | 24 |
| 2B.1-21 | Subtle Input Border Thickness | 24 |
| 2B.1-22 | Outside Focus Ring Placement | 24 |
| 2B.1-23 | Balanced Focus Ring Offset | 24 |
| 2B.1-24 | Contour-Aligned Focus Ring Corner Radius | 24 |
| 2B.1-25 | Below & Left-Aligned Error Message | 24 |
| 2B.1-26 | Balanced Vertical Error Message Gap | 24 |
| 2B.1-27 | Field-Edge Aligned Error Message | 24 |
| 2B.1-28 | Full-Width Error Message Right Inset | 24 |
| 2B.1-29 | Balanced Error-to-Next-Field Gap (voorstel) | 24 |
| **TOTAAL** | | **846** |

## 4. Beoordelen en later testen

Het Excelbestand heeft de volgende werkbladen: **START**, **Scenarioregister**, **Dekking per stap**, **Ontwerpbesluiten** en **Testaanpak**. In het scenarioregister kun je filteren op fase, stap, prioriteit en ontwerpstatus. De kolommen `Uitvoering` en `Testresultaat` staan overal respectievelijk op **Niet uitgevoerd** en **Niet beoordeeld**.

**P0** betekent een kritieke of blokkerende controle voor de betreffende gerealiseerde functie; **P1** een belangrijke kwaliteitscontrole en **P2** aanvullend of regressie. Dit zijn voorlopige prioriteiten voor de latere testfase, geen bewijs dat iets is mislukt. We hoeven niet 846 aparte handmatige sessies te organiseren: dezelfde echte browsersessie kan meerdere scenario-ID’s afdekken.

Handige latere testbundels: (1) basisstijl en kleur/contrast; (2) typografie en tekstafstand; (3) schermbreedte 320 en 360 CSS-px; (4) 200% tekstvergroting en pagina-zoom; (5) toetsenbordfocus en focusring; (6) Floating Label leeg/focus/waarde/autofill; (7) invoerranden en paddings; (8) afzonderlijke foutmeldingen; (9) twee fouten tegelijk; (10) dynamische meerregelige foutmeldingen en externe groei; (11) schermlezers en fout-associatie; (12) reduced motion en regressie over browsers.

## 5. Belangrijke afbakening van de 846

**Deze 846 scenario’s horen bij Fase 2A en Fase 2B.1 (visuele stijl en inlogscherm).** Ze zijn dus niet hetzelfde als alle noodzakelijke acceptatietests voor de complete leeromgeving. De vijf overige hoofdschermen, lesinhoud, oefeningen/code-editor/preview, modulechecks, accountbeveiliging, e-mailverificatie, offline concepten, voortgangssynchronisatie en hosting hebben nog aanvullende functionele tests nodig zodra hun uitvoerbaar ontwerp/bouw is opgesteld. Ik verberg dat niet onder het totaal 846. Je hoeft dit ook niet eerst tot duizenden nieuwe papieren scenario’s uit te werken voordat er iets gebouwd wordt.

## 6. Wat betekent jouw akkoord?

Een **gebundeld akkoord** betekent: je accepteert dit samenhangende register met 846 **geplande, niet uitgevoerde** scenario’s als onze ontwerp- en testbasis, inclusief de zelfstandig voorgestelde 16 px-maat in stap 2B.1-29. Alle 28 eerder definitief goedgekeurde inlogstappen blijven ongewijzigd. Na akkoord kunnen we met VS Code beginnen: installatie, projectstructuur, bestanden, code en uitleg stap voor stap. Nu is er **nog geen applicatie gebouwd en geen test uitgevoerd**.

**Bijgeleverde bestanden:** `BEE_846_acceptatiescenarios_en_overzicht.xlsx` (hoofdregister, leesbaar en filterbaar); `BEE_846_acceptatiescenarios.csv` (losse scenario’s voor import); `BEE_846_acceptatiescenarios.json` (machineleesbaar voor latere tests).
