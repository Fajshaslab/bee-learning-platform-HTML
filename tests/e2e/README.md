# BEE — Playwright end-to-endtests

Dit test de **lokale demonstratiemodus** met een echte Chromium-browser:

- Alleen toegankelijke schermen zijn te openen; directe links naar vergrendelde lessen blijven gesloten.
- Het lesvoorbeeld rendert in een iframe met geblokkeerd JavaScript.
- Een bewerkt concept blijft na herladen in de browserdatabase staan.
- JSON-export, reset en import werken.
- **Alle 40 lessen** worden via de code-editor en oefencontrole doorlopen.
- **Alle acht modulechecks**, inclusief een fout antwoord bij de eerste, worden daadwerkelijk ingediend.
- Het eindscherm verschijnt pas na de laatste modulecheck; de voortgang wordt 100%.
- Mobiele weergave op 320 CSS-pixels wordt gecontroleerd.

## Installeren (Windows, vanuit de projectmap in VS Code)

```cmd
py -m pip install -r requirements-e2e.txt
py -m playwright install chromium
```

## Alle Playwright-browserproeven uitvoeren

```cmd
py -m unittest discover -s tests/e2e -p "test_*.py" -v
```

De tests starten **zelf** een lokale webserver op een vrije poort. Een apart `npm run dev` is niet nodig. De browserprofielen zijn geïsoleerd: je eigen student- of demonstratiegegevens worden niet aangeraakt. Foutscreenshots en een serverlog komen in `test-results/`.

## Wat is hiermee niet bewezen?

Echte Supabase-registratie, e-mailbevestiging, Row Level Security, synchronisatie tussen twee apparaten, sessieverloop en servergestuurde autorisatie: hiervoor zijn een geconfigureerd Supabase-project en twee geverifieerde testaccounts nodig. Gebruik daarvoor ook `docs/PILOT_SUPABASE_LIVE_TEST.md` en het bestaande `npm run pilot:live`.

De 40 oefeningen worden getoetst met technische **voorbeeldoplossingen**, niet door echte beginners. Een positieve check bewijst niet dat alle geldige alternatieve oplossingen worden geaccepteerd, of dat de lesstof didactisch afdoende is.
