/* =========================================
   DoseCare
   GLOBAL THEME
========================================= */

const THEME_STORAGE_KEY = "dosecareTheme";


/* =========================================
   GET SAVED THEME
========================================= */

function getSavedTheme() {

    return (
        localStorage.getItem(
            THEME_STORAGE_KEY
        ) || "dark"
    );

}


/* =========================================
   APPLY THEME
========================================= */

function applyGlobalTheme(theme) {

    const selectedTheme =
        theme === "light"
            ? "light"
            : "dark";

    document.body.classList.toggle(
        "light-mode",
        selectedTheme === "light"
    );

}


/* =========================================
   SAVE THEME
========================================= */

function saveGlobalTheme(theme) {

    const selectedTheme =
        theme === "light"
            ? "light"
            : "dark";

    localStorage.setItem(
        THEME_STORAGE_KEY,
        selectedTheme
    );

    applyGlobalTheme(
        selectedTheme
    );

}


/* =========================================
   INITIALIZE
========================================= */

applyGlobalTheme(
    getSavedTheme()
);
