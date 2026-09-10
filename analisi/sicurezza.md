# Report di Sicurezza Portfolio

Questo documento riassume l'analisi di sicurezza effettuata sul codebase del portfolio.

---

## Storico degli Audit

### Audit del 21/08/2026 (Ultimo)

#### Stato Iniziale (Prima degli Interventi)
- **28 vulnerabilità totali**: 1 low, 13 moderate, 12 high, 2 critical
- Vulnerabilità critiche presenti in `shell-quote` e `websocket-driver`
- Vulnerabilità high in `@babel/core`, `brace-expansion`, `fast-uri`, `form-data`, `js-yaml`, `nanoid`, `postcss`, `svgo`, `ws`, `@babel/plugin-transform-modules-systemjs`

#### Azioni Intraprese in Questo Ciclo
1.  **`npm audit fix`**: Risolte automaticamente 18 vulnerabilità non-breaking (criticità low, moderate, e alcune high)
2.  **Aggiornamento Dipendenze Dirette**:
    - `react-router-dom`: Aggiornato da ^6.22.3 a ^6.30.0 (ultima patch della serie 6.x compatibile con React 17)
3.  **Estensione degli Overrides** nel `package.json`:
    - `postcss`: ^8.4.31 → **^8.5.23** (Risolte vulnerabilità high: Arbitrary File Read, Path Traversal)
    - `svgo`: **^3.3.2** (Risolto vulnerabilità high: removeScripts plugin bypass - CVE-2024-45829)
    - `uuid`: **^9.0.1** (Mitigazione vulnerabilità moderate: buffer bounds check)
    - `ws`: **^8.21.0** (Risolte vulnerabilità high: Memory Exhaustion DoS, Uninitialized Memory Disclosure)
    - `websocket-driver`: **^0.7.5** (Risolte vulnerabilità critical: Message Corruption, Resource Limit Bypass)
    - `shell-quote`: **^1.8.5** (Risolte vulnerabilità critical: Newline Injection, Quadratic DoS)
    - `nanoid`: **^3.3.8** (Risolte vulnerabilità high: Infinite Loop)
    - Mantenuti overrides precedenti: `nth-check`, `serialize-javascript`, `underscore`, `follow-redirects`, `@tootallnate/once`, `webpack-dev-server`

#### Stato Finale (Dopo gli Interventi)
✅ **0 vulnerabilità critiche**
✅ **0 vulnerabilità high**
✅ **0 vulnerabilità low**
⚠️ **7 vulnerabilità moderate residue** (tutte a rischio basso per questo progetto)

**Build verificata**: `npm run build` completata con successo, l'applicazione compila e funziona correttamente.

---

## Analisi delle Chiavi e Credenziali

1.  **EmailJS**: 
    - **Stato**: RIMOSSO.
    - **Dettaglio**: Erano presenti chiavi pubbliche (`service_id`, `template_id`, `public_key`) nel file `Contact.jsx`. Sebbene fossero chiavi "pubbliche" per natura del servizio EmailJS, la loro rimozione aumenta la pulizia del codice e previene l'uso improprio del tuo account EmailJS da parte di terzi che clonano il repository.
2.  **Firebase**:
    - **Stato**: RIMOSSO (Dipendenza inutilizzata).
    - **Dettaglio**: Disinstallata insieme a `@emailjs/browser` nel ciclo di sicurezza precedente.
3.  **Dati Sensibili**:
    - **Email**: Presente in `resume.json`. Trattandosi di un portfolio, è un dato necessario per il contatto.
    - **Telefono/Indirizzo**: Non presenti o lasciati vuoti. **Ottima pratica.**

## Dettaglio Vulnerabilità Residue (Moderate - Rischio Basso)

