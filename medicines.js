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
            "Oral · Rectal",

        indications:
            "Used for fever and mild to moderate pain.",

        moa:
            "Produces analgesic and antipyretic effects primarily through central inhibition of prostaglandin synthesis.",

        pediatric:
            "Dose according to body weight. For children under 3 months, automatic dosing should not be provided without medical direction.",

        dosing: {

            type:
                "mg_per_kg_per_dose",

            minDose:
                10,

            maxDose:
                15,

            frequency:
                "every 4–6 hours as needed",

            maxDosesPer24Hours:
                4,

            maxDailyDose:
                60,

            unit:
                "mg/kg/dose",

            route:
                "oral",

            minimumAgeMonths:
                3,

            underThreeMonths:
                "doctor_directed",

            configured:
                true

        },

        indicationSpecific:
            false,

        notes:
            "Verify the child's weight, formulation concentration, dosing interval, maximum doses in 24 hours, and other acetaminophen-containing medicines before administration.",

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
                    "WHO AWaRe Antibiotic Book / Pediatric dosing information",

                year:
                    2022,

                url:
                    "https://iris.who.int/handle/10665/365237"
            },

            {
                organization:
                    "U.S. Food and Drug Administration",

                title:
                    "Acetaminophen — Safe Use in Infants and Children",

                url:
                    "https://www.fda.gov/drugs/safe-use-over-counter-pain-relievers-and-fever-reducers/acetaminophen"
            }

        ]

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
            "NSAID · Analgesic · Antipyretic",

        conditions: [
            "fever",
            "mild to moderate pain",
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
            "Use in children depends on age, body weight, hydration status, renal function and clinical condition. Avoid use in dehydrated children or when NSAIDs are contraindicated.",

        dosing: {

            type:
                "mg_per_kg_per_dose",

            minDose:
                5,

            maxDose:
                10,

            frequency:
                "every 6–8 hours as needed",

            maxDosesPer24Hours:
                4,

            maxDailyDose:
                40,

            unit:
                "mg/kg/dose",

            route:
                "oral",

            minimumAgeMonths:
                6,

            underSixMonths:
                "not_routinely_recommended",

            configured:
                true

        },

        indicationSpecific:
            false,

        notes:
            "Give with food or milk if gastrointestinal irritation occurs. Avoid in dehydration, significant renal impairment, NSAID hypersensitivity, or other NSAID contraindications. Verify the formulation concentration and total daily dose.",

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
                    "U.S. Food and Drug Administration",

                title:
                    "Ibuprofen Drug Facts Label",

                url:
                    "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers"
            }

        ]

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
            "Beta-lactam",
            "Antibiotic"
        ],

        class:
            "Penicillin · Beta-lactam · Antibiotic",

        conditions: [
            "bacterial infections",
            "community acquired pneumonia",
            "otitis media",
            "pharyngitis",
            "sinusitis"
        ],

        condition:
            "Bacterial infections",

        route:
            "Oral · IV",

        indications:
            "Used for susceptible bacterial infections, including selected respiratory infections, otitis media, pharyngitis and sinusitis.",

        moa:
            "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins, leading to bacterial cell lysis.",

        pediatric:
            "Pediatric dosing depends on the infection, severity, age and body weight. The appropriate indication-specific regimen should be selected before calculating the dose.",

        dosing: {

            type:
                "mg_per_kg_per_day",

            regimens: {

                "community acquired pneumonia": {

                    minDose:
                        80,

                    maxDose:
                        90,

                    frequency:
                        2,

                    maxPerDose:
                        4000

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

                },

                "pharyngitis": {

                    minDose:
                        50,

                    maxDose:
                        50,

                    frequency:
                        1,

                    maxDailyDose:
                        1000

                },

                "sinusitis": {

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

            minimumAgeMonths:
                1,

            configured:
                true

        },

        indicationSpecific:
            true,

        notes:
            "Select the clinical indication before calculating the dose. Verify the child's weight, infection severity, renal function, formulation concentration and maximum dose. Do not use amoxicillin for viral infections.",

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
                    "World Health Organization",

                title:
                    "WHO Report on Consensus Guidance on Pediatric Dosing Regimens",

                year:
                    2019,

                url:
                    "https://cdn.who.int/media/docs/default-source/essential-medicines/2019-eml-expert-committee/late-papers/abwg_paediatric_dosing_ab.pdf"
            }

        ]

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
            "acute otitis media",
            "community acquired pneumonia",
            "acute bacterial sinusitis",
            "pharyngitis",
            "tonsillitis"
        ],

        condition:
            "Bacterial infections",

        route:
            "Oral · IV",

        indications:
            "Used for selected susceptible bacterial infections including acute otitis media, community-acquired pneumonia, acute bacterial sinusitis, and pharyngitis/tonsillitis when appropriate.",

        moa:
            "Binds to the bacterial 50S ribosomal subunit and inhibits bacterial protein synthesis.",

        pediatric:
            "Pediatric dosing depends on the infection and the child's age and weight. Select the specific indication before calculating the dose.",

        dosing: {

            type:
                "condition_based",

            regimens: {

                "acute otitis media": {

                    minimumAgeMonths:
                        6,

                    options: [

                        {
                            dose:
                                30,

                            frequency:
                                "single dose",

                            duration:
                                "1 day"
                        },

                        {
                            dose:
                                10,

                            frequency:
                                "once daily",

                            duration:
                                "3 days"
                        },

                        {
                            day1:
                                10,

                            days2to5:
                                5,

                            frequency:
                                "once daily",

                            duration:
                                "5 days"
                        }

                    ]

                },

                "community acquired pneumonia": {

                    minimumAgeMonths:
                        6,

                    day1:
                        10,

                    days2to5:
                        5,

                    frequency:
                        "once daily",

                    duration:
                        "5 days"

                },

                "acute bacterial sinusitis": {

                    minimumAgeMonths:
                        6,

                    dose:
                        10,

                    frequency:
                        "once daily",

                    duration:
                        "3 days"

                },

                "pharyngitis": {

                    minimumAgeYears:
                        2,

                    dose:
                        12,

                    frequency:
                        "once daily",

                    duration:
                        "5 days"

                },

                "tonsillitis": {

                    minimumAgeYears:
                        2,

                    dose:
                        12,

                    frequency:
                        "once daily",

                    duration:
                        "5 days"

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
            "Select the indication before calculating. Verify age, weight, formulation concentration, treatment duration and local antimicrobial guidance. Consider QT-prolongation risk and clinically important drug interactions before use. Azithromycin should not be used routinely when a more appropriate first-line antibiotic is indicated.",

        references: [

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Report on Consensus Guidance on Pediatric Dosing Regimens",

                year:
                    2019,

                url:
                    "https://cdn.who.int/media/docs/default-source/essential-medicines/2019-eml-expert-committee/late-papers/abwg_paediatric_dosing_ab.pdf"
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
                    "Azithromycin Pediatric Labeling Information",

                url:
                    "https://www.accessdata.fda.gov/scripts/sda/sdDetailNavigation.cfm?id=14CE0322582C1B7DE053564DA8C071F2"
            }

        ]

    },


    /* =====================================
       CEFALEXIN
    ===================================== */

    {
        id: "cefalexin",

        genericName: "Cefalexin",

        name: "Cefalexin",

        brandNames: [
            "Keflex"
        ],

        drugClass: [
            "Cephalosporin",
            "Beta-lactam",
            "Antibiotic"
        ],

        class:
            "Cephalosporin · Beta-lactam · Antibiotic",

        conditions: [
            "bacterial infections",
            "otitis media",
            "streptococcal pharyngitis",
            "skin and soft tissue infections",
            "urinary tract infections"
        ],

        condition:
            "Bacterial infections",

        route:
            "Oral",

        indications:
            "Used for susceptible bacterial infections including selected respiratory, skin and soft tissue, urinary tract and streptococcal infections.",

        moa:
            "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins, leading to bacterial cell lysis.",

        pediatric:
            "Pediatric dosing depends on the infection, severity, age and body weight. Select the indication before calculating the dose.",

        dosing: {

            type:
                "condition_based",

            regimens: {

                "bacterial infections": {

                    minDose:
                        25,

                    maxDose:
                        50,

                    frequency:
                        4,

                    duration:
                        "7–14 days"

                },

                "streptococcal pharyngitis": {

                    minDose:
                        25,

                    maxDose:
                        50,

                    frequency:
                        4,

                    duration:
                        "at least 10 days"

                },

                "skin and soft tissue infections": {

                    minDose:
                        25,

                    maxDose:
                        50,

                    frequency:
                        4,

                    duration:
                        "7–14 days"

                },

                "urinary tract infections": {

                    minDose:
                        25,

                    maxDose:
                        50,

                    frequency:
                        2,

                    duration:
                        "7–14 days"

                },

                "otitis media": {

                    minDose:
                        75,

                    maxDose:
                        100,

                    frequency:
                        4,

                    duration:
                        "7–14 days"

                },

                "severe infections": {

                    minDose:
                        50,

                    maxDose:
                        100,

                    frequency:
                        4,

                    duration:
                        "7–14 days"

                }

            },

            route:
                "oral",

            minimumAgeYears:
                1,

            configured:
                true

        },

        indicationSpecific:
            true,

        notes:
            "Select the clinical indication before calculating. Verify weight, age, renal function, allergy history, formulation concentration and treatment duration. Dose adjustment may be required in severe renal impairment.",

        references: [

            {
                organization:
                    "U.S. Food and Drug Administration",

                title:
                    "KEFLEX (cephalexin) Prescribing Information",

                year:
                    2026,

                url:
                    "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/050406s014lbl.pdf"
            },

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Model Formulary for Children",

                year:
                    2010,

                url:
                    "https://iris.who.int/bitstream/10665/44309/1/9789241599320_eng.pdf"
            },

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Report on Consensus Guidance on Pediatric Dosing Regimens",

                year:
                    2019,

                url:
                    "https://cdn.who.int/media/docs/default-source/essential-medicines/2019-eml-expert-committee/late-papers/abwg_paediatric_dosing_ab.pdf"
            }

        ]

    },


    /* =====================================
       CEFUROXIME
    ===================================== */

    {
        id: "cefuroxime",

        genericName: "Cefuroxime",

        name: "Cefuroxime",

        brandNames: [
            "Ceftin",
            "Zinnat"
        ],

        drugClass: [
            "Cephalosporin",
            "Beta-lactam",
            "Antibiotic"
        ],

        class:
            "Second-generation Cephalosporin · Beta-lactam",

        conditions: [
            "pharyngitis",
            "tonsillitis",
            "acute otitis media",
            "acute bacterial sinusitis",
            "impetigo"
        ],

        condition:
            "Bacterial infections",

        route:
            "Oral",

        indications:
            "Used for selected mild to moderate bacterial infections including pharyngitis/tonsillitis, acute otitis media, acute bacterial maxillary sinusitis and impetigo.",

        moa:
            "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins, resulting in bacterial cell lysis.",

        pediatric:
            "For children 3 months to 12 years receiving oral suspension, dosing depends on the specific infection. The suspension should be administered with food.",

        dosing: {

            type:
                "condition_based",

            regimens: {

                "pharyngitis": {

                    dose:
                        20,

                    frequency:
                        2,

                    maxDailyDose:
                        500,

                    duration:
                        "10 days"

                },

                "tonsillitis": {

                    dose:
                        20,

                    frequency:
                        2,

                    maxDailyDose:
                        500,

                    duration:
                        "10 days"

                },

                "acute otitis media": {

                    dose:
                        30,

                    frequency:
                        2,

                    maxDailyDose:
                        1000,

                    duration:
                        "10 days"

                },

                "acute bacterial sinusitis": {

                    dose:
                        30,

                    frequency:
                        2,

                    maxDailyDose:
                        1000,

                    duration:
                        "10 days"

                },

                "impetigo": {

                    dose:
                        30,

                    frequency:
                        2,

                    maxDailyDose:
                        1000,

                    duration:
                        "10 days"

                }

            },

            unit:
                "mg/kg/day",

            route:
                "oral",

            minimumAgeMonths:
                3,

            maximumAgeYears:
                12,

            configured:
                true

        },

        indicationSpecific:
            true,

        notes:
            "Use the indication-specific regimen. Oral suspension should be administered with food. Cefuroxime tablets and oral suspension are not interchangeable on a mg-for-mg basis. Dose adjustment is required in patients with impaired renal function.",

        references: [

            {
                organization:
                    "U.S. Food and Drug Administration",

                title:
                    "CEFTIN (cefuroxime axetil) Prescribing Information",

                url:
                    "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/050605s051%2C050672s037lbl.pdf"
            },

            {
                organization:
                    "DailyMed",

                title:
                    "Cefuroxime Axetil for Oral Suspension",

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=135e2dfc-eb47-4d04-a903-a081d36c267e"
            }

        ]

    },
       /* =====================================
       CEFIXIME
    ===================================== */

    {
        id: "cefixime",

        genericName: "Cefixime",

        name: "Cefixime",

        brandNames: [
            "Suprax"
        ],

        drugClass: [
            "Cephalosporin",
            "Beta-lactam",
            "Antibiotic"
        ],

        class:
            "Third-generation Cephalosporin · Beta-lactam",

        conditions: [
            "acute otitis media",
            "pharyngitis",
            "tonsillitis",
            "urinary tract infections"
        ],

        condition:
            "Bacterial infections",

        route:
            "Oral",

        indications:
            "Used for susceptible bacterial infections including acute otitis media, pharyngitis/tonsillitis and uncomplicated urinary tract infections.",

        moa:
            "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins, resulting in bacterial cell lysis.",

        pediatric:
            "For children 6 months and older, the usual pediatric dose is 8 mg/kg/day, administered once daily or divided into two doses every 12 hours. The specific indication and maximum dose should be considered.",

        dosing: {

            type:
                "condition_based",

            regimens: {

                "acute otitis media": {

                    dose:
                        8,

                    frequency:
                        1,

                    alternativeFrequency:
                        2,

                    maxDailyDose:
                        400,

                    duration:
                        "10 days"

                },

                "pharyngitis": {

                    dose:
                        8,

                    frequency:
                        1,

                    alternativeFrequency:
                        2,

                    maxDailyDose:
                        400,

                    duration:
                        "10 days"

                },

                "tonsillitis": {

                    dose:
                        8,

                    frequency:
                        1,

                    alternativeFrequency:
                        2,

                    maxDailyDose:
                        400,

                    duration:
                        "10 days"

                },

                "urinary tract infections": {

                    dose:
                        8,

                    frequency:
                        1,

                    alternativeFrequency:
                        2,

                    maxDailyDose:
                        400,

                    duration:
                        "7 days"

                }

            },

            unit:
                "mg/kg/day",

            route:
                "oral",

            minimumAgeMonths:
                6,

            configured:
                true

        },

        indicationSpecific:
            true,

        notes:
            "Verify the indication, child's weight, formulation concentration and renal function. The total daily dose may be given once daily or divided into two equal doses every 12 hours. Dose adjustment may be required in significant renal impairment.",

        references: [

            {
                organization:
                    "U.S. Food and Drug Administration",

                title:
                    "SUPRAX (cefixime) Prescribing Information",

                url:
                    "https://www.accessdata.fda.gov/drugsatfda_docs/label/2010/050662s027lbl.pdf"
            },

            {
                organization:
                    "DailyMed",

                title:
                    "Cefixime — Oral Suspension",

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4e3e5c17-5a5f-4a54-a4b0-1a9d0c1d7a4b"
            }

        ]

    },


    /* =====================================
       CLINDAMYCIN
    ===================================== */

    {
        id: "clindamycin",

        genericName: "Clindamycin",

        name: "Clindamycin",

        brandNames: [
            "Dalacin",
            "Cleocin"
        ],

        drugClass: [
            "Lincosamide",
            "Antibiotic"
        ],

        class:
            "Lincosamide · Antibiotic",

        conditions: [
            "serious bacterial infections",
            "skin and soft tissue infections",
            "anaerobic infections",
            "streptococcal infections",
            "staphylococcal infections"
        ],

        condition:
            "Serious bacterial infections",

        route:
            "Oral · IV · IM",

        indications:
            "Used for serious bacterial infections caused by susceptible organisms, including selected skin and soft tissue, streptococcal, staphylococcal and anaerobic infections.",

        moa:
            "Binds to the 50S subunit of bacterial ribosomes and inhibits bacterial protein synthesis.",

        pediatric:
            "Pediatric dosing depends on infection severity and route. Oral dosing is divided into 3 or 4 equal doses. Clindamycin should be reserved for appropriate bacterial infections because of the risk of severe antibiotic-associated diarrhea and C. difficile colitis.",

        dosing: {

            type:
                "severity_based",

            regimens: {

                "serious infections": {

                    minDose:
                        8,

                    maxDose:
                        12,

                    frequencyOptions: [
                        3,
                        4
                    ]

                },

                "severe infections": {

                    minDose:
                        13,

                    maxDose:
                        16,

                    frequencyOptions: [
                        3,
                        4
                    ]

                },

                "more severe infections": {

                    minDose:
                        17,

                    maxDose:
                        25,

                    frequencyOptions: [
                        3,
                        4
                    ]

                }

            },

            unit:
                "mg/kg/day",

            route:
                "oral",

            minimumAgeMonths:
                0,

            configured:
                true

        },

        indicationSpecific:
            false,

        notes:
            "Use only when clinically appropriate. If significant diarrhea develops during therapy, clindamycin should be discontinued and C. difficile-associated diarrhea should be considered. Dose according to total body weight. For beta-hemolytic streptococcal infections, treatment should continue for at least 10 days.",

        references: [

            {
                organization:
                    "DailyMed",

                title:
                    "Clindamycin Palmitate Hydrochloride for Oral Solution — Pediatric",

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=b35e3714-44d1-4e6a-a124-555ad259fec1"
            },

            {
                organization:
                    "DailyMed",

                title:
                    "Clindamycin Hydrochloride Capsules",

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a341a3c8-9ed6-52e9-e053-2995a90a300f"
            },

            {
                organization:
                    "UCSF Infectious Diseases Management Program",

                title:
                    "Skin and Soft-Tissue Infections",

                url:
                    "https://idmp.ucsf.edu/guidelines-empiric-therapy-categories/skin-and-soft-tissue-infections"
            }

        ]

    },


    /* =====================================
       CEFTRIAXONE
    ===================================== */

    {
        id: "ceftriaxone",

        genericName: "Ceftriaxone",

        name: "Ceftriaxone",

        brandNames: [
            "Rocephin"
        ],

        drugClass: [
            "Third-generation cephalosporin",
            "Beta-lactam",
            "Antibiotic"
        ],

        class:
            "3rd Generation Cephalosporin · Beta-lactam",

        conditions: [
            "bacterial infections",
            "serious bacterial infections",
            "pneumonia",
            "meningitis",
            "skin and soft tissue infections",
            "otitis media"
        ],

        condition:
            "Serious bacterial infections · Pneumonia · Meningitis",

        route:
            "IV · IM",

        indications:
            "Used for susceptible bacterial infections including serious infections, pneumonia, meningitis, skin and skin-structure infections, and acute otitis media.",

        moa:
            "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins, resulting in bacterial cell death.",

        pediatric:
            "Pediatric dosing is indication-specific. Dose according to body weight and infection severity. Ceftriaxone should not be used in certain neonates because of bilirubin displacement and calcium-related precipitation risks.",

        dosing: {

            type:
                "condition_based",

            regimens: {

                serious_infections: {

                    minDose:
                        50,

                    maxDose:
                        75,

                    frequency:
                        1,

                    interval:
                        "once daily",

                    maxDailyDose:
                        2000

                },

                meningitis: {

                    minDose:
                        100,

                    maxDose:
                        100,

                    frequency:
                        1,

                    interval:
                        "once daily",

                    maxDailyDose:
                        4000

                },

                acute_otitis_media: {

                    minDose:
                        50,

                    maxDose:
                        50,

                    frequency:
                        1,

                    interval:
                        "single IM dose",

                    maxPerDose:
                        1000

                }

            },

            route:
                "IV · IM",

            configured:
                true

        },

        indicationSpecific:
            true,

        notes:
            "Verify the indication, weight, route, maximum dose and neonatal status before administration. Ceftriaxone is contraindicated in hyperbilirubinemic neonates and in neonates ≤28 days who require or are expected to require calcium-containing IV solutions.",

        references: [

            {
                organization:
                    "U.S. National Library of Medicine — DailyMed",

                title:
                    "Ceftriaxone Injection",

                year:
                    2024,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=4c5c2d3f-5038-41a1-a2fe-4dcd048dbac1"
            },

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Model Formulary for Children",

                year:
                    2010,

                url:
                    "https://iris.who.int/bitstream/10665/44309/1/9789241599320_eng.pdf"
            },

            {
                organization:
                    "World Health Organization",

                title:
                    "Consensus guidance on pediatric dosing regimens",

                year:
                    2019,

                url:
                    "https://cdn.who.int/media/docs/default-source/essential-medicines/2019-eml-expert-committee/late-papers/abwg_paediatric_dosing_ab.pdf"
            }

        ]

    },


    /* =====================================
       CEFOTAXIME
    ===================================== */

    {
        id: "cefotaxime",

        genericName: "Cefotaxime",

        name: "Cefotaxime",

        brandNames: [
            "Claforan"
        ],

        drugClass: [
            "Third-generation cephalosporin",
            "Beta-lactam",
            "Antibiotic"
        ],

        class:
            "3rd Generation Cephalosporin · Beta-lactam",

        conditions: [
            "serious bacterial infections",
            "pneumonia",
            "meningitis",
            "septicemia",
            "bone and joint infections",
            "skin and soft tissue infections"
        ],

        condition:
            "Serious bacterial infections · Pneumonia · Meningitis",

        route:
            "IV · IM",

        indications:
            "Used for serious infections caused by susceptible bacteria, including pneumonia, septicemia, meningitis, bone and joint infections, and selected skin and soft tissue infections.",

        moa:
            "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins, leading to bacterial cell death.",

        pediatric:
            "Pediatric dosing depends on age, body weight, infection severity and route. Higher doses and more frequent administration may be required for severe infections and meningitis.",

        dosing: {

            type:
                "condition_based",

            regimens: {

                neonate_0_to_7_days: {

                    minDose:
                        50,

                    maxDose:
                        50,

                    frequency:
                        2,

                    interval:
                        "every 12 hours"

                },

                neonate_1_to_4_weeks: {

                    minDose:
                        50,

                    maxDose:
                        50,

                    frequency:
                        3,

                    interval:
                        "every 8 hours"

                },

                children_standard: {

                    minDose:
                        50,

                    maxDose:
                        180,

                    frequency:
                        4,

                    maxFrequency:
                        6,

                    interval:
                        "every 4–6 hours",

                    maxDailyDose:
                        12000

                },

                severe_infection: {

                    minDose:
                        100,

                    maxDose:
                        180,

                    frequency:
                        4,

                    maxFrequency:
                        6,

                    interval:
                        "every 4–6 hours",

                    maxDailyDose:
                        12000

                }

            },

            route:
                "IV · IM",

            configured:
                true

        },

        indicationSpecific:
            true,

        notes:
            "Higher doses and more frequent administration are used for severe or serious infections, including meningitis. Adjust dosing when clinically indicated in renal impairment. Verify age, weight, indication, route, renal function and maximum daily dose before administration.",

        references: [

            {
                organization:
                    "U.S. National Library of Medicine — DailyMed",

                title:
                    "Cefotaxime Injection",

                year:
                    2024,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ef1a6dc6-bc3d-4f09-8f92-7ff328f56561"
            },

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
                    "Report on Consensus Guidance on Pediatric Dosing Regimens",

                year:
                    2019,

                url:
                    "https://cdn.who.int/media/docs/default-source/essential-medicines/2019-eml-expert-committee/late-papers/abwg_paediatric_dosing_ab.pdf"
            }

        ]

    },


    /* =========================================
       END OF MEDICINE DATABASE
    ========================================= */

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


            if (
                !Array.isArray(
                    medicine.conditions
                )
            ) {

                console.warn(
                    `Medicine "${medicine.genericName}" has invalid conditions data.`
                );

            }


            if (
                !Array.isArray(
                    medicine.brandNames
                )
            ) {

                console.warn(
                    `Medicine "${medicine.genericName}" has invalid brandNames data.`
                );

            }


            if (
                !Array.isArray(
                    medicine.drugClass
                )
            ) {

                console.warn(
                    `Medicine "${medicine.genericName}" has invalid drugClass data.`
                );

            }


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
