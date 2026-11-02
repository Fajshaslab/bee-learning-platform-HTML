import { lessonGuides } from './lesson-guides.js';
// BEE Learning Platform — lesinhoud en modulechecks.
// Lesmateriaal is een uitgewerkte eerste versie, nog niet pedagogisch gevalideerd.
export const modules = [
  {
    "id": "m1",
    "number": 1,
    "title": "Introductie tot webontwikkeling",
    "description": "Kennismaken met internet, browser en ontwikkelomgeving",
    "durationMinutes": 300,
    "lessons": [
      {
        "id": "m1-l1",
        "title": "Hoe werkt een website?",
        "durationMinutes": 60,
        "introduction": "Een browser ontvangt HTML, CSS en JavaScript en zet dit om in een webpagina.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Een browser vraagt bestanden bij een webserver op en bouwt daaruit de pagina. HTML bevat de structuur, CSS de presentatie en JavaScript kan gedrag toevoegen."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Open de ontwikkeltools van je browser en zoek het Elements-paneel. Verander daar tijdelijk een tekst en kijk wat er gebeurt."
          },
          {
            "heading": "Let hierop",
            "text": "Een wijziging in Inspecteren staat niet automatisch in jouw opgeslagen code."
          }
        ],
        "task": "Beschrijf met een kop en een alinea wat de browser doet.",
        "initial": {
          "html": "<h1>Mijn eerste website</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Een browser ontvangt HTML, CSS en JavaScript en zet dit om in een webpagina.",
          "Let op de vereiste vorm: h1,p.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "h1,p",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m1-l2",
        "title": "De drie webtalen",
        "durationMinutes": 60,
        "introduction": "HTML verzorgt structuur, CSS de vormgeving en JavaScript het gedrag.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "HTML noemt onderdelen van een pagina, CSS bepaalt hoe ze eruitzien en JavaScript reageert op gebeurtenissen. Samen vormen ze één website, maar de taken zijn verschillend."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak een tabel in je hoofd: welke taal gebruik je voor een kop, een rode kop en een knop die iets doet?"
          },
          {
            "heading": "Let hierop",
            "text": "CSS maakt geen betekenisvolle HTML-structuur; gebruik daarvoor echte HTML-elementen."
          }
        ],
        "task": "Maak een kop en een alinea waarin je de drie webtalen uitlegt.",
        "initial": {
          "html": "<h1>HTML, CSS en JS</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? HTML verzorgt structuur, CSS de vormgeving en JavaScript het gedrag.",
          "Let op de vereiste vorm: h1,p.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "h1,p",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m1-l3",
        "title": "Bestanden en extensies",
        "durationMinutes": 60,
        "introduction": "Een HTML-bestand eindigt op .html; styles komen vaak in een .css-bestand.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "De extensie vertelt een programma hoe een bestand bedoeld is. Een pagina heet vaak index.html en verwijst via een link-tag naar style.css."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Benoem in een alinea welk bestand de inhoud bevat en welk bestand de vormgeving bevat."
          },
          {
            "heading": "Let hierop",
            "text": "Een bestandsnaam veranderen van .txt naar .html verandert niet automatisch de inhoud."
          }
        ],
        "task": "Schrijf een kop en een beschrijving van index.html.",
        "initial": {
          "html": "<h1>Bestanden</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Een HTML-bestand eindigt op .html; styles komen vaak in een .css-bestand.",
          "Let op de vereiste vorm: h1,p.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "h1,p",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m1-l4",
        "title": "Toegankelijk denken",
        "durationMinutes": 60,
        "introduction": "Duidelijke koppen, beschrijvende links en goed contrast helpen alle bezoekers.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Een goede webpagina werkt ook met toetsenbord, zoom en voorleessoftware. Gebruik echte koppen, beschrijvende links en voldoende contrast."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Schrijf een linktekst die zonder omringende alinea duidelijk maakt waar de link naartoe gaat."
          },
          {
            "heading": "Let hierop",
            "text": "Klik hier zegt buiten de context weinig; “Lees onze openingstijden” is duidelijker."
          }
        ],
        "task": "Maak een hoofdkop en een beschrijvende link naar example.com.",
        "initial": {
          "html": "<h1>Iedereen welkom</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Duidelijke koppen, beschrijvende links en goed contrast helpen alle bezoekers.",
          "Let op de vereiste vorm: h1,a.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "h1,a",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m1-l5",
        "title": "Inspecteren en experimenteren",
        "durationMinutes": 60,
        "introduction": "Via de browser-ontwikkeltools kun je HTML en CSS onderzoeken.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Met Inspecteren kun je de documentstructuur, stijlen en fouten van je website bestuderen. Een tijdelijke wijziging in de browser is ideaal om te experimenteren."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak een kleine lijst en bekijk hoe ul en li als geneste elementen verschijnen."
          },
          {
            "heading": "Let hierop",
            "text": "Verwar de DOM-weergave van de browser niet met de originele bronbestanden."
          }
        ],
        "task": "Maak een webpagina met kop, alinea en lijst om te inspecteren.",
        "initial": {
          "html": "<h1>Inspecteren</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Via de browser-ontwikkeltools kun je HTML en CSS onderzoeken.",
          "Let op de vereiste vorm: h1,ul,li.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "h1,ul,li",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      }
    ],
    "check": [
      {
        "id": "m1-q1",
        "question": "Wat is de rol van de browser?",
        "options": [
          "Een webserver vervangen op de computer",
          "HTML, CSS en JS omzetten naar een zichtbare en bruikbare pagina",
          "Alle bestanden automatisch in een database bewaren"
        ],
        "answer": 1
      },
      {
        "id": "m1-q2",
        "question": "Welke combinatie beschrijft de drie webtalen correct?",
        "options": [
          "HTML gedrag, CSS database, JS structuur",
          "HTML uiterlijk, CSS gedrag, JavaScript fonts",
          "HTML structuur, CSS uiterlijk, JavaScript gedrag"
        ],
        "answer": 2
      },
      {
        "id": "m1-q3",
        "question": "Waarvoor gebruik je index.html meestal?",
        "options": [
          "Als startdocument met HTML-structuur",
          "Als bestand met uitsluitend afbeeldingen",
          "Als vervanging voor alle CSS-bestanden"
        ],
        "answer": 0
      },
      {
        "id": "m1-q4",
        "question": "Welke linktekst is meestal toegankelijker?",
        "options": [
          "Klik hier",
          "Lees de openingstijden",
          "Meer"
        ],
        "answer": 1
      },
      {
        "id": "m1-q5",
        "question": "Wat doet het Elements-paneel?",
        "options": [
          "Automatisch bestanden op de server aanpassen",
          "Een database aanmaken",
          "De documentstructuur en huidige stijlen inspecteren"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "m2",
    "number": 2,
    "title": "HTML basis",
    "description": "De basis van semantische markup",
    "durationMinutes": 300,
    "lessons": [
      {
        "id": "m2-l1",
        "title": "Koppen en alinea’s",
        "durationMinutes": 60,
        "introduction": "Gebruik h1 voor de hoofdtitel en p voor doorlopende tekst.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Een h1 is de hoofdkop van de pagina; p beschrijft een alinea. Open- en sluittags moeten logisch bij elkaar horen."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Voeg een tweede alinea toe en maak de tekst kort maar betekenisvol."
          },
          {
            "heading": "Let hierop",
            "text": "Gebruik geen h1 puur om grotere tekst te krijgen; dat is de taak van CSS."
          }
        ],
        "task": "Maak een h1 en ten minste één p-element.",
        "initial": {
          "html": "<h1>Mijn pagina</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Gebruik h1 voor de hoofdtitel en p voor doorlopende tekst.",
          "Let op de vereiste vorm: h1,p.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "h1,p",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m2-l2",
        "title": "Lijsten",
        "durationMinutes": 60,
        "introduction": "Een ul bevat li-elementen; een ol toont een genummerde lijst.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Gebruik ul voor een ongeordende opsomming, ol voor een genummerde volgorde en li voor afzonderlijke lijstitems."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak een lijst met drie hobby’s en vergelijk ul met ol."
          },
          {
            "heading": "Let hierop",
            "text": "Plaats li-elementen binnen een ul of ol, niet los naast de lijst."
          }
        ],
        "task": "Maak een ongeordende lijst met minstens één item.",
        "initial": {
          "html": "<h1>Mijn hobby’s</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Een ul bevat li-elementen; een ol toont een genummerde lijst.",
          "Let op de vereiste vorm: ul,li.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "ul,li",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m2-l3",
        "title": "Links",
        "durationMinutes": 60,
        "introduction": "Een a-element heeft een href-attribuut dat verwijst naar een bestemming.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "De a-tag is een hyperlink. Het href-attribuut vertelt naar welke bestemming de bezoeker gaat. Een betekenisvolle linktekst beschrijft de bestemming."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak een link met een volledige https-URL en controleer of de tekst logisch is."
          },
          {
            "heading": "Let hierop",
            "text": "Zonder href is een a-element niet automatisch een bruikbare navigatielink."
          }
        ],
        "task": "Voeg een link toe naar een betrouwbare website.",
        "initial": {
          "html": "<h1>Handige websites</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Een a-element heeft een href-attribuut dat verwijst naar een bestemming.",
          "Let op de vereiste vorm: a.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "a",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m2-l4",
        "title": "Afbeeldingen en alternatieve tekst",
        "durationMinutes": 60,
        "introduction": "Een img-element gebruikt src en alt. De alt-tekst beschrijft de inhoud voor wie de afbeelding niet ziet.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Een img-element gebruikt src voor de afbeeldingslocatie en alt voor een tekstueel alternatief. De alt-tekst beschrijft de betekenis, niet alleen het woord “plaatje”."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Voeg een alt-attribuut toe en bedenk hoe iemand die de afbeelding niet ziet het onderwerp begrijpt."
          },
          {
            "heading": "Let hierop",
            "text": "Een bestandsnaam als alt-tekst is meestal geen goede beschrijving."
          }
        ],
        "task": "Plaats een img met een betekenisvol alt-attribuut.",
        "initial": {
          "html": "<h1>Mijn afbeelding</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Een img-element gebruikt src en alt. De alt-tekst beschrijft de inhoud voor wie de afbeelding niet ziet.",
          "Let op de vereiste vorm: img.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "img",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m2-l5",
        "title": "Basisstructuur van een document",
        "durationMinutes": 60,
        "introduction": "Een volledig document bevat doctype, html, head, title en body. In deze editor schrijf je het zichtbare body-deel.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Een document bestaat uit doctype, html, head en body. Title in head benoemt het tabblad; body bevat de zichtbare inhoud."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Leg uit wat in de head thuishoort en wat in de body, en bouw de zichtbare bodystructuur."
          },
          {
            "heading": "Let hierop",
            "text": "Zet zichtbare koppen niet in de head van een volledig document."
          }
        ],
        "task": "Maak binnen de editor een h1, een p en een ul.",
        "initial": {
          "html": "<h1>Mijn document</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Een volledig document bevat doctype, html, head, title en body. In deze editor schrijf je het zichtbare body-deel.",
          "Let op de vereiste vorm: h1,p,ul.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "h1,p,ul",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      }
    ],
    "check": [
      {
        "id": "m2-q1",
        "question": "Welke tag is bedoeld voor een hoofdheading?",
        "options": [
          "p",
          "span",
          "h1"
        ],
        "answer": 2
      },
      {
        "id": "m2-q2",
        "question": "Welke tag bevat een individueel lijstitem?",
        "options": [
          "li",
          "ul",
          "nav"
        ],
        "answer": 0
      },
      {
        "id": "m2-q3",
        "question": "Welk attribuut vertelt een link waarheen te navigeren?",
        "options": [
          "src",
          "href",
          "alt"
        ],
        "answer": 1
      },
      {
        "id": "m2-q4",
        "question": "Waarom heeft een informatieve afbeelding alt-tekst?",
        "options": [
          "Om elke afbeelding sneller te laden",
          "Om automatisch een grotere afbeelding te maken",
          "Omdat de betekenis ook zonder de afbeelding begrijpelijk wordt"
        ],
        "answer": 2
      },
      {
        "id": "m2-q5",
        "question": "Waar zet je zichtbare inhoud in een volledig HTML-document?",
        "options": [
          "In body",
          "In head",
          "In meta"
        ],
        "answer": 0
      }
    ]
  },
  {
    "id": "m3",
    "number": 3,
    "title": "HTML verdieping",
    "description": "Semantiek, formulieren en begrijpelijke structuur",
    "durationMinutes": 300,
    "lessons": [
      {
        "id": "m3-l1",
        "title": "Semantische secties",
        "durationMinutes": 60,
        "introduction": "Elementen als header, main, section en footer beschrijven de functie van inhoud.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Semantische tags beschrijven de rol van een blok. main is de hoofdinhoud, section groepeert een thema en header kan introductie of navigatie bevatten."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak een main met twee section-elementen en elk een eigen kop."
          },
          {
            "heading": "Let hierop",
            "text": "Gebruik section niet enkel als vervanger voor elke willekeurige div."
          }
        ],
        "task": "Gebruik main en section voor de belangrijkste inhoud.",
        "initial": {
          "html": "<main><h1>Mijn artikel</h1></main>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Elementen als header, main, section en footer beschrijven de functie van inhoud.",
          "Let op de vereiste vorm: main,section.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "main,section",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m3-l2",
        "title": "Formulieren",
        "durationMinutes": 60,
        "introduction": "Met form en input maak je interactieve invoer. Echte verwerking vereist later een backend.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Een form groepeert invoer die samen wordt aangeboden. input-elementen hebben een type, maar zonder backend wordt niet automatisch iets opgeslagen."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak een formulier met type=email en een duidelijke knop; test de browsercontrole."
          },
          {
            "heading": "Let hierop",
            "text": "Verwar de aanwezigheid van een formulier niet met een werkende serververwerking."
          }
        ],
        "task": "Voeg een form toe met een input.",
        "initial": {
          "html": "<h1>Contactformulier</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Met form en input maak je interactieve invoer. Echte verwerking vereist later een backend.",
          "Let op de vereiste vorm: form,input.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "form,input",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m3-l3",
        "title": "Labels en formuliertoegankelijkheid",
        "durationMinutes": 60,
        "introduction": "Koppel label via for aan een id op het invoerveld zodat de betekenis duidelijk is.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Een label vertelt de gebruiker wat een invoerveld betekent. De for-waarde van het label moet exact overeenkomen met het id van de input."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Klik op het label en controleer of het veld focus krijgt."
          },
          {
            "heading": "Let hierop",
            "text": "Een placeholder alleen is geen volwaardige vervanging voor een label."
          }
        ],
        "task": "Voeg een label met for en een input met id toe.",
        "initial": {
          "html": "<h1>Aanmelden</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Koppel label via for aan een id op het invoerveld zodat de betekenis duidelijk is.",
          "Let op de vereiste vorm: label,input.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "label,input",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m3-l4",
        "title": "Tabellen voor gegevens",
        "durationMinutes": 60,
        "introduction": "Gebruik table met tr, th en td voor echte tabelgegevens, niet voor pagina-indeling.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Tabellen zijn bedoeld voor gegevens in rijen en kolommen. th geeft een kopcel aan, td een gegevenscel en tr een rij."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak een eenvoudige tabel met twee kolommen en twee gegevensrijen."
          },
          {
            "heading": "Let hierop",
            "text": "Gebruik geen tabel om de volledige pagina vorm te geven."
          }
        ],
        "task": "Maak een tabel met een kopcel en een gegevenscel.",
        "initial": {
          "html": "<h1>Rooster</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Gebruik table met tr, th en td voor echte tabelgegevens, niet voor pagina-indeling.",
          "Let op de vereiste vorm: table,td,th.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "table,td,th",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m3-l5",
        "title": "Metadata en documentkwaliteit",
        "durationMinutes": 60,
        "introduction": "Title en meta description helpen bij duidelijke documentidentificatie. In onze sandbox bewerk je vooral body-inhoud.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Een article is een zelfstandig stukje inhoud, zoals een blogartikel. Een logische kopstructuur en een duidelijke paginatitel helpen gebruikers de inhoud te begrijpen."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Schrijf een korte blogkaart met een h2 en een beschrijvende alinea."
          },
          {
            "heading": "Let hierop",
            "text": "Een meta description wordt niet weergegeven als gewone tekst op de pagina."
          }
        ],
        "task": "Maak een article met een h2 en een p.",
        "initial": {
          "html": "<h1>Mijn blog</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Title en meta description helpen bij duidelijke documentidentificatie. In onze sandbox bewerk je vooral body-inhoud.",
          "Let op de vereiste vorm: article,h2,p.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "article,h2,p",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      }
    ],
    "check": [
      {
        "id": "m3-q1",
        "question": "Welk HTML-element is bedoeld voor de hoofdinhoud?",
        "options": [
          "main",
          "footer",
          "title"
        ],
        "answer": 0
      },
      {
        "id": "m3-q2",
        "question": "Wat is waar over een HTML-formulier?",
        "options": [
          "Een form slaat vanzelf op in een database",
          "Voor verwerking en opslag is doorgaans aanvullende logica nodig",
          "Een form mag geen input bevatten"
        ],
        "answer": 1
      },
      {
        "id": "m3-q3",
        "question": "Hoe verbind je een label met een invoerveld?",
        "options": [
          "Via gelijke CSS-kleuren",
          "Door beide dezelfde placeholder te geven",
          "Via label for en input id met dezelfde waarde"
        ],
        "answer": 2
      },
      {
        "id": "m3-q4",
        "question": "Waarvoor gebruik je een HTML-tabel?",
        "options": [
          "Voor gegevens in rijen en kolommen",
          "Voor de volledige pagina-indeling",
          "Voor alle navigatielinks"
        ],
        "answer": 0
      },
      {
        "id": "m3-q5",
        "question": "Wat doet een article-element?",
        "options": [
          "Het maakt automatisch een meta description",
          "Het groepeert zelfstandige inhoud",
          "Het toont uitsluitend afbeeldingen"
        ],
        "answer": 1
      }
    ]
  },
  {
    "id": "m4",
    "number": 4,
    "title": "CSS basis",
    "description": "Kleuren, tekst en het boxmodel",
    "durationMinutes": 300,
    "lessons": [
      {
        "id": "m4-l1",
        "title": "CSS-regels en selectoren",
        "durationMinutes": 60,
        "introduction": "Een CSS-regel gebruikt selector { eigenschap: waarde; }.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Een CSS-regel bestaat uit een selector, accolades en declaraties. Een declaratie combineert een eigenschap en waarde, zoals color: blue."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Probeer drie verschillende geldige kleurwaarden en kijk welke je prettiger vindt."
          },
          {
            "heading": "Let hierop",
            "text": "Vergeet niet de dubbele punt tussen eigenschap en waarde."
          }
        ],
        "task": "Voeg aan h1 een color-eigenschap toe.",
        "initial": {
          "html": "<h1>Kleur mij</h1>",
          "css": "h1 { font-size: 28px; }",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Een CSS-regel gebruikt selector { eigenschap: waarde; }.",
          "Let op de vereiste vorm: css:h1:color.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "css:h1:color",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m4-l2",
        "title": "Achtergrondkleuren",
        "durationMinutes": 60,
        "introduction": "Met background-color verander je de achtergrond. Houd tekst leesbaar.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "background-color wijzigt de achtergrond, terwijl color de tekstkleur wijzigt. Beide bepalen samen de leesbaarheid."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Kies een lichte achtergrond en donkere tekst met voldoende contrast."
          },
          {
            "heading": "Let hierop",
            "text": "Een aantrekkelijke kleur is niet automatisch leesbaar voor iedereen."
          }
        ],
        "task": "Geef body een background-color.",
        "initial": {
          "html": "<h1>Mijn achtergrond</h1>",
          "css": "body { padding: 20px; }",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Met background-color verander je de achtergrond. Houd tekst leesbaar.",
          "Let op de vereiste vorm: css:body:background-color.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "css:body:background-color",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m4-l3",
        "title": "Lettertypen en leesbaarheid",
        "durationMinutes": 60,
        "introduction": "Met font-family en line-height kun je tekst beter leesbaar maken.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "font-family bepaalt de lettertypefamilie. Geef een reservelettertype op voor wanneer jouw voorkeur niet beschikbaar is."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Probeer Arial en Georgia en vergelijk de leesbaarheid van dezelfde alinea."
          },
          {
            "heading": "Let hierop",
            "text": "Te kleine tekst of een te krappe line-height maakt lange teksten moeilijk leesbaar."
          }
        ],
        "task": "Voeg een font-family toe aan body.",
        "initial": {
          "html": "<h1>Leesbare tekst</h1><p>Goede typografie helpt.</p>",
          "css": "body { line-height: 1.6; }",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Met font-family en line-height kun je tekst beter leesbaar maken.",
          "Let op de vereiste vorm: css:body:font-family.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "css:body:font-family",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m4-l4",
        "title": "Margin en padding",
        "durationMinutes": 60,
        "introduction": "Margin is ruimte buiten een element; padding is ruimte binnen het element.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Padding is ruimte binnen de rand; margin is ruimte buiten het element. Je kunt beide afzonderlijk per zijde instellen."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Geef een alinea eerst 8px en daarna 24px padding en vergelijk het resultaat."
          },
          {
            "heading": "Let hierop",
            "text": "Padding en margin zijn niet hetzelfde en kunnen verschillend uitpakken."
          }
        ],
        "task": "Geef een p-element padding.",
        "initial": {
          "html": "<h1>Boxmodel</h1><p>Ruimte om mij heen</p>",
          "css": "p { background: lightyellow; }",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Margin is ruimte buiten een element; padding is ruimte binnen het element.",
          "Let op de vereiste vorm: css:p:padding.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "css:p:padding",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m4-l5",
        "title": "Border en afronding",
        "durationMinutes": 60,
        "introduction": "Met border en border-radius geef je een element een zichtbare rand en afgeronde hoeken.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Border bepaalt de zichtbare rand van een element. Voor een complete rand geef je dikte, type en kleur op, bijvoorbeeld 1px solid black."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak een informatiekaart met rand, padding en border-radius."
          },
          {
            "heading": "Let hierop",
            "text": "border: red; alleen geeft nog geen complete zichtbare rand."
          }
        ],
        "task": "Voeg een border toe aan een p-element.",
        "initial": {
          "html": "<h1>Een kader</h1><p>Dit is een kaart</p>",
          "css": "p { padding: 16px; }",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Met border en border-radius geef je een element een zichtbare rand en afgeronde hoeken.",
          "Let op de vereiste vorm: css:p:border.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "css:p:border",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      }
    ],
    "check": [
      {
        "id": "m4-q1",
        "question": "Welke CSS-declaratie is geldig?",
        "options": [
          "color = blue",
          "color: blue;",
          "blue: color;"
        ],
        "answer": 1
      },
      {
        "id": "m4-q2",
        "question": "Wat verandert background-color?",
        "options": [
          "De dikte van de tekst",
          "Het lettertype",
          "De achtergrondkleur van een element"
        ],
        "answer": 2
      },
      {
        "id": "m4-q3",
        "question": "Wat is een goede fallback bij font-family?",
        "options": [
          "Een tweede lettertype of generieke familie toevoegen",
          "De tekst weglaten",
          "Altijd font-size op nul zetten"
        ],
        "answer": 0
      },
      {
        "id": "m4-q4",
        "question": "Wat is padding?",
        "options": [
          "Ruimte buiten de margin",
          "Ruimte binnen de border van een element",
          "De grootte van de borderkleur"
        ],
        "answer": 1
      },
      {
        "id": "m4-q5",
        "question": "Welke CSS maakt een zichtbare border?",
        "options": [
          "border: red;",
          "border-size: 1;",
          "border: 1px solid black;"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "m5",
    "number": 5,
    "title": "CSS verdieping",
    "description": "Flexbox, Grid en responsive ontwerp",
    "durationMinutes": 300,
    "lessons": [
      {
        "id": "m5-l1",
        "title": "Flexbox basis",
        "durationMinutes": 60,
        "introduction": "display: flex plaatst flexitems langs één hoofdas.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "display: flex maakt flexitems die langs een hoofdas worden gerangschikt. gap regelt de ruimte ertussen zonder marges op ieder kind."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Voeg een derde item toe en experimenteer met justify-content."
          },
          {
            "heading": "Let hierop",
            "text": "Flexbox toepassen op de kinderen in plaats van de container heeft niet het bedoelde effect."
          }
        ],
        "task": "Maak een container met display:flex.",
        "initial": {
          "html": "<div class=\"container\"><p>Links</p><p>Rechts</p></div>",
          "css": ".container { gap: 16px; }",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? display: flex plaatst flexitems langs één hoofdas.",
          "Let op de vereiste vorm: css:.container:display.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "css:.container:display",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m5-l2",
        "title": "Flex-richting",
        "durationMinutes": 60,
        "introduction": "Met flex-direction kun je items horizontaal of verticaal ordenen.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "flex-direction kiest de hoofdrichting. row plaatst items in een rij, column onder elkaar. Dit is handig voor responsive layouts."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Wissel tussen row en column en kijk wat er gebeurt bij minder breedte."
          },
          {
            "heading": "Let hierop",
            "text": "De cross-axis verandert wanneer je de richting aanpast."
          }
        ],
        "task": "Voeg flex-direction toe aan .container.",
        "initial": {
          "html": "<div class=\"container\"><p>A</p><p>B</p></div>",
          "css": ".container { display: flex; }",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Met flex-direction kun je items horizontaal of verticaal ordenen.",
          "Let op de vereiste vorm: css:.container:flex-direction.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "css:.container:flex-direction",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m5-l3",
        "title": "CSS Grid",
        "durationMinutes": 60,
        "introduction": "display: grid geeft je controle over rijen en kolommen.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "CSS Grid gebruikt rijen en kolommen. Met grid-template-columns kun je bijvoorbeeld twee even brede kolommen maken."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Gebruik repeat(2, 1fr) en controleer of beide elementen even breed zijn."
          },
          {
            "heading": "Let hierop",
            "text": "display:grid zonder kolomdefinitie geeft niet automatisch een tweekolomsgrid."
          }
        ],
        "task": "Gebruik display:grid op .grid.",
        "initial": {
          "html": "<div class=\"grid\"><p>1</p><p>2</p></div>",
          "css": ".grid { gap: 12px; }",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? display: grid geeft je controle over rijen en kolommen.",
          "Let op de vereiste vorm: css:.grid:display.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "css:.grid:display",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m5-l4",
        "title": "Responsieve layouts",
        "durationMinutes": 60,
        "introduction": "Een media query past CSS toe bij een specifieke schermbreedte.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "@media laat regels alleen gelden bij een bepaalde conditie, bijvoorbeeld max-width. Hiermee maak je pagina’s bruikbaar op telefoon en desktop."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak een media query die onder 600px de kop kleiner maakt."
          },
          {
            "heading": "Let hierop",
            "text": "Vergeet de sluitende accolades van media query en binnenliggende selector niet."
          }
        ],
        "task": "Voeg een @media-regel toe voor kleine schermen.",
        "initial": {
          "html": "<h1>Responsive pagina</h1>",
          "css": "h1 { font-size: 30px; }",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Een media query past CSS toe bij een specifieke schermbreedte.",
          "Let op de vereiste vorm: css:@media.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "css:@media",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m5-l5",
        "title": "Visuele hiërarchie",
        "durationMinutes": 60,
        "introduction": "Consistente witruimte, kleur, grootte en contrast maken een interface begrijpelijk.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Visuele hiërarchie helpt bezoekers snel zien wat belangrijk is. Consistente afstanden, kopgroottes en contrast maken een interface voorspelbaar."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak een kaart met een duidelijk onderscheid tussen titel, subtitel en details."
          },
          {
            "heading": "Let hierop",
            "text": "Meer kleur en meer verschillende lettergroottes maken een ontwerp niet altijd duidelijker."
          }
        ],
        "task": "Gebruik gap in een .container.",
        "initial": {
          "html": "<div class=\"container\"><p>Een</p><p>Twee</p></div>",
          "css": ".container { display: flex; }",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Consistente witruimte, kleur, grootte en contrast maken een interface begrijpelijk.",
          "Let op de vereiste vorm: css:.container:gap.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "css:.container:gap",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      }
    ],
    "check": [
      {
        "id": "m5-q1",
        "question": "Op welk element zet je display:flex?",
        "options": [
          "Op de body van elke losse flexitem",
          "Alleen op het laatste kind",
          "Op de flexcontainer"
        ],
        "answer": 2
      },
      {
        "id": "m5-q2",
        "question": "Wat doet flex-direction: column?",
        "options": [
          "Flexitems langs de hoofdas onder elkaar plaatsen",
          "Items volledig verbergen",
          "Tekst automatisch omzetten naar HTML"
        ],
        "answer": 0
      },
      {
        "id": "m5-q3",
        "question": "Hoe stel je twee gelijke gridkolommen in?",
        "options": [
          "grid-column: two;",
          "grid-template-columns: repeat(2, 1fr);",
          "display: flexbox;"
        ],
        "answer": 1
      },
      {
        "id": "m5-q4",
        "question": "Wat doet een CSS-mediaquery?",
        "options": [
          "Een nieuw HTML-bestand openen",
          "Een variabele in de database bewaren",
          "Stijlen toepassen wanneer een voorwaarde zoals breedte klopt"
        ],
        "answer": 2
      },
      {
        "id": "m5-q5",
        "question": "Wat helpt bij een duidelijke visuele hiërarchie?",
        "options": [
          "Consistente grootte, spacing en contrast",
          "Zoveel mogelijk willekeurige lettertypes",
          "Elke knop een andere kleur geven"
        ],
        "answer": 0
      }
    ]
  },
  {
    "id": "m6",
    "number": 6,
    "title": "JavaScript basis",
    "description": "Variabelen, logica en functies",
    "durationMinutes": 300,
    "lessons": [
      {
        "id": "m6-l1",
        "title": "Wat is JavaScript?",
        "durationMinutes": 60,
        "introduction": "JavaScript maakt webpagina’s interactief. De JS-editor toont code, maar voert deze in deze versie niet uit.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "JavaScript kan gegevens verwerken en reageren op gebruikersacties. console.log is een eerste manier om een waarde te inspecteren."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Schrijf een console.log met een herkenbare tekst. Bespreek wat in de Console zou verschijnen."
          },
          {
            "heading": "Let hierop",
            "text": "Deze leeromgeving voert JavaScript nog niet uit; de editor controleert voorlopig alleen de broncodevorm."
          }
        ],
        "task": "Schrijf een console.log-regel.",
        "initial": {
          "html": "<h1>JavaScript leren</h1>",
          "css": "",
          "js": "// Deze JS-code wordt niet uitgevoerd in de preview.\n"
        },
        "hints": [
          "Wat heb je nodig? JavaScript maakt webpagina’s interactief. De JS-editor toont code, maar voert deze in deze versie niet uit.",
          "Let op de vereiste vorm: js:console.log.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "js:console.log",
        "advanced": true,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m6-l2",
        "title": "Variabelen",
        "durationMinutes": 60,
        "introduction": "Met const en let bewaar je waarden; const gebruik je als de binding niet opnieuw wordt toegewezen.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Met const declareer je een binding die niet opnieuw kan worden toegewezen. Met let kan een variabele later een nieuwe waarde krijgen."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Schrijf const naam = \"BEE\"; en bedenk wanneer je let zou gebruiken."
          },
          {
            "heading": "Let hierop",
            "text": "const betekent niet dat de inhoud van een object nooit mag veranderen."
          }
        ],
        "task": "Maak een const met je naam.",
        "initial": {
          "html": "<h1>Variabelen</h1>",
          "css": "",
          "js": "// Deze JS-code wordt niet uitgevoerd in de preview.\n"
        },
        "hints": [
          "Wat heb je nodig? Met const en let bewaar je waarden; const gebruik je als de binding niet opnieuw wordt toegewezen.",
          "Let op de vereiste vorm: js:const.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "js:const",
        "advanced": true,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m6-l3",
        "title": "Datatypes",
        "durationMinutes": 60,
        "introduction": "Strings, numbers en booleans representeren verschillende soorten waarden.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Strings zijn tekst, numbers zijn getallen en booleans zijn true of false. Bij vergelijkingen is het datatype belangrijk."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak een boolean die bijhoudt of een oefening gestart is."
          },
          {
            "heading": "Let hierop",
            "text": "\"true\" tussen aanhalingstekens is een string en niet de boolean true."
          }
        ],
        "task": "Schrijf een boolean met true of false.",
        "initial": {
          "html": "<h1>Datatypes</h1>",
          "css": "",
          "js": "// Deze JS-code wordt niet uitgevoerd in de preview.\n"
        },
        "hints": [
          "Wat heb je nodig? Strings, numbers en booleans representeren verschillende soorten waarden.",
          "Let op de vereiste vorm: js:boolean.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "js:boolean",
        "advanced": true,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m6-l4",
        "title": "Voorwaarden",
        "durationMinutes": 60,
        "introduction": "Met if kies je welk stuk code wordt uitgevoerd wanneer een voorwaarde waar is.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Een if-statement voert code uit wanneer de conditie truthy is. Met else kun je een alternatief schrijven."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak een if/else die reageert op een boolean gestart."
          },
          {
            "heading": "Let hierop",
            "text": "Gebruik === voor vergelijking wanneer je niet wilt toewijzen."
          }
        ],
        "task": "Schrijf een if-blok.",
        "initial": {
          "html": "<h1>Keuzes</h1>",
          "css": "",
          "js": "// Deze JS-code wordt niet uitgevoerd in de preview.\n"
        },
        "hints": [
          "Wat heb je nodig? Met if kies je welk stuk code wordt uitgevoerd wanneer een voorwaarde waar is.",
          "Let op de vereiste vorm: js:if.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "js:if",
        "advanced": true,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m6-l5",
        "title": "Functies",
        "durationMinutes": 60,
        "introduction": "Een functie groepeert herbruikbare instructies en kan parameters accepteren.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Functies groeperen code voor hergebruik. Parameters zijn invoerwaarden, en met return kan de functie iets teruggeven."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Schrijf een functie begroet(naam) die een begroeting teruggeeft."
          },
          {
            "heading": "Let hierop",
            "text": "Een return beëindigt de functie; code erna wordt niet meer uitgevoerd in die tak."
          }
        ],
        "task": "Schrijf een functie met function of =>.",
        "initial": {
          "html": "<h1>Functies</h1>",
          "css": "",
          "js": "// Deze JS-code wordt niet uitgevoerd in de preview.\n"
        },
        "hints": [
          "Wat heb je nodig? Een functie groepeert herbruikbare instructies en kan parameters accepteren.",
          "Let op de vereiste vorm: js:function.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "js:function",
        "advanced": true,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      }
    ],
    "check": [
      {
        "id": "m6-q1",
        "question": "Wat doet console.log meestal?",
        "options": [
          "Een waarde naar de ontwikkelconsole schrijven",
          "Automatisch een knop maken",
          "Een CSS-bestand koppelen"
        ],
        "answer": 0
      },
      {
        "id": "m6-q2",
        "question": "Waarvoor gebruik je const in JavaScript?",
        "options": [
          "Een variabele die altijd een boolean is",
          "Een binding declareren die niet opnieuw toegewezen wordt",
          "Een object volledig onveranderlijk maken"
        ],
        "answer": 1
      },
      {
        "id": "m6-q3",
        "question": "Welke waarde is een boolean?",
        "options": [
          "\"true\"",
          "\"ja\"",
          "true"
        ],
        "answer": 2
      },
      {
        "id": "m6-q4",
        "question": "Wanneer wordt een if-blok normaal uitgevoerd?",
        "options": [
          "Als de conditie truthy is",
          "Altijd, ongeacht de conditie",
          "Alleen als er CSS aanwezig is"
        ],
        "answer": 0
      },
      {
        "id": "m6-q5",
        "question": "Waarvoor gebruik je return in een functie?",
        "options": [
          "Om een nieuwe HTML-pagina te laden",
          "Om een waarde terug te geven en de functie te verlaten",
          "Om een array te verwijderen"
        ],
        "answer": 1
      }
    ]
  },
  {
    "id": "m7",
    "number": 7,
    "title": "JavaScript verdieping",
    "description": "Arrays, DOM en eenvoudige interactie",
    "durationMinutes": 300,
    "lessons": [
      {
        "id": "m7-l1",
        "title": "Arrays",
        "durationMinutes": 60,
        "introduction": "Een array bewaart meerdere items in een vaste volgorde.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Een array bewaart een geordende reeks waarden in één variabele. Je leest elementen met een index die bij nul begint."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak een array met drie hobby’s en bedenk wat hobby’s[0] betekent."
          },
          {
            "heading": "Let hierop",
            "text": "De eerste index van een array is 0, niet 1. Let dus ook op bij het uitlezen van items."
          }
        ],
        "task": "Maak een array met blokhaken.",
        "initial": {
          "html": "<h1>Mijn lijst</h1>",
          "css": "",
          "js": "// Deze JS-code wordt niet uitgevoerd in de preview.\n"
        },
        "hints": [
          "Wat heb je nodig? Een array bewaart meerdere items in een vaste volgorde.",
          "Let op de vereiste vorm: js:array.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "js:array",
        "advanced": true,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m7-l2",
        "title": "Objecten",
        "durationMinutes": 60,
        "introduction": "Een object groepeert eigenschappen en bijbehorende waarden.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Objecten bewaren eigenschappen met een naam, bijvoorbeeld student.naam en student.leeftijd. Ze zijn handig om gegevens te groeperen."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak een object met titel en afgerond en lees daarna één eigenschap uit."
          },
          {
            "heading": "Let hierop",
            "text": "Een object met accolades is niet hetzelfde als een array met blokhaken."
          }
        ],
        "task": "Maak een object met een eigenschap.",
        "initial": {
          "html": "<h1>Objecten</h1>",
          "css": "",
          "js": "// Deze JS-code wordt niet uitgevoerd in de preview.\n"
        },
        "hints": [
          "Wat heb je nodig? Een object groepeert eigenschappen en bijbehorende waarden.",
          "Let op de vereiste vorm: js:object.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "js:object",
        "advanced": true,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m7-l3",
        "title": "DOM-elementen selecteren",
        "durationMinutes": 60,
        "introduction": "document.querySelector zoekt een element in het document.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "document.querySelector gebruikt een CSS-selector om het eerste passende element te vinden. Als er geen match is, wordt null teruggegeven."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak HTML met id=\"titel\" en schrijf een selector voor #titel."
          },
          {
            "heading": "Let hierop",
            "text": "Controleer of een element bestaat voordat je methoden op het resultaat aanroept."
          }
        ],
        "task": "Gebruik document.querySelector in je JS-code.",
        "initial": {
          "html": "<h1 id=\"titel\">DOM</h1>",
          "css": "",
          "js": "// Deze JS-code wordt niet uitgevoerd in de preview.\n"
        },
        "hints": [
          "Wat heb je nodig? document.querySelector zoekt een element in het document.",
          "Let op de vereiste vorm: js:querySelector.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "js:querySelector",
        "advanced": true,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m7-l4",
        "title": "Gebeurtenissen",
        "durationMinutes": 60,
        "introduction": "addEventListener koppelt een functie aan een gebeurtenis zoals click.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "addEventListener registreert een gebeurtenis, zoals click, op een element. De callback reageert wanneer de gebeurtenis plaatsvindt."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Schrijf een click-handler voor een knop en leg uit wat die zou doen."
          },
          {
            "heading": "Let hierop",
            "text": "Geef bij addEventListener de functie mee; voer haar niet direct uit door () toe te voegen."
          }
        ],
        "task": "Schrijf een addEventListener-aanroep.",
        "initial": {
          "html": "<button>Klik</button>",
          "css": "",
          "js": "// Deze JS-code wordt niet uitgevoerd in de preview.\n"
        },
        "hints": [
          "Wat heb je nodig? addEventListener koppelt een functie aan een gebeurtenis zoals click.",
          "Let op de vereiste vorm: js:addEventListener.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "js:addEventListener",
        "advanced": true,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m7-l5",
        "title": "Problemen opsporen",
        "durationMinutes": 60,
        "introduction": "Met console.log en zorgvuldig lezen van foutmeldingen begrijp je wat de code doet.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Debuggen begint met precies lezen van fouten en kleine experimenten. Met console.log kun je tussenstappen van je programma inzichtelijk maken."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Leg uit wat je zou loggen vóór en na een verandering in een variabele."
          },
          {
            "heading": "Let hierop",
            "text": "Willekeurige wijzigingen maken het moeilijk te weten wat de echte oplossing was."
          }
        ],
        "task": "Voeg een console.log toe die een variabele toont.",
        "initial": {
          "html": "<h1>Debugging</h1>",
          "css": "",
          "js": "// Deze JS-code wordt niet uitgevoerd in de preview.\n"
        },
        "hints": [
          "Wat heb je nodig? Met console.log en zorgvuldig lezen van foutmeldingen begrijp je wat de code doet.",
          "Let op de vereiste vorm: js:console.log.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "js:console.log",
        "advanced": true,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      }
    ],
    "check": [
      {
        "id": "m7-q1",
        "question": "Welke index heeft het eerste item van een array?",
        "options": [
          "1",
          "0",
          "-1"
        ],
        "answer": 1
      },
      {
        "id": "m7-q2",
        "question": "Hoe lees je een eigenschap naam van object student?",
        "options": [
          "student[naam zonder aanhalingstekens]",
          "student->naam",
          "student.naam"
        ],
        "answer": 2
      },
      {
        "id": "m7-q3",
        "question": "Wat geeft querySelector bij geen match?",
        "options": [
          "null",
          "Altijd een lege string",
          "Automatisch een nieuw element"
        ],
        "answer": 0
      },
      {
        "id": "m7-q4",
        "question": "Wat registreert addEventListener?",
        "options": [
          "Een nieuw stylesheet",
          "Een callback voor een specifieke gebeurtenis",
          "Een databaseverbinding"
        ],
        "answer": 1
      },
      {
        "id": "m7-q5",
        "question": "Wat is een goede eerste debugstap?",
        "options": [
          "Verander willekeurig tien regels",
          "Verwijder alle code meteen",
          "Lees de foutmelding en reproduceer het probleem"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "m8",
    "number": 8,
    "title": "Afronding en herhaling",
    "description": "De bouwstenen combineren en de volgende stap voorbereiden",
    "durationMinutes": 300,
    "lessons": [
      {
        "id": "m8-l1",
        "title": "HTML-herhaling",
        "durationMinutes": 60,
        "introduction": "Een duidelijke structuur gebruikt semantische koppen, alinea’s en eventueel lijsten.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Een goed HTML-document heeft een begrijpelijke hoofdkop, logische secties en beschrijvende teksten. Zorg dat de structuur ook zonder CSS betekenisvol blijft."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Bouw een mini-pagina met een hoofdkop, korte introductie en overzichtslijst."
          },
          {
            "heading": "Let hierop",
            "text": "Gebruik semantiek voor betekenis in plaats van alleen voor uiterlijk."
          }
        ],
        "task": "Maak een pagina met h1 en p.",
        "initial": {
          "html": "<h1>Mijn eindpagina</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Een duidelijke structuur gebruikt semantische koppen, alinea’s en eventueel lijsten.",
          "Let op de vereiste vorm: h1,p.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "h1,p",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m8-l2",
        "title": "CSS-herhaling",
        "durationMinutes": 60,
        "introduction": "Een bruikbare vormgeving bewaart contrast en responsiviteit.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Een consistente CSS-stijl gebruikt beperkte kleuren en dezelfde afstanden op vergelijkbare plekken. Test altijd op smalle schermen."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak je eindpagina met leesbare achtergrond en minimaal één kleine responsive aanpassing."
          },
          {
            "heading": "Let hierop",
            "text": "Een mooi desktopscherm kan op mobiel alsnog horizontaal overlopen."
          }
        ],
        "task": "Voeg een background-color toe aan body.",
        "initial": {
          "html": "<h1>Mijn ontwerp</h1>",
          "css": "body { padding: 16px; }",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Een bruikbare vormgeving bewaart contrast en responsiviteit.",
          "Let op de vereiste vorm: css:body:background-color.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "css:body:background-color",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m8-l3",
        "title": "JavaScript-herhaling",
        "durationMinutes": 60,
        "introduction": "Variabelen, functies en events kunnen samen een interactie vormen.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "JavaScript combineert data, voorwaarden, functies en events. Begin met één klein gedrag dat je stap voor stap kunt testen."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Schrijf een functie die een boodschap opbouwt uit een parameter."
          },
          {
            "heading": "Let hierop",
            "text": "Een plan voor interactie is nog geen uitvoering; de JS-preview blijft hier uit."
          }
        ],
        "task": "Schrijf een function of arrowfunctie.",
        "initial": {
          "html": "<h1>Mijn interactie</h1>",
          "css": "",
          "js": "// Deze JS-code wordt niet uitgevoerd in de preview.\n"
        },
        "hints": [
          "Wat heb je nodig? Variabelen, functies en events kunnen samen een interactie vormen.",
          "Let op de vereiste vorm: js:function.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "js:function",
        "advanced": true,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m8-l4",
        "title": "Codekwaliteit",
        "durationMinutes": 60,
        "introduction": "Overzichtelijke inspringing, betekenisvolle namen en testbare stappen maken onderhoud makkelijker.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Goede code is leesbaar, heeft herkenbare namen en is verdeeld in kleine onderdelen. Consistente inspringing helpt fouten vinden."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Hernoem onduidelijke waarden en voeg een korte beschrijving toe aan je HTML."
          },
          {
            "heading": "Let hierop",
            "text": "Meer code is niet altijd betere code; voorkom onnodige herhaling."
          }
        ],
        "task": "Maak een beschrijvende h1 en p.",
        "initial": {
          "html": "<h1>Mijn project</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Overzichtelijke inspringing, betekenisvolle namen en testbare stappen maken onderhoud makkelijker.",
          "Let op de vereiste vorm: h1,p.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "h1,p",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      },
      {
        "id": "m8-l5",
        "title": "Voorbereiding op de eindopdracht",
        "durationMinutes": 60,
        "introduction": "Bepaal het doel, de doelgroep en de gewenste pagina-indeling voordat je in VS Code begint.",
        "theory": [
          {
            "heading": "Wat betekent dit?",
            "text": "Begin de eindopdracht met een doel, doelgroep en een schets van de inhoud. Maak eerst een minimale werkende pagina, breid daarna uit."
          },
          {
            "heading": "Probeer het zelf",
            "text": "Maak een lijst van drie onderdelen die jij in je eindopdracht wilt bouwen."
          },
          {
            "heading": "Let hierop",
            "text": "Begin niet met ingewikkelde animaties voordat de basisstructuur werkt."
          }
        ],
        "task": "Maak een h1 en ul met onderdelen voor je eigen project.",
        "initial": {
          "html": "<h1>Mijn plan</h1>",
          "css": "",
          "js": ""
        },
        "hints": [
          "Wat heb je nodig? Bepaal het doel, de doelgroep en de gewenste pagina-indeling voordat je in VS Code begint.",
          "Let op de vereiste vorm: h1,ul.",
          "Werk eerst de kleinste versie uit; breid daarna pas uit."
        ],
        "rule": "h1,ul",
        "advanced": false,
        "reflection": "Wat heb je aangepast? Wat gebeurde er in de preview of wat verwacht je dat de JavaScript-code zou doen? Leg het in je eigen woorden uit.",
        "extension": "Werk je eerste oplossing verder uit met een duidelijke naam, een extra voorbeeld of verbeterde toegankelijkheid. Vergelijk daarna met de opdracht."
      }
    ],
    "check": [
      {
        "id": "m8-q1",
        "question": "Wat kenmerkt betekenisvolle HTML?",
        "options": [
          "Alle inhoud in div-elementen",
          "Geen tekst buiten afbeeldingen",
          "Een logische heading- en inhoudsstructuur"
        ],
        "answer": 2
      },
      {
        "id": "m8-q2",
        "question": "Wat hoort bij toegankelijke CSS?",
        "options": [
          "Voldoende contrast en een bruikbare mobiele layout",
          "Alle tekst 10px groot maken",
          "Alleen op één monitor testen"
        ],
        "answer": 0
      },
      {
        "id": "m8-q3",
        "question": "Wat kan een functie combineren?",
        "options": [
          "Alleen HTML-tags",
          "Invoer, logica en een resultaat",
          "Uitsluitend kleurwaarden"
        ],
        "answer": 1
      },
      {
        "id": "m8-q4",
        "question": "Wat maakt code beter onderhoudbaar?",
        "options": [
          "Overal dezelfde variabelenaam gebruiken",
          "Alle instructies op één regel plaatsen",
          "Duidelijke namen en kleine, leesbare stappen"
        ],
        "answer": 2
      },
      {
        "id": "m8-q5",
        "question": "Wat doe je bij voorkeur vóór je eindopdracht programmeert?",
        "options": [
          "Doel, doelgroep en eenvoudige structuur bepalen",
          "Meteen alle animaties toevoegen",
          "De code zonder plan kopiëren"
        ],
        "answer": 0
      }
    ]
  }
];
// Voeg expliciete uitleg en codevoorbeelden toe aan elke les.
// Wanneer een gids ontbreekt, weigeren we stilzwijgende publicatie van onvolledige lesinhoud.
for (const module of modules) {
  for (const lesson of module.lessons) {
    const guide = lessonGuides[lesson.id];
    if (!guide) throw new Error(`Ontbrekende stap-voor-stapuitleg voor ${lesson.id}`);
    lesson.guide = guide;
    // Hints helpen pas nadat de student theorie en voorbeeld heeft kunnen lezen.
    lesson.hints = [
      `Lees eerst het uitgewerkte voorbeeld: ${guide.example.split('\n')[0]}`,
      guide.steps[0],
      `Veelgemaakte fout om te controleren: ${guide.pitfall}`,
    ];
  }
}
export const allLessons = modules.flatMap(m => m.lessons);
export const findLesson = id => allLessons.find(l=>l.id===id);
export const findModule = id => modules.find(m=>m.id===id);
