# Supabase LIVE pilotcontrole — versie 1.2

**Niet in de demo nodig. Dit controleert een echte testdatabase.**

De meegeleverde `npm run pilot:live` voert een aantal echte HTTP-verzoeken naar Supabase uit. Het is veel sterker dan controleren of een SQL-bestand bepaalde woorden bevat, maar het is **nog steeds geen complete security-audit**.

## Eerst nodig

1. Maak **een afzonderlijk Supabase-testproject** en pas daarop `supabase/schema.sql` toe. Voer dit script niet zomaar uit op een productieomgeving.
2. Zet **Confirm email** aan in Supabase Auth. Controleer je URL-configuratie en e-mailverificatie.
3. Maak **twee NIEUWE testaccounts** (A en B) met twee verschillende e-mailadressen. Verifieer beide e-mailadressen en controleer dat beide nog geen voortgang of concepten hebben. Dit script weigert te starten als een account al voortgang of concepten heeft.
4. Gebruik uitsluitend de publieke **publishable/anon-key**, **geen** `service_role`-key, databasewachtwoord of secret key.
5. Het script maakt daarna één lesafronding voor A en één concept voor B. Gebruik dus **nooit echte studentenaccounts**.

## Windows Command Prompt — in de projectmap

Voer de volgende regels uit met je eigen **testgegevens**. Vul de waarde na elk `=`-teken in. **Deel deze gegevens niet in de chat, screenshots of GitHub.**

```cmd
set BEE_SUPABASE_URL=https://JOUW-PROJECT.supabase.co
set BEE_SUPABASE_ANON_KEY=JOUW_PUBLIEKE_KEY
set BEE_TEST_A_EMAIL=eerste-testaccount@example.com
set BEE_TEST_A_PASSWORD=JOUW_TESTWACHTWOORD_A
set BEE_TEST_B_EMAIL=tweede-testaccount@example.com
set BEE_TEST_B_PASSWORD=JOUW_TESTWACHTWOORD_B
npm run pilot:live
```

Deze instellingen gelden alleen in de huidige Command Prompt-sessie. Sluit die terminal na de controle.

## Wat wordt rechtstreeks gecontroleerd?

- Beide testaccounts kunnen aanmelden en hebben een geverifieerd e-mailadres.
- De accounts zijn verschillend en hebben aan het begin lege voortgang.
- De lescatalogus is toegankelijk voor een geverifieerd account, maar niet voor een anonieme gebruiker.
- Antwoordsleutels zijn niet direct via de REST API leesbaar.
- Directe inserts in de voortgangstabel zijn verboden.
- Via RPC zijn vergrendelde lessen, vergrendelde concepten en voortijdige modulechecks niet mogelijk.
- Een toegestane eerste les kan door account A worden geregistreerd.
- Account B kan de voortgang van A niet lezen, ook niet met een expliciete `user_id`-filter.
- Account B kan het eerste eigen concept opslaan; A kan dat concept niet uitlezen.
- Een verouderde conceptrevisie geeft een conflict en verandert de servercode niet.

Bij een mislukte controle verschijnt `LIVE PILOT MISLUKT` en eindigt het script met een foutcode. **Ga dan nog niet live.**

## Wat bewijst dit NIET?

Het script test geen echte e-mailontvangst, e-mailwijziging, wachtwoordherstel, 115/120 minuten sessiebeheer, browser-isolatie, race conditions tussen echte apparaten, massale belasting, privacybeleid, backups, herstelcodes of toegankelijkheid. De code-/modulechecks zijn nog steeds omzeilbare zelfcontroles en geen fraudebestendige examens. De 846 oorspronkelijke acceptatiescenario's blijven afzonderlijk gepland.

**Belangrijk bij een bestaande Supabase-database:** dit pakket bevat een schema voor een schone testinstallatie. Wijzigingen in bestaande databasegegevens en kolommen moet je eerst beoordelen en migreren. Gebruik eerst een back-up.
