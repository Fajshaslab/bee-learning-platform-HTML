# BEE Learning Platform v2.4 — echte JavaScript-uitvoering

## Functionele wijziging

De elf lessen met een `js:`-opdracht hebben nu een uitvoerknop, geïsoleerde preview,
console-output (`log`, `info`, `warn`, `error`), zichtbare syntax-/runtimefouten en een
stopknop. De bestaande HTML/CSS-preview blijft **zonder scriptrechten**. Het nieuwe
`iframe` heeft `sandbox="allow-scripts"` (dus uitdrukkelijk **geen** `allow-same-origin`).

Gewone JavaScript-oefeningen werken in een aparte Web Worker, met een tijdslimiet van
3 seconden. DOM-oefeningen werken in het geïsoleerde iframe zodat studenten `document.querySelector`
en `addEventListener` kunnen gebruiken en kunnen klikken. De oefenpagina heeft een CSP
zonder netwerktoegang, forms, externe resources of geneste frames. De ouderpagina
controleert `event.source`, het ondoorzichtige origin en de run-id voor berichten; output
wordt met `textContent` getoond, nooit als HTML uitgevoerd.

Uitvoerberichten en oefenresultaten zijn **geen autorisatie**. De officiële lesafronding
blijft uitsluitend via bestaande controle in de browser en server (`submit_lesson`).
De server **voert studenten-JavaScript niet uit** en beoordeelt nog altijd vooral
bronstructuur. Deze release voegt experimenteer- en debugmogelijkheden toe, géén
semantisch betrouwbare automatische codecorrector.

## Uitgevoerde controles

- 151 Node-tests: geslaagd.
- 5 Chromium-tests met echte uitvoering van de geïsoleerde `sandbox.html`:
  - `console.log` toont correcte uitvoer;
  - ongeldige JavaScript geeft een `SyntaxError`;
  - een eindeloze `while(true)` in Worker-mode wordt na drie seconden gestopt;
  - een DOM-kliklistener reageert daadwerkelijk op een knop;
  - geïnjecteerde `<script>` in de HTML-sjabloon wordt niet uitgevoerd.
- `npm run check` en `npm run build`: geslaagd.
- De echte website-eind-tot-eindtest is uitgebreid met uitvoering in alle 11
  JavaScript-lessen, incl. syntaxfout, DOM-interacties, en behoud van de
  40-lessen/8-check-volgorde. **Deze uitgebreide website-run moet nog in GitHub Actions
  worden bevestigd**. In de huidige omgeving blokkeert de browser navigatie naar
  lokale pagina's, inclusief de lokale testsuite.

## Resterende grenzen

- Web Workers zijn afbreekbaar, maar DOM-code in de iframe heeft niet dezelfde harde
  CPU-/tijdgarantie. Een kwaadaardig of per ongeluk oneindig DOM-loopje kan het tabblad
  blokkeren; dan is herladen nodig.
- De sandbox is ontworpen voor beginnersoefeningen; onafhankelijk securityonderzoek
  en multi-account RLS-penetratietests zijn niet uitgevoerd.
- Externe libraries, externe netwerkaanroepen en Node.js-API's worden niet ondersteund.
- Bestaande Supabase-data, catalogus en functies veranderen niet.

## Installeren

Kopieer de bestanden van dit patchpakket over het bestaande v2.3-project (verwijder de
map niet). Bewaar jouw eigen `config.js` en `.git`. Voer `npm run check`, `npm test`,
`npm run build` uit, daarna `git add .`, `git commit`, `git push`. Controleer **beide**
GitHub Actions-workflows voor publicatie. **Geen nieuwe SQL** nodig.
