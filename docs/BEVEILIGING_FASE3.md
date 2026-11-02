# BEE Learning Platform — Beveiligingscontrole fase 3 (2 november 2026)

## Getoetste basis

Bronbestanden beoordeeld uit v2.4 en op 2.4.1 aangepast:
`src/main.js`, `src/js-runner.js`, `sandbox.html`, `index.html`,
`service-worker.js`, `src/auth.js`, `supabase/schema.sql` en
`supabase/migrations/20261102_strengere_beoordeling.sql`.

- De live genoemde RLS-leesregels filteren `user_id = auth.uid()` en de
  betreffende tabellen verlenen geen directe schrijfrechten aan `authenticated`.
- De vier uitgevoerde publieke RPC's hebben `SECURITY DEFINER`,
  `search_path = ''`, een controle op de huidige `auth.uid()` en alleen
  `EXECUTE`-rechten voor geauthenticeerde gebruikers.
- `submit_lesson` en `save_student_draft` bewaken de volgorde op de server.
- Modulecheck-antwoorden zijn niet rechtstreeks uit `module_questions` te lezen.
- De SQL-upgrade v2.2 heeft een aanvullende beoordelingsfunctie,
  `bee_validate_exercise`, die niet publiek uitvoerbaar hoort te zijn.

**Beperking:** bovenstaande bevindingen zijn gebaseerd op de broncode en de
Supabase-screenshots die eerder in de chat zijn aangeleverd, niet op een
verse live aanvalstest. Daarom geen claim van een volledig gecontroleerde
productiedatabase.

## Bevestigd risico en oplossing

### JavaScript-sandbox: code-uitvoering buiten de geïsoleerde iframe

**Voor 2.4.1:** `sandbox.html` vertrouwde op de `sandbox="allow-scripts"`
attribute die alleen op de iframe in `src/main.js` staat. Een andere website
kon de losse publieke `sandbox.html` zonder deze attribute insluiten en via
`postMessage` JavaScript aanleveren. Dit kan een same-origin-code-uitvoering
in de gebruikersbrowser veroorzaken, terwijl de applicatie
sessietokens in `localStorage` bewaart.

**2.4.1:** de sandbox controleert vóór code-uitvoering dat de huidige origin
ondoorzichtig (`'null'`) is en accepteert berichten uitsluitend van de
verwachte bovenliggende origin. De iframe in de applicatie blijft
`sandbox="allow-scripts"`, zonder `allow-same-origin`.

**Regressiecontroles:** vijf Node-controles voor isolatie, CSP,
herkomstcontrole en serverbeoordeling; vijf echte Chromium-scenarios voor
console, syntaxfouten, oneindige worker-lus, DOM-click en ingesloten script.
Een aanvullende echte HTTP-browsertest weigert code-uitvoering wanneer de
sandbox rechtstreeks in een normale website-origin is geopend. Deze test
moet in GitHub Actions nog op de live netwerkroute slagen.

## Openstaande productierisico's

1. **Live cross-account-isolatie niet onafhankelijk bewezen.** De RLS- en
   functieconfiguratie zien er correct uit, maar er is geen daadwerkelijke
   aanvalstest met twee onafhankelijke loginidentiteiten uitgevoerd.
2. **DOM-oefeningen kunnen de browsertab blokkeren.** De worker-oefeningen
   worden beëindigd bij een time-out; DOM-code wordt voor interactie direct
   in een sandbox-document uitgevoerd. De browser kan een eindeloze DOM-lus
   niet betrouwbaar op tijd onderbreken.
3. **Opdrachtbeoordeling blijft structuurgebaseerd.** Een correct herkenbaar
   codepatroon is geen bewijs van een werkende JavaScript-oplossing.
4. **Quizantwoorden staan ook in publieke cliëntbestanden.** Servercontroles
   bepalen officiële afronding, maar quiz-antwoorden zijn in de bundel
   in principe te achterhalen. Dit is geen beveiligd examen.
5. **Browseropslag van tokens.** `auth.js` bewaart access- en refreshtokens
   in `localStorage`, dus toekomstige XSS-lekken elders zouden die tokens
   kunnen blootstellen. De JavaScript-sandbox mag deze origin niet erven.
6. **Heruitvoeren oud schema.** `supabase/schema.sql` bevat de oudere
   `submit_lesson`-implementatie; na de v2.2-migratie moet het oude
   schema NIET opnieuw worden uitgevoerd, omdat dat de strengere beoordeling
   kan terugzetten. Gebruik het uitsluitend voor een nieuwe installatie
   en voer dan ook de v2.2-migratie uit.

## Vrijgaveadvies

Deze patch installeren vóór gebruik van de JavaScript-uitvoer door studenten.
Na groene GitHub Actions kunnen demonstratie- en docentenflows blijven draaien.
Voor echte studenten met persoonlijke gegevens blijft punt 1 een
**bewust niet afgehandeld beveiligingsrisico**. Voer minimaal een
onafhankelijke RLS- of security-review uit vóór volledige productie-inzet.
De broncodecontrole vervangt geen penetratietest.
