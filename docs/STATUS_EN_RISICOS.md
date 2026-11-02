# Projectstatus en openstaande acceptatiepunten

## Wel gebouwd

Zes hoofdschermen; responsive BEE-stijl; 8 modules, 40 uitgewerkte conceptlessen, 8 modulechecks en 40 inhoudelijke vragen; leseditor met scriptloze HTML/CSS-preview; hints; demo-leerroute; lokale voortgang; IndexedDB-concepten, import/export; een offline applicatieshell; Supabase Auth REST-integratie; server-RLS- en RPC-schema voor accountgebonden opslag, voortgang, vergrendeling, revisieconflicten en zelfverwijdering; 115/120-minuten client-side sessiewaarschuwing en uitlogafhandeling.

## Gecontroleerd in de bouwomgeving

- `npm test`: automatische unit-, contract- en HTTP-servercontroles.
- `npm run check`: JavaScript-syntax en herkenbare geheim-sleutelpatronen in de clientconfiguratie.
- `npm run build`: statische applicatiebestanden gegenereerd.
- De HTTP-test bevestigt dat de lokale ontwikkelserver SQL, testbestanden en README niet publiceert.

## Niet geverifieerd (geen claim van gereedheid)

1. De 846 eerder goedgekeurde acceptatiescenario's zijn **gepland**, niet uitgevoerd.
2. Live Supabase-database/RLS/RPC, registratie met bevestigingsmail en herstelprocedures: **niet uitgevoerd** zonder gekoppeld testproject.
3. Chromium/browser-end-to-end, 320px/200% toegankelijkheid, focus en precieze 64px Floating Label-uitlijning: **niet uitgevoerd** door navigatiebeperking van de testbrowser.
4. Alle 40 lesinhouden: inhoudelijk concept, geen 35–40 uur bewezen lesbelasting; docentredactie, leerlingenproeven en formele beoordelingscriteria ontbreken.
5. Officiële beoordelingen zijn op eenvoudige broncodeherkenning en client-zichtbare meerkeuzevragen gebaseerd: **niet fraude- of examenbestendig**.
6. JS wordt bewust niet uitgevoerd. Veilige JS-runtime op afzonderlijke origin bestaat nog niet.
7. Volledige offline accountaanmelding, herstelcodes, serverafgedwongen sessie-intrekking op alle apparaten en automatische conflictmerge ontbreken.
8. Privacy/AVG, e-maildeliverability, anti-abuse, backups, monitoring, belastbaarheid en zakelijke exploitatieprocessen moeten voor echte studentgebruikers worden ingericht.

## Go/no-go studentenpilot

Ga pas door met echte gebruikers na de live test met twee accounts, redactie van lesmateriaal, browsercontrole, werkende e-mail en privacybeleid, proefgebruik met een docent, en controle van de beveiligingsinstellingen. Stuur studenten niet alleen een GitHub-link voordat Supabase ingericht en getest is.
