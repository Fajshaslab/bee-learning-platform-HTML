// BEE Learning Platform — stap-voor-stap begeleid lesmateriaal voor absolute beginners.
// Gebruik: eerst uitleg en voorbeelden, daarna pas de opdracht.
export const lessonGuides = {
  "m1-l1": {
    "goal": "Begrijpen wat een browser doet én je eerste kop en alinea schrijven.",
    "prior": "Je hoeft nog geen HTML te kennen; we beginnen bij nul.",
    "concepts": [
      "Een website bestaat uit bestanden. De browser ontvangt die en laat ze als een pagina zien.",
      "HTML beschrijft de inhoud: een kop, een alinea of een lijst. Je schrijft HTML tussen punthaken.",
      "<h1> begint een hoofdkop en </h1> sluit die af. Bij <p> en </p> gebeurt hetzelfde voor een alinea."
    ],
    "example": "<h1>Welkom op mijn pagina</h1>\n<p>Mijn browser laat deze tekst zien.</p>",
    "language": "html",
    "explanation": [
      "De eerste regel zegt met h1: dit is de belangrijkste kop op de pagina. Het woord Welkom komt op het scherm; de tags zelf niet.",
      "De tweede regel gebruikt p voor gewone tekst. Alles tussen de openings- en sluittag hoort bij die alinea.",
      "In de live preview rechts zie je hoe de browser de code omzet naar een zichtbare kop en tekst. Je hoeft hiervoor geen programma te installeren."
    ],
    "steps": [
      "Open index.html in de editor. Laat de bestaande h1 staan en plaats je cursor aan het einde.",
      "Druk op Enter en typ eerst <p>, daarna in je eigen woorden wat de browser doet, en sluit af met </p>.",
      "Bekijk de preview: staan de kop en je eigen alinea allebei zichtbaar? Zo ja, lees ze nog eens rustig na.",
      "Verander één woord in je alinea en bekijk hoe dat meteen in de preview verandert."
    ],
    "expected": "Een hoofdkop met daaronder jouw alinea. Er verschijnen geen zichtbare <p>-tekens in de pagina.",
    "pitfall": "Vergeet je </p>, dan kan de browser de tekst soms nog tonen, maar de structuur is niet netjes. Sluit tags daarom altijd af.",
    "questions": [
      "Wat zie je op het scherm: de HTML-tags of de tekst ertussen?",
      "Welke tag gebruik je voor een alinea, en welke voor een hoofdkop?"
    ]
  },
  "m1-l2": {
    "goal": "De verschillen tussen HTML, CSS en JavaScript in je eigen woorden uitleggen.",
    "prior": "Je hebt in de vorige les h1 en p gebruikt.",
    "concepts": [
      "HTML beschrijft wat iets is: een titel, lijst of alinea.",
      "CSS bepaalt hoe iets eruitziet: kleur, lettertype, afstanden.",
      "JavaScript beschrijft gedrag: wat er gebeurt als iemand bijvoorbeeld op een knop klikt."
    ],
    "example": "<h1>De drie webtalen</h1>\n<p>HTML bouwt de structuur. CSS geeft stijl. JavaScript maakt interactie mogelijk.</p>",
    "language": "html",
    "explanation": [
      "In index.html zet je de h1 en de p: dat zijn HTML-elementen, dus onderdelen met betekenis.",
      "Voor een rode kop zou je later CSS gebruiken; daarvoor hoef je niet de woorden van de titel te veranderen.",
      "Bijvoorbeeld een knop die na het klikken een bericht toont, vraagt uiteindelijk JavaScript. Dat oefen je later veilig in een geïsoleerde JavaScript-preview."
    ],
    "steps": [
      "Lees de drie rollen hierboven en open index.html.",
      "Maak onder de bestaande h1 een p-element met drie korte zinnen over HTML, CSS en JavaScript.",
      "Bekijk of de tekst in de preview zichtbaar wordt; probeer daarna in je uitleg een voorbeeld van CSS te noemen."
    ],
    "expected": "Je ziet één kop en één of meer alinea’s waarin de taken van de drie talen correct worden beschreven.",
    "pitfall": "HTML, CSS en JavaScript zijn geen drie verschillende soorten HTML-tags. Het zijn drie verschillende talen met eigen taken.",
    "questions": [
      "Welke taal gebruik je om een kop een andere kleur te geven?",
      "Welke taal bepaalt dat een alinea een alinea is?"
    ]
  },
  "m1-l3": {
    "goal": "Herkennen wat index.html en style.css doen zonder bestanden te hoeven installeren.",
    "prior": "Je weet wat een HTML-kop en -alinea zijn.",
    "concepts": [
      "Een bestandsnaam heeft vaak een extensie: .html, .css of .js. Deze vertelt welk type inhoud in het bestand staat.",
      "index.html is vaak de beginpagina van een website; style.css bevat meestal de vormgeving.",
      "In deze leeromgeving bewerk je deze bestanden rechtstreeks in de browsertabbladen. Je hebt nog geen VS Code nodig."
    ],
    "example": "<h1>Mijn bestanden</h1>\n<p>index.html bevat de inhoud; style.css bevat de vormgeving.</p>",
    "language": "html",
    "explanation": [
      "De h1 en p horen bij index.html, want daarin staat de structuur van de pagina.",
      "Open je later het tabblad style.css, dan zie je regels met accolades en eigenschappen in plaats van HTML-tags.",
      "De browser combineert de beschikbare HTML en CSS voor de preview; het is dus normaal dat de bestanden er verschillend uitzien."
    ],
    "steps": [
      "Open de tab index.html en schrijf onder de kop een p met een zin over beide bestanden.",
      "Klik daarna op style.css en bekijk de andere schrijfwijze zonder iets te wissen.",
      "Ga terug naar index.html: staat je tekst er nog? Controleer ook de preview."
    ],
    "expected": "Een pagina met een kop en uitleg in een p; je herkent het doel van beide bestandstypen.",
    "pitfall": "Een bestand hernoemen van .txt naar .html maakt de inhoud niet automatisch geldige HTML.",
    "questions": [
      "Waar zet je een nieuwe alinea neer: in index.html of style.css?",
      "Welke extensie hoort bij stijlregels?"
    ]
  },
  "m1-l4": {
    "goal": "Een toegankelijke, beschrijvende link maken en begrijpen wat href doet.",
    "prior": "Je kent h1 en p; de linktag a is nieuw en wordt hieronder volledig uitgelegd.",
    "concepts": [
      "Een hyperlink is aanklikbare tekst die naar een andere webpagina verwijst. In HTML gebruik je daarvoor het a-element, ook wel een anchor genoemd.",
      "Het attribuut href vertelt de browser waar de link naartoe moet. Voor een externe website gebruik je een volledige URL zoals https://example.com.",
      "De tekst tussen <a ...> en </a> ziet de bezoeker. Schrijf wat iemand kan verwachten; “Lees de voorbeeldwebsite” is duidelijker dan “Klik hier”."
    ],
    "example": "<h1>Handige informatie</h1>\n<p>Bekijk <a href=\"https://example.com\">de voorbeeldwebsite Example Domain</a>.</p>",
    "language": "html",
    "explanation": [
      "<a opent de link. Het stukje href=\"https://example.com\" geeft de bestemming op. De aanhalingstekens horen om de URL.",
      "Het teken > sluit de openingstag af. Daarna volgt de klikbare, beschrijvende tekst: de voorbeeldwebsite Example Domain.",
      "</a> sluit de link af. Laat je href weg, dan heeft de browser geen bestemming. Voor een externe website begint de URL gewoonlijk met https://.",
      "In onze afgeschermde live preview kun je de link zien, maar doorklikken naar externe sites kan bewust beperkt zijn. Dat betekent niet dat je HTML fout is."
    ],
    "steps": [
      "Laat de bestaande h1 met “Iedereen welkom” staan. Typ op de regel eronder een a-element.",
      "Vul in de openingstag href=\"https://example.com\" in. Controleer de dubbele aanhalingstekens.",
      "Schrijf tussen de tags de tekst “Lees meer op Example Domain” en sluit af met </a>.",
      "Bekijk de preview: herken je de klikbare linktekst? Kijk daarna nog eens in de code waar de URL staat."
    ],
    "expected": "De pagina bevat een hoofdkop en een zichtbare hyperlink met een herkenbare bestemming. De URL staat in href, niet noodzakelijk in de zichtbare tekst.",
    "pitfall": "<a> zonder href is geen volwaardige navigatielink. En “klik hier” is minder duidelijk voor mensen die links los van hun context voorgelezen krijgen.",
    "questions": [
      "Welk deel van de link is zichtbaar voor een bezoeker?",
      "Wat doet href, en waarom gebruiken we https://example.com in plaats van alleen example.com?"
    ]
  },
  "m1-l5": {
    "goal": "Een lijst maken en de HTML-structuur in de browser inspecteren.",
    "prior": "Je kent h1 en p. De tags ul en li leggen we hieronder uit.",
    "concepts": [
      "Een lijst is handig wanneer je meerdere punten onder elkaar wilt zetten. Voor een lijst met bolletjes gebruik je ul: unordered list.",
      "Elk punt plaats je in een li-element: list item. Een li hoort binnen een ul (of ol), dus de tags staan genest.",
      "Inspecteren betekent de DOM-structuur bekijken met de ontwikkelaarstools van de browser. Dat verandert niet automatisch je opgeslagen broncode."
    ],
    "example": "<h1>Mijn onderwerpen</h1>\n<p>Dit wil ik leren:</p>\n<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>",
    "language": "html",
    "explanation": [
      "ul opent de lijst en sluit pas na het laatste lijstitem. Binnen de lijst staan twee li-elementen.",
      "De inspringing van li is er voor mensen die de code lezen. De browser herkent nesting op basis van de tags.",
      "Inspecteer eventueel met F12 het resultaat: je ziet dat li-elementen kinderen zijn van ul. Niet iedere browser toont de tools op dezelfde plek."
    ],
    "steps": [
      "Schrijf onder je bestaande h1 een p met uitleg over de lijst.",
      "Voeg een ul-element toe met minstens twee li-elementen. Sluit elke tag netjes af.",
      "Bekijk of de preview bolletjes toont. Vergelijk de HTML-code met wat je ziet.",
      "Open desgewenst F12 en zoek het Elements/Elementen-paneel; probeer de ul in de structuur te vinden."
    ],
    "expected": "Een kop, alinea en lijst met bolletjes. De li-elementen staan binnen de ul.",
    "pitfall": "Een losse li buiten de ul geeft een onlogische structuur. Zet alle lijstpunten tussen <ul> en </ul>.",
    "questions": [
      "Wat is het verschil tussen ul en li?",
      "Waarom is een tijdelijke wijziging in de ontwikkelaarstools niet hetzelfde als je broncode aanpassen?"
    ]
  },
  "m2-l1": {
    "goal": "Koppen van verschillende niveaus en gewone alinea’s maken.",
    "prior": "Je hebt h1 en p al een keer gebruikt; nu leer je de volgorde van koppen beter.",
    "concepts": [
      "Een h1 is de belangrijkste kop van een pagina of hoofdonderwerp. h2 en h3 zijn subkoppen die verdere structuur aanbrengen.",
      "Een p-element gebruik je voor doorlopende tekst, niet om een kop alleen groter te maken.",
      "Een logische hiërarchie helpt lezers, toetsenbordgebruikers en voorleessoftware om inhoud te begrijpen."
    ],
    "example": "<h1>Mijn reisblog</h1>\n<p>Hier schrijf ik over mijn reizen.</p>\n<h2>Mijn favoriete stad</h2>\n<p>Ik bezoek graag Gent.</p>",
    "language": "html",
    "explanation": [
      "De h1 noemt het overkoepelende onderwerp. De h2 kondigt een onderdeel daarbinnen aan.",
      "Een p-element hoort na de kop wanneer je er meer over wilt vertellen.",
      "De cijfers in h1 en h2 geven betekenis aan niveaus; ze zijn niet bedoeld als willekeurige manieren om lettergrootte te kiezen."
    ],
    "steps": [
      "Open index.html en controleer of er een h1 staat.",
      "Voeg minstens één p-element toe. Schrijf een complete zin en sluit de tag met </p>.",
      "Voeg ter oefening een h2 toe met daaronder een tweede alinea.",
      "Bekijk of de visuele en inhoudelijke volgorde logisch is."
    ],
    "expected": "Een hoofdkop met tekst en eventueel een subkop. De HTML-structuur is logisch van algemeen naar specifiek.",
    "pitfall": "Gebruik geen h3 alleen omdat die klein oogt als er nog geen logische h2 is.",
    "questions": [
      "Wat is het verschil tussen h1 en h2?",
      "Waarom maak je gewone tekst met p en niet met h4?"
    ]
  },
  "m2-l2": {
    "goal": "Ongeordende en genummerde lijsten schrijven en kiezen welke past.",
    "prior": "Je hebt in module 1 een eenvoudige ul met li gemaakt.",
    "concepts": [
      "ul staat voor unordered list en toont meestal bolletjes. Gebruik die wanneer volgorde niet essentieel is.",
      "ol staat voor ordered list en toont nummers. Dat past bij stappen die in een bepaalde volgorde uitgevoerd moeten worden.",
      "Een lijstitem gebruik je altijd met li binnen de buitenste lijsttag."
    ],
    "example": "<h1>Mijn ochtend</h1>\n<ul>\n  <li>Water drinken</li>\n  <li>Ontbijten</li>\n</ul>\n<ol>\n  <li>Opstaan</li>\n  <li>Tanden poetsen</li>\n</ol>",
    "language": "html",
    "explanation": [
      "De eerste lijst heeft geen belangrijke volgorde: daarom ul.",
      "De tweede lijst heeft een bewust eerste en tweede stap: daarom ol.",
      "Je ziet dat li in beide typen lijsten precies dezelfde rol heeft: één item beschrijven."
    ],
    "steps": [
      "Open index.html en plaats onder de kop een ul met minstens twee li-elementen.",
      "Zorg dat elke li zowel een begin- als eindtag heeft.",
      "Bekijk de bolletjes in de preview. Verander tijdelijk ul in ol (ook de eindtag) en kijk naar het verschil."
    ],
    "expected": "Een lijst met minstens één zichtbaar item; je kunt uitleggen wanneer je ul of ol kiest.",
    "pitfall": "Vergeet niet ook </ul> te veranderen in </ol> als je een lijsttype omwisselt.",
    "questions": [
      "Welke lijst kies je voor een recept in vaste stappen?",
      "Waarom staat li binnen ul of ol?"
    ]
  },
  "m2-l3": {
    "goal": "Een navigerende link met een duidelijke tekst en correcte URL maken.",
    "prior": "Je hebt het a-element en href kort gebruikt in de introductiemodule.",
    "concepts": [
      "Een a-element maakt tekst aanklikbaar. De bestemming staat in het href-attribuut, tussen aanhalingstekens.",
      "Bij een link naar een andere website gebruik je een absolute URL met bijvoorbeeld https://. Bij een link binnen een website gebruik je vaak een relatief pad.",
      "De linktekst vertelt waar de link naartoe gaat. “Bekijk de uitleg over HTML” is duidelijker dan “Hier”."
    ],
    "example": "<h1>Bronnen</h1>\n<p><a href=\"https://developer.mozilla.org\">Lees webdocumentatie op MDN</a></p>",
    "language": "html",
    "explanation": [
      "De a-openingstag bevat href=\"https://developer.mozilla.org\": hier staat de bestemming.",
      "Alles tussen > en </a> is de zichtbare en voor te lezen linktekst.",
      "De p om de link heen plaatst hem in een alinea. In deze sandbox kan externe navigatie beperkt zijn; controleer dan de href in je code."
    ],
    "steps": [
      "Maak onder de bestaande h1 een p waarin je een a-element plaatst.",
      "Vul href met een volledige https://-URL van een betrouwbare website.",
      "Gebruik beschrijvende tekst met de naam of het onderwerp van die website; sluit de link met </a>.",
      "Controleer de preview en lees of de tekst duidelijk is zonder de rest van de pagina."
    ],
    "expected": "Een herkenbare link met zichtbaar doel en correcte href.",
    "pitfall": "Een ontbrekende https:// kan een onbedoelde relatieve link maken; controleer de URL zorgvuldig.",
    "questions": [
      "Welk deel van a is voor bezoekers zichtbaar?",
      "Waarom is “Klik hier” meestal een minder goede linktekst?"
    ]
  },
  "m2-l4": {
    "goal": "Een afbeelding correct plaatsen met betekenisvolle alternatieve tekst.",
    "prior": "Je kent HTML-attributen van href. Nu gebruiken we src en alt.",
    "concepts": [
      "Het img-element toont een afbeelding en heeft geen afsluitende </img>-tag.",
      "Het attribuut src bevat het pad of de URL naar de afbeelding. Het attribuut alt beschrijft de informatie voor mensen die de afbeelding niet kunnen zien.",
      "Een decoratieve afbeelding kan alt=\"\" krijgen, maar bij een inhoudelijk relevante afbeelding beschrijf je kort wat erop staat."
    ],
    "example": "<h1>Een foto</h1>\n<img src=\"https://example.com/foto.jpg\" alt=\"Een fietser op een brug\">",
    "language": "html",
    "explanation": [
      "img is een leeg HTML-element; er staat geen tekst tussen een begin- en eindtag.",
      "src is de locatie waar de browser het beeld probeert op te halen. De bovenstaande foto-URL is illustratief en hoeft niet te bestaan.",
      "alt is geen bestandsnaam maar een beschrijving van de betekenis. Omdat de sandbox externe afbeeldingen blokkeert, kan de afbeelding leeg blijven in de preview."
    ],
    "steps": [
      "Voeg onder de bestaande kop een img-element toe.",
      "Zet in src een voorbeeld-URL of bestaand afbeeldingspad; gebruik aanhalingstekens.",
      "Schrijf een betekenisvolle alt-tekst. Controleer de HTML-code, ook als het beeld in onze afgeschermde preview niet laadt."
    ],
    "expected": "Een img-element met src en een beschrijvende alt-tekst. Het laden van externe foto’s is in de sandbox niet gegarandeerd.",
    "pitfall": "Alt=\"foto.jpg\" helpt zelden. Beschrijf wat iemand aan de afbeelding moet begrijpen.",
    "questions": [
      "Wat is het verschil tussen src en alt?",
      "Waarom kan een correcte img-tag in onze preview toch geen afbeelding tonen?"
    ]
  },
  "m2-l5": {
    "goal": "Het verschil tussen een volledig HTML-document en een body-fragment begrijpen.",
    "prior": "Je kunt h1, p en ul zelfstandig schrijven.",
    "concepts": [
      "Een volledig HTML-document begint doorgaans met <!doctype html> en bevat html, head en body.",
      "head bevat informatie zoals title en meta; de zichtbare inhoud hoort binnen body.",
      "Onze ingebouwde editor plaatst jouw HTML automatisch in een veilige body. Je hoeft hier dus niet zelf een volledige html/head/body-schil te typen."
    ],
    "example": "<!doctype html>\n<html lang=\"nl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Mijn pagina</title>\n</head>\n<body>\n  <h1>Welkom</h1>\n  <p>Een alinea</p>\n  <ul><li>HTML oefenen</li></ul>\n</body>\n</html>",
    "language": "html",
    "explanation": [
      "De doctype vertelt de browser dat moderne HTML wordt gebruikt; html is het buitenste element.",
      "In head staan gegevens over de pagina. De title is de titel van het tabblad, niet de zichtbare hoofdkop.",
      "In body staan de zichtbare onderdelen. In jouw oefeneditor schrijf je alleen wat normaal binnen body zou staan."
    ],
    "steps": [
      "Lees het complete voorbeeld hierboven. Zoek daarin head, title en body.",
      "Open index.html en schrijf in de oefeneditor uitsluitend het zichtbare deel: h1, p en een ul met li.",
      "Bekijk de preview. De leeromgeving bouwt het veilige document eromheen."
    ],
    "expected": "Je ziet een kop, alinea en lijst en kunt aanwijzen waar deze in een volledig document horen.",
    "pitfall": "Plak niet zomaar een tweede <!doctype html>, head of body midden in onze body-editor. Dat is in deze oefenomgeving niet nodig.",
    "questions": [
      "Waar staat de title van een browser-tabblad?",
      "Welk deel van het complete HTML-document oefen je in deze editor?"
    ]
  },
  "m3-l1": {
    "goal": "Semantische onderdelen van een pagina logisch groeperen.",
    "prior": "Je kent h1/h2 en de basisstructuur van een pagina.",
    "concepts": [
      "Semantische HTML beschrijft wat een gebied betekent. main is de hoofdinhoud van de pagina.",
      "section groepeert inhoud met een eigen onderwerp; een section heeft vaak een herkenbare kop.",
      "header is voor inleidende inhoud en footer bevat vaak afsluitende informatie. Gebruik ze om structuur te geven, niet alleen voor uiterlijk."
    ],
    "example": "<main>\n  <h1>Mijn website</h1>\n  <section>\n    <h2>Over mij</h2>\n    <p>Ik leer webontwikkeling.</p>\n  </section>\n</main>",
    "language": "html",
    "explanation": [
      "Main begint vóór de centrale inhoud en eindigt erna. Op een gewone pagina is doorgaans één hoofdinhoudsgebied.",
      "Section opent binnen main en groepeert de h2 en p over hetzelfde onderwerp.",
      "De woorden in h2 zijn zichtbaar, maar main en section veranderen het uiterlijk niet vanzelf. Hun belangrijkste functie is betekenis."
    ],
    "steps": [
      "Laat in index.html het bestaande main-element staan.",
      "Voeg daarbinnen een section met h2 en p toe; sluit de tags in omgekeerde volgorde.",
      "Kijk in de preview en lees de nesting na: staat section binnen main?"
    ],
    "expected": "Een main met een section, subkop en alinea.",
    "pitfall": "Gebruik section niet als standaardvervanging voor iedere div; kies het wanneer de inhoud een eigen onderwerp heeft.",
    "questions": [
      "Wat hoort binnen main?",
      "Waarom heeft een section vaak een eigen kop?"
    ]
  },
  "m3-l2": {
    "goal": "Een eenvoudig HTML-formulier opbouwen zonder gegevens te versturen.",
    "prior": "Je hebt attributen gebruikt bij a en img.",
    "concepts": [
      "Een form groepeert invoervelden die bij één handeling horen, bijvoorbeeld contact opnemen.",
      "Een input is een veld waarin iemand gegevens kan typen. Met type=\"text\" maak je een gewoon tekstveld; met name geef je het veld een naam.",
      "In onze beveiligde preview kunnen formulieren niet verzonden worden. Een echte applicatie heeft veilige verwerking aan de serverkant nodig."
    ],
    "example": "<h1>Contact</h1>\n<form>\n  <input type=\"text\" name=\"naam\" placeholder=\"Je naam\">\n</form>",
    "language": "html",
    "explanation": [
      "Form opent en sluit de groep invoervelden; de input staat daarbinnen.",
      "Input heeft geen </input>. De attributen type en name staan in dezelfde openingstag.",
      "Placeholder is slechts een voorbeeldtekst, geen vervanging voor een echt label; dat komt uitgebreid in de volgende les."
    ],
    "steps": [
      "Voeg onder de kop een form-element toe en sluit het met </form>.",
      "Plaats binnen form een input met type=\"text\" en name=\"naam\".",
      "Bekijk het invoerveld in de preview. Verwacht niet dat verzenden werkt: dat is bewust uitgeschakeld."
    ],
    "expected": "Een zichtbaar tekstveld binnen een form.",
    "pitfall": "Verwar placeholder niet met label. Een placeholder kan verdwijnen zodra iemand begint te typen.",
    "questions": [
      "Welke tag groepeert de velden?",
      "Waarom mogen we dit formulier nog niet gebruiken om echte gegevens op te slaan?"
    ]
  },
  "m3-l3": {
    "goal": "Een input toegankelijk benoemen met een gekoppeld label.",
    "prior": "Je hebt in de vorige les form en input gemaakt.",
    "concepts": [
      "Een label vertelt wat iemand moet invullen. Daarmee is een formulier duidelijker dan met alleen placeholdertekst.",
      "Het for-attribuut van label verwijst naar de id van input. Die waarden moeten precies gelijk zijn.",
      "Door die koppeling kan een schermlezer de veldnaam voorlezen en kan klikken op de labeltekst het veld activeren."
    ],
    "example": "<form>\n  <label for=\"voornaam\">Voornaam</label>\n  <input id=\"voornaam\" name=\"voornaam\" type=\"text\">\n</form>",
    "language": "html",
    "explanation": [
      "Label bevat de zichtbare tekst Voornaam. for=\"voornaam\" wijst naar een id in hetzelfde document.",
      "Input heeft id=\"voornaam\", dus de koppeling is compleet. Name is de naam waarmee het veld later verzonden zou kunnen worden.",
      "Het gaat hier om een label bij een veld, niet om CSS-opmaak. Klik in de preview op de labeltekst en kijk of het invoerveld focus krijgt."
    ],
    "steps": [
      "Voeg een form toe of gebruik een bestaand form.",
      "Plaats een label met for=\"email\" en de tekst E-mailadres.",
      "Plaats erna een input met id=\"email\", name=\"email\" en type=\"email\".",
      "Controleer dat for en id letter voor letter overeenkomen."
    ],
    "expected": "Een invoerveld met een zichtbare, correct gekoppelde labeltekst.",
    "pitfall": "for=\"naam\" en id=\"voornaam\" verwijzen niet naar elkaar. Controleer ook type=\"email\" als je een e-mailadres vraagt.",
    "questions": [
      "Wat is het verschil tussen id en de zichtbare labeltekst?",
      "Waarom is placeholder geen volwaardige vervanging van label?"
    ]
  },
  "m3-l4": {
    "goal": "Een toegankelijke gegevens-tabel maken met kolomkoppen.",
    "prior": "Je kent geneste HTML-elementen zoals ul/li en section.",
    "concepts": [
      "Een table gebruik je voor gegevens die in rijen en kolommen bij elkaar horen. Gebruik hem niet om een hele website in kolommen te zetten.",
      "Elke rij staat tussen tr-tags. th is een kopcel en td een gewone gegevenscel.",
      "Met de volgorde table > tr > th/td kan de browser de gegevens als tabel weergeven. Voor complexe tabellen gebruik je vaak thead en tbody."
    ],
    "example": "<h1>Training</h1>\n<table>\n  <tr><th>Dag</th><th>Activiteit</th></tr>\n  <tr><td>Maandag</td><td>Sporten</td></tr>\n</table>",
    "language": "html",
    "explanation": [
      "Table omsluit alle rijen. De eerste tr is een koprij met twee th-elementen.",
      "De tweede tr bevat dezelfde twee kolommen als gewone td-cellen.",
      "De browser kan rijen en kolommen tonen zonder randlijnen; CSS bepaalt later hoe de tabel eruitziet."
    ],
    "steps": [
      "Voeg na de kop een table toe.",
      "Maak een eerste tr met minstens één th-kopcel.",
      "Maak een tweede tr met minstens één td-gegevenscel.",
      "Bekijk de uitlijning in de preview. Controleer dat je elke tr afsluit."
    ],
    "expected": "Een tabel met minstens één kopcel en één gegevenscel.",
    "pitfall": "Zet geen los td-element rechtstreeks in table zonder tr; cellen horen binnen een rij.",
    "questions": [
      "Wanneer kies je een tabel en wanneer een lijst?",
      "Wat is het verschil tussen th en td?"
    ]
  },
  "m3-l5": {
    "goal": "Een artikel met duidelijke interne structuur maken en de rol van metadata begrijpen.",
    "prior": "Je kent headings, section en main.",
    "concepts": [
      "Een article is zelfstandig begrijpelijke inhoud, zoals een blogbericht of nieuwsbericht.",
      "Een h2 kan de titel van een article zijn wanneer de pagina zelf al een h1 heeft; een p bevat de inhoud.",
      "Een volledige HTML-pagina kan in head een title en meta description bevatten. In deze leeromgeving werk je vooral aan body-inhoud, dus we oefenen hier met article."
    ],
    "example": "<h1>Mijn blog</h1>\n<article>\n  <h2>Waarom ik leer programmeren</h2>\n  <p>Ik wil mijn eigen websites kunnen maken.</p>\n</article>",
    "language": "html",
    "explanation": [
      "De h1 noemt de pagina. Binnen article krijgt het bericht zijn eigen h2.",
      "De p hoort inhoudelijk bij het artikel en staat daarom binnen de article-tags.",
      "De browser toont article meestal zonder bijzondere opmaak. De semantiek helpt om inhoud af te bakenen."
    ],
    "steps": [
      "Laat de bestaande hoofdkop staan.",
      "Voeg een article toe en plaats daarin een h2 met een eigen onderwerp.",
      "Schrijf onder die h2 een p met minimaal één volledige zin.",
      "Controleer of alle elementen binnen article staan."
    ],
    "expected": "Een herkenbaar artikel met h2 en p binnen article.",
    "pitfall": "Zet meta-tags niet willekeurig in de body-editor; die horen normaal in head.",
    "questions": [
      "Wanneer gebruik je article in plaats van een willekeurige div?",
      "Waar hoort een meta description in een volledig document?"
    ]
  },
  "m4-l1": {
    "goal": "Een CSS-regel lezen en zelf een tekstkleur instellen.",
    "prior": "Je kent HTML en hebt de tab style.css al gezien. CSS-syntax is nieuw.",
    "concepts": [
      "Een CSS-regel heeft drie delen: de selector, een blok met accolades en daarin eigenschappen met waarden.",
      "Bij h1 { color: blue; } kiest h1 de kop, color is de eigenschap en blue is de waarde.",
      "CSS staat in het tabblad style.css. Je hoeft de HTML-kop niet te wijzigen om zijn kleur te veranderen."
    ],
    "example": "h1 {\n  color: blue;\n  font-size: 28px;\n}",
    "language": "css",
    "explanation": [
      "h1 vóór de accolade is de selector. Alles tussen { en } zijn stijlregels voor die kop.",
      "De dubbele punt scheidt de eigenschap en waarde. De puntkomma sluit de declaratie af.",
      "Je bestaande CSS bevat al font-size; voeg een nieuwe regel color: blue; toe zonder de eerdere regel te verwijderen."
    ],
    "steps": [
      "Open style.css en zoek de bestaande h1-regel.",
      "Zet de cursor tussen de accolades op een nieuwe regel.",
      "Typ color: blue; en kijk hoe de kop rechts van kleur verandert.",
      "Probeer daarna purple of red. Bekijk wat er gebeurt met de tekst, niet met de achtergrond."
    ],
    "expected": "Een zichtbare kop waarvan de tekstkleur door CSS verandert.",
    "pitfall": "Schrijf CSS niet als <color>blue</color>. CSS gebruikt eigenschap: waarde; binnen accolades.",
    "questions": [
      "Wat is de selector in h1 { color: blue; }?",
      "Wat doet de puntkomma aan het einde van een CSS-declaratie?"
    ]
  },
  "m4-l2": {
    "goal": "De achtergrondkleur veranderen en rekening houden met tekstcontrast.",
    "prior": "Je weet hoe een CSS-regel eruitziet en hebt color gebruikt.",
    "concepts": [
      "background-color verandert de achtergrond achter een element. Het is iets anders dan color, dat de tekstkleur aanpast.",
      "Body is het element met de zichtbare hoofdinhoud van je document. Een achtergrond op body kleurt daarom meestal de hele voorbeeldpagina.",
      "Kies een kleur waarbij de tekst goed leesbaar blijft. Donkere tekst op een lichte achtergrond is vaak een veilig begin."
    ],
    "example": "body {\n  padding: 20px;\n  background-color: lightyellow;\n  color: #17191c;\n}",
    "language": "css",
    "explanation": [
      "De selector body richt zich op de pagina-inhoud. De bestaande padding houdt de tekst weg van de rand.",
      "background-color: lightyellow; zet een lichtgele achtergrond.",
      "De extra color-regel laat zien hoe tekstcontrast behouden blijft. Je hoeft color niet toe te voegen voor de opdracht, maar mag het proberen."
    ],
    "steps": [
      "Open style.css en zoek de body-regel.",
      "Voeg tussen de accolades background-color: lightyellow; toe.",
      "Bekijk of de achtergrond verandert en de kop nog goed leesbaar blijft.",
      "Probeer één andere lichte kleur en vergelijk het resultaat."
    ],
    "expected": "Een veranderde pagina-achtergrond waarbij de tekst leesbaar blijft.",
    "pitfall": "color en background-color zijn niet hetzelfde. Een donkere achtergrond zonder aangepaste tekstkleur kan slecht leesbaar worden.",
    "questions": [
      "Welke eigenschap verandert de tekstkleur?",
      "Welke eigenschap gebruik je voor de pagina-achtergrond?"
    ]
  },
  "m4-l3": {
    "goal": "Een lettertype kiezen en tekst leesbaar laten staan.",
    "prior": "Je kent selector { eigenschap: waarde; } en hebt color/background-color gebruikt.",
    "concepts": [
      "font-family bepaalt welke lettertypefamilie wordt gebruikt. Je kunt een lijst met alternatieven opgeven.",
      "sans-serif betekent een lettertype zonder kleine schreefjes. Arial is een veelvoorkomend voorbeeld.",
      "line-height bepaalt de verticale ruimte tussen tekstregels; ongeveer 1.5 of 1.6 kan lange alinea’s prettiger leesbaar maken."
    ],
    "example": "body {\n  font-family: Arial, sans-serif;\n  line-height: 1.6;\n}",
    "language": "css",
    "explanation": [
      "Body kiest alle hoofdtekst op de pagina. De eerste beschikbare familie uit de lijst wordt gebruikt.",
      "Arial wordt eerst geprobeerd; als dat niet beschikbaar is, gebruikt de browser een passend sans-serif-lettertype.",
      "line-height: 1.6 gebruikt een verhouding zonder px en geeft tekstregels extra ademruimte."
    ],
    "steps": [
      "Open style.css en zoek de body-regel met line-height.",
      "Voeg font-family: Arial, sans-serif; toe binnen de accolades.",
      "Bekijk de tekst. Probeer eventueel Georgia, serif; en vergelijk het verschil."
    ],
    "expected": "Een pagina met een expliciet ingesteld lettertype en leesbare regels.",
    "pitfall": "Schrijf lettertypen met een spatie tussen aanhalingstekens, zoals \"Times New Roman\". Een generieke fallback zoals serif of sans-serif is verstandig.",
    "questions": [
      "Wat gebeurt er als Arial niet op de computer staat?",
      "Waarom kan te weinig regelafstand lastig lezen zijn?"
    ]
  },
  "m4-l4": {
    "goal": "Het verschil begrijpen tussen marge en binnenruimte in het boxmodel.",
    "prior": "Je kunt een CSS-regel toevoegen aan p.",
    "concepts": [
      "Elk HTML-element kun je voorstellen als een doos: de inhoud staat in het midden, daarna komt padding, eventueel border en daarbuiten margin.",
      "Padding is ruimte tussen inhoud en de rand/achtergrond van het element.",
      "Margin is ruimte buiten het element en duwt andere elementen van zich af."
    ],
    "example": "p {\n  background: lightyellow;\n  padding: 20px;\n  margin: 16px;\n}",
    "language": "css",
    "explanation": [
      "Een gele achtergrond laat duidelijk zien hoe groot het p-vlak is.",
      "Padding maakt de gele ruimte rondom de letters groter: de tekst zit verder van de rand.",
      "Margin creëert ruimte buiten het gele vlak richting andere onderdelen."
    ],
    "steps": [
      "Open style.css en vind de p-regel.",
      "Voeg padding: 20px; toe.",
      "Bekijk of er nu meer ruimte binnen de gekleurde alinea is.",
      "Probeer daarna ook margin: 16px; en vergelijk welk deel van de ruimte verandert."
    ],
    "expected": "Een alinea met duidelijk zichtbare ruimte tussen de tekst en de rand van de achtergrond.",
    "pitfall": "Padding en margin lijken soms hetzelfde bij een witte achtergrond. Voeg tijdelijk een achtergrondkleur toe om het verschil zichtbaar te maken.",
    "questions": [
      "Welke eigenschap maakt ruimte binnen het element?",
      "Welke maakt ruimte buiten het element?"
    ]
  },
  "m4-l5": {
    "goal": "Een kader met rand en afgeronde hoeken maken.",
    "prior": "Je kent padding en hebt eerder een p-element vormgegeven.",
    "concepts": [
      "border tekent een rand om het element. Je geeft doorgaans dikte, stijl en kleur op: 1px solid gray.",
      "border-radius rondt de hoeken van de rand en achtergrond af.",
      "Een kaart ontstaat vaak uit een combinatie van padding, border, achtergrond en radius."
    ],
    "example": "p {\n  padding: 16px;\n  border: 2px solid #27364a;\n  border-radius: 8px;\n}",
    "language": "css",
    "explanation": [
      "2px is de dikte van de rand; solid betekent een doorlopende lijn.",
      "#27364a is een hexadecimale kleurwaarde voor een donkere rand.",
      "8px bij border-radius geeft een lichte afronding van de hoeken. Zonder border zie je de ronding soms niet."
    ],
    "steps": [
      "Open style.css en vind de p-regel met bestaande padding.",
      "Voeg border: 2px solid #27364a; toe.",
      "Kijk naar de omlijning van de alinea. Voeg daarna border-radius: 8px; toe om de hoeken te vergelijken."
    ],
    "expected": "Een zichtbare rand rond de alinea; eventueel afgeronde hoeken.",
    "pitfall": "border: blue; is onvoldoende om altijd een rand te tonen: geef ook een dikte en stijl op.",
    "questions": [
      "Wat betekent solid in een border-regel?",
      "Hoe verander je de vorm van de hoeken?"
    ]
  },
  "m5-l1": {
    "goal": "Twee elementen naast elkaar zetten met Flexbox.",
    "prior": "Je kent HTML-divs als containers en basis-CSS-regels.",
    "concepts": [
      "Een flexcontainer is een element waarvan display: flex; is ingesteld. De directe kinderen worden flexitems.",
      "Zonder extra instellingen staan flexitems doorgaans naast elkaar in een rij.",
      "Met gap maak je ruimte tussen items zonder ieder item afzonderlijk margin te geven."
    ],
    "example": ".container {\n  display: flex;\n  gap: 16px;\n}",
    "language": "css",
    "explanation": [
      "De punt in .container vertelt CSS dat we een class selecteren, geen HTML-tag met de naam container.",
      "In de HTML heeft de buitenste div class=\"container\". De twee p-elementen binnen die div zijn flexitems.",
      "display: flex; regelt hun plaatsing. gap geeft ruimte tussen de items."
    ],
    "steps": [
      "Open style.css en zoek .container { ... }.",
      "Voeg display: flex; toe naast de bestaande gap-regel.",
      "Bekijk of de twee p-elementen naast elkaar komen.",
      "Verander gap tijdelijk naar 32px en kijk wat dat verandert."
    ],
    "expected": "Twee tekstblokken naast elkaar met ruimte ertussen.",
    "pitfall": "Zonder de punt selecteer je een HTML-element met die tagnaam. Voor class=\"container\" gebruik je .container.",
    "questions": [
      "Welke elementen worden flexitems?",
      "Wat is het verschil tussen display: flex en gap?"
    ]
  },
  "m5-l2": {
    "goal": "Flexitems in rijen of kolommen zetten met flex-direction.",
    "prior": "Je hebt display: flex gebruikt in de vorige les.",
    "concepts": [
      "Een flexcontainer heeft standaard een hoofdas van links naar rechts (row).",
      "flex-direction verandert de richting naar row, column, row-reverse of column-reverse.",
      "De richting verandert hoe items worden geplaatst, niet hun volgorde in de HTML-broncode."
    ],
    "example": ".container {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}",
    "language": "css",
    "explanation": [
      "Display: flex activeert Flexbox op de container.",
      "flex-direction: column; zet de kinderen verticaal onder elkaar.",
      "gap geeft ook tussen verticale flexitems ruimte, zonder dat je zelf margins hoeft uit te rekenen."
    ],
    "steps": [
      "Open style.css en voeg flex-direction: column; toe binnen .container.",
      "Bekijk of de twee p-elementen onder elkaar staan.",
      "Verander column tijdelijk naar row en vergelijk de preview.",
      "Zet de richting terug naar een bewuste keuze en leg uit waarom."
    ],
    "expected": "Een flexcontainer met een expliciete richting, zichtbaar anders dan de standaardrij.",
    "pitfall": "flex-direction werkt alleen bij een element dat als flexcontainer is ingesteld; vergeet display: flex; niet.",
    "questions": [
      "Welke richting hoort bij een verticale stapel?",
      "Wat gebeurt er met de HTML-volgorde als je alleen flex-direction verandert?"
    ]
  },
  "m5-l3": {
    "goal": "Een eenvoudig CSS Grid maken met twee kolommen.",
    "prior": "Je kunt CSS-klassen selecteren en kent Flexbox.",
    "concepts": [
      "CSS Grid is een layoutmethode voor rijen én kolommen. Je schakelt Grid in met display: grid;.",
      "grid-template-columns bepaalt de kolommen. repeat(2, 1fr) betekent twee kolommen die de beschikbare ruimte gelijk verdelen.",
      "Gap creëert ruimte tussen de vakken van het raster."
    ],
    "example": ".grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 12px;\n}",
    "language": "css",
    "explanation": [
      ".grid kiest het element met class=\"grid\" in de HTML.",
      "display: grid maakt er een rastercontainer van. De twee p-elementen worden griditems.",
      "repeat(2, 1fr) verdeelt ze in twee gelijke kolommen. Het getal 2 is het aantal kolommen; fr verdeelt de ruimte."
    ],
    "steps": [
      "Open style.css en voeg display: grid; toe binnen de bestaande .grid-regel.",
      "Voeg vervolgens grid-template-columns: repeat(2, 1fr); toe.",
      "Bekijk hoe de twee p-elementen in kolommen staan. Probeer ook 1fr 2fr.",
      "Kijk wat er gebeurt met de beschikbare breedte."
    ],
    "expected": "Een rastercontainer met minstens twee zichtbaar ingedeelde kolommen.",
    "pitfall": "Zonder grid-template-columns kan Grid nog steeds actief zijn, maar niet noodzakelijk de twee gewenste kolommen tonen.",
    "questions": [
      "Wat doet 1fr in CSS Grid?",
      "Wanneer kan Grid handiger zijn dan Flexbox?"
    ]
  },
  "m5-l4": {
    "goal": "Een eenvoudige media query gebruiken voor kleinere schermen.",
    "prior": "Je kunt een gewone CSS-regel schrijven en hebt Grid/Flexbox gezien.",
    "concepts": [
      "Een responsive pagina past zich aan aan verschillende schermbreedtes. Niet iedere bezoeker heeft hetzelfde scherm.",
      "Een media query begint met @media en stelt een voorwaarde, bijvoorbeeld een maximale breedte.",
      "CSS binnen de media query geldt alleen als die voorwaarde waar is. Gewone regels buiten de query blijven daarnaast bestaan."
    ],
    "example": "h1 { font-size: 30px; }\n\n@media (max-width: 600px) {\n  h1 { font-size: 22px; }\n}",
    "language": "css",
    "explanation": [
      "De eerste h1-regel stelt de normale titelgrootte in.",
      "@media (max-width: 600px) geldt bij een viewport van maximaal 600 CSS-pixels breed.",
      "De geneste h1-regel overschrijft binnen die breedte de font-size. Buiten de media query blijft de normale waarde gelden."
    ],
    "steps": [
      "Open style.css en laat de bestaande h1-regel staan.",
      "Voeg onderaan een @media (max-width: 600px) { ... }-blok toe.",
      "Plaats daarbinnen h1 { font-size: 22px; }.",
      "Bekijk de preview bij een andere breedte, indien de browser dat toestaat; vergelijk groot en klein."
    ],
    "expected": "Een geldige @media-regel waarmee de titelgrootte voor kleinere schermen verandert.",
    "pitfall": "Vergeet de extra sluitende accolade niet: een media query bevat een buitenste én een binnenste blok.",
    "questions": [
      "Wat betekent max-width: 600px?",
      "Welke font-size heeft de titel bij een breed scherm?"
    ]
  },
  "m5-l5": {
    "goal": "Met consistente ruimte en hiërarchie een overzichtelijke interface maken.",
    "prior": "Je hebt CSS Grid/Flexbox, gap en tekststijlen gebruikt.",
    "concepts": [
      "Visuele hiërarchie betekent dat bezoekers snel zien wat het belangrijkst is. Grootte, contrast en witruimte helpen daarbij.",
      "Consistente afstanden werken rustiger dan voor ieder onderdeel willekeurige margins.",
      "Gap werkt tussen de kinderen van een flex- of gridcontainer. Met padding regel je de binnenruimte van een kaart."
    ],
    "example": ".container {\n  display: flex;\n  gap: 24px;\n}\n.container p {\n  padding: 12px;\n}",
    "language": "css",
    "explanation": [
      "Flex plaatst de twee p-elementen bij elkaar in een rij.",
      "Gap maakt precies 24px ruimte tussen de flexitems; dat is niet hetzelfde als padding.",
      ".container p kiest alleen p-elementen binnen de container en geeft hun 12px binnenruimte."
    ],
    "steps": [
      "Open style.css en voeg gap: 24px; toe aan .container.",
      "Bekijk hoe de ruimte tussen de twee onderdelen verandert.",
      "Voeg eventueel .container p { padding: 12px; } toe en vergelijk binnenruimte met tussenruimte.",
      "Kies één of twee consistente afstanden in plaats van overal andere waardes."
    ],
    "expected": "Twee onderdelen met een bewuste tussenruimte.",
    "pitfall": "Een layout met te veel verschillende afstanden voelt onrustig; houd de schaal klein en consistent.",
    "questions": [
      "Wat is het verschil tussen gap en padding?",
      "Waarom is een duidelijke hoofdkop belangrijk voor visuele hiërarchie?"
    ]
  },
  "m6-l1": {
    "goal": "Begrijpen wat JavaScript doet en je eerste console.log schrijven.",
    "prior": "Je kent HTML en CSS. JavaScript-syntax is nieuw.",
    "concepts": [
      "JavaScript is een programmeertaal waarmee een pagina op gebeurtenissen kan reageren en informatie kan verwerken.",
      "console.log(...) is een instructie die een waarde normaal in de ontwikkelaarsconsole schrijft. Een string (tekst) staat tussen aanhalingstekens.",
      "Student-JavaScript wordt in een aparte, afgeschermde uitvoeromgeving gestart. Druk zelf op Voer JavaScript uit; je code draait niet tijdens het typen."
    ],
    "example": "console.log(\"Hallo vanuit JavaScript!\");",
    "language": "js",
    "explanation": [
      "console verwijst naar de ontwikkelaarsconsole en .log is een methode om een bericht te schrijven.",
      "Tussen de haakjes staat de waarde die je wilt loggen. De dubbele aanhalingstekens maken er tekst van.",
      "De puntkomma sluit de instructie af; dit is een gebruikelijke schrijfwijze. Klik op Voer JavaScript uit om het bericht in de console te zien."
    ],
    "steps": [
      "Open het tabblad script.js en laat de commentaarregel gerust staan.",
      "Typ een nieuwe regel: console.log(\"Ik leer JavaScript\");",
      "Controleer de punt vóór log, de haakjes en de aanhalingstekens.",
      "Klik op Voer JavaScript uit en lees het bericht in de console. Verander de tekst en probeer opnieuw."
    ],
    "expected": "Een werkende console.log-regel. Na Voer JavaScript uit verschijnt jouw tekst in de console.",
    "pitfall": "Bij JavaScript verschijnt uitvoer onder Console-uitvoer, niet als tekst op de HTML-pagina. Gebruik console.log als je iets wilt zien.",
    "questions": [
      "Waarom staat tekst tussen aanhalingstekens?",
      "Waar zou console.log normaal zijn bericht tonen?"
    ]
  },
  "m6-l2": {
    "goal": "Een waarde bewaren in een JavaScript-variabele met const.",
    "prior": "Je hebt console.log en strings gezien.",
    "concepts": [
      "Een variabele heeft een naam en verwijst naar een waarde, bijvoorbeeld de naam van een persoon.",
      "Met const maak je een binding die je later niet opnieuw aan een andere waarde kunt toewijzen; met let kan dat wel.",
      "Tekst tussen quotes is een string. Zonder quotes denkt JavaScript meestal dat je een andere variabele bedoelt."
    ],
    "example": "const voornaam = \"Sam\";\nconsole.log(voornaam);",
    "language": "js",
    "explanation": [
      "const begint de declaratie. voornaam is de zelfgekozen variabelenaam.",
      "Het =-teken wijst de string \"Sam\" toe. De quotes geven aan dat Sam tekst is.",
      "console.log(voornaam) gebruikt de variabele zonder quotes; met quotes zou letterlijk het woord voornaam verschijnen."
    ],
    "steps": [
      "Open script.js en maak een nieuwe regel onder de commentaartekst.",
      "Typ const mijnNaam = \"Jouw naam\"; en vervang de tekst door je eigen voorbeeldnaam.",
      "Voeg eventueel console.log(mijnNaam); toe om te laten zien hoe je de variabele zou gebruiken.",
      "Bedenk waarom je de variabelenaam zonder spaties schrijft."
    ],
    "expected": "Een const-declaratie met een duidelijke naam en stringwaarde. Voeg console.log(mijnNaam) toe om de waarde in de console te zien.",
    "pitfall": "Schrijf niet const mijn naam = ...; Een variabelenaam mag geen spatie bevatten.",
    "questions": [
      "Wat is het verschil tussen mijnNaam en \"mijnNaam\"?",
      "Wanneer kies je const in plaats van let?"
    ]
  },
  "m6-l3": {
    "goal": "Strings, numbers en booleans onderscheiden.",
    "prior": "Je kunt een const-variabele schrijven.",
    "concepts": [
      "Een string is tekst en staat meestal tussen aanhalingstekens. Een number is een getal zonder quotes.",
      "Een boolean heeft precies twee mogelijke waarden: true of false. Die schrijf je zonder quotes.",
      "Het datatype bepaalt welke bewerkingen logisch zijn. \"7\" is tekst en 7 is een getal."
    ],
    "example": "const naam = \"Sam\";\nconst leeftijd = 18;\nconst isStudent = true;",
    "language": "js",
    "explanation": [
      "Naam is een string doordat Sam tussen quotes staat.",
      "Leeftijd is een number doordat 18 zonder quotes wordt geschreven.",
      "isStudent is een boolean. true en false zijn ingebouwde JavaScript-waarden, geen gewone woorden."
    ],
    "steps": [
      "Open script.js en maak drie regels: één met tekst, één met een getal en één met true of false.",
      "Gebruik const isBeginner = true; als voorbeeld van een boolean.",
      "Lees elk type hardop: string, number, boolean. Schrijf er in een commentaar bij wat het betekent."
    ],
    "expected": "Een booleanvariabele met true of false, naast andere typen als je wilt.",
    "pitfall": "Gebruik niet \"true\" als je een echte boolean bedoelt; met aanhalingstekens wordt het tekst.",
    "questions": [
      "Welke van deze waarden is een number: 42 of \"42\"?",
      "Wat is het verschil tussen false en \"false\"?"
    ]
  },
  "m6-l4": {
    "goal": "Een eenvoudige voorwaarde maken met een JavaScript-if-blok.",
    "prior": "Je kent variabelen en booleans.",
    "concepts": [
      "Een if-statement voert het blok tussen accolades alleen uit als de voorwaarde tussen haakjes waar is.",
      "Je kunt een booleanvariabele direct als voorwaarde gebruiken, of een vergelijking zoals leeftijd >= 18.",
      "De code in de accolades is het blok dat bij de voorwaarde hoort. Goed inspringen maakt dat overzichtelijk."
    ],
    "example": "const heeftToegang = true;\nif (heeftToegang) {\n  console.log(\"Welkom!\");\n}",
    "language": "js",
    "explanation": [
      "const heeftToegang bewaart true, dus de voorwaarde is waar.",
      "if (heeftToegang) controleert de boolean. De ronde haakjes zijn onderdeel van de if-syntax.",
      "De accolades bevatten de instructie. Klik op Voer JavaScript uit: als de voorwaarde true is, zie je de melding."
    ],
    "steps": [
      "Open script.js en maak een const met een boolean.",
      "Schrijf eronder if (naamVanVariabele) { op de eerste regel.",
      "Zet binnen de accolades een console.log met een bericht en sluit daarna af met }.",
      "Lees je code alsof je een beslisboom uitlegt: als dit waar is, dan gebeurt dat."
    ],
    "expected": "Een if-blok met geldige haakjes en accolades. Voer de code uit en vergelijk true met false.",
    "pitfall": "Verwar = (toewijzen) niet met === (strikt vergelijken). Als je simpelweg een boolean gebruikt, is geen vergelijking nodig.",
    "questions": [
      "Wat gebeurt er met het blok als de voorwaarde false is?",
      "Wat is het doel van de accolades na if?"
    ]
  },
  "m6-l5": {
    "goal": "Een functie met een herkenbare naam schrijven.",
    "prior": "Je kent const, if en console.log.",
    "concepts": [
      "Een functie groepeert instructies die je onder één naam kunt hergebruiken.",
      "Met function begroet() { ... } definieer je een functie. De ronde haakjes kunnen later parameters bevatten.",
      "Een functiedefinitie voert het blok niet automatisch uit. Normaal roep je haar apart aan met begroet()."
    ],
    "example": "function begroet() {\n  console.log(\"Hallo!\");\n}\n\nbegroet();",
    "language": "js",
    "explanation": [
      "function begint de definitie; begroet is de zelfgekozen functienaam.",
      "() is voorlopig leeg omdat deze functie geen parameters heeft.",
      "De accolades bevatten de instructie. De regel begroet(); roept de functie aan. Klik op Voer JavaScript uit om het bericht te zien."
    ],
    "steps": [
      "Open script.js en maak function toonBericht() { op een nieuwe regel.",
      "Zet er een ingesprongen console.log binnen en sluit de functie af met }.",
      "Voeg daaronder toonBericht(); toe om de aanroep te oefenen.",
      "Controleer of je de naam in de definitie en de aanroep hetzelfde hebt geschreven."
    ],
    "expected": "Een functie met de keyword function, duidelijke naam en afsluitende accolade.",
    "pitfall": "Een functie definiëren is iets anders dan uitvoeren. Met alleen function toonBericht() {...} gebeurt nog niets.",
    "questions": [
      "Wat is het verschil tussen een functiedefinitie en een functieaanroep?",
      "Waarvoor dienen de ronde haakjes?"
    ]
  },
  "m7-l1": {
    "goal": "Een array maken en onderdelen via een index begrijpen.",
    "prior": "Je kent variabelen en JavaScript-datatypen.",
    "concepts": [
      "Een array bewaart meerdere waarden onder één variabelenaam, bijvoorbeeld een lijst van hobby’s.",
      "Je schrijft een array tussen vierkante haken. De waarden scheid je met komma’s.",
      "Arrays tellen vanaf index 0. Het eerste onderdeel is dus hobbys[0], niet hobby’s[1]."
    ],
    "example": "const hobbys = [\"gamen\", \"sporten\", \"lezen\"];\nconsole.log(hobbys[0]);",
    "language": "js",
    "explanation": [
      "const bewaart de lijst in één variabele; de vierkante haken maken er een array van.",
      "De komma’s scheiden de strings. De lijst bevat hier drie onderdelen.",
      "De index [0] verwijst naar het eerste onderdeel. Na uitvoeren zie je dat onderdeel in de console."
    ],
    "steps": [
      "Open script.js en maak const favorieteDingen = [\"muziek\", \"films\", \"boeken\"];.",
      "Voeg een commentaarregel toe die uitlegt wat index 0 betekent.",
      "Schrijf eventueel console.log(favorieteDingen[0]); om het eerste item te kiezen.",
      "Controleer de vierkante haken, komma’s en aanhalingstekens."
    ],
    "expected": "Een array met meerdere waarden, op de juiste manier tussen [ en ].",
    "pitfall": "Verwar vierkante haken van arrays niet met accolades van objecten. Arrays houden een volgorde bij.",
    "questions": [
      "Welke index heeft het eerste onderdeel van een array?",
      "Hoe scheid je meerdere waarden binnen de array?"
    ]
  },
  "m7-l2": {
    "goal": "Een object met namen van eigenschappen en waarden maken.",
    "prior": "Je kent arrays en const-variabelen.",
    "concepts": [
      "Een object groepeert gegevens die bij één ding horen, zoals naam, leeftijd en actief.",
      "Je schrijft een object met accolades. Iedere eigenschap heeft een sleutel en een waarde, gescheiden met een dubbele punt.",
      "Met puntnotatie, bijvoorbeeld persoon.naam, verwijs je normaal naar een eigenschap."
    ],
    "example": "const persoon = {\n  naam: \"Sam\",\n  leeftijd: 18,\n  actief: true\n};\nconsole.log(persoon.naam);",
    "language": "js",
    "explanation": [
      "De variabele persoon verwijst naar een object tussen accolades.",
      "naam: \"Sam\" is één eigenschap. Tussen eigenschappen staan komma’s, behalve na de laatste als je dat liever weglaat.",
      "persoon.naam zou de string Sam opleveren wanneer de code daadwerkelijk draait."
    ],
    "steps": [
      "Open script.js en maak const leerling = { ... };.",
      "Voeg binnen de accolades minstens één eigenschap toe, bijvoorbeeld naam: \"Sam\".",
      "Voeg desgewenst ook leeftijd en actief toe. Controleer de komma’s.",
      "Beschrijf in een commentaar waarom een object bij deze gegevens past."
    ],
    "expected": "Een const met een geldig object en minstens één sleutel-waarde-paar.",
    "pitfall": "Schrijf bij een object naam: \"Sam\" en niet naam = \"Sam\". Dubbele punten scheiden sleutel en waarde.",
    "questions": [
      "Waarom past een object bij de gegevens van één persoon?",
      "Hoe lees je de eigenschap naam uit persoon?"
    ]
  },
  "m7-l3": {
    "goal": "Een HTML-element selecteren met document.querySelector.",
    "prior": "Je kent variabelen, objecten en CSS-selectoren.",
    "concepts": [
      "DOM staat voor Document Object Model: de objectstructuur die de browser van HTML maakt.",
      "document.querySelector(\"h1\") zoekt het eerste h1-element op de pagina. Je kunt ook een class kiezen met . of een id met #.",
      "Het resultaat is een elementobject of null als er geen passend element bestaat. Voer de code uit om dat in de console te bekijken."
    ],
    "example": "const titel = document.querySelector(\"#titel\");\nconsole.log(titel);",
    "language": "js",
    "explanation": [
      "In de HTML staat een kop met id=\"titel\". Het hekje in \"#titel\" kiest precies dat id.",
      "querySelector is een methode van document. De selector staat als string tussen aanhalingstekens.",
      "De variabele titel zou de gevonden DOM-node bevatten. Zonder passend id is het resultaat null."
    ],
    "steps": [
      "Bekijk index.html: daar staat een h1 met id=\"titel\".",
      "Open script.js en schrijf const kop = document.querySelector(\"#titel\");.",
      "Controleer dat je querySelector met hoofdletter S schrijft.",
      "Leg in een commentaar uit waarom #titel overeenkomt met het id in HTML."
    ],
    "expected": "Een querySelector-aanroep die een bestaand HTML-element aanwijst. Gebruik console.log om het gevonden element in de console te zien.",
    "pitfall": "document.querySelector(\"titel\") zoekt een element met tagnaam titel; voor id=\"titel\" moet je \"#titel\" schrijven.",
    "questions": [
      "Wat betekent het # in een CSS/DOM-selector?",
      "Wat is het verschil tussen een HTML-element en de variabele die ernaar verwijst?"
    ]
  },
  "m7-l4": {
    "goal": "Een gebeurtenis zoals klikken aan een functie koppelen.",
    "prior": "Je kent functies en document.querySelector.",
    "concepts": [
      "Een event is iets wat gebeurt, zoals een klik, toetsaanslag of verandering in een invoerveld.",
      "addEventListener(\"click\", handler) registreert een functie die normaal wordt aangeroepen bij een klik.",
      "Je geeft de functie mee zonder hem direct uit te voeren. Daarom schrijf je bij een functieverwijzing bijvoorbeeld toonBericht, niet toonBericht()."
    ],
    "example": "const knop = document.querySelector(\"button\");\nfunction toonBericht() {\n  console.log(\"Geklikt!\");\n}\nknop.addEventListener(\"click\", toonBericht);",
    "language": "js",
    "explanation": [
      "De HTML bevat een button-element. querySelector(\"button\") zou dat element selecteren.",
      "De functie toonBericht beschrijft wat er bij de klik moet gebeuren.",
      "addEventListener verbindt het klik-evenement aan de functie. Voer JavaScript uit en klik daarna op de knop in de preview."
    ],
    "steps": [
      "Bekijk het button-element in index.html.",
      "Open script.js en selecteer de knop met document.querySelector(\"button\").",
      "Schrijf een functie met console.log en registreer die met knop.addEventListener(\"click\", toonBericht);.",
      "Controleer de schrijfwijze van addEventListener en de aanhalingstekens rond click."
    ],
    "expected": "Een werkende eventlistener. Na Voer JavaScript uit verschijnt bij een klik op de knop de melding Geklikt! in de console.",
    "pitfall": "Schrijf bij het registreren niet toonBericht() als je de functie wilt meegeven: daarmee roep je hem meteen aan.",
    "questions": [
      "Wat is de gebeurtenisnaam bij een klik?",
      "Waarom staat toonBericht zonder haakjes in addEventListener?"
    ]
  },
  "m7-l5": {
    "goal": "Een eenvoudige debugstap formuleren met console.log.",
    "prior": "Je kent variabelen en functies.",
    "concepts": [
      "Debuggen betekent systematisch zoeken waarom code iets anders doet dan verwacht.",
      "Begin met een kleine, concrete verwachting: welke waarde zou een variabele hier moeten hebben?",
      "console.log helpt normaal die waarde zichtbaar te maken; een foutmelding vertelt vaak op welke regel iets misgaat. In deze preview lezen we de code, omdat JS-uitvoering uitstaat."
    ],
    "example": "const totaal = 2 + 3;\nconsole.log(\"totaal:\", totaal);",
    "language": "js",
    "explanation": [
      "De waarde van totaal is het resultaat van 2 + 3, dus normaal 5.",
      "console.log krijgt twee argumenten: een beschrijvende tekst en de echte variabele.",
      "Bij een fout vergelijk je eerst de verwachte waarde met wat normaal uit deze instructie zou komen. Verander één ding tegelijk."
    ],
    "steps": [
      "Open script.js en voeg const score = 10; toe.",
      "Schrijf daarna console.log(\"score:\", score);.",
      "Voeg een commentaar toe met wat je verwacht te zien als de code wordt uitgevoerd.",
      "Controleer je variabelenaam en haakjes."
    ],
    "expected": "Een console.log-aanroep die een variabele toont, met een uitgesproken verwachting.",
    "pitfall": "console.log(\"score\") toont letterlijk het woord score; console.log(score) toont normaal de waarde van de variabele.",
    "questions": [
      "Waarom is het nuttig eerst te bedenken wat je verwacht?",
      "Wat is het verschil tussen console.log(score) en console.log(\"score\")?"
    ]
  },
  "m8-l1": {
    "goal": "De HTML-basis combineren tot een duidelijke, logische pagina.",
    "prior": "Je kent koppen, alinea’s, lijsten en semantische onderdelen.",
    "concepts": [
      "Een overzichtelijke pagina begint met één duidelijk hoofdonderwerp, beschreven met h1.",
      "Met p geef je uitleg; met h2 breng je subonderwerpen aan en met ul/li groepeer je opsommingen.",
      "Gebruik HTML voor betekenis. CSS bepaalt later de kleuren en afstanden, niet de tags die je kiest."
    ],
    "example": "<h1>Mijn leerportfolio</h1>\n<p>Dit heb ik deze week geleerd.</p>\n<h2>Onderwerpen</h2>\n<ul><li>HTML</li><li>CSS</li></ul>",
    "language": "html",
    "explanation": [
      "De h1 maakt het hoofdonderwerp duidelijk.",
      "De p geeft context. De h2 en ul brengen daarna overzicht aan.",
      "Lees de pagina ook zonder styling: begrijpt iemand dan de structuur?"
    ],
    "steps": [
      "Laat de bestaande h1 staan en voeg een p toe waarin je je leerdoel beschrijft.",
      "Voeg desgewenst een h2 en ul met je belangrijkste onderwerpen toe.",
      "Controleer de preview en lees de inhoud van boven naar beneden."
    ],
    "expected": "Een begrijpelijke pagina met hoofdkop en alinea, eventueel aangevuld met een subkop en lijst.",
    "pitfall": "Gebruik niet alleen een reeks koppen zonder uitleg; schrijf ook leesbare tekst in p-elementen.",
    "questions": [
      "Wat maakt een goede hoofdstructuur?",
      "Wanneer gebruik je ul en wanneer p?"
    ]
  },
  "m8-l2": {
    "goal": "De CSS-basis toepassen met leesbaar contrast.",
    "prior": "Je kent CSS-selectoren, achtergrondkleur en tekstkleur.",
    "concepts": [
      "Een goede pagina gebruikt kleuren om structuur te ondersteunen, niet om tekst onleesbaar te maken.",
      "background-color bepaalt een achtergrond; color bepaalt de tekstkleur. Die twee beïnvloeden samen het contrast.",
      "Ook padding en font-family helpen de leesbaarheid. Kies bewuste combinaties en test ze op een smal scherm."
    ],
    "example": "body {\n  background-color: #f7f7f7;\n  color: #17191c;\n  padding: 16px;\n}",
    "language": "css",
    "explanation": [
      "Body is hier de selector voor de gehele zichtbare pagina.",
      "#f7f7f7 is een zeer lichte grijstint en #17191c een donkere tekstkleur.",
      "Padding geeft ruimte tussen inhoud en de rand. Met dezelfde kleuren op elkaar zou tekst slecht leesbaar worden."
    ],
    "steps": [
      "Open style.css en voeg binnen body een background-color toe.",
      "Kies bij een donkere achtergrond een lichte tekstkleur of omgekeerd.",
      "Bekijk de preview en verander desgewenst één kleur om het effect te vergelijken.",
      "Controleer of kop en alinea beide leesbaar blijven."
    ],
    "expected": "Een zichtbare achtergrondkleur op body met voldoende leesbaarheid.",
    "pitfall": "Gebruik geen geel op lichtgeel als je tekst makkelijk leesbaar wilt houden.",
    "questions": [
      "Wat doet color versus background-color?",
      "Waarom moet je kleuren samen beoordelen?"
    ]
  },
  "m8-l3": {
    "goal": "Een JavaScript-functie als onderdeel van een interactie kunnen beschrijven.",
    "prior": "Je kent variabelen, functies en gebeurtenissen uit de vorige modules.",
    "concepts": [
      "Een functie bundelt herbruikbare instructies en krijgt een herkenbare naam.",
      "Een eventlistener kan later een functie aan een klik koppelen. Vaak heb je eerst een DOM-element nodig via querySelector.",
      "In deze les voer je de JavaScript-code uit in een afgeschermde preview. Klik op de knop en kijk wat console.log toont."
    ],
    "example": "function begroet() {\n  console.log(\"Welkom!\");\n}\nconst knop = document.querySelector(\"button\");\nknop.addEventListener(\"click\", begroet);",
    "language": "js",
    "explanation": [
      "De functie begroet is de instructie die we willen hergebruiken.",
      "querySelector zoekt normaal de knop op; zonder gevonden knop moet je later null afhandelen.",
      "addEventListener zou de functie bij een klik aanroepen. We geven de functienaam zonder () mee."
    ],
    "steps": [
      "Open script.js en definieer een functie met function en een duidelijke naam.",
      "Schrijf in de functie een console.log om de uitvoering begrijpelijk te maken.",
      "Selecteer de knop met document.querySelector(\"button\") en verbind je functie via addEventListener(\"click\", ...).",
      "Klik op Voer JavaScript uit, klik daarna op de knop in de preview en controleer de console."
    ],
    "expected": "Een functiedefinitie die je met een klik op de knop kunt uitvoeren. In de console verschijnt je bericht.",
    "pitfall": "Schrijf niet per ongeluk de functienaam alleen als tekst tussen aanhalingstekens wanneer je hem wilt aanroepen.",
    "questions": [
      "Hoe roep je een functie aan?",
      "Waarom zie je pas na het klikken een bericht in de console?"
    ]
  },
  "m8-l4": {
    "goal": "Code schrijven die een andere beginner gemakkelijk kan lezen.",
    "prior": "Je hebt HTML, CSS en een eerste kennismaking met JavaScript gehad.",
    "concepts": [
      "Codekwaliteit begint met betekenisvolle namen en een logische indeling.",
      "Gebruik witregels om delen te scheiden en spring geneste elementen consequent in.",
      "Zorg dat kopteksten concreet zijn. Een beschrijvende h1 met een passende p is duidelijker dan een vage titel met losse woorden."
    ],
    "example": "<h1>Mijn eerste receptenwebsite</h1>\n<p>Hier verzamel ik eenvoudige maaltijden voor studenten.</p>",
    "language": "html",
    "explanation": [
      "De h1 vertelt meteen wat de pagina is. De p legt kort uit voor wie de inhoud bedoeld is.",
      "De code is klein, maar volledig: de tags hebben een begin en een eind.",
      "Een collega moet zonder extra uitleg begrijpen wat de tekst voorstelt."
    ],
    "steps": [
      "Open index.html en kies een concreet onderwerp voor je pagina.",
      "Herschrijf de h1 zodat hij duidelijk zegt wat de bezoeker kan verwachten.",
      "Voeg een p toe met doelgroep of doel van de pagina.",
      "Lees je tekst terug alsof je hem voor het eerst ziet."
    ],
    "expected": "Een heldere h1 en p met begrijpelijke, netjes afgesloten tags.",
    "pitfall": "Alleen “Mijn website” is technisch geldig, maar zegt weinig over de inhoud.",
    "questions": [
      "Waarom zijn betekenisvolle namen en titels belangrijk?",
      "Wat doet consistente inspringing voor de leesbaarheid?"
    ]
  },
  "m8-l5": {
    "goal": "Een haalbaar plan maken voor de eindopdracht in VS Code.",
    "prior": "Je kunt een eenvoudige pagina met koppen, alinea’s en lijsten structureren.",
    "concepts": [
      "Een project begint met een doel: voor wie maak je de website en wat moet die persoon kunnen vinden?",
      "Maak vóór het programmeren een korte lijst van pagina-onderdelen, bijvoorbeeld navigatie, introductie, informatie en contact.",
      "In deze leeromgeving oefen je het plan in HTML. Pas bij de echte eindopdracht stap je over op VS Code en werk je aan je volledige project."
    ],
    "example": "<h1>Plan: website over mijn hobby</h1>\n<ul>\n  <li>Doel: bezoekers informeren</li>\n  <li>Doelgroep: beginners</li>\n  <li>Onderdelen: intro, tips, contact</li>\n</ul>",
    "language": "html",
    "explanation": [
      "De h1 beschrijft meteen de projectrichting.",
      "De ul groepeert de keuzes die je maakt vóór je code schrijft. Elke li is één beslissing.",
      "Dit is een plan, niet een volledige website. Daarmee voorkom je dat je direct begint met stijlen zonder te weten wat de inhoud moet zijn."
    ],
    "steps": [
      "Kies een klein onderwerp voor je eigen website.",
      "Beschrijf het doel in een h1 en maak een ul met minimaal drie li-elementen.",
      "Zet in de lijst de doelgroep, belangrijkste informatie en minimaal één gewenst onderdeel.",
      "Lees het plan door en bepaal wat je als eerste zou bouwen in VS Code."
    ],
    "expected": "Een duidelijk plan met een hoofdkop en lijst.",
    "pitfall": "Begin niet met tien functies en animaties tegelijk. Een heldere eerste pagina is een betere basis.",
    "questions": [
      "Waarom begin je met doel en doelgroep?",
      "Wat verandert er straks wanneer je de eindopdracht in VS Code maakt?"
    ]
  }
};
