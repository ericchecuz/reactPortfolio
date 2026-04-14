# Tema e sfondo animato

## Come funziona il background animato

Il background si basa su Three.js e uno shader personalizzato.

1. `src/components/background/DisplacementSphere.jsx`
   - crea una scena Three.js e una `SphereBufferGeometry(32, 128, 128)`.
   - monta il materiale con `material.onBeforeCompile(...)` usando il vertex shader e il fragment shader personalizzati.
   - anima la scena impostando `uniforms.current.time.value` in `requestAnimationFrame(...)`.
   - la sfera si muove anche con il mouse usando un `spring` da `popmotion`.

2. `src/components/background/sphereVertShader.jsx`
   - definisce la funzione `turbulence(...)` e il displacement vertex shader.
   - la forma viene deformata così:
     - `noise = turbulence(0.01 * position + normal + time * 0.8);`
     - `vec3 displacement = vec3((position.x) * noise, position.y * noise, position.z * noise);`
     - `gl_Position = projectionMatrix * modelViewMatrix * vec4((position + normal) + displacement, 1.0);`

### Come cambiare la forma

Puoi intervenire in due punti principali:

1. **Cambiare la geometria base** in `DisplacementSphere.jsx`:
   - `new SphereBufferGeometry(32, 128, 128)` è la base attuale.
   - sostituiscila con altre geometrie come:
     - `new TorusKnotBufferGeometry(20, 6, 128, 64)`
     - `new IcosahedronBufferGeometry(30, 4)`
     - `new BoxBufferGeometry(24, 24, 24)`
     - `new CylinderBufferGeometry(12, 12, 40, 64)`

2. **Cambiare la funzione di displacement** in `sphereVertShader.jsx`:
   - modifica `noise` o `displacement` per ottenere morfologie diverse.
   - esempio di displacement lungo la normale:
     ```glsl
     float strength = 10.0;
     vec3 displacement = normal * noise * strength;
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position + displacement, 1.0);
     ```
   - esempio di onda più regolare:
     ```glsl
     float wave = sin(position.x * 3.0 + time * 2.0) * 4.0;
     vec3 displacement = normal * wave;
     ```
   - esempio di forma più spigolosa:
     ```glsl
     float spikes = pow(abs(noise), 1.5);
     vec3 displacement = normal * spikes * 12.0;
     ```

### Cosa puoi cambiare facilmente

- il raggio e la risoluzione della geometria: il primo parametro di `SphereBufferGeometry(...)` e il numero di segmenti.
- la velocità di animazione cambiando `time * 0.8`.
- la direzione della deformazione usando `normal` invece di `position`.
- la forma di base con un’altra geometria.


## Nuovo tema colori

Il tema è già collegato a `src/settings/settings.json` e a `src/components/theme/Themes.js`.

I colori configurati sono:
- `primary`: `#ff8248`
- `secondary`: `#ff6547`
- `accent`: `#ffa849`
- `black`: `#3a3a3a`
- `white`: `#ffffff`

### Dove modificare i colori

- `src/settings/settings.json` contiene i valori esadecimali.
- `src/components/theme/Themes.js` genera il tema Material UI usando quei valori.

### Come usare il tema

- `ThemeProvider.jsx` applica il tema globale.
- `ThemeToggle.jsx` cambia tra modalità chiara e scura.
- Il colore del browser tab viene impostato in `src/app/HelmetMeta.jsx` con `Settings.colors.primary`.


## Come aggiungere nuove forme o colori

1. apri `src/components/background/DisplacementSphere.jsx` per cambiare la geometria.
2. apri `src/components/background/sphereVertShader.jsx` per cambiare la deformazione shader.
3. apri `src/settings/settings.json` per aggiornare i colori del tema.
4. apri `src/components/theme/Themes.js` se vuoi cambiare comportamenti specifici dei componenti Material UI.

## Plugin portatile tema + forme

Questa cartella contiene anche un agente generico capace di applicare il sistema tema+forme a progetti futuri, anche non basati su React.

- `tema-agent.instructions.md`: agent specifico per questo progetto.
- `theme-geometry-agent.instructions.md`: agente generico che può essere usato come blueprint per importare il sistema tema/shape in altri progetti.
- usa palette centralizzate e un semplice oggetto di configurazione per le geometrie.

Quando lo user vuoi estendere il sistema in un altro progetto, segui prima il file `theme-geometry-agent.instructions.md` per mantenere il codice plug-and-play.


## Note rapide

- per una forma diversa, cambia `SphereBufferGeometry` e mantieni lo shader.
- per deformazioni più morbide, usa `sin(...)` o `cos(...)` nel vertex shader.
- per deformazioni più aggressive, aumenta `noise` o usa `normal * ...`.
- per cambiare i colori, modifica `settings.json` e riavvia l’app.
