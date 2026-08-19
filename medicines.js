/* =========================================
   DoseCare
   Unified Medicine Database
========================================= */


/* =========================================
   MEDICINE DATABASE
========================================= */

const medicines = [

    /* =====================================
       PARACETAMOL
    ===================================== */

    {
        id: "paracetamol",

        genericName: "Paracetamol",

        name: "Paracetamol",

        brandNames: [
            "Panadol",
            "Calpol",
            "Tylenol"
        ],

        drugClass: [
            "Analgesic",
            "Antipyretic"
        ],

        class:
            "Analgesic · Antipyretic",

        conditions: [
            "fever",
            "mild to moderate pain"
        ],

        condition:
            "Fever · Mild to moderate pain",

        route:
            "Oral · IV · Rectal",

        indications:
            "Used for fever and mild to moderate pain.",

        moa:
            "Reduces prostaglandin synthesis mainly in the central nervous system, producing analgesic and antipyretic effects.",

        pediatric:
            "Pediatric dosing should be calculated according to the child's weight and the specific formulation concentration.",

        dosing: {

            type:
                "mg_per_kg_per_dose",

            minDose:
                10,

            maxDose:
                15,

            frequency:
                "every 4–6 hours",

            maxDailyDose:
                60,

            route:
                "oral",

            minimumAgeMonths:
                0,

            configured:
                true

        },

        indicationSpecific:
            true,

        notes:
            "Verify the formulation, dosing interval, maximum daily dose, and approved pediatric dosing guidance before administration."

    },


    /* =====================================
       IBUPROFEN
    ===================================== */

    {
        id: "ibuprofen",

        genericName: "Ibuprofen",

        name: "Ibuprofen",

        brandNames: [
            "Brufen",
            "Nurofen",
            "Advil"
        ],

        drugClass: [
            "NSAID",
            "Analgesic",
            "Antipyretic"
        ],

        class:
            "NSAID · Analgesic",

        conditions: [
            "fever",
            "pain",
            "inflammation"
        ],

        condition:
            "Fever · Pain · Inflammation",

        route:
            "Oral",

        indications:
            "Used for fever, pain and inflammatory conditions in appropriate pediatric patients.",

        moa:
            "Inhibits cyclooxygenase enzymes, reducing prostaglandin synthesis and producing analgesic, antipyretic and anti-inflammatory effects.",

        pediatric:
            "Use should consider age, hydration status, renal function and the clinical condition of the child.",

        dosing: {

            type:
                "mg_per_kg_per_dose",

            minDose:
                5,

            maxDose:
                10,

            frequency:
                "every 6–8 hours",

            maxDailyDose:
                30,

            route:
                "oral",

            minimumAgeMonths:
                3,

            configured:
                true

        },

        indicationSpecific:
            true,

        notes:
            "Verify age restrictions, hydration status, renal function, formulation, and approved pediatric dosing guidance before administration."

    },


    /* =====================================
       AMOXICILLIN
    ===================================== */

    {
        id: "amoxicillin",

        genericName: "Amoxicillin",

        name: "Amoxicillin",

        brandNames: [
            "Amoxil"
        ],

        drugClass: [
            "Penicillin",
            "Antibiotic"
        ],

        class:
            "Penicillin · Antibiotic",

        conditions: [
            "bacterial infections",
            "respiratory infections",
            "otitis media"
        ],

        condition:
            "Bacterial infections",

        route:
            "Oral",

        indications:
            "Used for susceptible bacterial infections including selected respiratory, ear and other infections.",

        moa:
            "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins.",

        pediatric:
            "Pediatric dosing depends on weight, infection type, severity and formulation concentration.",

        dosing: {

            type:
                "mg_per_kg_per_day",

            regimens: {

                "respiratory infections": {

                    minDose:
                        45,

                    maxDose:
                        45,

                    frequency:
                        2,

                    maxPerDose:
                        2000

                },

                "otitis media": {

                    minDose:
                        80,

                    maxDose:
                        90,

                    frequency:
                        2,

                    maxPerDose:
                        2000

                }

            },

            route:
                "oral",

            configured:
                true

        },

        indicationSpecific:
            true,

        notes:
            "Pediatric dosing varies according to infection and clinical indication. Verify the indication-specific regimen before use."

    },


    /* =====================================
       AZITHROMYCIN
    ===================================== */

    {
        id: "azithromycin",

        genericName: "Azithromycin",

        name: "Azithromycin",

        brandNames: [
            "Zithromax",
            "Sumamed"
        ],

        drugClass: [
            "Macrolide",
            "Antibiotic"
        ],

        class:
            "Macrolide · Antibiotic",

        conditions: [
            "respiratory infections",
            "bacterial infections"
        ],

        condition:
            "Respiratory · Bacterial infections",

        route:
            "Oral · IV",

        indications:
            "Used for selected susceptible bacterial infections.",

        moa:
            "Binds to the bacterial 50S ribosomal subunit and inhibits protein synthesis.",

        pediatric:
            "Dose and duration depend on the infection and the child's weight.",

        dosing: {

            type:
                "condition_based",

            regimens: {},

            route:
                "oral",

            configured:
                false

        },

        indicationSpecific:
            true,

        notes:
            "Indication-specific pediatric dosing has not yet been configured in DoseCare."

    }

];


