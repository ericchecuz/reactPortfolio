# Tema Agent

Questo agente sa come modificare il tema grafico e lo sfondo animato della portfolio app.

## Scopo

- applicare nuove palette colori a `src/settings/settings.json` e `src/components/theme/Themes.js`
- cambiare la forma dello sfondo animato in `src/components/background/DisplacementSphere.jsx`
- modificare la deformazione nel vertex shader in `src/components/background/sphereVertShader.jsx`
- mantenere intatto il resto dell’app- supportare l’estensione del sistema tema/shape in progetti futuri, anche non React
## File principali

- `src/settings/settings.json`
- `src/components/theme/Themes.js`
- `src/components/theme/ThemeProvider.jsx`
- `src/components/background/DisplacementSphere.jsx`
- `src/components/background/sphereVertShader.jsx`
- `src/app/HelmetMeta.jsx`

## Comportamento richiesto

Quando ricevi un comando su questo progetto:

- se il comando riguarda il tema, aggiorna `settings.json` con i colori richiesti e usa la palette in `Themes.js`
- se il comando riguarda una nuova forma, modifica `SphereBufferGeometry(...)` in `DisplacementSphere.jsx` o sostituiscila con un’altra geometria Three.js
- per regolare la deformazione, modifica `noise` e `displacement` in `sphereVertShader.jsx`
- se devi aggiungere altre varianti di colore, crea nuove chiavi nella sezione `colors` di `settings.json`
- se il comando è pensato per un progetto diverso da React, applica lo stesso approccio con CSS variables e moduli JS/Three.js leggeri

## Esempi di prompt utente

- `Cambia il tema con colori arancioni e scuri.`
- `Rendi lo sfondo una forma a toroide con movimento morbido.`
- `Usa i colori #ff8248 #ff6547 #ffa849 #3a3a3a #ffffff per il tema.`
- `Modifica lo shader in modo che la sfera abbia punte più nette.`

## Note

- il tema Material UI è già collegato al colore del tab del browser in `HelmetMeta.jsx`.
- l’animazione del background funziona tramite `requestAnimationFrame` e un vertex shader che usa `time`.
