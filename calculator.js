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

function initializeConditions() {

    if (!conditionSelect) {
        return;
    }

    const conditions =
        typeof getAllMedicineConditions === "function"
            ? getAllMedicineConditions()
            : [];


    conditionSelect.innerHTML = `
        <option value="">
            Select a condition
        </option>
    `;


    conditions.forEach(
        condition => {

            const option =
                document.createElement("option");

            option.value =
                condition;

            option.textContent =
                formatConditionName(condition);

            conditionSelect.appendChild(
                option
            );

        }
    );

}


/* =========================================
   FORMAT CONDITION NAME
========================================= */

function formatConditionName(condition) {

    if (!condition) {
        return "";
    }

    return String(condition)
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

        return [];

    }


    if (
        typeof getMedicinesByCondition ===
        "function"
    ) {

        return getMedicinesByCondition(
            selectedCondition
        );

    }


    return medicines.filter(
        medicine =>
            Array.isArray(
                medicine.conditions
            ) &&
            medicine.conditions.includes(
                selectedCondition
            )
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


    medicineSelect.innerHTML = `
        <option value="">
            ${
                conditionSelect &&
                conditionSelect.value
                    ? "Select a medicine"
                    : "Select a condition first"
            }
        </option>
    `;


    /*
        Do not allow medicine selection
        before choosing a condition.
    */

    medicineSelect.disabled =
        !(
            conditionSelect &&
            conditionSelect.value
        );


    availableMedicines.forEach(
        medicine => {

            const option =
                document.createElement("option");

            option.value =
                String(medicine.id);

            option.textContent =
                getMedicineName(medicine);

            medicineSelect.appendChild(
                option
            );

        }
    );

}


/* =========================================
   CONDITION CHANGE
========================================= */