/* =========================================
   MEDICINE HELPER FUNCTIONS
========================================= */


/* =========================================
   GET MEDICINE BY ID
========================================= */

function getMedicineById(id) {

    if (!id) {
        return null;
    }

    return medicines.find(
        medicine =>
            String(medicine.id) ===
            String(id)
    ) || null;

}


/* =========================================
   GET MEDICINE BY GENERIC NAME
========================================= */

function getMedicineByName(name) {

    if (!name) {
        return null;
    }

    const search =
        String(name)
            .trim()
            .toLowerCase();

    return medicines.find(
        medicine =>
            String(
                medicine.genericName || ""
            ).toLowerCase() === search
    ) || null;

}


/* =========================================
   GET MEDICINE NAME
========================================= */

function getMedicineName(medicine) {

    if (!medicine) {
        return "Medicine";
    }

    return (
        medicine.genericName ||
        medicine.name ||
        "Medicine"
    );

}


/* =========================================
   SEARCH MEDICINES
========================================= */

function searchMedicines(searchTerm) {

    if (!searchTerm) {
        return medicines;
    }

    const search =
        String(searchTerm)
            .trim()
            .toLowerCase();

    return medicines.filter(
        medicine => {

            const genericName =
                String(
                    medicine.genericName || ""
                ).toLowerCase();

            const brands =
                Array.isArray(
                    medicine.brandNames
                )
                    ? medicine.brandNames
                    : [];

            const drugClass =
                Array.isArray(
                    medicine.drugClass
                )
                    ? medicine.drugClass.join(" ")
                    : String(
                        medicine.drugClass || ""
                    );

            const className =
                String(
                    medicine.class || ""
                ).toLowerCase();

            const condition =
                String(
                    medicine.condition || ""
                ).toLowerCase();

            const conditions =
                Array.isArray(
                    medicine.conditions
                )
                    ? medicine.conditions.join(" ")
                    : "";

            const brandMatch =
                brands.some(
                    brand =>
                        String(brand)
                            .toLowerCase()
                            .includes(search)
                );

            return (
                genericName.includes(search) ||
                brandMatch ||
                drugClass
                    .toLowerCase()
                    .includes(search) ||
                className.includes(search) ||
                condition.includes(search) ||
                conditions.includes(search)
            );

        }
    );

}


/* =========================================
   GET ALL CONDITIONS
========================================= */

function getAllMedicineConditions() {

    const conditionSet =
        new Set();

    medicines.forEach(
        medicine => {

            if (
                !Array.isArray(
                    medicine.conditions
                )
            ) {
                return;
            }

            medicine.conditions.forEach(
                condition => {

                    if (condition) {

                        conditionSet.add(
                            condition
                        );

                    }

                }
            );

        }
    );

    return Array.from(
        conditionSet
    ).sort();

}


/* =========================================
   GET MEDICINES BY CONDITION
========================================= */

function getMedicinesByCondition(
    condition
) {

    if (!condition) {
        return medicines;
    }

    return medicines.filter(
        medicine => {

            return (
                Array.isArray(
                    medicine.conditions
                ) &&
                medicine.conditions.includes(
                    condition
                )
            );

        }
    );

}


/* =========================================
   GET DOSING CONFIGURATION
========================================= */

function getMedicineDosing(id) {

    const medicine =
        getMedicineById(id);

    if (!medicine) {
        return null;
    }

    return medicine.dosing || null;

}


