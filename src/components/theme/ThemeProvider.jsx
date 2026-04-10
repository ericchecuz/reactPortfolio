import React, { useEffect, useMemo, useState, createContext } from "react";
import { LightTheme, DarkTheme, CustomTheme } from "./Themes";
import { MuiThemeProvider } from "@material-ui/core/styles";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const getInitialMode = () => {
        if (typeof localStorage === "undefined") return "dark";

        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme;
        }

        const legacyDark = localStorage.getItem("dark");
        if (legacyDark !== null) {
            return JSON.parse(legacyDark) ? "dark" : "light";
        }

        return getPrefColorScheme() ? "dark" : "light";
    };

    const getPrefColorScheme = () => {
        if (!window.matchMedia) return false;

        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    const shapeOptions = [
        "icosahedron",
        "sphere",
        "torusKnot",
        "box",
        "cylinder",
        "dodecahedron",
        "tetrahedron",
    ];

    const getInitialShape = () => {
        if (typeof localStorage === "undefined") return shapeOptions[0];

        const savedShape = localStorage.getItem("shapeType");
        if (savedShape && shapeOptions.includes(savedShape)) {
            return savedShape;
        }

        return shapeOptions[Math.floor(Math.random() * shapeOptions.length)];
    };

    const [theme, setTheme] = useState(getInitialMode());
    const [shapeType, setShapeType] = useState(getInitialShape());
    const [shapeSeed, setShapeSeed] = useState(Math.random());

    const toggleTheme = () => {
        setTheme((currentTheme) => {
            if (currentTheme === "light") return "dark";
            if (currentTheme === "dark") return "custom";
            return "light";
        });
    };

    const toggleShape = () => {
        setShapeType((currentShape) => {
            const nextShapes = shapeOptions.filter((shape) => shape !== currentShape);
            return nextShapes[Math.floor(Math.random() * nextShapes.length)];
        });
        setShapeSeed(Math.random());
    };

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("theme", theme);
            localStorage.setItem("shapeType", shapeType);
            localStorage.setItem("shapeSeed", String(shapeSeed));
            localStorage.removeItem("dark");
        }
    }, [theme, shapeType, shapeSeed]);

    const selectedTheme = useMemo(
        () => (theme === "custom" ? CustomTheme : theme === "dark" ? DarkTheme : LightTheme),
        [theme],
    );

    useEffect(() => {
        const paper = selectedTheme.palette.background.paper || selectedTheme.palette.background.default;
        const text =
            selectedTheme.palette.text?.primary ||
            selectedTheme.palette.foreground?.default ||
            selectedTheme.palette.primary.main;
        const secondary =
            selectedTheme.palette.text?.secondary || selectedTheme.palette.secondary?.main || text;

        document.body.style.backgroundColor = "transparent";
        document.body.style.color = text;
        document.body.style.transition = "color 0.5s ease";
        document.documentElement.style.setProperty("--bg-default", "transparent");
        document.documentElement.style.setProperty("--bg-paper", paper);
        document.documentElement.style.setProperty("--text-primary", text);
        document.documentElement.style.setProperty("--text-secondary", secondary);
    }, [selectedTheme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
                shapeType,
                shapeSeed,
                toggleShape,
                themePalette: selectedTheme.palette,
            }}
        >
            <MuiThemeProvider theme={selectedTheme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
