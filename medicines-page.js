/* =========================================
   DoseCare
   Medicine Library
========================================= */


/* =========================================
   DOM
========================================= */

const medicineGrid =
    document.getElementById(
        "medicine-grid"
    );


const searchInput =
    document.getElementById(
        "medicine-library-search"
    );


const classFilter =
    document.getElementById(
        "medicine-class-filter"
    );


const conditionFilter =
    document.getElementById(
        "medicine-condition-filter"
    );


const medicineCount =
    document.getElementById(
        "medicine-count"
    );


const emptyState =
    document.getElementById(
        "empty-state"
    );


const modal =
    document.getElementById(
        "medicine-modal"
    );


const modalOverlay =
    document.getElementById(
        "modal-overlay"
    );


const closeModal =
    document.getElementById(
        "close-modal"
    );


const detailsContent =
    document.getElementById(
        "medicine-details-content"
    );


const backButton =
    document.getElementById(
        "back-button"
    );


/* =========================================
   PARTICLES
========================================= */

const particles =
    document.getElementById(
        "particles"
    );


if (particles) {

    for (let i = 0; i < 25; i++) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "particle";


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.top =
            `${Math.random() * 100}%`;


        particle.style.animationDelay =
            `${Math.random() * 8}s`;


        particles.appendChild(
            particle
        );

    }

}


/* =========================================
   FILTER DATA
========================================= */

function initializeFilters() {

    const classes =
        new Set();


    const conditions =
        new Set();


    medicines.forEach(
        (medicine) => {

            if (medicine.drugClass) {

                medicine.drugClass.forEach(
                    (drugClass) => {

                        classes.add(
                            drugClass
                        );

                    }
                );

            }


            if (medicine.conditions) {

                medicine.conditions.forEach(
                    (condition) => {

                        conditions.add(
                            condition
                        );

                    }
                );

            }

        }
    );


    Array.from(classes)
        .sort()
        .forEach(
            (drugClass) => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    drugClass;


                option.textContent =
                    drugClass;


                classFilter.appendChild(
                    option
                );

            }
        );


    Array.from(conditions)
        .sort()
        .forEach(
            (condition) => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    condition;


                option.textContent =
                    formatName(
                        condition
                    );


                conditionFilter.appendChild(
                    option
                );

            }
        );

}


/* =========================================
   FORMAT NAME
========================================= */

function formatName(
    text
) {

    return text
        .split(" ")
        .map(
            word =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");

}


/* =========================================
   FILTER MEDICINES
========================================= */

function getFilteredMedicines() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    const selectedClass =
        classFilter.value;


    const selectedCondition =
        conditionFilter.value;


    return medicines.filter(
        (medicine) => {

            const name =
                medicine.genericName
                    .toLowerCase();


            const brands =
                medicine.brandNames || [];


            const brandMatch =
                brands.some(
                    brand =>
                        brand
                            .toLowerCase()
                            .includes(search)
                );


            const matchesSearch =
                !search ||
                name.includes(search) ||
                brandMatch;


            const matchesClass =
                !selectedClass ||
                (
                    medicine.drugClass &&
                    medicine.drugClass.includes(
                        selectedClass
                    )
                );


            const matchesCondition =
                !selectedCondition ||
                (
                    medicine.conditions &&
                    medicine.conditions.includes(
                        selectedCondition
                    )
                );


            return (
                matchesSearch &&
                matchesClass &&
                matchesCondition
            );

        }
    );

}


/* =========================================
   RENDER MEDICINES
========================================= */

function renderMedicines() {

    const filtered =
        getFilteredMedicines();


    medicineGrid.innerHTML = "";


    medicineCount.textContent =
        `${filtered.length} medicine${
            filtered.length === 1
                ? ""
                : "s"
        }`;


    if (!filtered.length) {

        emptyState.style.display =
            "block";

        return;

    }


    emptyState.style.display =
        "none";


    filtered.forEach(
        (medicine) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "medicine-card";


            const classes =
                (
                    medicine.drugClass || []
                )
                .slice(0, 2)
                .join(" · ");


            card.innerHTML = `

                <div class="medicine-card-top">

                    <div class="medicine-symbol">
                        +
                    </div>

                    <span class="medicine-category">
                        ${classes}
                    </span>

                </div>


                <h3>
                    ${medicine.genericName}
                </h3>


                <p class="medicine-indication">

                    ${
                        medicine.indications &&
                        medicine.indications.length
                            ? medicine.indications
                                .slice(0, 2)
                                .join(" · ")
                            : "Medicine information"
                    }

                </p>


                <button
                    class="view-medicine"
                    type="button"
                >
                    View information
                    <span>→</span>
                </button>

            `;


            card.querySelector(
                ".view-medicine"
            ).addEventListener(
                "click",
                () => {

                    openMedicineDetails(
                        medicine
                    );

                }
            );


            medicineGrid.appendChild(
                card
            );

        }
    );

}


