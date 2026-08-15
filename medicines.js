/* =========================================
   DoseCare
   Medicine Library Logic
========================================= */


/* =========================================
   MEDICINE DATABASE
========================================= */

const medicines = [

    {
        id: 1,

        name: "Paracetamol",

        class: "Analgesic · Antipyretic",

        condition: "Fever · Mild to moderate pain",

        route: "Oral · IV · Rectal",

        indications:
            "Used for fever and mild to moderate pain.",

        moa:
            "Reduces prostaglandin synthesis mainly in the central nervous system, producing analgesic and antipyretic effects.",

        pediatric:
            "Pediatric dosing should be calculated according to the child's weight and the specific formulation concentration."
    },


    {
        id: 2,

        name: "Ibuprofen",

        class: "NSAID · Analgesic",

        condition: "Fever · Pain · Inflammation",

        route: "Oral",

        indications:
            "Used for fever, pain and inflammatory conditions in appropriate pediatric patients.",

        moa:
            "Inhibits cyclooxygenase enzymes, reducing prostaglandin synthesis and producing analgesic, antipyretic and anti-inflammatory effects.",

        pediatric:
            "Use should consider age, hydration status, renal function and the clinical condition of the child."
    },


    {
        id: 3,

        name: "Amoxicillin",

        class: "Penicillin · Antibiotic",

        condition: "Bacterial infections",

        route: "Oral",

        indications:
            "Used for susceptible bacterial infections including selected respiratory, ear and other infections.",

        moa:
            "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins.",

        pediatric:
            "Pediatric dosing depends on weight, infection type, severity and formulation concentration."
    },


    {
        id: 4,

        name: "Azithromycin",

        class: "Macrolide · Antibiotic",

        condition: "Respiratory · Bacterial infections",

        route: "Oral · IV",

        indications:
            "Used for selected susceptible bacterial infections.",

        moa:
            "Binds to the bacterial 50S ribosomal subunit and inhibits protein synthesis.",

        pediatric:
            "Dose and duration depend on the infection and the child's weight."
    }

];


/* =========================================
   ELEMENTS
========================================= */

const medicineList =
    document.getElementById("medicine-list");

const medicineSearch =
    document.getElementById("medicine-search");

const classFilter =
    document.getElementById("class-filter");

const conditionFilter =
    document.getElementById("condition-filter");

const medicineCount =
    document.getElementById("medicine-count");

const emptyState =
    document.getElementById("empty-state");

const clearSearch =
    document.getElementById("clear-search");


/* =========================================
   STARS
========================================= */

const starsContainer =
    document.getElementById("stars");


const STAR_COUNT = 55;


if (starsContainer) {

    for (
        let i = 0;
        i < STAR_COUNT;
        i++
    ) {

        const star =
            document.createElement("span");

        star.classList.add("star");


        const size =
            Math.random();


        if (size < .25) {

            star.classList.add("large");

        }
        else if (size < .65) {

            star.classList.add("small");

        }


        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;


        star.style.animationDelay =
            `${Math.random() * 4}s`;


        starsContainer.appendChild(star);

    }

}


/* =========================================
   BUILD FILTERS
========================================= */

function buildFilters() {

    const classes =
        [
            ...new Set(
                medicines.map(
                    medicine => medicine.class
                )
            )
        ];


    const conditions =
        [
            ...new Set(
                medicines.map(
                    medicine => medicine.condition
                )
            )
        ];


    classes.forEach(
        medicineClass => {

            const option =
                document.createElement("option");

            option.value =
                medicineClass;

            option.textContent =
                medicineClass;

            classFilter.appendChild(option);

        }
    );


    conditions.forEach(
        condition => {

            const option =
                document.createElement("option");

            option.value =
                condition;

            option.textContent =
                condition;

            conditionFilter.appendChild(option);

        }
    );

}


/* =========================================
   RENDER MEDICINES
========================================= */

function renderMedicines(list) {

    medicineList.innerHTML = "";


    medicineCount.textContent =
        `${list.length} ${
            list.length === 1
                ? "medicine"
                : "medicines"
        }`;


    if (list.length === 0) {

        emptyState.classList.add("show");

        return;

    }


    emptyState.classList.remove("show");


    list.forEach(
        medicine => {

            const card =
                document.createElement("article");

            card.className =
                "medicine-card";


            card.innerHTML = `

                <div class="card-top">

                    <div class="medicine-icon">
                        +
                    </div>

                    <button
                        class="favorite-button"
                        data-id="${medicine.id}"
                        type="button"
                        aria-label="Add to favorites"
                    >
                        ☆
                    </button>

                </div>


                <span class="card-class">
                    ${medicine.class}
                </span>


                <h3>
                    ${medicine.name}
                </h3>


                <p class="card-condition">
                    ${medicine.condition}
                </p>


                <div class="card-bottom">

                    <button
                        class="view-info"
                        data-id="${medicine.id}"
                        type="button"
                    >

                        View information

                        <span>
                            →
                        </span>

                    </button>


                    <span class="route">
                        ${medicine.route}
                    </span>

                </div>

            `;


            medicineList.appendChild(card);

        }
    );


    attachCardEvents();

}


/* =========================================
   SEARCH + FILTER
========================================= */

function filterMedicines() {

    const search =
        medicineSearch.value
            .trim()
            .toLowerCase();


    const selectedClass =
        classFilter.value;


    const selectedCondition =
        conditionFilter.value;


    const filtered =
        medicines.filter(
            medicine => {

                const matchesSearch =

                    medicine.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    medicine.class
                        .toLowerCase()
                        .includes(search)

                    ||

                    medicine.condition
                        .toLowerCase()
                        .includes(search);


                const matchesClass =

                    selectedClass === "all"

                    ||

                    medicine.class === selectedClass;


                const matchesCondition =

                    selectedCondition === "all"

                    ||

                    medicine.condition === selectedCondition;


                return (
                    matchesSearch &&
                    matchesClass &&
                    matchesCondition
                );

            }
        );


    renderMedicines(filtered);


    clearSearch.style.display =
        search
            ? "block"
            : "none";

}


