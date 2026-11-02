# BEE Learning Platform — beheerdershandleiding

**Versie:** 2.3 · **Voor:** bootcampbegeleider / projecteigenaar

## 1. Wat waar draait

| Onderdeel | Locatie | Functie |
|---|---|---|
| Openbare website | https://fajshaslab.github.io/bee-learning-platform-HTML/ | Leeromgeving en editor |
| Broncode / releases | https://github.com/Fajshaslab/bee-learning-platform-HTML | Projectgeschiedenis, versietag `v2.3.0` |
| Publicatie en geautomatiseerde tests | https://github.com/Fajshaslab/bee-learning-platform-HTML/actions | Twee workflows voor website en volledige leerroute |
| Accounts, officiële voortgang en online concepten | Eigen BEE-project in https://supabase.com/dashboard | Authentication en PostgreSQL |
| Lokaal ontwikkelproject | Eigen Windows-pc, map `bee-learning-platform` | Wijzigingen maken en naar GitHub pushen |

**Belangrijk:** GitHub Pages host alleen de statische website. Supabase regelt de accounts en database. Een geslaagde GitHub-deployment bewijst niet dat de online Auth- en opslagdiensten goed functioneren.

## 2. Standaardbeheer zonder ontwikkelwerk

- Controleer bij een nieuwe codewijziging op GitHub onder **Actions** beide workflows: **Deploy BEE naar GitHub Pages** en **Test volledige BEE-leerroute**. Beide moeten groen zijn voordat je die wijziging als geslaagd beschouwt.
- Laat `config.js` uitsluitend de **Project URL** en **publieke** `sb_publishable_`-/anon-key bevatten. Zet nooit databasewachtwoorden, `service_role` of `sb_secret_` in GitHub.
- Voer `supabase/schema.sql` en eerdere migraties **niet opnieuw** uit bij normale gebruiksproblemen. Databasewijzigingen vereisen een apart gecontroleerd plan en zo nodig herstelmogelijkheid.
- Gebruik de release `v2.3.0` als herkenbaar codeherstelpunt. Een Git-tag herstelt **geen** Supabase-databasegegevens.
- Spreek vóór daadwerkelijk gebruik intern af wie supportverzoeken, privacyvragen, accountherstel en incidenten afhandelt.

## 3. Storingen: snelste diagnose

### A. De website opent niet of toont een wit scherm

1. Controleer of het juiste GitHub Pages-adres wordt gebruikt.
2. Open **GitHub → Actions** en kijk naar de laatste **Deploy BEE naar GitHub Pages**.
3. Als die rood is: open de mislukte job en lees de **eerste concrete foutmelding**; wijzig niet blind aan meerdere bestanden tegelijk.
4. Als Actions groen is: controleer via een privévenster of het probleem browsergebonden is. Verwijder bij bestaande concepten niet zomaar alle sitegegevens.

### B. Registreren, bevestigen of inloggen lukt niet

1. Controleer in Supabase **Authentication → Users** of de gebruiker bestaat en of e-mailverificatie plaatsvond. Gebruik het e-mailadres alleen wanneer nodig voor het concrete supportverzoek.
2. Controleer **Authentication → URL Configuration**. Site URL en Redirect URLs moeten de exacte GitHub Pages-URL toestaan.
3. Bij vergeten wachtwoord: laat de gebruiker **Wachtwoord vergeten?** gebruiken. Vraag nooit naar het huidige wachtwoord, herstelcodes of tokens.
4. Bij niet-ontvangen mail: controleer de e-mailinstellingen, spam en eventuele Supabase-verzendlimieten. Beloof geen aflevering zonder die te verifiëren.
5. Bij structurele fout: noteer tijdstip, browser, stap en foutmelding zonder geheimen op te slaan.

### C. Een les kan niet worden afgerond

1. Controleer of de student met een **geverifieerd account** is ingelogd, online is en niet in demonstratiemodus werkt.
2. Een klik op **Controleer mijn code** geeft alleen feedback. Voor een officiële afronding is **Les officieel registreren** nodig.
3. Vergelijk de opdracht met de code in het vereiste bestand (`index.html`, `style.css` of `script.js`).
4. Bekijk de letterlijke feedback; de browser en de server toetsen technische minimumvoorwaarden. Een inhoudelijk goede maar anders opgebouwde oplossing kan soms ten onrechte worden afgekeurd. Verzamel in dat geval de oefening, geanonimiseerde code en foutmelding voor een gerichte correctie.
5. Een modulecheck wordt pas bereikbaar wanneer alle lessen van die module en eerdere verplichte checks zijn afgerond.

**Niet doen:** de voortgang rechtstreeks met SQL wijzigen om een foutmelding te omzeilen. Daarmee kun je de servermatige leerroute inconsistent maken.

