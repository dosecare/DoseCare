/* =========================================
   DoseCare
   Pediatric Dose Calculator
   Calculator Logic

   VERSION:
   - Syrups / Oral Suspensions ONLY
   - No clinical condition selection
   - User selects available concentration
   - Calculates dose + volume + frequency
   - Shows minimum / maximum / daily limits
========================================= */


/* =========================================
   STORAGE
========================================= */

const HISTORY_STORAGE_KEY = "dosecareHistory";


/* =========================================
   DOM ELEMENTS
========================================= */

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

const concentrationSelect =
    document.getElementById("concentration-select");

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
   MEDICINE FORM HELPERS
========================================= */

/*
    DoseCare currently works ONLY with
    liquid oral medicines.

    Accepted forms:
    - syrup
    - suspension
    - oral suspension
    - oral solution
    - solution
    - liquid

    Tablets / capsules / injections etc.
    are intentionally excluded.
*/

function isLiquidMedicine(medicine) {

    if (!medicine) {
        return false;
    }

    const possibleForms = [

        medicine.dosageForm,
        medicine.dosage_form,
        medicine.form,
        medicine.routeForm,
        medicine.preparation,
        medicine.pharmaceuticalForm

    ];


    const forms = possibleForms
        .filter(Boolean)
        .map(value =>
            String(value)
                .trim()
                .toLowerCase()
        );


    /*
        If the database explicitly contains
        a tablet or capsule form, reject it.
    */

    const forbiddenForms = [

        "tablet",
        "tablets",
        "tab",
        "capsule",
        "capsules",
        "cap",
        "injection",
        "injectable",
        "cream",
        "ointment",
        "gel",
        "drops",
        "suppository"

    ];


    if (
        forms.some(
            form =>
                forbiddenForms.includes(form)
        )
    ) {

        return false;

    }


    /*
        Explicit liquid form
    */

    if (
        forms.some(
            form =>
                form.includes("syrup") ||
                form.includes("suspension") ||
                form.includes("solution") ||
                form.includes("liquid")
        )
    ) {

        return true;

    }


    /*
        If the medicine has concentration
        in mg/mL or mg/5mL, it is treated
        as a liquid medicine.
    */

    if (
        getAvailableConcentrations(
            medicine
        ).length > 0
    ) {

        return true;

    }


    return false;

}


/* =========================================
   MEDICINE NAME
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
   CONCENTRATION HELPERS
========================================= */

/*
    Converts concentration text such as:

    "250 mg/5 mL"
    "125mg/5ml"
    "100 mg / 5 mL"

    into:

    {
        mg: 250,
        ml: 5
    }
*/

function parseConcentrationString(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return null;

    }


    const text =
        String(value)
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "");


    const match =
        text.match(
            /(\d+(?:\.\d+)?)mg\/(\d+(?:\.\d+)?)ml/
        );


    if (!match) {
        return null;
    }


    const mg =
        parseFloat(
            match[1]
        );


    const ml =
        parseFloat(
            match[2]
        );


    if (
        !Number.isFinite(mg) ||
        !Number.isFinite(ml) ||
        mg <= 0 ||
        ml <= 0
    ) {

        return null;

    }


    return {
        mg: mg,
        ml: ml
    };

}


/*
    Read available concentrations from
    different possible database structures.

    Supported examples:

    concentrations: [
        "125 mg/5 mL",
        "250 mg/5 mL"
    ]

    OR:

    concentrations: [
        {
            mg: 125,
            ml: 5
        },
        {
            mg: 250,
            ml: 5
        }
    ]

    OR:

    concentration:
        "250 mg/5 mL"
*/

