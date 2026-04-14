import { createTheme, responsiveFontSizes } from "@material-ui/core";
import Settings from "../../settings/settings.json";

export const black = `${Settings.colors.black}`;
export const white = `${Settings.colors.white}`;

const LightPalette = {
  primary: "#4f7cff",
  secondary: "#46526c",
  accent: "#4f7cff",
};

const DarkPalette = {
  primary: "#7ca3ff",
  secondary: "#c2cdf0",
  accent: "#7ca3ff",
};

const CustomPalette = {
  primary: "#2f7a6d",
  secondary: "#425148",
  accent: "#2f7a6d",
};

export const primary = LightPalette.primary;
export const secondary = LightPalette.secondary;
export const accent = LightPalette.accent;

export const LightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      type: "light",
      primary: {
        main: LightPalette.primary,
      },
      secondary: {
        main: LightPalette.secondary,
      },
      accent: {
        main: LightPalette.accent,
      },
      background: {
        default: white,
        paper: white,
      },
      foreground: {
        default: black,
      },
      text: {
        primary: black,
        secondary: LightPalette.secondary,
      },
    },
    typography: {
      fontSize: 16,
      htmlFontSize: 16,
      h1: {
        fontWeight: 500,
      },
      h2: {
        fontWeight: 500,
      },
      h3: {
        fontWeight: 500,
      },
      h5: {
        fontWeight: 500,
        fontFamily: "Roboto Mono, monospace",
      },
      body: {
        fontWeight: 500,
        fontFamily: "Roboto Mono, monospace",
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            color: black,
            backgroundColor: white,
          },
        },
      },
      MuiIconButton: {
        root: {
          boxShadow:
            "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
          "&:hover": {
            backgroundColor: LightPalette.primary,
          },
          transition: "all 0.5s ease",
        },
      },
      MuiFab: {
        root: {
          width: "2.5rem",
          height: "2.5rem",
          fontSize: "1.25rem",
        },
        primary: {
          color: black,
          backgroundColor: "transparent",
          "&:hover": {
            color: black,
            backgroundColor: LightPalette.accent,
          },
          transition: "all 0.5s ease !important",
        },
      },
      MuiSpeedDialAction: {
        fab: {
          color: white,
          backgroundColor: "transparent",
          "&:hover": {
            color: white,
            backgroundColor: LightPalette.accent,
          },
          transition: "all 0.5s ease",
          margin: "0px",
          marginBottom: "16px",
        },
      },
      MuiTooltip: {
        tooltip: {
          fontFamily: "Roboto Mono, monospace",
          backgroundColor: LightPalette.accent,
          color: black,
          fontSize: 12,
        },
      },
    },
  }),
);

export const DarkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      type: "dark",
      primary: {
        main: DarkPalette.primary,
      },
      secondary: {
        main: DarkPalette.secondary,
      },
      accent: {
        main: DarkPalette.accent,
      },
      background: {
        default: black,
        paper: black,
      },
      foreground: {
        default: white,
      },
      text: {
        primary: white,
        secondary: DarkPalette.secondary,
      },
    },
    typography: {
      fontSize: 16,
      htmlFontSize: 16,
      h1: {
        fontWeight: 500,
      },
      h2: {
        fontWeight: 500,
      },
      h3: {
        fontWeight: 500,
      },
      h5: {
        fontWeight: 500,
        fontFamily: "Roboto Mono, monospace",
      },
      body: {
        fontWeight: 500,
        fontFamily: "Roboto Mono, monospace",
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            color: white,
            backgroundColor: black,
          },
        },
      },
      MuiIconButton: {
        root: {
          boxShadow:
            "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
          "&:hover": {
            backgroundColor: DarkPalette.primary,
          },
          transition: "all 0.5s ease",
        },
      },
      MuiFab: {
        root: {
          width: "2.5rem",
          height: "2.5rem",
          fontSize: "1.25rem",
        },
        primary: {
          color: white,
          backgroundColor: "transparent",
          "&:hover": {
            color: white,
            backgroundColor: DarkPalette.accent,
          },
          transition: "all 0.5s ease !important",
        },
      },
      MuiSpeedDialAction: {
        fab: {
          color: white,
          backgroundColor: "transparent",
          "&:hover": {
            color: white,
            backgroundColor: DarkPalette.accent,
          },
          transition: "all 0.5s ease",
          margin: "0px",
          marginBottom: "16px",
        },
      },
      MuiTooltip: {
        tooltip: {
          fontFamily: "Roboto Mono, monospace",
          backgroundColor: DarkPalette.accent,
          color: white,
          fontSize: 12,
        },
      },
    },
  }),
);

export const CustomTheme = responsiveFontSizes(
  createTheme({
    palette: {
      type: "light",
      primary: {
        main: CustomPalette.primary,
      },
      secondary: {
        main: CustomPalette.secondary,
      },
      accent: {
        main: CustomPalette.accent,
      },
      background: {
        default: white,
        paper: "#fff7ef",
      },
      foreground: {
        default: black,
      },
      text: {
        primary: black,
        secondary: CustomPalette.secondary,
      },
    },
    typography: {
      fontSize: 16,
      htmlFontSize: 16,
      h1: {
        fontWeight: 500,
      },
      h2: {
        fontWeight: 500,
      },
      h3: {
        fontWeight: 500,
      },
      h5: {
        fontWeight: 500,
        fontFamily: "Roboto Mono, monospace",
      },
      body: {
        fontWeight: 500,
        fontFamily: "Roboto Mono, monospace",
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            color: black,
            backgroundColor: white,
          },
        },
      },
      MuiIconButton: {
        root: {
          boxShadow:
            "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
          "&:hover": {
            backgroundColor: CustomPalette.accent,
          },
          transition: "all 0.5s ease",
        },
      },
      MuiFab: {
        root: {
          width: "2.5rem",
          height: "2.5rem",
          fontSize: "1.25rem",
        },
        primary: {
          color: black,
          backgroundColor: "transparent",
          "&:hover": {
            color: black,
            backgroundColor: CustomPalette.accent,
          },
          transition: "all 0.5s ease !important",
        },
      },
      MuiSpeedDialAction: {
        fab: {
          color: white,
          backgroundColor: "transparent",
          "&:hover": {
            color: white,
            backgroundColor: CustomPalette.accent,
          },
          transition: "all 0.5s ease",
          margin: "0px",
          marginBottom: "16px",
        },
      },
      MuiTooltip: {
        tooltip: {
          fontFamily: "Roboto Mono, monospace",
          backgroundColor: CustomPalette.accent,
          color: black,
          fontSize: 12,
        },
      },
    },
  }),
);