/* =========================================
   CHECK IF DOSING IS CONFIGURED
========================================= */

function isMedicineDosingConfigured(id) {

    const dosing =
        getMedicineDosing(id);

    return Boolean(
        dosing &&
        dosing.configured === true
    );

}


/* =========================================
   FAVORITES STORAGE
========================================= */

const FAVORITES_STORAGE_KEY =
    "dosecareFavorites";


/* =========================================
   GET FAVORITES
========================================= */

function getFavoriteMedicines() {

    const saved =
        localStorage.getItem(
            FAVORITES_STORAGE_KEY
        );

    if (!saved) {
        return [];
    }

    try {

        const favorites =
            JSON.parse(saved);

        return Array.isArray(
            favorites
        )
            ? favorites
            : [];

    }
    catch (error) {

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

    if (!Array.isArray(favorites)) {
        return;
    }

    localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites)
    );

}


/* =========================================
   CHECK FAVORITE
========================================= */

function isFavoriteMedicine(id) {

    const favorites =
        getFavoriteMedicines();

    return favorites.some(
        medicine =>
            String(medicine.id) ===
            String(id)
    );

}


/* =========================================
   TOGGLE FAVORITE
========================================= */

function toggleFavoriteMedicine(id) {

    const medicine =
        getMedicineById(id);

    if (!medicine) {
        return false;
    }

    let favorites =
        getFavoriteMedicines();

    const existingIndex =
        favorites.findIndex(
            item =>
                String(item.id) ===
                String(id)
        );


    /* -------------------------------------
       REMOVE FROM FAVORITES
    ------------------------------------- */

    if (existingIndex !== -1) {

        favorites.splice(
            existingIndex,
            1
        );

        saveFavoriteMedicines(
            favorites
        );

        return false;

    }


    /* -------------------------------------
       ADD TO FAVORITES
    ------------------------------------- */

    favorites.push({

        id:
            medicine.id,

        name:
            medicine.genericName,

        class:
            medicine.class,

        condition:
            medicine.condition

    });


    saveFavoriteMedicines(
        favorites
    );

    return true;

}


/* =========================================
   UPDATE FAVORITE BUTTONS
========================================= */

function updateFavoriteButtons() {

    document
        .querySelectorAll(
            ".favorite-button"
        )
        .forEach(
            button => {

                const id =
                    button.dataset.id;

                const active =
                    isFavoriteMedicine(id);

                button.classList.toggle(
                    "active",
                    active
                );

                button.textContent =
                    active
                        ? "★"
                        : "☆";

                button.setAttribute(
                    "aria-label",
                    active
                        ? "Remove from favorites"
                        : "Add to favorites"
                );

            }
        );

}


/* =========================================
   INITIALIZE FAVORITE BUTTONS
========================================= */

function initializeFavoriteButtons() {

    document
        .querySelectorAll(
            ".favorite-button"
        )
        .forEach(
            button => {

                if (
                    button.dataset.favoriteReady ===
                    "true"
                ) {
                    return;
                }

                button.dataset.favoriteReady =
                    "true";

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        event.stopPropagation();

                        const id =
                            button.dataset.id;

                        toggleFavoriteMedicine(
                            id
                        );

                        updateFavoriteButtons();

                    }
                );

            }
        );

    updateFavoriteButtons();

}


/* =========================================
   MEDICINE DATABASE VALIDATION
========================================= */

function validateMedicineDatabase() {

    const requiredFields = [

        "id",
        "genericName",
        "name",
        "brandNames",
        "drugClass",
        "class",
        "conditions",
        "condition",
        "route",
        "indications",
        "moa",
        "pediatric",
        "dosing"

    ];


    medicines.forEach(
        medicine => {

            requiredFields.forEach(
                field => {

                    if (
                        medicine[field] ===
                        undefined
                    ) {

                        console.warn(
                            `Medicine "${medicine.genericName}" is missing "${field}".`
                        );

                    }

                }
            );


            /* ---------------------------------
               Validate CONDITIONS
            --------------------------------- */

            if (
                !Array.isArray(
                    medicine.conditions
                )
            ) {

                console.warn(
                    `Medicine "${medicine.genericName}" has invalid conditions data.`
                );

            }


            /* ---------------------------------
               Validate BRAND NAMES
            --------------------------------- */

            if (
                !Array.isArray(
                    medicine.brandNames
                )
            ) {

                console.warn(
                    `Medicine "${medicine.genericName}" has invalid brandNames data.`
                );

            }


            /* ---------------------------------
               Validate DRUG CLASS
            --------------------------------- */

            if (
                !Array.isArray(
                    medicine.drugClass
                )
            ) {

                console.warn(
                    `Medicine "${medicine.genericName}" has invalid drugClass data.`
                );

            }


            /* ---------------------------------
               Validate DOSING
            --------------------------------- */

            if (
                !medicine.dosing ||
                typeof medicine.dosing !==
                "object"
            ) {

                console.warn(
                    `Medicine "${medicine.genericName}" has an invalid dosing configuration.`
                );

                return;

            }


            /* ---------------------------------
               CONFIGURATION STATUS
            --------------------------------- */

            if (
                medicine.dosing.configured !==
                true
            ) {

                console.warn(
                    `Medicine "${medicine.genericName}" is not configured for dose calculation.`
                );

            }

        }
    );

}