function getAvailableConcentrations(
    medicine
) {

    if (!medicine) {
        return [];
    }


    let rawConcentrations = [];


    /*
        Preferred database field
    */

    if (
        Array.isArray(
            medicine.concentrations
        )
    ) {

        rawConcentrations =
            medicine.concentrations;

    }


    /*
        Alternative database field
    */

    else if (
        Array.isArray(
            medicine.availableConcentrations
        )
    ) {

        rawConcentrations =
            medicine.availableConcentrations;

    }


    /*
        Single concentration
    */

    else if (
        medicine.concentration
    ) {

        rawConcentrations = [
            medicine.concentration
        ];

    }


    /*
        Older structure:
        concentration may be an object
    */

    else if (
        medicine.concentrationMg &&
        medicine.concentrationMl
    ) {

        rawConcentrations = [

            {
                mg:
                    medicine.concentrationMg,

                ml:
                    medicine.concentrationMl

            }

        ];

    }


    const normalized = [];


    rawConcentrations.forEach(
        item => {

            let concentration = null;


            /*
                String:
                "250 mg/5 mL"
            */

            if (
                typeof item ===
                "string"
            ) {

                concentration =
                    parseConcentrationString(
                        item
                    );

            }


            /*
                Object:
                { mg: 250, ml: 5 }
            */

            else if (
                item &&
                typeof item ===
                "object"
            ) {

                const mg =
                    Number(
                        item.mg ??
                        item.mgPerVolume ??
                        item.concentrationMg
                    );


                const ml =
                    Number(
                        item.ml ??
                        item.volume ??
                        item.concentrationMl
                    );


                if (
                    Number.isFinite(mg) &&
                    Number.isFinite(ml) &&
                    mg > 0 &&
                    ml > 0
                ) {

                    concentration = {
                        mg: mg,
                        ml: ml
                    };

                }


                /*
                    Object containing
                    concentration string
                */

                if (
                    !concentration &&
                    item.concentration
                ) {

                    concentration =
                        parseConcentrationString(
                            item.concentration
                        );

                }

            }


            if (!concentration) {
                return;
            }


            /*
                Avoid duplicate concentrations
            */

            const exists =
                normalized.some(
                    current =>
                        current.mg ===
                            concentration.mg &&
                        current.ml ===
                            concentration.ml
                );


            if (!exists) {

                normalized.push(
                    concentration
                );

            }

        }
    );


    return normalized;

}


/* =========================================
   FORMAT CONCENTRATION
========================================= */

function formatConcentration(
    concentration
) {

    if (!concentration) {
        return "";
    }


    return `${formatNumber(concentration.mg)} mg/${formatNumber(concentration.ml)} mL`;

}


/* =========================================
   POPULATE CONCENTRATION SELECT
========================================= */

function populateConcentrations(
    medicine
) {

    if (!concentrationSelect) {
        return;
    }


    concentrationSelect.innerHTML = "";


    const defaultOption =
        document.createElement(
            "option"
        );


    defaultOption.value = "";


    defaultOption.textContent =
        "Select concentration";


    concentrationSelect.appendChild(
        defaultOption
    );


    const concentrations =
        getAvailableConcentrations(
            medicine
        );


    concentrations.forEach(
        concentration => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                JSON.stringify(
                    concentration
                );


            option.textContent =
                formatConcentration(
                    concentration
                );


            concentrationSelect.appendChild(
                option
            );

        }
    );


    concentrationSelect.disabled =
        concentrations.length === 0;


    /*
        Keep manual concentration inputs
        synchronized if they exist.
    */

    if (
        concentrationValue
    ) {

        concentrationValue.value =
            "";

    }


    if (
        concentrationVolume
    ) {

        concentrationVolume.value =
            "";

    }

}


/* =========================================
   CONCENTRATION SELECT CHANGE
========================================= */

if (concentrationSelect) {

    concentrationSelect.addEventListener(
        "change",
        () => {

            const value =
                concentrationSelect.value;


            if (!value) {

                if (concentrationValue) {
                    concentrationValue.value =
                        "";
                }

                if (concentrationVolume) {
                    concentrationVolume.value =
                        "";
                }

                return;

            }


            try {

                const concentration =
                    JSON.parse(
                        value
                    );


                if (
                    concentrationValue
                ) {

                    concentrationValue.value =
                        concentration.mg;

                }


                if (
                    concentrationVolume
                ) {

                    concentrationVolume.value =
                        concentration.ml;

                }

            }
            catch (error) {

                console.error(
                    "Concentration parsing error:",
                    error
                );

            }

        }
    );

}


/* =========================================
   FILTER LIQUID MEDICINES
========================================= */