/* =========================================
   OPEN MEDICINE DETAILS
========================================= */

function openMedicineDetails(
    medicine
) {

    detailsContent.innerHTML = `

        <div class="details-header">

            <span class="section-label">
                MEDICINE INFORMATION
            </span>

            <h2>
                ${medicine.genericName}
            </h2>

            <p>
                ${
                    medicine.drugClass
                        ? medicine.drugClass.join(" · ")
                        : ""
                }
            </p>

        </div>


        <div class="details-section">

            <h3>
                Mechanism of Action
            </h3>

            <p>
                ${
                    medicine.mechanismOfAction ||
                    "Information not available yet."
                }
            </p>

        </div>


        <div class="details-section">

            <h3>
                Indications
            </h3>

            <ul>

                ${
                    (medicine.indications || [])
                    .map(
                        item =>
                            `<li>${item}</li>`
                    )
                    .join("")
                }

            </ul>

        </div>


        <div class="details-section">

            <h3>
                Dosage Forms
            </h3>

            <p>
                ${
                    medicine.dosageForms &&
                    medicine.dosageForms.length
                        ? medicine.dosageForms.join(" · ")
                        : "Not available yet."
                }
            </p>

        </div>


        <div class="details-section">

            <h3>
                Routes
            </h3>

            <p>
                ${
                    medicine.routes &&
                    medicine.routes.length
                        ? medicine.routes.join(" · ")
                        : "Not available yet."
                }
            </p>

        </div>


        <div class="details-section">

            <h3>
                Contraindications
            </h3>

            <ul>

                ${
                    (medicine.contraindications || [])
                    .map(
                        item =>
                            `<li>${item}</li>`
                    )
                    .join("")
                }

            </ul>

        </div>


        <div class="details-section">

            <h3>
                Precautions
            </h3>

            <ul>

                ${
                    (medicine.precautions || [])
                    .map(
                        item =>
                            `<li>${item}</li>`
                    )
                    .join("")
                }

            </ul>

        </div>


        <div class="details-section">

            <h3>
                Side Effects
            </h3>

            <ul>

                ${
                    (medicine.sideEffects || [])
                    .map(
                        item =>
                            `<li>${item}</li>`
                    )
                    .join("")
                }

            </ul>

        </div>


        <div class="details-section">

            <h3>
                Drug Interactions
            </h3>

            <ul>

                ${
                    (medicine.interactions || [])
                    .map(
                        item =>
                            `<li>${item}</li>`
                    )
                    .join("")
                }

            </ul>

        </div>


        <div class="details-section">

            <h3>
                Pediatric Notes
            </h3>

            <p>
                ${
                    medicine.pediatricNotes ||
                    "Pediatric information will be added after verification."
                }
            </p>

        </div>


        <div class="details-section reference-section">

            <h3>
                References
            </h3>

            <p>
                ${
                    medicine.references &&
                    medicine.references.length
                        ? medicine.references.join(" · ")
                        : "Verified references will be added."
                }
            </p>

        </div>

    `;


    modal.classList.add(
        "open"
    );

}


/* =========================================
   CLOSE MODAL
========================================= */

function closeMedicineModal() {

    modal.classList.remove(
        "open"
    );

}


closeModal.addEventListener(
    "click",
    closeMedicineModal
);


modalOverlay.addEventListener(
    "click",
    closeMedicineModal
);


/* =========================================
   SEARCH & FILTER EVENTS
========================================= */

searchInput.addEventListener(
    "input",
    renderMedicines
);


classFilter.addEventListener(
    "change",
    renderMedicines
);


conditionFilter.addEventListener(
    "change",
    renderMedicines
);


/* =========================================
   BACK TO HOME
========================================= */

backButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "index.html";

    }
);


/* =========================================
   INITIALIZE
========================================= */

initializeFilters();

renderMedicines();