/* =========================================
   INITIALIZE DATABASE
========================================= */

validateMedicineDatabase();
/* =========================================
   MEDICINE LIBRARY PAGE
   RENDER + SEARCH + FILTERS + BACK
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const medicineList =
    document.getElementById("medicine-list");

const medicineSearch =
    document.getElementById("medicine-search");

const clearSearch =
    document.getElementById("clear-search");

const classFilter =
    document.getElementById("class-filter");

const conditionFilter =
    document.getElementById("condition-filter");

const medicineCount =
    document.getElementById("medicine-count");

const emptyState =
    document.getElementById("empty-state");

const backButton =
    document.getElementById("back-button");

const medicineModal =
    document.getElementById("medicine-modal");

const closeModal =
    document.getElementById("close-modal");


/* =========================================
   RENDER MEDICINES
========================================= */

function renderMedicines(list) {

    if (!medicineList) {
        return;
    }

    medicineList.innerHTML = "";


    /* -------------------------------------
       EMPTY STATE
    ------------------------------------- */

    if (!list || list.length === 0) {

        if (emptyState) {
            emptyState.style.display = "block";
        }

        if (medicineCount) {
            medicineCount.textContent =
                "0 medicines";
        }

        return;

    }


    if (emptyState) {
        emptyState.style.display = "none";
    }


    /* -------------------------------------
       COUNT
    ------------------------------------- */

    if (medicineCount) {

        medicineCount.textContent =
            `${list.length} ${
                list.length === 1
                    ? "medicine"
                    : "medicines"
            }`;

    }


    /* -------------------------------------
       CREATE CARDS
    ------------------------------------- */

    list.forEach(medicine => {

        const card =
            document.createElement("article");

        card.className =
            "medicine-card";

        card.dataset.id =
            medicine.id;


        card.innerHTML = `

            <div class="medicine-card-main">

                <div class="medicine-symbol">
                    +
                </div>

                <div class="medicine-card-content">

                    <span class="medicine-card-class">
                        ${medicine.class || ""}
                    </span>

                    <h3>
                        ${medicine.genericName || medicine.name}
                    </h3>

                    <p>
                        ${
                            medicine.condition ||
                            "General use"
                        }
                    </p>

                </div>

            </div>


            <div class="medicine-card-footer">

                <span>
                    ${medicine.route || ""}
                </span>

                <button
                    class="favorite-button"
                    data-id="${medicine.id}"
                    type="button"
                    aria-label="Add to favorites"
                >
                    ☆
                </button>

            </div>

        `;


        /* ---------------------------------
           OPEN MEDICINE
        --------------------------------- */

        card.addEventListener(
            "click",
            () => {

                openMedicineModal(
                    medicine.id
                );

            }
        );


        medicineList.appendChild(card);

    });


    initializeFavoriteButtons();

}


/* =========================================
   POPULATE CLASS FILTER
========================================= */

function populateClassFilter() {

    if (!classFilter) {
        return;
    }

    const classes =
        new Set();


    medicines.forEach(medicine => {

        if (
            Array.isArray(
                medicine.drugClass
            )
        ) {

            medicine.drugClass.forEach(
                drugClass => {

                    if (drugClass) {
                        classes.add(drugClass);
                    }

                }
            );

        }

    });


    Array.from(classes)
        .sort()
        .forEach(drugClass => {

            const option =
                document.createElement("option");

            option.value =
                drugClass;

            option.textContent =
                drugClass;

            classFilter.appendChild(
                option
            );

        });

}


