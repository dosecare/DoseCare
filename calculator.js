/* =========================================
   DoseCare
   Pediatric Dose Calculator
   Calculator Logic
========================================= */


/* =========================================
   STORAGE
========================================= */

const HISTORY_STORAGE_KEY =
    "dosecareHistory";


/* =========================================
   DOM ELEMENTS
========================================= */

const conditionSelect =
    document.getElementById("condition");


const medicineSelect =
    document.getElementById("medicine-select");


const medicineSearch =
    document.getElementById("medicine");


const medicineResults =
    document.getElementById("medicine-results");


const clearMedicine =
    document.getElementById("clear-medicine");


const ageInput =
    document.getElementById("age");


const ageUnit =
    document.getElementById("age-unit");


const weightInput =
    document.getElementById("weight");


const concentrationValue =
    document.getElementById("concentration-value");


const concentrationVolume =
    document.getElementById("concentration-volume");


const calculateButton =
    document.getElementById("calculate-button");


const validationMessage =
    document.getElementById("validation-message");


const resultCard =
    document.getElementById("result-card");


const doseResult =
    document.getElementById("dose-result");


const doseUnit =
    document.getElementById("dose-unit");


const resultDetails =
    document.getElementById("result-details");


const backButton =
    document.getElementById("back-button");


/* =========================================
   CURRENT STATE
========================================= */

let selectedMedicine = null;


/* =========================================
   CONDITIONS
========================================= */

