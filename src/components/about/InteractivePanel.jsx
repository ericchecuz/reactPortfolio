import React, { useContext } from "react";
import { Typography, IconButton, Tooltip, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Brightness4,
  Brightness7,
  Palette,
  Shuffle,
  Games,
  GridOn,
  GridOff,
  FastForward,
  SlowMotionVideo,
  PlayArrow,
  RotateRight,
  RotateLeft,
  FlashOn,
  FlashOff,
} from "@material-ui/icons";
import { ThemeContext } from "../theme/ThemeProvider";

const useStyles = makeStyles((theme) => ({
  panel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: "1.25rem",
    textAlign: "center",
    borderRadius: "8px",
    position: "relative",
    overflow: "hidden",
  },
  title: {
    marginBottom: "0.25rem",
    fontWeight: 700,
    fontSize: "1.2rem",
    letterSpacing: "1px",
    color: "var(--text-primary)",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  subtitle: {
    fontSize: "0.75rem",
    opacity: 0.7,
    fontFamily: "monospace",
    marginBottom: "3rem", // Increased to prevent tooltip overlap
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  controls: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    columnGap: "2rem",
    rowGap: "1.5rem",
    zIndex: 2,
    marginTop: "0.5rem",
    width: "100%",
  },
  controlItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minWidth: "80px", // Stable width to prevent shifting
  },
  button: {
    backgroundColor: "var(--accent-soft)",
    color: "var(--primary)",
    padding: "0.8rem",
    marginBottom: "0.5rem",
    "&:hover": {
      backgroundColor: "var(--primary-soft)",
      transform: "scale(1.1)",
    },
    transition: "all 0.3s ease",
    border: "1px solid var(--border-subtle)",
  },
  buttonActive: {
    backgroundColor: "var(--primary)",
    color: "var(--bg-paper)",
    padding: "0.8rem",
    marginBottom: "0.5rem",
    "&:hover": {
      backgroundColor: "var(--accent)",
      transform: "scale(1.1)",
    },
    transition: "all 0.3s ease",
    border: "1px solid var(--primary)",
  },
  statusText: {
    fontSize: "0.65rem",
    fontFamily: "Roboto Mono, monospace",
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    width: "100%",
    textAlign: "center",
    height: "1rem", // Stable height
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundEffect: {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: "radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)",
    opacity: 0.2,
    pointerEvents: "none",
    animation: "$pulse 6s infinite alternate",
  },
  "@keyframes pulse": {
    "0%": { transform: "scale(1) rotate(0deg)", opacity: 0.1 },
    "100%": { transform: "scale(1.2) rotate(10deg)", opacity: 0.3 },
  },
}));

export const InteractivePanel = () => {
  const {
    theme,
    toggleTheme,
    shapeType,
    toggleShape,
    wireframe,
    toggleWireframe,
    animationSpeed,
    cycleAnimationSpeed,
    isRotating,
    toggleRotation,
    turbulenceIntensity,
    toggleTurbulence,
  } = useContext(ThemeContext);
  const classes = useStyles();

  return (
    <div className={classes.panel}>
      <div className={classes.backgroundEffect} />
      
      <Typography variant="h6" className={classes.title}>
        <Games fontSize="small" />
        INTERACTIVE HUB
      </Typography>

      <Typography variant="body2" className={classes.subtitle}>
        Customize your experience
      </Typography>

      <div className={classes.controls}>
        <div className={classes.controlItem}>
          <Tooltip title="Cambia Tema" placement="top" TransitionComponent={Zoom}>
            <IconButton onClick={toggleTheme} className={classes.button}>
              {theme === "light" ? <Brightness4 fontSize="small" /> : theme === "dark" ? <Brightness7 fontSize="small" /> : <Palette fontSize="small" />}
            </IconButton>
          </Tooltip>
          <span className={classes.statusText}>{theme}</span>
        </div>

        <div className={classes.controlItem}>
          <Tooltip title="Cambia Forma" placement="top" TransitionComponent={Zoom}>
            <IconButton onClick={toggleShape} className={classes.button}>
              <Shuffle fontSize="small" />
            </IconButton>
          </Tooltip>
          <span className={classes.statusText}>{shapeType}</span>
        </div>

        <div className={classes.controlItem}>
          <Tooltip title="Wireframe Toggle" placement="top" TransitionComponent={Zoom}>
            <IconButton onClick={toggleWireframe} className={wireframe ? classes.buttonActive : classes.button}>
              {wireframe ? <GridOn fontSize="small" /> : <GridOff fontSize="small" />}
            </IconButton>
          </Tooltip>
          <span className={classes.statusText}>{wireframe ? "ON" : "OFF"}</span>
        </div>

        <div className={classes.controlItem}>
          <Tooltip title="Velocità Animazione" placement="top" TransitionComponent={Zoom}>
            <IconButton onClick={cycleAnimationSpeed} className={classes.button}>
              {animationSpeed === 0.5 ? <SlowMotionVideo fontSize="small" /> : animationSpeed === 1 ? <PlayArrow fontSize="small" /> : <FastForward fontSize="small" />}
            </IconButton>
          </Tooltip>
          <span className={classes.statusText}>{animationSpeed}x</span>
        </div>

        <div className={classes.controlItem}>
          <Tooltip title="Rotazione" placement="top" TransitionComponent={Zoom}>
            <IconButton onClick={toggleRotation} className={isRotating ? classes.buttonActive : classes.button}>
              {isRotating ? <RotateRight fontSize="small" /> : <RotateLeft fontSize="small" />}
            </IconButton>
          </Tooltip>
          <span className={classes.statusText}>{isRotating ? "ON" : "OFF"}</span>
        </div>

        <div className={classes.controlItem}>
          <Tooltip title="Overdrive (Turbulence)" placement="top" TransitionComponent={Zoom}>
            <IconButton onClick={toggleTurbulence} className={turbulenceIntensity > 1 ? classes.buttonActive : classes.button}>
              {turbulenceIntensity > 1 ? <FlashOn fontSize="small" /> : <FlashOff fontSize="small" />}
            </IconButton>
          </Tooltip>
          <span className={classes.statusText}>LV {turbulenceIntensity}</span>
        </div>
      </div>
    </div>
  );
};