if (conditionSelect) {

    conditionSelect.addEventListener(
        "change",
        () => {

            clearSelectedMedicine();

            populateMedicineSelect();

            hideValidation();
            hideResult();

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
                typeof getMedicineById ===
                "function"
                    ? getMedicineById(
                        medicineId
                    )
                    : medicines.find(
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
   SELECT MEDICINE
========================================= */

function selectMedicine(medicine) {

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
                typeof searchMedicines ===
                "function"
                    ? searchMedicines(
                        searchTerm
                    )
                    : medicines.filter(
                        medicine =>
                            getMedicineName(
                                medicine
                            )
                                .toLowerCase()
                                .includes(
                                    searchTerm
                                )
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

function showSearchResults(results) {

    if (!medicineResults) {
        return;
    }


    medicineResults.innerHTML =
        "";


    if (!results.length) {

        const empty =
            document.createElement("div");

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
                document.createElement("div");

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

                    /*
                        If the user searched directly,
                        automatically select the medicine
                        and sync its condition when possible.
                    */

                    syncConditionWithMedicine(
                        medicine
                    );

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
   SYNC CONDITION WITH MEDICINE
========================================= */

function syncConditionWithMedicine(
    medicine
) {

    if (
        !medicine ||
        !conditionSelect ||
        !Array.isArray(
            medicine.conditions
        ) ||
        !medicine.conditions.length
    ) {

        return;

    }


    /*
        Keep the currently selected condition
        if it is valid for this medicine.
    */

    if (
        conditionSelect.value &&
        medicine.conditions.includes(
            conditionSelect.value
        )
    ) {

        populateMedicineSelect();

        return;

    }


    /*
        Otherwise select the first available
        condition for the searched medicine.
    */

    conditionSelect.value =
        medicine.conditions[0];


    populateMedicineSelect();

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

function showValidation(message) {

    if (!validationMessage) {
        return;
    }


    const messageText =
        validationMessage.querySelector("p");


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

function formatNumber(number) {

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
   GET SELECTED DOSING REGIMEN
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
        Do not calculate medicines
        that are not configured.
    */

    if (
        dosing.configured !== true
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

        return dosing;

    }


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


    const regimen =
        dosing.regimens[condition];


    if (!regimen) {
        return null;
    }


    /*
        Attach the parent dosing type
        so the calculation function
        knows how to process it.
    */

    return {
        ...regimen,
        type:
            dosing.type,
        route:
            dosing.route
    };

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
        !Number.isFinite(weight) ||
        weight <= 0
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

        const minDose =
            Number(
                dosing.minDose
            );

        const maxDose =
            Number(
                dosing.maxDose
            );


        if (
            !Number.isFinite(minDose) ||
            !Number.isFinite(maxDose)
        ) {

            return null;

        }


        let minMg =
            weight * minDose;

        let maxMg =
            weight * maxDose;


        /*
            Maximum single dose
        */

        if (
            Number.isFinite(
                Number(
                    dosing.maxPerDose
                )
            )
        ) {

            minMg =
                Math.min(
                    minMg,
                    Number(
                        dosing.maxPerDose
                    )
                );

            maxMg =
                Math.min(
                    maxMg,
                    Number(
                        dosing.maxPerDose
                    )
                );

        }


        return {

            minMg:
                minMg,

            maxMg:
                maxMg,

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


        const minDose =
            Number(
                dosing.minDose
            );

        const maxDose =
            Number(
                dosing.maxDose
            );


        if (
            !Number.isFinite(
                frequency
            ) ||
            frequency <= 0 ||
            !Number.isFinite(minDose) ||
            !Number.isFinite(maxDose)
        ) {

            return null;

        }


        const dailyMinMg =
            weight *
            minDose;

        const dailyMaxMg =
            weight *
            maxDose;


        let minPerDose =
            dailyMinMg /
            frequency;

        let maxPerDose =
            dailyMaxMg /
            frequency;


        /*
            Maximum dose per administration
        */

        if (
            Number.isFinite(
                Number(
                    dosing.maxPerDose
                )
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
                dailyMinMg,

            dailyMaxMg:
                dailyMaxMg,

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

    if (
        !Number.isFinite(minMg) ||
        !Number.isFinite(maxMg) ||
        !Number.isFinite(concentrationMg) ||
        !Number.isFinite(concentrationMl) ||
        concentrationMg <= 0 ||
        concentrationMl <= 0
    ) {

        return null;

    }


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
        Main result
    */

    if (doseResult) {

        doseResult.textContent =
            hasRange
                ? `${formatNumber(
                    mlResult.minMl
                )}–${formatNumber(
                    mlResult.maxMl
                )}`
                : formatNumber(
                    mlResult.minMl
                );

    }


    if (doseUnit) {

        doseUnit.textContent =
            "mL per dose";

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

function saveCalculationToHistory(data) {

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
       2. DOSING CONFIGURATION
    ------------------------------------- */

    if (
        !selectedMedicine.dosing ||
        selectedMedicine.dosing.configured !== true
    ) {

        showValidation(
            "A verified dosing rule is not configured for this medicine yet."
        );

        return;

    }


    /* -------------------------------------
       3. CONDITION
    ------------------------------------- */

    const selectedCondition =
        conditionSelect
            ? conditionSelect.value
            : "";


    const dosingType =
        selectedMedicine.dosing.type;


    if (
        (
            dosingType ===
                "mg_per_kg_per_day" ||

            dosingType ===
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
       4. AGE
    ------------------------------------- */

    const age =
        ageInput
            ? parseFloat(
                ageInput.value
            )
            : NaN;


    const hasAge =
        Number.isFinite(age);


    if (hasAge && age < 0) {

        showValidation(
            "Please enter a valid age."
        );

        return;

    }


    /* -------------------------------------
       5. WEIGHT
    ------------------------------------- */

    const weight =
        weightInput
            ? parseFloat(
                weightInput.value
            )
            : NaN;


    if (
        !Number.isFinite(weight) ||
        weight <= 0
    ) {

        showValidation(
            "Please enter a valid patient weight."
        );

        return;

    }


    /* -------------------------------------
       6. AGE RESTRICTION
    ------------------------------------- */

    const dosing =
        selectedMedicine.dosing;


    if (
        Number.isFinite(
            Number(
                dosing.minimumAgeMonths
            )
        )
    ) {

        if (!hasAge) {

            showValidation(
                "Please enter the patient's age."
            );

            return;

        }


        let ageMonths;


        if (
            ageUnit &&
            ageUnit.value === "years"
        ) {

            ageMonths =
                age * 12;

        }
        else {

            ageMonths =
                age;

        }


        if (
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
       7. CONCENTRATION
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
       8. DOSING REGIMEN
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
       9. CALCULATE MG
    ------------------------------------- */

    const mgResult =
        calculateDoseInMg(
            weight,
            dosingRegimen
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
       10. CONVERT MG → ML
    ------------------------------------- */

    const mlResult =
        convertMgToMl(
            mgResult.minMg,
            mgResult.maxMg,
            concentrationMg,
            concentrationMl
        );


    if (
        !mlResult ||
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
       11. DISPLAY RESULT
    ------------------------------------- */

    displayDoseResult(
        mgResult,
        mlResult,
        dosingRegimen,
        concentrationMg,
        concentrationMl
    );


    /* -------------------------------------
       12. SAVE TO HISTORY
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

hideSearchResults();
hideValidation();
hideResult();
