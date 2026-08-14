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


/* =========================================
   WELCOME → HOME
========================================= */


const welcomeScreen =
    document.getElementById(
        "welcome-screen"
    );


const homeScreen =
    document.getElementById(
        "home-screen"
    );


const enterButton =
    document.getElementById(
        "enter-button"
    );


enterButton.addEventListener(
    "click",
    () => {

        welcomeScreen.classList.add(
            "hide"
        );


        homeScreen.classList.add(
            "show"
        );

    }
);


/* =========================================
   MENU
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


function openMenu() {

    sideMenu.classList.add(
        "open"
    );

    menuOverlay.classList.add(
        "open"
    );

}


function closeSideMenu() {

    sideMenu.classList.remove(
        "open"
    );

    menuOverlay.classList.remove(
        "open"
    );

}


menuButton.addEventListener(
    "click",
    openMenu
);


closeMenu.addEventListener(
    "click",
    closeSideMenu
);


menuOverlay.addEventListener(
    "click",
    closeSideMenu
);


/* =========================================
   USER NAME
========================================= */


/*
    Temporary user name.

    Later this value will come
    automatically from the login system.
*/


const currentUser = "User";


const userName =
    document.getElementById(
        "user-name"
    );


const profileInitials =
    document.getElementById(
        "profile-initials"
    );


userName.textContent =
    currentUser;


profileInitials.textContent =
    getInitials(currentUser);


/* =========================================
   GET INITIALS
========================================= */


function getInitials(name) {

    const words =
        name.trim().split(/\s+/);


    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();

}
