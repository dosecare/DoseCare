/* =========================================
   DoseCare
   ANALGESICS / ANTIPYRETICS DATABASE
========================================= */

/*
    System:
    Analgesics · Antipyretics · NSAIDs

    This file contains pediatric medicines
    used for pain and/or fever.

    IMPORTANT:
    Do not add these medicines to medicine.js.
    They are added automatically to the
    central DoseCare database below.
*/


/* =========================================
   PARACETAMOL
   Acetaminophen
========================================= */

const analgesicMedicines = [

    {
        id: "paracetamol",

        genericName:
            "Paracetamol",

        name:
            "Paracetamol",

        brandNames: [
            "Panadol",
            "Calpol",
            "Tylenol"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "Non-opioid analgesic",
            "Antipyretic"
        ],

        class:
            "Non-opioid Analgesic · Antipyretic",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "fever",
            "mild to moderate pain",
            "headache",
            "toothache",
            "musculoskeletal pain"
        ],

        condition:
            "Fever · Mild to moderate pain",

        route:
            "Oral · Rectal",

        dosageForms: [
            "oral liquid",
            "tablet",
            "dispersible tablet",
            "suppository"
        ],

        commonPediatricConcentrations: [
            "120 mg/5 mL",
            "125 mg/5 mL",
            "250 mg/5 mL"
        ],


        indications:
            "Used for the symptomatic treatment of fever and mild to moderate pain in children.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Produces analgesic and antipyretic effects mainly through central inhibition of prostaglandin synthesis. Its peripheral anti-inflammatory activity is weak compared with NSAIDs.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Pediatric dosing should be based on body weight and the specific formulation. Extra caution is required in young infants and in children receiving other acetaminophen-containing products.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "mg_per_kg_per_dose",

            minDose:
                10,

            maxDose:
                15,

            frequency:
                "every 4–6 hours as needed",

            frequencyPerDay:
                4,

            maxDosesPer24Hours:
                4,

            maxDailyDose:
                60,

            unit:
                "mg/kg/dose",

            dailyUnit:
                "mg/kg/day",

            route:
                "oral",

            minimumAgeMonths:
                3,

            underThreeMonths:
                "doctor_directed",

            configured:
                true

        },


        /* ---------------------------------
           INDICATION SPECIFIC
        --------------------------------- */

        indicationSpecific:
            false,


        /* ---------------------------------
           SAFETY
        --------------------------------- */

        contraindications: [
            "Severe hepatic impairment",
            "Known hypersensitivity to paracetamol"
        ],

        precautions: [
            "Hepatic impairment",
            "Malnutrition",
            "Dehydration",
            "Concurrent use of other acetaminophen/paracetamol-containing medicines"
        ],

        adverseEffects: [
            "Nausea",
            "Vomiting",
            "Skin reactions",
            "Hepatotoxicity in overdose"
        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "Always verify the child's weight, formulation concentration, dose interval and total dose in 24 hours. Do not give more than one medicine containing paracetamol/acetaminophen at the same time. Liquid formulations may have different concentrations.",


        /* ---------------------------------
           REFERENCES
        --------------------------------- */

        references: [

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Model Formulary for Children",

                year:
                    2010,

                url:
                    "https://www.who.int/publications/i/item/9789241599320"
            },

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Model List of Essential Medicines for Children — 10th List",

                year:
                    2025,

                url:
                    "https://www.who.int/publications/i/item/B09475"
            },

            {
                organization:
                    "U.S. Food and Drug Administration",

                title:
                    "Acetaminophen",

                url:
                    "https://www.fda.gov/drugs/safe-use-over-counter-pain-relievers-and-fever-reducers/acetaminophen"
            }

        ]

    },


    /* =========================================
       IBUPROFEN
    ========================================= */

    {
        id:
            "ibuprofen",

        genericName:
            "Ibuprofen",

        name:
            "Ibuprofen",

        brandNames: [
            "Brufen",
            "Nurofen",
            "Advil"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "NSAID",
            "Non-opioid analgesic",
            "Antipyretic",
            "Anti-inflammatory"
        ],

        class:
            "NSAID · Analgesic · Antipyretic · Anti-inflammatory",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "fever",
            "mild to moderate pain",
            "inflammation",
            "headache",
            "toothache",
            "musculoskeletal pain"
        ],

        condition:
            "Fever · Pain · Inflammation",

        route:
            "Oral",

        dosageForms: [
            "oral suspension",
            "tablet"
        ],

        commonPediatricConcentrations: [
            "100 mg/5 mL"
        ],


        indications:
            "Used for mild to moderate pain, fever and inflammatory conditions in appropriate pediatric patients.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Reversibly inhibits cyclooxygenase enzymes COX-1 and COX-2, reducing prostaglandin synthesis and producing analgesic, antipyretic and anti-inflammatory effects.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Use depends on age, body weight, hydration status, renal function and clinical condition. Ibuprofen should generally be avoided in children younger than 3 months and in dehydrated children.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "mg_per_kg_per_dose",

            minDose:
                5,

            maxDose:
                10,

            frequency:
                "every 6–8 hours as needed",

            frequencyPerDay:
                4,

            maxDosesPer24Hours:
                4,

            maxDailyDose:
                40,

            unit:
                "mg/kg/dose",

            dailyUnit:
                "mg/kg/day",

            route:
                "oral",

            minimumAgeMonths:
                3,

            underThreeMonths:
                "not_recommended",

            configured:
                true

        },


        /* ---------------------------------
           INDICATION SPECIFIC
        --------------------------------- */

        indicationSpecific:
            false,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [
            "Hypersensitivity to ibuprofen or other NSAIDs",
            "Active peptic ulceration or gastrointestinal bleeding",
            "Severe renal failure",
            "Severe hepatic failure",
            "Severe cardiac failure"
        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [
            "Dehydration",
            "Renal impairment",
            "Asthma associated with NSAID hypersensitivity",
            "History of peptic ulcer disease",
            "Bleeding disorders",
            "Concomitant medicines that increase bleeding risk"
        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [
            "Nausea",
            "Vomiting",
            "Dyspepsia",
            "Gastrointestinal irritation",
            "Gastrointestinal bleeding",
            "Renal impairment",
            "Hypersensitivity reactions"
        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "Give with or after food when appropriate. Avoid use in dehydrated children because of increased renal risk. Verify age, weight, formulation concentration, renal status and total daily dose before administration.",


        /* ---------------------------------
           REFERENCES
        --------------------------------- */

        references: [

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Model Formulary for Children",

                year:
                    2010,

                url:
                    "https://www.who.int/publications/i/item/9789241599320"
            },

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Model List of Essential Medicines for Children — 10th List",

                year:
                    2025,

                url:
                    "https://www.who.int/publications/i/item/B09475"
            }

        ]

    }

];


/* =========================================
   ADD ANALGESICS TO DOSECARE DATABASE
========================================= */

analgesicMedicines.forEach(
    medicine => {

        if (
            !medicines.some(
                existingMedicine =>
                    existingMedicine.id ===
                    medicine.id
            )
        ) {

            medicines.push(
                medicine
            );

        }

    }
);
