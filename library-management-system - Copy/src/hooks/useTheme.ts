import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "adminHMD.colorTheme";
const TRANSITION_CLASS = "theme-transitioning";
const TRANSITION_DURATION_MS = 1000;

function getPreferredTheme(): Theme {
    try {
        const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (saved === "dark" || saved === "light") {
            return saved;
        }
    } catch {
        // localStorage unavailable (e.g. private browsing) - fall through
    }

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }

    return "light";
}

/**
 * Manages the app's color theme (light/dark).
 * - Reads the saved preference (or OS preference) on first load
 * - Applies data-theme / data-bs-theme attributes to <html> so the
 *   existing CSS in public/css/style.css picks it up
 * - Persists the choice to localStorage
 */
export function useTheme() {
    const [theme, setTheme] = useState<Theme>(getPreferredTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.setAttribute("data-bs-theme", theme);

        try {
            window.localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch {
            // ignore if storage isn't available
        }
    }, [theme]);

    function toggleTheme() {
        const root = document.documentElement;
        const prefersReducedMotion =
            window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!prefersReducedMotion) {
            root.classList.add(TRANSITION_CLASS);
            window.setTimeout(() => {
                root.classList.remove(TRANSITION_CLASS);
            }, TRANSITION_DURATION_MS);
        }
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }

    return { theme, toggleTheme };
}