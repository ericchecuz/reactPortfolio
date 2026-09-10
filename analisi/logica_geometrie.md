# Logica delle Geometrie di Background

Questo documento analizza come viene generato lo sfondo animato 3D del portfolio e come customizzarne i valori.

## Come funziona lo sfondo animato

Lo sfondo è gestito dal componente `src/components/background/DisplacementSphere.jsx` che utilizza **Three.js** e shader personalizzati.

1.  **Rendering**: Viene creata una scena 3D con una telecamera prospettica, luci direzionali e ambientali.
2.  **Geometria**: Viene istanziata una geometria base a seconda dello stato di `shapeType` (tramite `createShapeGeometry`).
    -   Tipi supportati: `sphere`, `torusKnot`, `box`, `cylinder`, `dodecahedron`, `tetrahedron`, `icosahedron`.
3.  **Materiale e Shaders**: Viene usato un `MeshPhongMaterial` che viene esteso tramite `onBeforeCompile` per aggiungere parametri di tempo (`time`) e deformazione (displacement).
    -   **`sphereVertShader.jsx`**: Definisce la logica di deformazione nel vertex shader usando una funzione di `turbulence`.
    -   **`sphereFragShader.jsx`**: Gestisce il rendering del colore e dell'illuminazione.
4.  **Animazione**: La proprietà `uniforms.current.time.value` viene incrementata ad ogni frame per animare la deformazione e la rotazione della forma.

## Parametri di Customizzazione

Per modificare il comportamento dello sfondo, puoi intervenire sui seguenti file:

### 1. In `DisplacementSphere.jsx`:
- **`radius`**: Controlla la dimensione della forma (riga 37: `24 + random * 12`).
- **`detail`**: Controlla la risoluzione della geometria (riga 38: `1 + Math.floor(random * 3)`).
- **`camera.current.position.z`**: Cambia la distanza della telecamera (riga 137: `52`).
- **`shininess`**: Modifica la lucentezza del materiale (riga 141: `22`).

### 2. In `sphereVertShader.jsx`:
- **Velocità di animazione**: Modifica il moltiplicatore di `time` all'interno della funzione di `turbulence` o nella deformazione principale (es. `time * 0.8`).
- **Intensità del disturbo**: All'interno del vertex shader principale, modifica il fattore di scala della posizione passato alla funzione `turbulence` (es. `0.01 * position`).
- **Metodo di deformazione**: Puoi cambiare come `noise` influenza la posizione:
    -   Deformazione sferica: `(position + normal) + displacement`
    -   Deformazione lungo le normali: `position + normal * noise * strength`

### 3. In `ThemeProvider.jsx`:
- **`shapeOptions`**: Puoi aggiungere nuovi nomi di forme all'array (riga 48) se implementi la relativa geometria in `createShapeGeometry`.

## Come cambiare i valori facilmente

Se desideri un movimento più lento o più veloce, cerca la variabile `time` nel vertex shader.
Se desideri forme più grandi o più piccole, modifica i valori passati alle geometrie (es. `new SphereBufferGeometry(radius, 128, 128)`).
Per cambiare i colori, agisci sui temi in `src/components/theme/Themes.js` poiché il materiale eredita i colori del tema tramite le luci e le proprietà del materiale.
