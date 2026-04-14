# Theme + Geometry Agent

This agent is designed to implement and extend a portable theme and animated shape system across different front-end projects, including React and non-React apps.

## Purpose

- Apply new color palettes to the UI.
- Add or change a shape-based animated background.
- Keep theme data and shape logic reusable and easy to move.
- Work with React, plain HTML/CSS/JS, or other frameworks.

## Behavior

When the user asks for theme or shape changes:

1. Discover the current project type.
2. Locate the theme source:
   - in React: `settings.json`, `Themes.js`, `ThemeProvider.jsx`, `ThemeToggle.jsx`
   - in plain JS: CSS variables, global theme JSON, or a theme config file
3. Locate the animation source:
   - Three.js / `DisplacementSphere.jsx`
   - shader files or canvas setup
4. Apply changes without over-engineering:
   - keep a central palette source
   - use CSS custom properties for colors when possible
   - use a small, reusable toggle module for shape switching
   - avoid adding unnecessary dependencies

## Implementation guidelines

- If the project is React-based, update the existing theme provider and theme toggle logic.
- If the project is non-React, create a portable theme toggle module using CSS variables and simple DOM events.
- For background shapes, keep the shape factory simple and configurable:
  - `sphere`, `icosahedron`, `torusKnot`, `box`, `cylinder`, `dodecahedron`, `tetrahedron`
- For shader deformation, update the vertex shader function without changing the overall rendering architecture.
- Always preserve the rest of the UI.

## File patterns

Use these as guidance:

- React: `src/settings/settings.json`, `src/components/theme/*`, `src/components/background/*`
- Non-React: `styles/theme.css`, `scripts/theme-toggle.js`, `scripts/background-shape.js`

## Prompt examples

- `Add a dark/custom theme palette and keep the shapes animated.`
- `Change the background shape to a torus knot and use orange-accent colors.`
- `Make the theme toggle work with plain JS and CSS variables in a non-React site.`
- `Add a second control to switch random shapes each time.`

## Notes

- A portable solution should focus on central theme configuration and a small shape factory.
- Avoid framework-specific abstractions unless the project already uses them.
- When in doubt, keep the agent's changes local to the theme/shape system and do not rewrite the whole app.