function getAllConditions() {

    const conditionSet =
        new Set();


    medicines.forEach(
        (medicine) => {

            if (!medicine.conditions) {
                return;
            }


            medicine.conditions.forEach(
                (condition) => {

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


/* =========================================
   INITIALIZE CONDITIONS
========================================= */

function initializeConditions() {

    if (!conditionSelect) {
        return;
    }


    const allConditions =
        getAllConditions();


    allConditions.forEach(
        (condition) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                condition;


            option.textContent =
                formatConditionName(
                    condition
                );


            conditionSelect.appendChild(
                option
            );

        }
    );

}


/* =========================================
   FORMAT CONDITION NAME
========================================= */

function formatConditionName(
    condition
) {

    return condition
        .split(" ")
        .map(
            word =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");

}


/* =========================================
   GET FILTERED MEDICINES
========================================= */

function getFilteredMedicines() {

    const selectedCondition =
        conditionSelect
            ? conditionSelect.value
            : "";


    if (!selectedCondition) {

        return medicines;

    }


    return medicines.filter(
        (medicine) => {

            return (
                medicine.conditions &&
                medicine.conditions.includes(
                    selectedCondition
                )
            );

        }
    );

}


/* =========================================
   POPULATE MEDICINE SELECT
========================================= */

function populateMedicineSelect() {

    if (!medicineSelect) {
        return;
    }


    const availableMedicines =
        getFilteredMedicines();


    medicineSelect.innerHTML = "";


    const defaultOption =
        document.createElement(
            "option"
        );


    defaultOption.value = "";


    defaultOption.textContent =
        "Select a medicine";


    medicineSelect.appendChild(
        defaultOption
    );


    availableMedicines.forEach(
        (medicine) => {

            const option =
                document.createElement(
                    "option"
                );


            /*
                Support both:

                genericName
                name

                This keeps the calculator
                compatible with the database.
            */

            option.value =
                String(medicine.id);


            option.textContent =
                medicine.genericName ||
                medicine.name ||
                "Medicine";


            medicineSelect.appendChild(
                option
            );

        }
    );


    medicineSelect.disabled = false;

}


/* =========================================
   CONDITION CHANGE
========================================= */

if (conditionSelect) {

    conditionSelect.addEventListener(
        "change",
        () => {

            populateMedicineSelect();


            if (
                selectedMedicine &&
                conditionSelect.value &&
                selectedMedicine.conditions &&
                !selectedMedicine.conditions.includes(
                    conditionSelect.value
                )
            ) {

                clearSelectedMedicine();

            }

        }
    );

}


/* =========================================
   MEDICINE SELECT CHANGE
========================================= */

if (medicineSelect) {

    medicineSelect.addEventListener(
        "change",
        () => {

            const medicineId =
                medicineSelect.value;


            if (!medicineId) {

                clearSelectedMedicine();

                return;

            }


            const medicine =
                medicines.find(
                    (item) =>
                        String(item.id) ===
                        String(medicineId)
                );


            selectMedicine(
                medicine
            );

        }
    );

}


/* =========================================
   GET MEDICINE NAME
========================================= */

function getMedicineName(
    medicine
) {

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
   SELECT MEDICINE
========================================= */

function selectMedicine(
    medicine
) {

    if (!medicine) {
        return;
    }


    selectedMedicine =
        medicine;


    if (medicineSearch) {

        medicineSearch.value =
            getMedicineName(
                medicine
            );

    }


    if (medicineSelect) {

        medicineSelect.value =
            String(medicine.id);

    }


    if (clearMedicine) {

        clearMedicine.style.display =
            "flex";

    }


    hideSearchResults();

    hideValidation();

    hideResult();

}


/* =========================================
   CLEAR SELECTED MEDICINE
========================================= */

function clearSelectedMedicine() {

    selectedMedicine =
        null;


    if (medicineSelect) {

        medicineSelect.value = "";

    }


    if (medicineSearch) {

        medicineSearch.value = "";

    }


    if (clearMedicine) {

        clearMedicine.style.display =
            "none";

    }

}


/* =========================================
   MEDICINE SEARCH
========================================= */

if (medicineSearch) {

    medicineSearch.addEventListener(
        "input",
        () => {

            const searchTerm =
                medicineSearch.value
                    .trim()
                    .toLowerCase();


            if (clearMedicine) {

                clearMedicine.style.display =
                    searchTerm
                        ? "flex"
                        : "none";

            }


            if (!searchTerm) {

                hideSearchResults();

                return;

            }


            const filteredMedicines =
                medicines.filter(
                    (medicine) => {

                        const name =
                            getMedicineName(
                                medicine
                            ).toLowerCase();


                        const brands =
                            medicine.brandNames ||
                            [];


                        const brandMatch =
                            brands.some(
                                (brand) =>
                                    String(brand)
                                        .toLowerCase()
                                        .includes(
                                            searchTerm
                                        )
                            );


                        return (
                            name.includes(
                                searchTerm
                            ) ||
                            brandMatch
                        );

                    }
                );


            showSearchResults(
                filteredMedicines
            );

        }
    );

}


/* =========================================
   SHOW SEARCH RESULTS
========================================= */

function showSearchResults(
    results
) {

    if (!medicineResults) {
        return;
    }


    medicineResults.innerHTML = "";


    if (!results.length) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "medicine-result-item";


        empty.innerHTML = `
            <span>
                No medicine found
            </span>
        `;


        medicineResults.appendChild(
            empty
        );


        medicineResults.style.display =
            "block";


        return;

    }


    results.forEach(
        (medicine) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "medicine-result-item";


            const medicineName =
                getMedicineName(
                    medicine
                );


            const drugClass =
                Array.isArray(
                    medicine.drugClass
                )
                    ? medicine.drugClass.join(
                        " · "
                    )
                    : (
                        medicine.drugClass ||
                        medicine.class ||
                        "Medicine"
                    );


            item.innerHTML = `
                <strong>
                    ${medicineName}
                </strong>

                <span>
                    ${drugClass}
                </span>
            `;


            item.addEventListener(
                "click",
                () => {

                    selectMedicine(
                        medicine
                    );

                }
            );


            medicineResults.appendChild(
                item
            );

        }
    );


    medicineResults.style.display =
        "block";

}


/* =========================================
   HIDE SEARCH RESULTS
========================================= */

function hideSearchResults() {

    if (!medicineResults) {
        return;
    }


    medicineResults.style.display =
        "none";

}


/* =========================================
   CLEAR SEARCH
========================================= */

if (clearMedicine) {

    clearMedicine.addEventListener(
        "click",
        () => {

            clearSelectedMedicine();

            hideSearchResults();

        }
    );

}


/* =========================================
   CLOSE SEARCH
========================================= */

document.addEventListener(
    "click",
    (event) => {

        if (
            medicineSearch &&
            medicineResults &&
            !medicineSearch.contains(
                event.target
            ) &&
            !medicineResults.contains(
                event.target
            )
        ) {

            hideSearchResults();

        }

    }
);


/* =========================================
   VALIDATION
========================================= */

function showValidation(
    message
) {

    if (!validationMessage) {
        return;
    }


    const messageText =
        validationMessage.querySelector(
            "p"
        );


    if (messageText) {

        messageText.textContent =
            message;

    }


    validationMessage.style.display =
        "flex";

}


function hideValidation() {

    if (!validationMessage) {
        return;
    }


    validationMessage.style.display =
        "none";

}


/* =========================================
   RESULT
========================================= */

function hideResult() {

    if (!resultCard) {
        return;
    }


    resultCard.style.display =
        "none";

}


function showResult() {

    if (!resultCard) {
        return;
    }


    resultCard.style.display =
        "block";

}


/* =========================================
   GET HISTORY
========================================= */

function getCalculationHistory() {

    const saved =
        localStorage.getItem(
            HISTORY_STORAGE_KEY
        );


    if (!saved) {

        return [];

    }


    try {

        const history =
            JSON.parse(saved);


        return Array.isArray(history)
            ? history
            : [];

    }
    catch (error) {

        console.error(
            "History loading error:",
            error
        );

        return [];

    }

}


/* =========================================
   SAVE CALCULATION TO HISTORY
========================================= */

function saveCalculationToHistory(
    data
) {

    const history =
        getCalculationHistory();


    history.unshift(
        data
    );


    localStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(history)
    );

}


/* =========================================
   CREATE DATE + TIME
========================================= */

function createHistoryDateTime() {

    const now =
        new Date();


    const date =
        now.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );


    const time =
        now.toLocaleTimeString(
            "en-US",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    return {

        timestamp:
            now.toISOString(),

        date:
            date,

        time:
            time

    };

}


/* =========================================
   SAVE HISTORY RECORD
========================================= */

function createHistoryRecord(
    dose,
    unit,
    concentration
) {

    const dateTime =
        createHistoryDateTime();


    return {

        id:
            Date.now(),

        medicine:
            getMedicineName(
                selectedMedicine
            ),

        dose:
            dose,

        doseUnit:
            unit,

        age:
            ageInput
                ? ageInput.value
                : "",

        ageUnit:
            ageUnit
                ? ageUnit.value
                : "",

        weight:
            weightInput
                ? weightInput.value
                : "",

        concentration:
            concentration,

        date:
            dateTime.date,

        time:
            dateTime.time,

        timestamp:
            dateTime.timestamp

    };

}


/* =========================================
   CALCULATE DOSE
========================================= */

if (calculateButton) {

    calculateButton.addEventListener(
        "click",
        calculateDose
    );

}


function calculateDose() {

    hideValidation();

    hideResult();


    /* -------------------------------------
       1. MEDICINE
    ------------------------------------- */

    if (!selectedMedicine) {

        showValidation(
            "Please select a medicine before calculating the dose."
        );

        return;

    }


    /* -------------------------------------
       2. PATIENT INFORMATION
    ------------------------------------- */

    const age =
        ageInput
            ? parseFloat(
                ageInput.value
            )
            : NaN;


    const weight =
        weightInput
            ? parseFloat(
                weightInput.value
            )
            : NaN;


    const hasAge =
        Number.isFinite(age);


    const hasWeight =
        Number.isFinite(weight);


    if (!hasAge && !hasWeight) {

        showValidation(
            "Please enter the patient's age, weight, or both."
        );

        return;

    }


    if (hasAge && age < 0) {

        showValidation(
            "Please enter a valid age."
        );

        return;

    }


    if (hasWeight && weight <= 0) {

        showValidation(
            "Please enter a valid weight."
        );

        return;

    }


    /* -------------------------------------
       3. CONCENTRATION
    ------------------------------------- */

    const concentrationMg =
        concentrationValue
            ? parseFloat(
                concentrationValue.value
            )
            : NaN;


    const concentrationMl =
        concentrationVolume
            ? parseFloat(
                concentrationVolume.value
            )
            : NaN;


    if (
        !Number.isFinite(
            concentrationMg
        ) ||
        !Number.isFinite(
            concentrationMl
        ) ||
        concentrationMg <= 0 ||
        concentrationMl <= 0
    ) {

        showValidation(
            "Please enter a valid medicine concentration."
        );

        return;

    }


    /* -------------------------------------
       4. CHECK DOSING METHOD
    ------------------------------------- */

    const dosing =
        selectedMedicine.dosing;


    if (!dosing) {

        showValidation(
            "A dosing method has not been configured for this medicine yet."
        );

        return;

    }


    /*
        IMPORTANT

        The clinical dosing rule is NOT
        invented here.

        It must come from the verified
        medicine database.
    */


    showValidation(
        "The medicine and patient information are ready. The verified dosing rule will be applied once the dosing data for this medicine is configured."
    );


    /*
        Do NOT save an incomplete calculation
        to History.

        History should contain only a real
        calculated dose.
    */

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
   SAVE CALCULATION TO HISTORY
========================================= */

const HISTORY_STORAGE_KEY =
    "dosecareHistory";


function saveCalculationToHistory({
    medicine,
    dose,
    doseUnit,
    age,
    ageUnit,
    weight,
    concentration
}) {

    const history =
        JSON.parse(
            localStorage.getItem(
                HISTORY_STORAGE_KEY
            ) || "[]"
        );


    const now = new Date();


    const historyItem = {

        medicine:
            medicine,

        dose:
            dose,

        doseUnit:
            doseUnit,

        age:
            age,

        ageUnit:
            ageUnit,

        weight:
            weight,

        concentration:
            concentration,

        date:
            now.toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            ),

        time:
            now.toLocaleTimeString(
                "en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            ),

        timestamp:
            now.getTime()

    };


    history.unshift(
        historyItem
    );


    localStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(history)
    );

}

/* =========================================
   INITIALIZE
========================================= */

initializeConditions();

populateMedicineSelect();
