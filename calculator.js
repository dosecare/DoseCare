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


/* =========================================
   INITIALIZE CONDITIONS
========================================= */

function initializeConditions() {

    if (!conditionSelect) {
        return;
    }

    /*
        Keep the default option already
        موجودة بالـHTML.
    */

    const existingValues =
        Array.from(
            conditionSelect.options
        ).map(
            option => option.value
        );

    getAllConditions().forEach(
        condition => {

            /*
                Don't add duplicate conditions.
            */

            if (
                existingValues.includes(
                    condition
                )
            ) {
                return;
            }

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
        medicine => {

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
        medicine => {

            const option =
                document.createElement(
                    "option"
                );


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
                    item =>
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

        medicineSelect.value =
            "";

    }


    if (medicineSearch) {

        medicineSearch.value =
            "";

    }


    if (clearMedicine) {

        clearMedicine.style.display =
            "none";

    }


    hideValidation();

    hideResult();

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
                    medicine => {

                        const name =
                            getMedicineName(
                                medicine
                            ).toLowerCase();


                        const brands =
                            medicine.brandNames ||
                            [];


                        const brandMatch =
                            brands.some(
                                brand =>
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


    medicineResults.innerHTML =
        "";


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
        medicine => {

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
    event => {

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
   NUMBER FORMAT
========================================= */

function formatNumber(
    number
) {

    if (!Number.isFinite(number)) {

        return "—";

    }


    if (Number.isInteger(number)) {

        return String(number);

    }


    return number
        .toFixed(2)
        .replace(
            /\.?0+$/,
            ""
        );

}


/* =========================================
   GET SELECTED REGIMEN
========================================= */

function getSelectedDosingRegimen() {

    if (!selectedMedicine) {

        return null;

    }


    const dosing =
        selectedMedicine.dosing;


    if (!dosing) {

        return null;

    }


    /*
        Dose per administration
    */

    if (
        dosing.type ===
        "mg_per_kg_per_dose"
    ) {

        return dosing;

    }


    /*
        Dose per day
        selected by condition
    */

    if (
        dosing.type ===
        "mg_per_kg_per_day"
    ) {

        const condition =
            conditionSelect
                ? conditionSelect.value
                : "";


        if (
            !condition ||
            !dosing.regimens
        ) {

            return null;

        }


        return (
            dosing.regimens[condition] ||
            null
        );

    }


    /*
        Condition based
    */

    if (
        dosing.type ===
        "condition_based"
    ) {

        const condition =
            conditionSelect
                ? conditionSelect.value
                : "";


        if (
            !condition ||
            !dosing.regimens
        ) {

            return null;

        }


        return (
            dosing.regimens[condition] ||
            null
        );

    }


    return null;

}


/* =========================================
   CALCULATE DOSE IN MG
========================================= */

function calculateDoseInMg(
    weight,
    dosing
) {

    if (
        !dosing ||
        !Number.isFinite(weight)
    ) {

        return null;

    }


    /* -------------------------------------
       MG / KG / DOSE
    ------------------------------------- */

    if (
        dosing.type ===
        "mg_per_kg_per_dose"
    ) {

        const minMg =
            weight *
            Number(dosing.minDose);


        const maxMg =
            weight *
            Number(dosing.maxDose);


        let finalMin =
            minMg;


        let finalMax =
            maxMg;


        /*
            Apply maximum single dose
            if configured.
        */

        if (
            Number.isFinite(
                Number(dosing.maxPerDose)
            )
        ) {

            finalMin =
                Math.min(
                    finalMin,
                    Number(
                        dosing.maxPerDose
                    )
                );


            finalMax =
                Math.min(
                    finalMax,
                    Number(
                        dosing.maxPerDose
                    )
                );

        }


        return {

            minMg:
                finalMin,

            maxMg:
                finalMax,

            frequency:
                dosing.frequency ||
                "",

            type:
                "per_dose"

        };

    }


    /* -------------------------------------
       MG / KG / DAY
    ------------------------------------- */

    if (
        dosing.type ===
        "mg_per_kg_per_day"
    ) {

        const frequency =
            Number(
                dosing.frequency
            );


        if (
            !Number.isFinite(
                frequency
            ) ||
            frequency <= 0
        ) {

            return null;

        }


        const minDailyMg =
            weight *
            Number(dosing.minDose);


        const maxDailyMg =
            weight *
            Number(dosing.maxDose);


        let minPerDose =
            minDailyMg /
            frequency;


        let maxPerDose =
            maxDailyMg /
            frequency;


        /*
            Apply maximum dose
            per administration.
        */

        if (
            Number.isFinite(
                Number(dosing.maxPerDose)
            )
        ) {

            minPerDose =
                Math.min(
                    minPerDose,
                    Number(
                        dosing.maxPerDose
                    )
                );


            maxPerDose =
                Math.min(
                    maxPerDose,
                    Number(
                        dosing.maxPerDose
                    )
                );

        }


        return {

            minMg:
                minPerDose,

            maxMg:
                maxPerDose,

            dailyMinMg:
                minDailyMg,

            dailyMaxMg:
                maxDailyMg,

            frequency:
                `${frequency} doses/day`,

            type:
                "per_dose"

        };

    }


    return null;

}


/* =========================================
   CONVERT MG → ML
========================================= */

function convertMgToMl(
    minMg,
    maxMg,
    concentrationMg,
    concentrationMl
) {

    /*
        Example:

        250 mg / 5 mL

        If dose = 375 mg:

        375 × 5 / 250
        = 7.5 mL
    */


    const minMl =
        (
            minMg *
            concentrationMl
        ) /
        concentrationMg;


    const maxMl =
        (
            maxMg *
            concentrationMl
        ) /
        concentrationMg;


    return {

        minMl:
            minMl,

        maxMl:
            maxMl

    };

}


/* =========================================
   DISPLAY RESULT
========================================= */

function displayDoseResult(
    mgResult,
    mlResult,
    dosing,
    concentrationMg,
    concentrationMl
) {

    const hasRange =
        Math.abs(
            mgResult.minMg -
            mgResult.maxMg
        ) > 0.001;


    const mgText =
        hasRange

            ? `${formatNumber(
                mgResult.minMg
            )}–${formatNumber(
                mgResult.maxMg
            )} mg`

            : `${formatNumber(
                mgResult.minMg
            )} mg`;


    const mlText =
        hasRange

            ? `${formatNumber(
                mlResult.minMl
            )}–${formatNumber(
                mlResult.maxMl
            )} mL`

            : `${formatNumber(
                mlResult.minMl
            )} mL`;


    /*
        Main result:
        mL is what the user needs
        when using a liquid formulation.
    */

    if (doseResult) {

        doseResult.textContent =
            mlText;

    }


    if (doseUnit) {

        doseUnit.textContent =
            "per dose";

    }


    if (resultDetails) {

        resultDetails.innerHTML = `

            <div class="result-detail-row">

                <span>
                    Dose
                </span>

                <strong>
                    ${mgText}
                </strong>

            </div>


            <div class="result-detail-row">

                <span>
                    Volume
                </span>

                <strong>
                    ${mlText}
                </strong>

            </div>


            <div class="result-detail-row">

                <span>
                    Concentration
                </span>

                <strong>
                    ${formatNumber(
                        concentrationMg
                    )} mg /
                    ${formatNumber(
                        concentrationMl
                    )} mL
                </strong>

            </div>


            <div class="result-detail-row">

                <span>
                    Frequency
                </span>

                <strong>
                    ${
                        dosing.frequency ||
                        "As directed"
                    }
                </strong>

            </div>

        `;

    }


    showResult();

}


/* =========================================
   HISTORY
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

    let history =
        getCalculationHistory();


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


    const historyItem = {

        id:
            Date.now(),

        medicine:
            data.medicine,

        dose:
            data.dose,

        doseUnit:
            data.doseUnit,

        age:
            data.age,

        ageUnit:
            data.ageUnit,

        weight:
            data.weight,

        concentration:
            data.concentration,

        date:
            date,

        time:
            time,

        timestamp:
            now.toISOString()

    };


    history.unshift(
        historyItem
    );


    /*
        Keep latest 50 calculations.
    */

    history =
        history.slice(
            0,
            50
        );


    localStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(history)
    );


    console.log(
        "Calculation saved:",
        historyItem
    );

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
       2. CONDITION
    ------------------------------------- */

    const selectedCondition =
        conditionSelect
            ? conditionSelect.value
            : "";


    if (
        selectedMedicine.dosing &&
        (
            selectedMedicine.dosing.type ===
                "mg_per_kg_per_day" ||

            selectedMedicine.dosing.type ===
                "condition_based"
        ) &&
        !selectedCondition
    ) {

        showValidation(
            "Please select the patient's condition before calculating the dose."
        );

        return;

    }


    /* -------------------------------------
       3. AGE
    ------------------------------------- */

    const age =
        ageInput
            ? parseFloat(
                ageInput.value
            )
            : NaN;


    /* -------------------------------------
       4. WEIGHT
    ------------------------------------- */

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


    if (!hasWeight) {

        showValidation(
            "Please enter the patient's weight."
        );

        return;

    }


    if (hasAge && age < 0) {

        showValidation(
            "Please enter a valid age."
        );

        return;

    }


    if (weight <= 0) {

        showValidation(
            "Please enter a valid weight."
        );

        return;

    }


    /* -------------------------------------
       5. AGE RESTRICTION
    ------------------------------------- */

    const dosing =
        selectedMedicine.dosing;


    if (
        dosing &&
        Number.isFinite(
            Number(
                dosing.minimumAgeMonths
            )
        )
    ) {

        let ageMonths =
            NaN;


        if (
            ageUnit &&
            ageUnit.value === "months"
        ) {

            ageMonths =
                age;

        }
        else if (
            ageUnit &&
            ageUnit.value === "years"
        ) {

            ageMonths =
                age * 12;

        }


        if (
            Number.isFinite(ageMonths) &&
            ageMonths <
                Number(
                    dosing.minimumAgeMonths
                )
        ) {

            showValidation(
                `This medicine is not configured for patients younger than ${dosing.minimumAgeMonths} months.`
            );

            return;

        }

    }


    /* -------------------------------------
       6. CONCENTRATION
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
       7. DOSING RULE
    ------------------------------------- */

    const dosingRegimen =
        getSelectedDosingRegimen();


    if (!dosingRegimen) {

        showValidation(
            "A verified dosing rule is not configured for this medicine and condition yet."
        );

        return;

    }


    /* -------------------------------------
       8. CALCULATE MG
    ------------------------------------- */

    const mgResult =
        calculateDoseInMg(
            weight,
            dosingRegimen.type
                ? dosingRegimen
                : {
                    ...dosingRegimen,
                    type:
                        dosing.type
                }
        );


    if (
        !mgResult ||
        !Number.isFinite(
            mgResult.minMg
        ) ||
        !Number.isFinite(
            mgResult.maxMg
        )
    ) {

        showValidation(
            "Unable to calculate the dose using the configured dosing rule."
        );

        return;

    }


    /* -------------------------------------
       9. CONVERT MG → ML
    ------------------------------------- */

    const mlResult =
        convertMgToMl(
            mgResult.minMg,
            mgResult.maxMg,
            concentrationMg,
            concentrationMl
        );


    if (
        !Number.isFinite(
            mlResult.minMl
        ) ||
        !Number.isFinite(
            mlResult.maxMl
        )
    ) {

        showValidation(
            "Unable to convert the calculated dose to mL."
        );

        return;

    }


    /* -------------------------------------
       10. DISPLAY RESULT
    ------------------------------------- */

    displayDoseResult(
        mgResult,
        mlResult,
        dosingRegimen,
        concentrationMg,
        concentrationMl
    );


    /* -------------------------------------
       11. SAVE TO HISTORY
    ------------------------------------- */

    const hasRange =
        Math.abs(
            mgResult.minMg -
            mgResult.maxMg
        ) > 0.001;


    const historyDose =
        hasRange

            ? `${formatNumber(
                mlResult.minMl
            )}–${formatNumber(
                mlResult.maxMl
            )}`

            : formatNumber(
                mlResult.minMl
            );


    saveCalculationToHistory({

        medicine:
            getMedicineName(
                selectedMedicine
            ),

        dose:
            historyDose,

        doseUnit:
            "mL",

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
            `${formatNumber(
                concentrationMg
            )} mg / ${formatNumber(
                concentrationMl
            )} mL`

    });

}
/* =========================================
   BACK BUTTON → HOME
========================================= */

if (backButton) {

    backButton.addEventListener(
        "click",
        () => {

            /*
                Tell the Home page that the
                welcome screen has already been shown.
            */

            sessionStorage.setItem(
                "dosecareWelcomeShown",
                "true"
            );

            window.location.href =
                "index.html";

        }
    );

}
/* =========================================
   ESC → CLOSE SEARCH
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            hideSearchResults();

        }

    }
);


/* =========================================
   INITIALIZE
========================================= */

initializeConditions();

populateMedicineSelect();
