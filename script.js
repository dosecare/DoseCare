/* =========================================
   DoseCare
   Main Application Logic
========================================= */


/* =========================================
   PARTICLES / STARS
========================================= */

const particlesContainer =
    document.getElementById("particles");

const PARTICLE_COUNT = 35;


if (particlesContainer) {

    for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.classList.add(
            "particle"
        );

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;

        const size =
            Math.random() * 2.5 + 1.5;

        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;

        const movementDuration =
            Math.random() * 8 + 8;

        const glowDuration =
            Math.random() * 3 + 2;

        particle.style.animationDuration =
            `${movementDuration}s, ${glowDuration}s`;

        const movementDelay =
            Math.random() * 8;

        const glowDelay =
            Math.random() * 3;

        particle.style.animationDelay =
            `${movementDelay}s, ${glowDelay}s`;

        particlesContainer.appendChild(
            particle
        );

    }

}


/* =========================================
   SPLASH SCREEN → HOME
   Show welcome only on first visit
========================================= */

const welcomeScreen =
    document.getElementById(
        "welcome-screen"
    );


const homeScreen =
    document.getElementById(
        "home-screen"
    );


const WELCOME_SHOWN_KEY =
    "dosecareWelcomeShown";


if (
    welcomeScreen &&
    homeScreen
) {

    const welcomeAlreadyShown =
        sessionStorage.getItem(
            WELCOME_SHOWN_KEY
        );


    if (
        welcomeAlreadyShown === "true"
    ) {

        welcomeScreen.classList.add(
            "hide"
        );

        homeScreen.classList.add(
            "show"
        );

    }
    else {

        setTimeout(() => {

            welcomeScreen.classList.add(
                "hide"
            );

            homeScreen.classList.add(
                "show"
            );

            sessionStorage.setItem(
                WELCOME_SHOWN_KEY,
                "true"
            );

        }, 2000);

    }

}


/* =========================================
   MENU ELEMENTS
========================================= */

const menuButton =
    document.getElementById(
        "menu-button"
    );


const sideMenu =
    document.getElementById(
        "side-menu"
    );


const closeMenu =
    document.getElementById(
        "close-menu"
    );


const menuOverlay =
    document.getElementById(
        "menu-overlay"
    );


/* =========================================
   OPEN MENU
========================================= */

function openMenu() {

    if (sideMenu) {

        sideMenu.classList.add(
            "open"
        );

    }


    if (menuOverlay) {

        menuOverlay.classList.add(
            "open"
        );

    }

}


/* =========================================
   CLOSE MENU
========================================= */

function closeSideMenu() {

    if (sideMenu) {

        sideMenu.classList.remove(
            "open"
        );

    }


    if (menuOverlay) {

        menuOverlay.classList.remove(
            "open"
        );

    }

}


/* =========================================
   MENU EVENTS
========================================= */

if (menuButton) {

    menuButton.addEventListener(
        "click",
        openMenu
    );

}


if (closeMenu) {

    closeMenu.addEventListener(
        "click",
        closeSideMenu
    );

}


if (menuOverlay) {

    menuOverlay.addEventListener(
        "click",
        closeSideMenu
    );

}


/* =========================================
   HOME
========================================= */

const homeMenuButton =
    document.getElementById(
        "home-menu-button"
    );


if (homeMenuButton) {

    homeMenuButton.addEventListener(
        "click",
        () => {

            closeSideMenu();

            window.location.href =
                "index.html";

        }
    );

}


/* =========================================
   DOSE CALCULATOR
========================================= */

const calculatorMenuButton =
    document.getElementById(
        "calculator-menu-button"
    );


const startCalculator =
    document.getElementById(
        "start-calculator"
    );


const quickCalculator =
    document.getElementById(
        "quick-calculator"
    );


function openCalculator() {

    window.location.href =
        "calculator.html";

}


if (calculatorMenuButton) {

    calculatorMenuButton.addEventListener(
        "click",
        () => {

            closeSideMenu();

            openCalculator();

        }
    );

}


if (startCalculator) {

    startCalculator.addEventListener(
        "click",
        openCalculator
    );

}


if (quickCalculator) {

    quickCalculator.addEventListener(
        "click",
        openCalculator
    );

}


/* =========================================
   MEDICINES
========================================= */

const medicinesMenuButton =
    document.getElementById(
        "medicines-menu-button"
    );


const quickMedicines =
    document.getElementById(
        "quick-medicines"
    );


function openMedicines() {

    window.location.href =
        "medicines.html";

}


if (medicinesMenuButton) {

    medicinesMenuButton.addEventListener(
        "click",
        () => {

            closeSideMenu();

            openMedicines();

        }
    );

}


if (quickMedicines) {

    quickMedicines.addEventListener(
        "click",
        openMedicines
    );

}


/* =========================================
   FAVORITES
========================================= */

const favoritesMenuButton =
    document.getElementById(
        "favorites-menu-button"
    );


function openFavorites() {

    window.location.href =
        "favorites.html";

}


if (favoritesMenuButton) {

    favoritesMenuButton.addEventListener(
        "click",
        () => {

            closeSideMenu();

            openFavorites();

        }
    );

}


/* =========================================
   HISTORY
========================================= */

const historyMenuButton =
    document.getElementById(
        "history-menu-button"
    );


const quickHistory =
    document.getElementById(
        "quick-history"
    );


function openHistory() {

    window.location.href =
        "history.html";

}


if (historyMenuButton) {

    historyMenuButton.addEventListener(
        "click",
        () => {

            closeSideMenu();

            openHistory();

        }
    );

}


if (quickHistory) {

    quickHistory.addEventListener(
        "click",
        openHistory
    );

}


/* =========================================
   ASK / HELP
========================================= */

const helpMenuButton =
    document.getElementById(
        "help-menu-button"
    );


function openAsk() {

    window.location.href =
        "ask.html";

}


if (helpMenuButton) {

    helpMenuButton.addEventListener(
        "click",
        () => {

            closeSideMenu();

            openAsk();

        }
    );

}


/* =========================================
   REFERENCES
========================================= */

const referencesMenuButton =
    document.getElementById(
        "references-menu-button"
    );


function openReferences() {

    window.location.href =
        "references.html";

}


if (referencesMenuButton) {

    referencesMenuButton.addEventListener(
        "click",
        () => {

            closeSideMenu();

            openReferences();

        }
    );

}


/* =========================================
   SETTINGS
========================================= */

const settingsMenuButton =
    document.getElementById(
        "settings-menu-button"
    );


function openSettings() {

    window.location.href =
        "settings.html";

}


if (settingsMenuButton) {

    settingsMenuButton.addEventListener(
        "click",
        () => {

            closeSideMenu();

            openSettings();

        }
    );

}


/* =========================================
   MENU ACTIVE STATE
========================================= */

const menuItems =
    document.querySelectorAll(
        ".menu-item"
    );


menuItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            () => {

                menuItems.forEach(
                    (otherItem) => {

                        otherItem.classList.remove(
                            "active"
                        );

                    }
                );

                item.classList.add(
                    "active"
                );

            }
        );

    }
);