function getAvailableMedicines() {

    if (
        !Array.isArray(
            medicines
        )
    ) {

        return [];

    }


    return medicines.filter(
        medicine =>
            isLiquidMedicine(
                medicine
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
        getAvailableMedicines();


    medicineSelect.innerHTML =
        "";


    const defaultOption =
        document.createElement(
            "option"
        );


    defaultOption.value =
        "";


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
                String(
                    medicine.id
                );


            option.textContent =
                getMedicineName(
                    medicine
                );


            medicineSelect.appendChild(
                option
            );

        }
    );


    medicineSelect.disabled =
        false;


    if (
        selectedMedicine &&
        availableMedicines.some(
            medicine =>
                String(
                    medicine.id
                ) ===
                String(
                    selectedMedicine.id
                )
        )
    ) {

        medicineSelect.value =
            String(
                selectedMedicine.id
            );

    }

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
                getMedicineById(
                    medicineId
                );


            if (
                !isLiquidMedicine(
                    medicine
                )
            ) {

                showValidation(
                    "DoseCare currently supports liquid medicines only."
                );


                clearSelectedMedicine();

                return;

            }


            selectMedicine(
                medicine
            );

        }
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


    if (
        !isLiquidMedicine(
            medicine
        )
    ) {

        showValidation(
            "DoseCare currently supports syrups and oral liquid medicines only."
        );

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
            String(
                medicine.id
            );

    }


    if (clearMedicine) {

        clearMedicine.style.display =
            "flex";

    }


    populateConcentrations(
        medicine
    );


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


    if (concentrationSelect) {

        concentrationSelect.innerHTML =
            "";


        const option =
            document.createElement(
                "option"
            );


        option.value =
            "";


        option.textContent =
            "Select concentration";


        concentrationSelect.appendChild(
            option
        );


        concentrationSelect.disabled =
            true;

    }


    if (concentrationValue) {

        concentrationValue.value =
            "";

    }


    if (concentrationVolume) {

        concentrationVolume.value =
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
                getAvailableMedicines()
                    .filter(
                        medicine => {

                            const name =
                                getMedicineName(
                                    medicine
                                )
                                .toLowerCase();


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
                                    ? medicine.drugClass
                                        .join(" ")
                                        .toLowerCase()
                                    : String(
                                        medicine.drugClass ||
                                        medicine.class ||
                                        ""
                                    )
                                    .toLowerCase();


                            const brandMatch =
                                brands.some(
                                    brand =>
                                        String(
                                            brand
                                        )
                                        .toLowerCase()
                                        .includes(
                                            searchTerm
                                        )
                                );


                            return (
                                name.includes(
                                    searchTerm
                                ) ||
                                brandMatch ||
                                drugClass.includes(
                                    searchTerm
                                )
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
            <span>No liquid medicine found</span>
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
   VALIDATION UI
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
   RESULT UI
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
   NUMBER FORMATTER
========================================= */

function formatNumber(
    value,
    decimals = 2
) {

    if (!Number.isFinite(value)) {

        return "—";

    }


    const rounded =
        Number(
            value.toFixed(
                decimals
            )
        );


    return rounded.toLocaleString(
        "en-US"
    );

}


/* =========================================
   AGE
========================================= */

function getAgeInMonths() {

    const age =
        ageInput
            ? parseFloat(
                ageInput.value
            )
            : NaN;


    if (!Number.isFinite(age)) {

        return null;

    }


    const unit =
        ageUnit
            ? String(
                ageUnit.value
            ).toLowerCase()
            : "years";


    if (
        unit === "month" ||
        unit === "months" ||
        unit === "mo"
    ) {

        return age;

    }


    return age * 12;

}


/* =========================================
   AGE FORMAT
========================================= */

function formatAgeFromMonths(
    months
) {

    if (months < 12) {

        return `${formatNumber(months, 0)} month(s)`;

    }


    const years =
        months / 12;


    if (
        Number.isInteger(
            years
        )
    ) {

        return `${years} year(s)`;

    }


    return `${formatNumber(years, 1)} year(s)`;

}


/* =========================================
   AGE VALIDATION
========================================= */

function validateMedicineAge(
    medicine
) {

    if (!medicine) {

        return {
            valid: true
        };

    }


    const ageMonths =
        getAgeInMonths();


    if (!Number.isFinite(ageMonths)) {

        return {
            valid: true
        };

    }


    const dosing =
        medicine.dosing;


    if (!dosing) {

        return {
            valid: true
        };

    }


    if (
        Number.isFinite(
            Number(
                dosing.minimumAgeMonths
            )
        ) &&
        ageMonths <
            Number(
                dosing.minimumAgeMonths
            )
    ) {

        return {

            valid: false,

            message:
                `${getMedicineName(medicine)} is not configured for use below ${formatAgeFromMonths(
                    Number(
                        dosing.minimumAgeMonths
                    )
                )}.`

        };

    }


    if (
        Number.isFinite(
            Number(
                dosing.minimumAgeYears
            )
        ) &&
        ageMonths <
            Number(
                dosing.minimumAgeYears
            ) * 12
    ) {

        return {

            valid: false,

            message:
                `${getMedicineName(medicine)} is not configured for use below ${dosing.minimumAgeYears} year(s).`

        };

    }


    if (
        Number.isFinite(
            Number(
                dosing.maximumAgeYears
            )
        ) &&
        ageMonths >
            Number(
                dosing.maximumAgeYears
            ) * 12
    ) {

        return {

            valid: false,

            message:
                `${getMedicineName(medicine)} is not configured for pediatric dosing above ${dosing.maximumAgeYears} years.`

        };

    }


    return {
        valid: true
    };

}


/* =========================================
   GET BASE DOSING RULE
========================================= */

/*
    IMPORTANT:

    The calculator no longer asks for a
    clinical condition.

    Therefore the medicine database must
    contain a GENERAL pediatric dosing rule.

    Supported:

    1. mg_per_kg_per_dose

    2. mg_per_kg_per_day
*/

function calculateDosingRule(
    medicine,
    weight
) {

    if (
        !medicine ||
        !medicine.dosing
    ) {

        return {

            success: false,

            message:
                "A dosing rule has not been configured for this medicine."

        };

    }


    const dosing =
        medicine.dosing;


    if (
        dosing.configured !== true
    ) {

        return {

            success: false,

            message:
                "A verified pediatric dosing rule has not been configured for this medicine."

        };

    }


    const type =
        String(
            dosing.type ||
            ""
        )
        .toLowerCase();


    /* =====================================
       MG / KG / DOSE
    ===================================== */

    if (
        type ===
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
            !Number.isFinite(
                minDose
            ) ||
            !Number.isFinite(
                maxDose
            )
        ) {

            return {

                success: false,

                message:
                    "The dosing rule is incomplete."

            };

        }


        let minMg =
            weight *
            minDose;


        let maxMg =
            weight *
            maxDose;


        const frequency =
            Number(
                dosing.frequency
            ) || 1;


        /*
            Maximum per dose
        */

        if (
            Number.isFinite(
                Number(
                    dosing.maxPerDose
                )
            )
        ) {

            maxMg =
                Math.min(
                    maxMg,
                    Number(
                        dosing.maxPerDose
                    )
                );

        }


        /*
            Maximum daily dose
        */

        if (
            Number.isFinite(
                Number(
                    dosing.maxDailyDose
                )
            )
        ) {

            maxMg =
                Math.min(
                    maxMg,
                    Number(
                        dosing.maxDailyDose
                    ) /
                    frequency
                );

        }


        return {

            success: true,

            minMg:
                minMg,

            maxMg:
                maxMg,

            dailyMinMg:
                minMg *
                frequency,

            dailyMaxMg:
                maxMg *
                frequency,

            frequency:
                getFrequencyText(
                    dosing,
                    frequency
                ),

            dosesPerDay:
                frequency,

            unit:
                "mg/kg/dose",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                Number(
                    dosing.maxPerDose
                ),

            maxDailyDose:
                Number(
                    dosing.maxDailyDose
                )

        };

    }


    /* =====================================
       MG / KG / DAY
    ===================================== */

    if (
        type ===
        "mg_per_kg_per_day"
    ) {

        const minDailyDose =
            Number(
                dosing.minDose
            );


        const maxDailyDose =
            Number(
                dosing.maxDose
            );


        if (
            !Number.isFinite(
                minDailyDose
            ) ||
            !Number.isFinite(
                maxDailyDose
            )
        ) {

            return {

                success: false,

                message:
                    "The dosing rule is incomplete."

            };

        }


        let dailyMinMg =
            weight *
            minDailyDose;


        let dailyMaxMg =
            weight *
            maxDailyDose;


        /*
            Maximum total daily dose
        */

        if (
            Number.isFinite(
                Number(
                    dosing.maxDailyDose
                )
            )
        ) {

            dailyMaxMg =
                Math.min(
                    dailyMaxMg,
                    Number(
                        dosing.maxDailyDose
                    )
                );

        }


        const frequency =
            Number(
                dosing.frequency
            ) || 1;


        const minMg =
            dailyMinMg /
            frequency;


        let maxMg =
            dailyMaxMg /
            frequency;


        /*
            Maximum per administration
        */

        if (
            Number.isFinite(
                Number(
                    dosing.maxPerDose
                )
            )
        ) {

            maxMg =
                Math.min(
                    maxMg,
                    Number(
                        dosing.maxPerDose
                    )
                );

        }


        return {

            success: true,

            minMg:
                minMg,

            maxMg:
                maxMg,

            dailyMinMg:
                dailyMinMg,

            dailyMaxMg:
                dailyMaxMg,

            frequency:
                getFrequencyText(
                    dosing,
                    frequency
                ),

            dosesPerDay:
                frequency,

            unit:
                "mg/kg/day",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                Number(
                    dosing.maxPerDose
                ),

            maxDailyDose:
                Number(
                    dosing.maxDailyDose
                )

        };

    }


    return {

        success: false,

        message:
            `Unsupported dosing type: ${dosing.type || "not specified"}`

    };

}


/* =========================================
   FREQUENCY TEXT
========================================= */

function getFrequencyText(
    dosing,
    frequency
) {

    if (
        dosing.interval
    ) {

        return dosing.interval;

    }


    if (
        dosing.frequencyText
    ) {

        return dosing.frequencyText;

    }


    if (
        frequency === 1
    ) {

        return "Once daily";

    }


    return `${frequency} times daily`;

}


/* =========================================
   CONVERT MG TO ML
========================================= */

function calculateVolume(
    doseMg,
    concentrationMg,
    concentrationMl
) {

    if (
        !Number.isFinite(
            doseMg
        ) ||
        !Number.isFinite(
            concentrationMg
        ) ||
        !Number.isFinite(
            concentrationMl
        ) ||
        concentrationMg <= 0 ||
        concentrationMl <= 0
    ) {

        return NaN;

    }


    return (
        doseMg *
        concentrationMl
    ) /
    concentrationMg;

}


/* =========================================
   DISPLAY RESULT
========================================= */

function displayDoseResult(
    result,
    concentrationMg,
    concentrationMl
) {

    if (!result) {
        return;
    }


    const minMg =
        result.minMg;


    const maxMg =
        result.maxMg;


    const minMl =
        calculateVolume(
            minMg,
            concentrationMg,
            concentrationMl
        );


    const maxMl =
        calculateVolume(
            maxMg,
            concentrationMg,
            concentrationMl
        );


    /* =====================================
       MAIN DOSE
    ===================================== */

    if (doseResult) {

        if (
            Math.abs(
                maxMg -
                minMg
            ) < 0.001
        ) {

            doseResult.textContent =
                `${formatNumber(minMg)} mg`;

        }
        else {

            doseResult.textContent =
                `${formatNumber(minMg)}–${formatNumber(maxMg)} mg`;

        }

    }


    if (doseUnit) {

        doseUnit.textContent =
            "per dose";

    }


    /* =====================================
       DETAILS
    ===================================== */

    if (resultDetails) {

        const details = [];


        /*
            Volume
        */

        if (
            Number.isFinite(
                minMl
            ) &&
            Number.isFinite(
                maxMl
            )
        ) {

            let volumeText;


            if (
                Math.abs(
                    maxMl -
                    minMl
                ) < 0.01
            ) {

                volumeText =
                    `${formatNumber(minMl)} mL`;

            }
            else {

                volumeText =
                    `${formatNumber(minMl)}–${formatNumber(maxMl)} mL`;

            }


            details.push(
                `<strong>Give:</strong> ${volumeText} per dose`
            );

        }


        /*
            Concentration
        */

        details.push(
            `<strong>Concentration:</strong> ${formatNumber(concentrationMg)} mg/${formatNumber(concentrationMl)} mL`
        );


        /*
            Frequency
        */

        if (
            result.frequency
        ) {

            details.push(
                `<strong>Frequency:</strong> ${result.frequency}`
            );

        }


        /*
            Daily dose
        */

        if (
            Number.isFinite(
                result.dailyMinMg
            ) &&
            Number.isFinite(
                result.dailyMaxMg
            )
        ) {

            if (
                Math.abs(
                    result.dailyMaxMg -
                    result.dailyMinMg
                ) < 0.001
            ) {

                details.push(
                    `<strong>Total daily dose:</strong> ${formatNumber(result.dailyMinMg)} mg/day`
                );

            }
            else {

                details.push(
                    `<strong>Total daily dose:</strong> ${formatNumber(result.dailyMinMg)}–${formatNumber(result.dailyMaxMg)} mg/day`
                );

            }

        }


        /*
            Maximum per dose
        */

        if (
            Number.isFinite(
                result.maxPerDose
            )
        ) {

            const maxPerDoseMl =
                calculateVolume(
                    result.maxPerDose,
                    concentrationMg,
                    concentrationMl
                );


            let maxDoseText =
                `${formatNumber(result.maxPerDose)} mg`;


            if (
                Number.isFinite(
                    maxPerDoseMl
                )
            ) {

                maxDoseText +=
                    ` (${formatNumber(maxPerDoseMl)} mL)`;

            }


            details.push(
                `<strong>Maximum per dose:</strong> ${maxDoseText}`
            );

        }


        /*
            Maximum daily dose
        */

        if (
            Number.isFinite(
                result.maxDailyDose
            )
        ) {

            const maxDailyMl =
                calculateVolume(
                    result.maxDailyDose,
                    concentrationMg,
                    concentrationMl
                );


            let maxDailyText =
                `${formatNumber(result.maxDailyDose)} mg/day`;


            if (
                Number.isFinite(
                    maxDailyMl
                )
            ) {

                maxDailyText +=
                    ` (${formatNumber(maxDailyMl)} mL/day)`;

            }


            details.push(
                `<strong>Maximum daily dose:</strong> ${maxDailyText}`
            );

        }


        /*
            Duration
        */

        if (
            result.duration
        ) {

            details.push(
                `<strong>Duration:</strong> ${result.duration}`
            );

        }


        /*
            Age information
        */

        const ageMonths =
            getAgeInMonths();


        if (
            Number.isFinite(
                ageMonths
            )
        ) {

            details.push(
                `<strong>Patient age:</strong> ${formatAgeFromMonths(ageMonths)}`
            );

        }


        /*
            Weight
        */

        if (
            weightInput &&
            Number.isFinite(
                parseFloat(
                    weightInput.value
                )
            )
        ) {

            details.push(
                `<strong>Weight:</strong> ${formatNumber(
                    parseFloat(
                        weightInput.value
                    )
                )} kg`
            );

        }


        /*
            Medicine notes
        */

        if (
            selectedMedicine &&
            selectedMedicine.notes
        ) {

            details.push(
                `<strong>Important note:</strong> ${selectedMedicine.notes}`
            );

        }


        /*
            Warnings
        */

        if (
            selectedMedicine &&
            selectedMedicine.warnings
        ) {

            details.push(
                `<strong>Warning:</strong> ${selectedMedicine.warnings}`
            );

        }


        resultDetails.innerHTML =
            details.join(
                "<br>"
            );

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
            JSON.parse(
                saved
            );


        return Array.isArray(
            history
        )
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
   SAVE HISTORY
========================================= */

function saveCalculationToHistory(
    data
) {

    let history =
        getCalculationHistory();


    const now =
        new Date();


    const historyItem = {

        id:
            Date.now(),

        medicine:
            data.medicine,

        dose:
            data.dose,

        doseUnit:
            data.doseUnit,

        volume:
            data.volume,

        age:
            data.age,

        ageUnit:
            data.ageUnit,

        weight:
            data.weight,

        concentration:
            data.concentration,

        frequency:
            data.frequency,

        duration:
            data.duration,

        date:
            now.toLocaleDateString(
                "en-GB"
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


    history =
        history.slice(
            0,
            50
        );


    localStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(
            history
        )
    );


    console.log(
        "Calculation saved to history:",
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


    /* =====================================
       1. MEDICINE
    ===================================== */

    if (!selectedMedicine) {

        showValidation(
            "Please select a medicine before calculating the dose."
        );

        return;

    }


    /* =====================================
       2. AGE
    ===================================== */

    const age =
        ageInput
            ? parseFloat(
                ageInput.value
            )
            : NaN;


    if (
        !Number.isFinite(age) ||
        age < 0
    ) {

        showValidation(
            "Please enter the patient's age."
        );

        return;

    }


    /* =====================================
       3. WEIGHT
    ===================================== */

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
            "Please enter the patient's weight."
        );

        return;

    }


    /* =====================================
       4. AGE VALIDATION
    ===================================== */

    const ageValidation =
        validateMedicineAge(
            selectedMedicine
        );


    if (
        !ageValidation.valid
    ) {

        showValidation(
            ageValidation.message
        );

        return;

    }


    /* =====================================
       5. CONCENTRATION
    ===================================== */

    let concentrationMg =
        NaN;


    let concentrationMl =
        NaN;


    /*
        Preferred:
        user selected one of the
        available concentrations.
    */

    if (
        concentrationSelect &&
        concentrationSelect.value
    ) {

        try {

            const selected =
                JSON.parse(
                    concentrationSelect.value
                );


            concentrationMg =
                Number(
                    selected.mg
                );


            concentrationMl =
                Number(
                    selected.ml
                );

        }
        catch (error) {

            console.error(
                "Selected concentration error:",
                error
            );

        }

    }


    /*
        Fallback:
        manually entered concentration.
    */

    if (
        !Number.isFinite(
            concentrationMg
        ) ||
        !Number.isFinite(
            concentrationMl
        )
    ) {

        concentrationMg =
            concentrationValue
                ? parseFloat(
                    concentrationValue.value
                )
                : NaN;


        concentrationMl =
            concentrationVolume
                ? parseFloat(
                    concentrationVolume.value
                )
                : NaN;

    }


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
            "Please select the available medicine concentration."
        );

        return;

    }


    /* =====================================
       6. CALCULATE
    ===================================== */

    const result =
        calculateDosingRule(
            selectedMedicine,
            weight
        );


    if (
        !result.success
    ) {

        showValidation(
            result.message ||
            "Unable to calculate the pediatric dose."
        );

        return;

    }


    /* =====================================
       7. DISPLAY RESULT
    ===================================== */

    displayDoseResult(
        result,
        concentrationMg,
        concentrationMl
    );


    /* =====================================
       8. HISTORY VOLUME
    ===================================== */

    const minMl =
        calculateVolume(
            result.minMg,
            concentrationMg,
            concentrationMl
        );


    const maxMl =
        calculateVolume(
            result.maxMg,
            concentrationMg,
            concentrationMl
        );


    let doseText;


    if (
        Math.abs(
            result.maxMg -
            result.minMg
        ) < 0.001
    ) {

        doseText =
            `${formatNumber(result.minMg)} mg`;

    }
    else {

        doseText =
            `${formatNumber(result.minMg)}–${formatNumber(result.maxMg)} mg`;

    }


    let volumeText;


    if (
        Math.abs(
            maxMl -
            minMl
        ) < 0.01
    ) {

        volumeText =
            `${formatNumber(minMl)} mL`;

    }
    else {

        volumeText =
            `${formatNumber(minMl)}–${formatNumber(maxMl)} mL`;

    }


    /* =====================================
       9. SAVE HISTORY
    ===================================== */

    saveCalculationToHistory({

        medicine:
            getMedicineName(
                selectedMedicine
            ),

        dose:
            doseText,

        doseUnit:
            "per dose",

        volume:
            volumeText,

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
            `${concentrationMg} mg/${concentrationMl} mL`,

        frequency:
            result.frequency ||
            "",

        duration:
            result.duration ||
            ""

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
   INITIALIZE
========================================= */

function initializeCalculator() {

    populateMedicineSelect();


    if (concentrationSelect) {

        concentrationSelect.innerHTML =
            "";


        const option =
            document.createElement(
                "option"
            );


        option.value =
            "";


        option.textContent =
            "Select concentration";


        concentrationSelect.appendChild(
            option
        );


        concentrationSelect.disabled =
            true;

    }


    hideValidation();

    hideResult();


    if (
        selectedMedicine &&
        medicineSelect
    ) {

        medicineSelect.value =
            String(
                selectedMedicine.id
            );


        populateConcentrations(
            selectedMedicine
        );

    }

}


/* =========================================
   START
========================================= */

initializeCalculator();
