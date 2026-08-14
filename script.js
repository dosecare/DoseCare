/* =========================================
   DoseCare
   Animated Background Particles
========================================= */


/* ---------- Particle Container ---------- */

const particlesContainer = document.getElementById("particles");


/* ---------- Settings ---------- */

const PARTICLE_COUNT = 32;


/* ---------- Create Particles ---------- */

for (let i = 0; i < PARTICLE_COUNT; i++) {

    const particle = document.createElement("span");

    particle.classList.add("particle");


    /* Random position */

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;


    /* Random size */

    const size = Math.random() * 2.5 + 1.5;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;


    /* Random movement speed */

    const movementDuration =
        Math.random() * 8 + 8;

    const glowDuration =
        Math.random() * 3 + 2;


    particle.style.animationDuration =
        `${movementDuration}s, ${glowDuration}s`;


    /* Random animation delay */

    const movementDelay =
        Math.random() * 8;

    const glowDelay =
        Math.random() * 3;


    particle.style.animationDelay =
        `${movementDelay}s, ${glowDelay}s`;


    /* Add particle */

    particlesContainer.appendChild(particle);
}
/* =========================================
   DoseCare
   Welcome → Home
========================================= */


const welcomeScreen =
    document.getElementById("welcome-screen");

const homeScreen =
    document.getElementById("home-screen");

const enterButton =
    document.getElementById("enter-button");


/* ---------- Enter DoseCare ---------- */

enterButton.addEventListener("click", () => {

    welcomeScreen.classList.add("hide");

    homeScreen.classList.add("show");

});
