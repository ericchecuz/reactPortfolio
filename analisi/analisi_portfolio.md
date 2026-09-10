# Analisi del Portfolio

Questo documento fornisce una panoramica strutturale e funzionale del progetto React Portfolio.

## Struttura del Progetto

Il progetto è un'applicazione React organizzata come segue:

- **`src/app/`**: Contiene il componente principale `App.jsx` e la gestione dei meta-tag con `HelmetMeta.jsx`.
- **`src/components/`**: Diviso in moduli funzionali:
    - **`about/`**: Sezione "About" con informazioni personali e certificazioni.
    - **`background/`**: Gestione dello sfondo animato 3D con Three.js.
    - **`contact/`**: Modulo di contatto.
    - **`content/`**: Componenti di utilità per il testo (es. `TextDecrypt`).
    - **`logo/`**: Componenti per il logo del sito.
    - **`nav/`**: Barra di navigazione laterale.
    - **`resume/`**: Visualizzazione del curriculum.
    - **`speedDial/`**: Menu flottante per azioni rapide.
    - **`theme/`**: Gestione del tema (Light, Dark, Custom) e della forma geometrica di background.
    - **`works/`**: Esposizione dei progetti realizzati.
- **`src/hooks/`**: Custom hooks per la gestione della viewport e delle preferenze di movimento.
- **`src/settings/`**: File JSON di configurazione per il curriculum (`resume.json`) e le impostazioni generali (`settings.json`).
- **`src/utils/`**: Funzioni di utilità per stile, Three.js e transizioni.

## Gestione del Tema

Il sistema di tematizzazione è centralizzato in `src/components/theme/`:
- **`ThemeProvider.jsx`**: Utilizza il Context API di React per fornire lo stato del tema (`theme`), della forma (`shapeType`) e i relativi toggle a tutta l'applicazione.
- **`Themes.js`**: Definisce le palette di colori per i temi "Light", "Dark" e "Custom", integrandosi con Material UI.
- **`ThemeToggle.jsx`** e **`ShapeToggle.jsx`**: Componenti UI per cambiare rispettivamente il tema e la forma geometrica.

## Agenti Tema

La cartella `agenti-tema/` contiene istruzioni per agenti AI:
- **`tema-agent.instructions.md`**: Istruzioni specifiche per questo progetto.
- **`theme-geometry-agent.instructions.md`**: Un blueprint generico per portare il sistema di temi e geometrie in altri progetti.

## Tecnologie Principali

- **React 17**: Framework UI.
- **Material UI (v4)**: Libreria di componenti e sistema di design.
- **Three.js**: Rendering 3D per lo sfondo.
- **Popmotion**: Gestione delle animazioni e degli spring.
- **React Router Dom**: Gestione della navigazione.
