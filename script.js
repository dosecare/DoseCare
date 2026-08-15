/* =========================================
   DoseCare
   Main Application Logic
========================================= */


/* =========================================
   PARTICLES
========================================= */

const particlesContainer =
    document.getElementById("particles");

const PARTICLE_COUNT = 32;

if (particlesContainer) {

    for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.classList.add("particle");

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
========================================= */

const welcomeScreen =
    document.getElementById(
        "welcome-screen"
    );

const homeScreen =
    document.getElementById(
        "home-screen"
    );


setTimeout(() => {

    if (welcomeScreen) {

        welcomeScreen.classList.add(
            "hide"
        );

    }

    if (homeScreen) {

        homeScreen.classList.add(
            "show"
        );

    }

}, 4000);


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

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

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


/* =========================================
   MEDICINES
========================================= */

const medicinesMenuButton =
    document.getElementById(
        "medicines-menu-button"
    );


if (medicinesMenuButton) {

    medicinesMenuButton.addEventListener(
        "click",
        () => {

            closeSideMenu();

            window.location.href =
                "medicines.html";

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
