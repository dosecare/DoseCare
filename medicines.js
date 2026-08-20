 /* =========================================
    DoseCare
    Unified Medicine Database
 ========================================= */


/* =========================================
   MEDICINE DATABASE
========================================= */

/*
    This array is the central medicine database.

    Medicine data will be loaded from separate
    system files such as:

        antibiotics.js
        analgesics.js
        respiratory.js
        gastrointestinal.js
        etc.

    Do not add individual medicines directly
    to this file.
*/

const medicines = [];


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
                conditions
                    .toLowerCase()
                    .includes(search)
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

function getMedicinesByCondition(condition) {

    if (
        !condition ||
        condition === "all"
    ) {
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
   GET MEDICINE DOSING
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
   CHECK DOSING CONFIGURATION
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

function saveFavoriteMedicines(favorites) {

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
       REMOVE
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
       ADD
    ------------------------------------- */

    favorites.push({

        id:
            medicine.id,

        name:
            medicine.genericName ||
            medicine.name,

        class:
            medicine.class || "",

        condition:
            medicine.condition || ""

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
   DATABASE VALIDATION
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
               CONDITIONS
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
               BRAND NAMES
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
               DRUG CLASS
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
               DOSING
            --------------------------------- */

            if (
                !medicine.dosing ||
                typeof medicine.dosing !==
                "object"
            ) {

                console.warn(
                    `Medicine "${medicine.genericName}" has invalid dosing configuration.`
                );


                return;

            }


            /* ---------------------------------
               CONFIGURATION
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
