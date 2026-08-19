/* =========================================
   DoseCare
   SETTINGS PAGE LOGIC
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const backButton =
    document.getElementById("back-button");

const themeToggle =
    document.getElementById("theme-toggle");

const themeStatus =
    document.getElementById("theme-status");

const themeIcon =
    document.querySelector(".theme-toggle-icon");


/* =========================================
   THEME STORAGE
========================================= */

const THEME_STORAGE_KEY = "dosecareTheme";


/* =========================================
   GET SAVED THEME
========================================= */

function getSavedTheme() {

    const savedTheme =
        localStorage.getItem(
            THEME_STORAGE_KEY
        );

    /*
       Dark Mode is the default.
       If nothing is saved, use dark.
    */

    return savedTheme === "light"
        ? "light"
        : "dark";
}


/* =========================================
   SAVE THEME
========================================= */

function saveTheme(theme) {

    localStorage.setItem(
        THEME_STORAGE_KEY,
        theme
    );

}


/* =========================================
   APPLY THEME
========================================= */

function applyTheme(theme) {

    const isLight =
        theme === "light";


    /* -------------------------------------
       Body
    ------------------------------------- */

    document.body.classList.toggle(
        "light-mode",
        isLight
    );


    /* -------------------------------------
       HTML
    ------------------------------------- */

    document.documentElement.classList.toggle(
        "light-mode",
        isLight
    );


    /* -------------------------------------
       Toggle
    ------------------------------------- */

    if (themeToggle) {

        themeToggle.classList.toggle(
            "light",
            isLight
        );

        themeToggle.setAttribute(
            "aria-pressed",
            String(isLight)
        );

    }


    /* -------------------------------------
       Status
    ------------------------------------- */

    if (themeStatus) {

        themeStatus.textContent =
            isLight
                ? "Light Mode"
                : "Dark Mode";

    }


    /* -------------------------------------
       Icon
    ------------------------------------- */

    if (themeIcon) {

        themeIcon.textContent =
            isLight
                ? "☀"
                : "☾";

    }

}


/* =========================================
   THEME TOGGLE
========================================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const currentTheme =
                getSavedTheme();

            const newTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";


            saveTheme(newTheme);

            applyTheme(newTheme);

        }
    );

}


/* =========================================
   BACK TO HOME
========================================= */

if (backButton) {

    backButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "index.html";

        }
    );

}


/* =========================================
   INITIALIZE
========================================= */

applyTheme(
    getSavedTheme()
);
