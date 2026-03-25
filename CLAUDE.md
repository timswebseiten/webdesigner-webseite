# Websiteerstellung — Tim Weber

## Über den Nutzer
- Tim Weber, Webdesigner, Zürich
- Erstellt professionelle Webseiten für KMU-Kunden
- Arbeitet auf MacBook (primär) und iMac
- Bevorzugt direktes, knappes Feedback ohne lange Erklärungen
- Kein "ß" verwenden — immer "ss" (Swiss Standard): z.B. "Nachtschweiss" statt "Nachtschweiß"

## Tech Stack
- Next.js 15 + TypeScript + Tailwind CSS v4 (CSS-basierte Config mit `@theme inline`)
- Framer Motion für Animationen
- next/font/google für Schriften
- next/image für alle Bilder
- Vercel für Deployment (Account: timswebseiten)
- GitHub für Versionskontrolle (Org: timswebseiten)

## Workflow
1. Design-Interview mit AskUserQuestion führen (Stil, Farben, Struktur, Assets)
2. Logo/Bilder vom Nutzer einfordern, dann in `/public/` ablegen
3. Alle Seiten aufbauen, dann auf Vercel deployen: `vercel --yes`
4. GitHub pushen: `gh repo push` oder `git push`

## Design-Regeln
- AskUserQuestion Tool für Design-Interview verwenden
- frontend-design Skill für alle UI-Entscheidungen
- UI/UX Pro Max für Design-System-Generierung
- Keine generischen AI-Aesthetics
- Bold, distinctive Design-Choices
- Performance-optimiert (Core Web Vitals)
- Immer `"use client"` für interaktive Komponenten
- Kein `ß` — immer `ss`

## Aktive Projekte

### 1. Prota Storenbau — AUF EIS
- **Kunde:** Sandro Prota, Storenbau Zürich
- **Repo:** https://github.com/timswebseiten/storenprota
- **Live:** Vercel (storenprota)
- **Design:** Navy #1e3a7a + Orange #E8620A, Barlow Condensed + Lora
- **Seiten:** Homepage (Hero, Stats, Produkte, About, Referenzen, Kontakt) + /produkte
- **Status:** Abgeschlossen, auf Eis gelegt

### 2. Brigitte Weber TCM-Gynäkologie — AKTIV
- **Kunde:** Brigitte Weber, Dipl. Akupunkteurin TCM-FVS
- **Webseite alt:** https://www.tcm-gyni.ch/
- **Repo:** noch nicht auf GitHub (Ordner: ~/Desktop/tcm-gyni)
- **Live:** https://tcm-gyni.vercel.app
- **Design:** Elegant & Feminin, Crimson #8C1A1A + Cream #FAF7F2 + Sand #D9D3AC
- **Fonts:** Cormorant Garamond (Display) + Nunito (Body)
- **Seiten:** / · /kinderwunsch · /schwangerschaft · /menstruation · /wechseljahre · /ueber-mich · /kontakt · /leistungen
- **Navigation:** Kinderwunsch, Schwangerschaft, Menstruation, Wechseljahre, Über mich + CTA "Termin anfragen"
- **Bilder in /public/:** hero.jpg, logo.png, brigitte-weber.jpg, kinderwunsch.jpg, schwangerschaft.jpg, menstruation.jpg, wechseljahre.jpg
- **Öffnungszeiten:** Mo/Di/Do 09:30–17:45 · Mi 12:00–20:30 · Fr (gerade Wochen) 09:30–16:30 · Sa (alle 4 Wochen) 09:30–16:30
- **Kontakt:** brigitte.weber@tcm-gyni.ch · 044 383 93 20 · Neptunstrasse 61, 8032 Zürich
- **Social:** Facebook: https://www.facebook.com/TCM.Gyni/ · YouTube: https://www.youtube.com/@Tcm-gyniCh/videos
- **Status:** In Entwicklung — offene Punkte unten

#### Offene Punkte tcm-gyni:
- [ ] Logo im Header/Footer: logo.png wird referenziert, muss in /public/ liegen
- [ ] Brigitte-Foto in About-Section auf Homepage eingebaut
- [ ] Über-mich-Seite: neuer langer Text von Tim bereits eingebaut
- [ ] Alle ß → ss ersetzt
- [ ] Footer: brigitte.weber@tcm-gyni.ch, roter CTA-Button
- [ ] Repo noch auf GitHub pushen