### D. Voortgang of code lijkt verdwenen

1. Vraag of de gebruiker is ingelogd onder **hetzelfde account** en niet via **Open demonstratie**.
2. Maak onderscheid tussen **officiële lesafronding** en **conceptcode**: die hebben verschillende opslag- en synchronisatieroutes.
3. Controleer bij een concept eerst het opslaglabel. Als het lokale concept nog beschikbaar is, laat de gebruiker eerst **Export JSON** uitvoeren.
4. Laat bij een opslagconflict de student niet zomaar overschrijven: bewaar eerst de lokale versie als export, vergelijk daarna met de serverversie.
5. Wis geen browserdata en verwijder geen account zolang er een mogelijk herstelbaar concept bestaat.

### E. Supabase of GitHub meldt een incident

- Registreer de storing met datum, impact, betrokken onderdelen en eventuele openbare providerstatus.
- Verander geen productie-RLS- of `SECURITY DEFINER`-functies zonder beoordeling en herstelplan.
- Bij aanwijzingen voor ongeoorloofde toegang: beperk nieuwe toegang waar mogelijk, leg de bevindingen vast, raadpleeg de verantwoordelijke voor privacy/security en herstel niet blind historische gegevens.
- Een GitHub-rollback verandert niets aan reeds uitgevoerde SQL-migraties of Supabase-accounts.

## 4. Database: alleen-lezen diagnose

Gebruik de **Table Editor** voor een incidentele en noodzakelijke controle. De belangrijkste tabellen zijn:

- `lesson_catalog`: 40 lessencatalogusitems.
- `module_questions`: 40 modulecheckvragen; niet rechtstreeks leesbaar voor gewone studenten.
- `lesson_completions`: officieel geregistreerde lessen per `user_id`.
- `module_completions`: officieel geregistreerde checks per `user_id`.
- `student_drafts`: serveropslag van conceptcode met versiebeheer.

Een veilige cataloguscontrole via **SQL Editor** is:

```sql
SELECT
  (SELECT count(*) FROM public.lesson_catalog) AS lessen,
  (SELECT count(*) FROM public.module_questions) AS vragen;
```

Normaal verwacht je **40** en **40**. De SQL Editor heeft verhoogde beheerdersrechten; daarmee aantonen dat een rij bestaat bewijst **niet** dat een andere student die rij wel of niet kan zien.

De eerder bekeken beleidsconfiguratie was: RLS **aan** voor vijf tabellen; `lesson_completions`, `module_completions` en `student_drafts` hebben `SELECT`-beleid dat `user_id` met `auth.uid()` vergelijkt. De vier RPC-functies `submit_lesson`, `submit_module_check`, `save_student_draft`, `delete_my_account` zijn niet voor de anonieme rol uitvoerbaar. Dit is een **configuratiecontrole**, geen volledige negatieve toegangstest.

## 5. Nieuwe code uitrollen

In VS Code, vanuit de hoofdmap van het project:

```cmd
npm run check
npm test
npm run build
```

Daarna alleen de bedoelde bestanden committen en pushen:

```cmd
git status
git add docs/
git commit -m "Add student and administrator guides"
git push origin main
```

Voor codewijzigingen voeg je ook de betreffende codebestanden toe; voor het documentatiepakket volstaat `git add docs/`.

Controleer opnieuw beide workflows op GitHub. Publicatie van alleen Markdown-handleidingen verandert de werking van Supabase niet.

## 6. Herstellen naar een eerdere codeversie

`v2.3.0` is het aangemaakte herstelpunt. Voer **niet automatisch** `git reset --hard` of een geforceerde push uit. Bepaal eerst welke commit de fout heeft veroorzaakt en gebruik bij voorkeur een gecontroleerde `git revert`-commit, zodat de geschiedenis behouden blijft. Als het probleem databasegerelateerd is, volstaat een code-rollback niet.

## 7. Privacy en beveiliging

- Accounts gebruiken echte e-mailadressen. Behandel die als persoonsgegevens en raadpleeg binnen de organisatie de AVG-/privacyverantwoordelijke over doelen, bewaartermijnen, verwerkersafspraken, verwijdering, contactpunt en eventuele meldprocedures.
- Deel nooit wachtwoorden, resetlinks, JWT-tokens, databasegeheimen of volledige studentexports in tickets of chats.
- Bij gedeelde computers blijven lokaal opgeslagen concepten mogelijk in de browser aanwezig; instrueer studenten om uit te loggen en eigen exports op te ruimen.
- Accountverwijdering is een onomkeerbare functie: oefen die niet op een echt studentenaccount zonder een uitdrukkelijk verzoek van de betreffende gebruiker.
- Een groene CI-run is **niet** gelijk aan een beveiligingsaudit; zie `PRODUCTIESTATUS_EN_RISICOS.md`.
