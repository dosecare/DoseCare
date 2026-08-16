/* =========================================
   DoseCare
   Unified Medicine Database
========================================= */


/* =========================================
   MEDICINE DATABASE
========================================= */

const medicines = [

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

        class: "Analgesic · Antipyretic",

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

        /*
            Dosing data will be added only after
            verified pediatric dosing rules are configured.
        */

        dosing: null
    },


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

        dosing: null
    },


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

        dosing: null
    },


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

        dosing: null
    }

];


/* =========================================
   HELPER FUNCTIONS
========================================= */


/*
    Find medicine by ID
*/

function getMedicineById(id) {

    return medicines.find(
        medicine =>
            String(medicine.id) === String(id)
    );

}


/*
    Find medicine by generic name
*/

function getMedicineByName(name) {

    if (!name) {
        return null;
    }

    const search =
        name.trim().toLowerCase();

    return medicines.find(
        medicine =>
            medicine.genericName
                .toLowerCase() === search
    );

}


/*
    Search medicines
*/

function searchMedicines(searchTerm) {

    if (!searchTerm) {

        return medicines;

    }

    const search =
        searchTerm
            .trim()
            .toLowerCase();


    return medicines.filter(
        medicine => {

            const genericName =
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


            const classMatch =
                medicine.class
                    .toLowerCase()
                    .includes(search);


            const conditionMatch =
                medicine.condition
                    .toLowerCase()
                    .includes(search);


            return (
                genericName.includes(search) ||
                brandMatch ||
                classMatch ||
                conditionMatch
            );

        }
    );

}


/*
    Get all conditions
*/

function getAllMedicineConditions() {

    const conditionSet =
        new Set();


    medicines.forEach(
        medicine => {

            if (!medicine.conditions) {
                return;
            }


            medicine.conditions.forEach(
                condition => {

                    conditionSet.add(
                        condition
                    );

                }
            );

        }
    );


    return Array.from(
        conditionSet
    ).sort();

}


/*
    Get medicines by condition
*/

function getMedicinesByCondition(
    condition
) {

    if (!condition) {

        return medicines;

    }


    return medicines.filter(
        medicine =>
            medicine.conditions &&
            medicine.conditions.includes(
                condition
            )
    );

}


/* =========================================
   FAVORITES
========================================= */

const FAVORITES_STORAGE_KEY =
    "dosecareFavorites";


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


        return Array.isArray(favorites)
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


/*
    Save favorites
*/

function saveFavoriteMedicines(
    favorites
) {

    localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites)
    );

}


/*
    Check favorite
*/

function isFavoriteMedicine(id) {

    const favorites =
        getFavoriteMedicines();


    return favorites.some(
        medicine =>
            String(medicine.id) === String(id)
    );

}


/*
    Add / remove favorite
*/

function toggleFavoriteMedicine(id) {

    const medicine =
        getMedicineById(id);


    if (!medicine) {
        return;
    }


    let favorites =
        getFavoriteMedicines();


    const existingIndex =
        favorites.findIndex(
            item =>
                String(item.id) ===
                String(id)
        );


    /*
        REMOVE
    */

    if (existingIndex !== -1) {

        favorites.splice(
            existingIndex,
            1
        );

    }


    /*
        ADD
    */

    else {

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

    }


    saveFavoriteMedicines(
        favorites
    );


    return (
        existingIndex === -1
    );

}


/* =========================================
   FAVORITE BUTTON UI
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


/*
    Initialize favorite buttons
*/

function initializeFavoriteButtons() {

    document
        .querySelectorAll(
            ".favorite-button"
        )
        .forEach(
            button => {

                /*
                    Prevent duplicate
                    event listeners.
                */

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
   MEDICINE DATA VALIDATION
========================================= */

function validateMedicineDatabase() {

    medicines.forEach(
        medicine => {

            const requiredFields = [

                "id",
                "genericName",
                "name",
                "class",
                "condition",
                "conditions",
                "route"

            ];


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

        }
    );

}


/* =========================================
   INITIALIZE DATABASE
========================================= */

validateMedicineDatabase();