/* =========================================
   CARD EVENTS
========================================= */

function attachCardEvents() {


    document
        .querySelectorAll(".favorite-button")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        button.classList.toggle(
                            "active"
                        );


                        button.textContent =
                            button.classList.contains(
                                "active"
                            )
                                ? "★"
                                : "☆";

                    }
                );

            }
        );


    document
        .querySelectorAll(".view-info")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(
                                button.dataset.id
                            );


                        openMedicineModal(id);

                    }
                );

            }
        );

}


/* =========================================
   MODAL
========================================= */

const modal =
    document.getElementById(
        "medicine-modal"
    );

const closeModal =
    document.getElementById(
        "close-modal"
    );


function openMedicineModal(id) {

    const medicine =
        medicines.find(
            item => item.id === id
        );


    if (!medicine) return;


    document.getElementById(
        "modal-name"
    ).textContent =
        medicine.name;


    document.getElementById(
        "modal-class"
    ).textContent =
        medicine.class;


    document.getElementById(
        "modal-condition"
    ).textContent =
        medicine.condition;


    document.getElementById(
        "modal-route"
    ).textContent =
        medicine.route;


    document.getElementById(
        "modal-indications"
    ).textContent =
        medicine.indications;


    document.getElementById(
        "modal-moa"
    ).textContent =
        medicine.moa;


    document.getElementById(
        "modal-pediatric"
    ).textContent =
        medicine.pediatric;


    modal.classList.add("open");


    document.body.style.overflow =
        "hidden";

}


function closeMedicineModal() {

    modal.classList.remove("open");

    document.body.style.overflow =
        "";

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeMedicineModal
    );

}


const modalOverlay =
    document.querySelector(
        ".modal-overlay"
    );


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeMedicineModal
    );

}


/* =========================================
   BACK BUTTON
========================================= */

const backButton =
    document.getElementById(
        "back-button"
    );


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
   SEARCH EVENTS
========================================= */

medicineSearch.addEventListener(
    "input",
    filterMedicines
);


classFilter.addEventListener(
    "change",
    filterMedicines
);


conditionFilter.addEventListener(
    "change",
    filterMedicines
);


clearSearch.addEventListener(
    "click",
    () => {

        medicineSearch.value = "";

        filterMedicines();

        medicineSearch.focus();

    }
);


/* =========================================
   ESC → CLOSE MODAL
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMedicineModal();

        }

    }
);


/* =========================================
   INITIALIZE
========================================= */

buildFilters();

renderMedicines(medicines);
/* =========================================
   DOSECARE
   FAVORITES SYSTEM
========================================= */


/* =========================================
   GET SAVED FAVORITES
========================================= */

function getFavoriteMedicines() {

    const saved =
        localStorage.getItem(
            "dosecareFavorites"
        );


    if (!saved) {

        return [];

    }


    try {

        return JSON.parse(saved);

    } catch (error) {

        console.error(
            "Favorites loading error:",
            error
        );

        return [];

    }

}


/* =========================================
   SAVE FAVORITES
========================================= */

function saveFavoriteMedicines(
    favorites
) {

    localStorage.setItem(
        "dosecareFavorites",
        JSON.stringify(favorites)
    );

}


/* =========================================
   ADD / REMOVE FAVORITE
========================================= */

function toggleFavoriteMedicine(
    medicine
) {

    let favorites =
        getFavoriteMedicines();


    const existingIndex =
        favorites.findIndex(
            (item) =>
                item.name === medicine.name
        );


    /* Remove */

    if (existingIndex !== -1) {

        favorites.splice(
            existingIndex,
            1
        );

    }


    /* Add */

    else {

        favorites.push({

            name:
                medicine.name,

            class:
                medicine.class ||
                "Medicine"

        });

    }


    saveFavoriteMedicines(
        favorites
    );


    updateFavoriteButtons();

}


/* =========================================
   CHECK FAVORITE
========================================= */

function isFavoriteMedicine(
    medicineName
) {

    const favorites =
        getFavoriteMedicines();


    return favorites.some(
        (medicine) =>
            medicine.name === medicineName
    );

}


/* =========================================
   UPDATE STAR BUTTONS
========================================= */

function updateFavoriteButtons() {

    const buttons =
        document.querySelectorAll(
            ".favorite-button"
        );


    buttons.forEach(
        (button) => {

            const medicineName =
                button.dataset.medicine;


            if (
                isFavoriteMedicine(
                    medicineName
                )
            ) {

                button.classList.add(
                    "favorite-active"
                );

                button.textContent =
                    "★";

            }

            else {

                button.classList.remove(
                    "favorite-active"
                );

                button.textContent =
                    "☆";

            }

        }
    );

}


/* =========================================
   FAVORITE BUTTON EVENTS
========================================= */

function initializeFavoriteButtons() {

    const buttons =
        document.querySelectorAll(
            ".favorite-button"
        );


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();


                    const medicineName =
                        button.dataset.medicine;


                    const medicineClass =
                        button.dataset.class ||
                        "Medicine";


                    toggleFavoriteMedicine({

                        name:
                            medicineName,

                        class:
                            medicineClass

                    });

                }
            );

        }
    );


    updateFavoriteButtons();

}


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeFavoriteButtons();

    }
);
