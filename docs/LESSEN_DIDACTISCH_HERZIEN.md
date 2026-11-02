# Didactische herziening — alle 40 lessen

## Wat is gecorrigeerd?

De eerder geleverde versie gaf opdrachten over HTML, CSS of JavaScript zonder dat alle benodigde begrippen, codevormen en stappen vooraf voldoende waren uitgelegd. Dat was ongeschikt voor absolute beginners. De oorspronkelijke `theory`-blokken blijven aanwezig, maar **iedere les heeft nu daarnaast een uitgebreide `guide`** met:

1. Concreet leerdoel.
2. Expliciete benodigde voorkennis.
3. Uitleg van nieuwe begrippen vóór het oefenen.
4. Een uniek, leesbaar codevoorbeeld (HTML, CSS of JavaScript).
5. Uitleg van de onderdelen van dat voorbeeld.
6. Stapsgewijze instructies voor de eigen opdracht.
7. Beschrijving van wat zichtbaar moet zijn of logisch te verwachten is.
8. Veelgemaakte fout en twee begripsvragen.
9. Drie bijbehorende hints die aansluiten op de les.

De sectie **EERST BEGRIJPEN, DAN OEFENEN** staat in het lesscherm vóór de praktijkopdracht en de editor. De code staat in een scrollbaar, contrastrijk `<pre><code>`-blok. De bestaande Dark Modern-stijl, accountlogica, acht modules en volgorde blijven ongewijzigd.

## Concreet voorbeeld: module 1, les 4

De leerling krijgt niet meer zomaar de opdracht een beschrijvende link naar example.com te maken.

Eerst wordt uitgelegd wat een hyperlink is, waarom je het `a`-element gebruikt, hoe het `href`-attribuut werkt en waarom de linktekst de bestemming beschrijft. Daarna volgt deze code:

```html
<h1>Handige informatie</h1>
<p>Bekijk <a href="https://example.com">de voorbeeldwebsite Example Domain</a>.</p>
```

Het voorbeeld wordt onderdeel voor onderdeel uitgelegd, waarna de leerling zelf een link schrijft, de aanhalingstekens controleert en de preview bekijkt. Er wordt ook duidelijk gemaakt dat onze afgeschermde preview externe navigatie kan blokkeren.

De lokale codecontrole controleert nu bij deze opdracht niet alleen of `<a>` voorkomt, maar ook of er een volledige URL naar `example.com` en een beschrijvende, niet-triviale linktekst aanwezig zijn. Bij de latere linkles wordt eveneens op een echte bestemming en linktekst gecontroleerd. De `img`-les kijkt bovendien naar `src` en een niet-lege `alt`-tekst. **Dit zijn nog steeds eenvoudige clientcontroles; niet voldoende voor officiële beoordeling.**

## Wat is getest?

- `npm test` — 62 automatische tests, geslaagd in deze omgeving.
- `npm run check` — syntactische controles en configuratiecheck.
- `npm run build` — nieuwe statische productiebuild.
- De ontwikkelserver geeft de nieuwe gegevensmodule als publiek JavaScript-bestand terug en houdt interne tests/SQL privé.
- Unit-tests controleren nu dat alle 40 gidsen aanwezig zijn, unieke codevoorbeelden bevatten, oefenstappen en begripvragen hebben, dat JS-voorbeelden syntactisch geldig zijn en dat de gids vóór de opdracht gerenderd wordt.

Een echte browser-eind-tot-eindcontrole en live Supabase-controle zijn **niet** als geslaagd vastgesteld. De browsernavigatie was vanuit deze uitvoeromgeving geblokkeerd. Voor een echte pilot moet een coach de lessen ook pedagogisch controleren met beginners en moeten de oorspronkelijke 846 acceptatiescenario's worden doorlopen.

## Resterende inhoudelijke beperking

De veertig lessen zijn nu beter uitlegbaar en oefenbaar, maar de aanduiding `60 minuten gepland` is nog altijd slechts een planning. De lesduur is niet gemeten met studenten. Vooral JavaScript-lessen kunnen **niet worden uitgevoerd in de ingebouwde preview**, en voor die onderdelen is een veilige aparte JavaScript-sandbox nodig om praktijkvaardigheid daadwerkelijk te kunnen beoordelen. Ook is de officiële servercontrole nog te eenvoudig om begrip of robuuste HTML/CSS/JS-correctheid te bewijzen. Geen certificerings- of examenclaims doen.

## Welke bestanden zijn inhoudelijk gewijzigd?

- `data/lesson-guides.js` — nieuw: het volledige begeleide materiaal voor de 40 lessen.
- `data/curriculum.js` — koppelt de gidsen per les-ID en zorgt voor betere hints.
- `src/main.js` — presenteert leerdoel, voorkennis, begrippen, code, uitleg, oefenstappen en reflectie vóór de opdracht.
- `assets/styles.css` — toegankelijke codevoorbeelden en responsieve uitleg.
- `src/learning.js` — specifiekere link- en afbeeldingscontroles.
- `service-worker.js`, `scripts/serve.mjs`, `package.json` — nieuwe lesgids online en offline beschikbaar.
- `tests/pedagogy.test.mjs` — nieuwe didactische structuurchecks.
