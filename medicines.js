/* =========================================
   DoseCare
   Unified Medicine Database
========================================= */


/* =========================================
   CENTRAL MEDICINE DATABASE
========================================= */

/*
    جميع الأدوية راح تنضاف من ملفات منفصلة
    حسب الـ System.

    مثال:

    medicines/analgesics.js
    medicines/antibiotics.js
    medicines/respiratory.js
    medicines/gastrointestinal.js

    لا تضيفي أدوية مباشرة هنا.
*/

const medicines = [];


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
            )
            .trim()
            .toLowerCase() === search
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

    if (!search) {
        return medicines;
    }

    return medicines.filter(
        medicine => {

            const genericName =
                String(
                    medicine.genericName || ""
                ).toLowerCase();


            const medicineName =
                String(
                    medicine.name || ""
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


            const indications =
                String(
                    medicine.indications || ""
                ).toLowerCase();


            const brandMatch =
                brands.some(
                    brand =>
                        String(brand)
                            .toLowerCase()
                            .includes(search)
                );


            return (

                genericName.includes(search) ||

                medicineName.includes(search) ||

                brandMatch ||

                drugClass
                    .toLowerCase()
                    .includes(search) ||

                className.includes(search) ||

                condition.includes(search) ||

                conditions
                    .toLowerCase()
                    .includes(search) ||

                indications.includes(search)

            );

        }
    );

}


/* =========================================
   GET ALL MEDICINES
========================================= */

function getAllMedicines() {

    return medicines;

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


    const searchCondition =
        String(condition)
            .trim()
            .toLowerCase();


    return medicines.filter(
        medicine => {

            if (
                !Array.isArray(
                    medicine.conditions
                )
            ) {
                return false;
            }


            return medicine.conditions.some(
                item =>
                    String(item)
                        .trim()
                        .toLowerCase() ===
                    searchCondition
            );

        }
    );

}


/* =========================================
   GET MEDICINES BY DRUG CLASS
========================================= */

function getMedicinesByDrugClass(drugClass) {

    if (!drugClass) {
        return medicines;
    }

    const searchClass =
        String(drugClass)
            .trim()
            .toLowerCase();


    return medicines.filter(
        medicine => {

            if (
                !Array.isArray(
                    medicine.drugClass
                )
            ) {
                return false;
            }


            return medicine.drugClass.some(
                item =>
                    String(item)
                        .trim()
                        .toLowerCase() ===
                    searchClass
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
   GET MEDICINE REFERENCES
========================================= */

function getMedicineReferences(id) {

    const medicine =
        getMedicineById(id);


    if (!medicine) {
        return [];
    }


    return Array.isArray(
        medicine.references
    )
        ? medicine.references
        : [];

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

        genericName:
            medicine.genericName ||
            medicine.name,

        class:
            medicine.class || "",

        drugClass:
            Array.isArray(
                medicine.drugClass
            )
                ? medicine.drugClass
                : [],

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
        "dosing",
        "references"

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
                            `Medicine "${medicine.genericName || medicine.id}" is missing "${field}".`
                        );

                    }

                }
            );


            /* ---------------------------------
               ID
            --------------------------------- */

            if (
                !medicine.id
            ) {

                console.warn(
                    "Medicine is missing a valid ID."
                );

            }


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


            /* ---------------------------------
               REFERENCES
            --------------------------------- */

            if (
                !Array.isArray(
                    medicine.references
                )
            ) {

                console.warn(
                    `Medicine "${medicine.genericName}" has invalid references data.`
                );

            }

        }
    );

}


/* =========================================
   CHECK DUPLICATE MEDICINE IDS
========================================= */

function checkDuplicateMedicineIds() {

    const ids =
        new Set();


    medicines.forEach(
        medicine => {

            if (!medicine.id) {
                return;
            }


            if (
                ids.has(
                    String(medicine.id)
                )
            ) {

                console.error(
                    `Duplicate medicine ID found: ${medicine.id}`
                );

            }


            ids.add(
                String(medicine.id)
            );

        }
    );

}


/* =========================================
   CHECK DATABASE
========================================= */

function checkMedicineDatabase() {

    checkDuplicateMedicineIds();

    validateMedicineDatabase();

}


/* =========================================
   DATABASE STATUS
========================================= */

function getMedicineDatabaseStatus() {

    return {

        totalMedicines:
            medicines.length,

        configuredMedicines:
            medicines.filter(
                medicine =>
                    medicine.dosing &&
                    medicine.dosing.configured === true
            ).length,

        medicinesWithReferences:
            medicines.filter(
                medicine =>
                    Array.isArray(
                        medicine.references
                    ) &&
                    medicine.references.length > 0
            ).length

    };

}
