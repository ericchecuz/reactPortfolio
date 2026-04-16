import React, { useEffect, useMemo, useState, createContext } from "react";
import { LightTheme, DarkTheme, CustomTheme } from "./Themes";
import { MuiThemeProvider } from "@material-ui/core/styles";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const hexToRgba = (hex, alpha) => {
        if (!hex || typeof hex !== "string") return `rgba(0,0,0,${alpha})`;
        const h = hex.replace("#", "").trim();
        const isShort = h.length === 3;
        const isLong = h.length === 6;
        if (!isShort && !isLong) return `rgba(0,0,0,${alpha})`;

        const full = isShort ? h.split("").map((c) => c + c).join("") : h;
        const r = parseInt(full.slice(0, 2), 16);
        const g = parseInt(full.slice(2, 4), 16);
        const b = parseInt(full.slice(4, 6), 16);
        if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return `rgba(0,0,0,${alpha})`;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

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
    const [wireframe, setWireframe] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(1); // 0.5, 1, 2
    const [isRotating, setIsRotating] = useState(true);
    const [turbulenceIntensity, setTurbulenceIntensity] = useState(1); // 1 to 3

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

    const toggleWireframe = () => setWireframe((prev) => !prev);
    
    const cycleAnimationSpeed = () => {
        setAnimationSpeed((prev) => {
            if (prev === 0.5) return 1;
            if (prev === 1) return 2;
            return 0.5;
        });
    };

    const toggleRotation = () => setIsRotating((prev) => !prev);

    const toggleTurbulence = () => {
        setTurbulenceIntensity((prev) => (prev >= 3 ? 1 : prev + 1));
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
        const primary = selectedTheme.palette.primary?.main;
        const accent = selectedTheme.palette.accent?.main || selectedTheme.palette.secondary?.main || primary;
        const themeType = selectedTheme.palette.type || "light";
        const border = themeType === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
        const borderStrong = themeType === "dark" ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)";
        const aboutText =
            theme === "dark" ? secondary : theme === "custom" ? "#1f342d" : "#1f2636";

        document.body.style.backgroundColor = "transparent";
        document.body.style.color = text;
        document.body.style.transition = "color 0.5s ease";
        document.documentElement.style.setProperty("--bg-default", "transparent");
        document.documentElement.style.setProperty("--bg-paper", paper);
        document.documentElement.style.setProperty("--text-primary", text);
        document.documentElement.style.setProperty("--text-secondary", secondary);
        if (primary) document.documentElement.style.setProperty("--primary", primary);
        if (selectedTheme.palette.secondary?.main)
            document.documentElement.style.setProperty("--secondary", selectedTheme.palette.secondary.main);
        if (accent) document.documentElement.style.setProperty("--accent", accent);
        document.documentElement.style.setProperty("--border-subtle", border);
        document.documentElement.style.setProperty("--border-strong", borderStrong);
        document.documentElement.style.setProperty("--accent-soft", hexToRgba(accent, themeType === "dark" ? 0.18 : 0.14));
        document.documentElement.style.setProperty("--primary-soft", hexToRgba(primary, themeType === "dark" ? 0.18 : 0.14));
        document.documentElement.style.setProperty("--about-text", aboutText);
    }, [selectedTheme, theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
                shapeType,
                shapeSeed,
                toggleShape,
                themePalette: selectedTheme.palette,
                wireframe,
                toggleWireframe,
                animationSpeed,
                cycleAnimationSpeed,
                isRotating,
                toggleRotation,
                turbulenceIntensity,
                toggleTurbulence,
            }}
        >
            <MuiThemeProvider theme={selectedTheme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