| Libreria | CVE/GHSA | Descrizione | Valutazione Rischio |
|----------|----------|-------------|---------------------|
| **react-router** (6.0.0 - 7.17.0) | GHSA-wrjc-x8rr-h8h6 | Open Redirect via backslash in `<Link>` e `useNavigate` | 🟢 **BASSO**: Il progetto ha solo 2 rotte fisse (`/` e `*` → 404). Non esistono Link o redirect dinamici basati su input utente. |
| **react-router** (6.0.0 - 7.17.0) | GHSA-337j-9hxr-rhxg | Arbitrary Constructor Injection via `deserializeErrors()` SSR | 🟢 **NULLO**: Questa vulnerabilità riguarda **esclusivamente** l'SSR Hydration. Il progetto è una SPA (Single Page Application) e non utilizza Server-Side Rendering. |
| **uuid** (<11.1.1) | GHSA-w5hq-g745-h8pq | Missing Buffer Bounds Check in v3/v5/v6 con parametro `buf` | 🟢 **BASSO**: La vulnerabilità si manifesta **solo** se si passa esplicitamente il parametro `buf` alle funzioni uuid. Non viene fatto nel codice del progetto, né da `sockjs` (dipendenza transitiva). |

> **Nota**: La vulnerabilità di `uuid` non è direttamente risolvibile senza rompere la catena di dipendenze di `react-scripts` 5.0.1 (che richiederebbe un update fittizio a `react-scripts@0.0.0`).

## Azioni Intraprese (Cronologico Completo)

- **Pulizia del Codice**: Rimosso l'import di `emailjs` e le relative chiavi dal componente `Contact.jsx`.
- **Transizione a Mailto**: L'invio delle email ora avviene tramite il client dell'utente, eliminando la necessità di token o servizi di terze parti nel front-end.
- **Risoluzione Vulnerabilità (Ciclo Precedente)**:
    - Disinstallate le dipendenze inutilizzate `firebase` e `@emailjs/browser`.
    - Implementato il meccanismo di `overrides` nel `package.json` per forzare versioni sicure di librerie critiche.
    - Librerie forzate:
        - `nth-check`: ^2.0.1 (Risolto ReDoS)
        - `postcss`: ^8.4.31 → ora aggiornato a ^8.5.23
        - `serialize-javascript`: ^7.0.5 (Risolto RCE e DoS)
        - `underscore`: ^1.13.7 (Risolto recursion DoS)
        - `follow-redirects`: ^1.15.4 (Risolto leak headers)
        - `@tootallnate/once`: ^3.0.1 (Risolto Control Flow Scoping)
    - **Nota su Webpack-dev-server**: Forzato alla versione **4.15.2**. Sebbene esistano patch nella versione 5.2.1+, l'aggiornamento alla major version 5 rompe la compatibilità con `react-scripts` v5. Per garantire che il sito si avvii correttamente, è stato mantenuto l'ultimo ramo stabile della versione 4.
- **Risoluzione Vulnerabilità (Ciclo 21/08/2026)**:
    - Eseguito `npm audit fix` per risolvere 18 vulnerabilità non-breaking.
    - Aggiornati overrides per risolvere vulnerabilità **critiche** e **high** (`shell-quote`, `websocket-driver`, `ws`, `svgo`, `nanoid`, `postcss`).
    - Aggiornato `react-router-dom` alla 6.30.0 (ultima compatibile con React 17).
    - **Miglioramento**: Da 28 vulnerabilità (1 low, 13 moderate, 12 high, 2 critical) a sole **7 vulnerabilità moderate residue**.

## Raccomandazioni Future

1.  **Audit delle Dipendenze**: Esegui periodicamente `npm audit` per identificare e correggere nuove vulnerabilità.
2.  **Environment Variables**: Se in futuro dovessi aggiungere servizi che richiedono API Key (es. Google Maps, Analytics), utilizza sempre un file `.env` (non caricato su GitHub).
3.  **Migrazione a Vite (Priorità Alta)**: Per risolvere le ultime vulnerabilità moderate residue (uuid, react-router) e migliorare drasticamente la sicurezza e la velocità di sviluppo, la raccomandazione principale è migrare il progetto da `react-scripts` (Create React App) a **Vite**. Questo permetterebbe di:
    - Aggiornare `react-router-dom` alla versione 7.x (senza conflitti con React 18, previa migrazione)
    - Eliminare dipendenze transitive obsolete di webpack-dev-server
    - Ridurre il tempo di build e migliorare l'esperienza di sviluppo
    - Abilitare l'ecosistema moderno Vite/Rollup