/* =========================================
   POPULATE CONDITION FILTER
========================================= */

function populateConditionFilter() {

    if (!conditionFilter) {
        return;
    }

    getAllMedicineConditions()
        .forEach(condition => {

            const option =
                document.createElement("option");

            option.value =
                condition;

            option.textContent =
                condition;

            conditionFilter.appendChild(
                option
            );

        });

}


/* =========================================
   FILTER MEDICINES
========================================= */

function filterMedicines() {

    const search =
        medicineSearch
            ? medicineSearch.value
            : "";

    const selectedClass =
        classFilter
            ? classFilter.value
            : "all";

    const selectedCondition =
        conditionFilter
            ? conditionFilter.value
            : "all";


    let results =
        searchMedicines(search);


    /* -------------------------------------
       CLASS FILTER
    ------------------------------------- */

    if (selectedClass !== "all") {

        results =
            results.filter(
                medicine => {

                    return (
                        Array.isArray(
                            medicine.drugClass
                        ) &&
                        medicine.drugClass.includes(
                            selectedClass
                        )
                    );

                }
            );

    }


    /* -------------------------------------
       CONDITION FILTER
    ------------------------------------- */

    if (selectedCondition !== "all") {

        results =
            results.filter(
                medicine => {

                    return (
                        Array.isArray(
                            medicine.conditions
                        ) &&
                        medicine.conditions.includes(
                            selectedCondition
                        )
                    );

                }
            );

    }


    renderMedicines(results);

}


/* =========================================
   OPEN MEDICINE MODAL
========================================= */

function openMedicineModal(id) {

    const medicine =
        getMedicineById(id);

    if (!medicine || !medicineModal) {
        return;
    }


    const modalName =
        document.getElementById(
            "modal-name"
        );

    const modalClass =
        document.getElementById(
            "modal-class"
        );

    const modalCondition =
        document.getElementById(
            "modal-condition"
        );

    const modalRoute =
        document.getElementById(
            "modal-route"
        );

    const modalIndications =
        document.getElementById(
            "modal-indications"
        );

    const modalMoa =
        document.getElementById(
            "modal-moa"
        );

    const modalPediatric =
        document.getElementById(
            "modal-pediatric"
        );


    if (modalName) {

        modalName.textContent =
            medicine.genericName ||
            medicine.name;

    }


    if (modalClass) {

        modalClass.textContent =
            medicine.class || "";

    }


    if (modalCondition) {

        modalCondition.textContent =
            medicine.condition || "";

    }


    if (modalRoute) {

        modalRoute.textContent =
            medicine.route || "";

    }


    if (modalIndications) {

        modalIndications.textContent =
            medicine.indications || "";

    }


    if (modalMoa) {

        modalMoa.textContent =
            medicine.moa || "";

    }


    if (modalPediatric) {

        modalPediatric.textContent =
            medicine.pediatric || "";

    }


    medicineModal.classList.add(
        "active"
    );

    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================
   CLOSE MEDICINE MODAL
========================================= */

function closeMedicineModal() {

    if (!medicineModal) {
        return;
    }

    medicineModal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================
   SEARCH EVENTS
========================================= */

if (medicineSearch) {

    medicineSearch.addEventListener(
        "input",
        filterMedicines
    );

}


/* =========================================
   CLEAR SEARCH
========================================= */

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        () => {

            if (medicineSearch) {
                medicineSearch.value = "";
            }

            filterMedicines();

        }
    );

}


/* =========================================
   CLASS FILTER
========================================= */

if (classFilter) {

    classFilter.addEventListener(
        "change",
        filterMedicines
    );

}


/* =========================================
   CONDITION FILTER
========================================= */

if (conditionFilter) {

    conditionFilter.addEventListener(
        "change",
        filterMedicines
    );

}


/* =========================================
   CLOSE MODAL
========================================= */

if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeMedicineModal
    );

}


/* =========================================
   CLOSE MODAL BY OVERLAY
========================================= */

if (medicineModal) {

    const overlay =
        medicineModal.querySelector(
            ".modal-overlay"
        );

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeMedicineModal
        );

    }

}


/* =========================================
   BACK BUTTON
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
   INITIALIZE MEDICINE PAGE
========================================= */

populateClassFilter();

populateConditionFilter();

renderMedicines(medicines);
