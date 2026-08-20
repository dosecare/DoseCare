/* =========================================
   DoseCare
   ANTIBIOTICS DATABASE
========================================= */


/*
   IMPORTANT

   This file contains antibiotic medicine data only.

   It expects medicines.js to be loaded BEFORE this file.

   All medicines are registered into the central
   "medicines" array.

   Do NOT create another "medicines" array here.
*/


/* =========================================
   AMOXICILLIN
========================================= */

medicines.push({

    id:
        "amoxicillin",

    genericName:
        "Amoxicillin",

    name:
        "Amoxicillin",

    brandNames: [
        "Amoxil",
        "Moxatag"
    ],

    drugClass: [
        "Penicillin",
        "Beta-lactam",
        "Antibiotic"
    ],

    class:
        "Aminopenicillin · Beta-lactam · Antibiotic",

    conditions: [
        "community acquired pneumonia",
        "otitis media",
        "streptococcal pharyngitis",
        "bacterial respiratory infections",
        "skin and soft tissue infections",
        "genitourinary infections"
    ],

    condition:
        "Bacterial infections",

    route:
        "Oral",

    dosageForms: [
        "oral suspension",
        "capsule",
        "tablet",
        "chewable tablet"
    ],

    commonConcentrations: [
        "125 mg/5 mL",
        "200 mg/5 mL",
        "250 mg/5 mL",
        "400 mg/5 mL"
    ],

    indications:
        "Treatment of susceptible bacterial infections including selected respiratory, ear, skin/skin-structure and genitourinary infections.",

    moa:
        "Binds to penicillin-binding proteins and inhibits the transpeptidation step of bacterial cell-wall synthesis, leading to bacterial cell lysis.",

    spectrum:
        "Primarily active against susceptible Gram-positive organisms and selected Gram-negative organisms. Activity depends on organism susceptibility and local resistance patterns.",

    pediatric:
        "Dose depends on age, body weight, infection, severity and renal function. Children weighing 40 kg or more are generally dosed using adult recommendations in the product labeling.",

    dosing: {

        type:
            "condition_based",

        regimens: {

            "mild moderate infections": {

                dose:
                    25,

                unit:
                    "mg/kg/day",

                frequency:
                    2,

                interval:
                    "every 12 hours",

                maxDailyDose:
                    1000

            },

            "mild moderate infections alternative": {

                dose:
                    20,

                unit:
                    "mg/kg/day",

                frequency:
                    3,

                interval:
                    "every 8 hours",

                maxDailyDose:
                    750

            },

            "severe infections": {

                dose:
                    45,

                unit:
                    "mg/kg/day",

                frequency:
                    2,

                interval:
                    "every 12 hours",

                maxDailyDose:
                    1750

            },

            "severe infections alternative": {

                dose:
                    40,

                unit:
                    "mg/kg/day",

                frequency:
                    3,

                interval:
                    "every 8 hours",

                maxDailyDose:
                    1500

            },

            "community acquired pneumonia": {

                dose:
                    80,

                maxDose:
                    90,

                unit:
                    "mg/kg/day",

                frequency:
                    2,

                interval:
                    "every 12 hours",

                maxDailyDose:
                    4000

            },

            "streptococcal pharyngitis": {

                dose:
                    50,

                unit:
                    "mg/kg/day",

                frequency:
                    1,

                interval:
                    "once daily",

                maxDailyDose:
                    1000,

                duration:
                    "10 days"

            }

        },

        route:
            "oral",

        minimumAgeMonths:
            0,

        neonatalNote:
            "For neonates and infants ≤12 weeks, the labeled maximum recommended dose is 30 mg/kg/day divided every 12 hours because of immature renal elimination.",

        configured:
            true

    },

    indicationSpecific:
        true,

    contraindications: [
        "Serious hypersensitivity to amoxicillin",
        "Serious hypersensitivity to penicillins or other beta-lactam antibiotics"
    ],

    warnings: [
        "Check history of immediate or severe beta-lactam allergy.",
        "Do not use for viral infections.",
        "Adjust dosing when clinically indicated in significant renal impairment.",
        "Persistent or severe diarrhea may indicate Clostridioides difficile-associated diarrhea."
    ],

    commonAdverseEffects: [
        "Diarrhea",
        "Nausea",
        "Vomiting",
        "Rash"
    ],

    seriousAdverseEffects: [
        "Anaphylaxis",
        "Severe cutaneous reactions",
        "C. difficile-associated diarrhea"
    ],

    interactions: [
        "Warfarin and other anticoagulants may require monitoring.",
        "Allopurinol may increase the risk of rash.",
        "Probenecid may increase amoxicillin exposure."
    ],

    pharmacyNotes:
        "Verify indication, weight, concentration, allergy history and renal function. Confirm that the selected formulation concentration matches the calculated volume.",

    references: [

        {
            organization:
                "World Health Organization",

            title:
                "WHO AWaRe Antibiotic Book",

            year:
                2022,

            url:
                "https://www.who.int/publications/i/item/9789240062382"
        },

        {
            organization:
                "DailyMed",

            title:
                "Amoxicillin for Oral Suspension",

            year:
                2025,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=4d15e38c-2025-4570-839f-dfd4febd6ce3&type=display"
        }

    ]

});


/* =========================================
   AZITHROMYCIN
========================================= */

medicines.push({

    id:
        "azithromycin",

    genericName:
        "Azithromycin",

    name:
        "Azithromycin",

    brandNames: [
        "Zithromax",
        "Zmax"
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
        "Selected bacterial respiratory and ENT infections",

    route:
        "Oral · IV",

    dosageForms: [
        "oral suspension",
        "tablet",
        "capsule",
        "IV injection"
    ],

    commonConcentrations: [
        "100 mg/5 mL",
        "200 mg/5 mL"
    ],

    indications:
        "Treatment of selected susceptible bacterial infections including acute otitis media, community-acquired pneumonia, acute bacterial sinusitis and pharyngitis/tonsillitis.",

    moa:
        "Binds to the 50S bacterial ribosomal subunit and inhibits bacterial protein synthesis.",

    spectrum:
        "Active against selected Gram-positive, Gram-negative and atypical respiratory pathogens. Use should follow susceptibility and local antimicrobial guidance.",

    pediatric:
        "For the labeled pediatric indications in the oral product information, the commonly specified minimum age for acute otitis media, community-acquired pneumonia and acute bacterial sinusitis is 6 months.",

    dosing: {

        type:
            "condition_based",

        regimens: {

            "acute otitis media single dose": {

                dose:
                    30,

                unit:
                    "mg/kg",

                frequency:
                    1,

                interval:
                    "single dose",

                maximumAgeIndependentDose:
                    1500,

                duration:
                    "1 day",

                minimumAgeMonths:
                    6

            },

            "acute otitis media 3 day": {

                dose:
                    10,

                unit:
                    "mg/kg/day",

                frequency:
                    1,

                interval:
                    "once daily",

                duration:
                    "3 days",

                minimumAgeMonths:
                    6

            },

            "acute otitis media 5 day": {

                day1:
                    10,

                days2to5:
                    5,

                unit:
                    "mg/kg/day",

                frequency:
                    1,

                interval:
                    "once daily",

                duration:
                    "5 days",

                minimumAgeMonths:
                    6

            },

            "community acquired pneumonia": {

                day1:
                    10,

                days2to5:
                    5,

                unit:
                    "mg/kg/day",

                frequency:
                    1,

                interval:
                    "once daily",

                duration:
                    "5 days",

                minimumAgeMonths:
                    6

            },

            "acute bacterial sinusitis": {

                dose:
                    10,

                unit:
                    "mg/kg/day",

                frequency:
                    1,

                interval:
                    "once daily",

                duration:
                    "3 days",

                minimumAgeMonths:
                    6

            },

            "pharyngitis": {

                dose:
                    12,

                unit:
                    "mg/kg/day",

                frequency:
                    1,

                interval:
                    "once daily",

                duration:
                    "5 days"

            },

            "tonsillitis": {

                dose:
                    12,

                unit:
                    "mg/kg/day",

                frequency:
                    1,

                interval:
                    "once daily",

                duration:
                    "5 days"

            }

        },

        route:
            "oral",

        minimumAgeMonths:
            6,

        configured:
            true

    },

    indicationSpecific:
        true,

    contraindications: [
        "Macrolide hypersensitivity",
        "Previous cholestatic jaundice or hepatic dysfunction associated with azithromycin"
    ],

    warnings: [
        "QT prolongation and serious arrhythmias can occur in susceptible patients.",
        "Use caution with other QT-prolonging medicines.",
        "Serious hepatic reactions may occur.",
        "Avoid unnecessary use to reduce antimicrobial resistance."
    ],

    commonAdverseEffects: [
        "Diarrhea",
        "Nausea",
        "Abdominal pain",
        "Vomiting"
    ],

    seriousAdverseEffects: [
        "QT prolongation",
        "Torsades de pointes",
        "Severe hepatic injury",
        "Severe allergic reactions"
    ],

    interactions: [
        "Other QT-prolonging medicines",
        "Warfarin may require monitoring",
        "Certain antiarrhythmics require caution"
    ],

    pharmacyNotes:
        "Select the indication before calculating. Verify age, weight, concentration and treatment duration. Azithromycin should not automatically replace first-line antibiotics for common bacterial infections.",

    references: [

        {
            organization:
                "DailyMed",

            title:
                "Azithromycin for Oral Suspension",

            year:
                2025,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=82d418ad-9ad6-18f8-e053-2a91aa0af084"
        },

        {
            organization:
                "World Health Organization",

            title:
                "WHO AWaRe Antibiotic Book",

            year:
                2022,

            url:
                "https://www.who.int/publications/i/item/9789240062382"
        }

    ]

});


/* =========================================
   CEFALEXIN
========================================= */

medicines.push({

    id:
        "cefalexin",

    genericName:
        "Cefalexin",

    name:
        "Cefalexin",

    brandNames: [
        "Keflex"
    ],

    drugClass: [
        "Cephalosporin",
        "Beta-lactam",
        "Antibiotic"
    ],

    class:
        "First-generation Cephalosporin · Beta-lactam",

    conditions: [
        "otitis media",
        "streptococcal pharyngitis",
        "skin and soft tissue infections",
        "urinary tract infections",
        "bacterial infections"
    ],

    condition:
        "Bacterial infections",

    route:
        "Oral",

    dosageForms: [
        "oral suspension",
        "capsule",
        "tablet"
    ],

    commonConcentrations: [
        "125 mg/5 mL",
        "250 mg/5 mL"
    ],

    indications:
        "Treatment of susceptible bacterial infections including selected respiratory, skin/skin-structure and urinary tract infections.",

    moa:
        "Binds to penicillin-binding proteins and inhibits bacterial cell-wall synthesis.",

    spectrum:
        "Primarily active against susceptible Gram-positive organisms with activity against selected Gram-negative organisms.",

    pediatric:
        "For pediatric patients over 1 year, dosing is based on total daily dose divided into equal doses. Severe infections and otitis media require higher labeled ranges.",

    dosing: {

        type:
            "condition_based",

        regimens: {

            "standard infections": {

                minDose:
                    25,

                maxDose:
                    50,

                unit:
                    "mg/kg/day",

                frequencyOptions: [
                    2,
                    3,
                    4
                ],

                duration:
                    "7–14 days"

            },

            "streptococcal pharyngitis": {

                minDose:
                    25,

                maxDose:
                    50,

                unit:
                    "mg/kg/day",

                frequencyOptions: [
                    2,
                    3,
                    4
                ],

                duration:
                    "at least 10 days"

            },

            "severe infections": {

                minDose:
                    50,

                maxDose:
                    100,

                unit:
                    "mg/kg/day",

                frequencyOptions: [
                    2,
                    3,
                    4
                ],

                duration:
                    "7–14 days"

            },

            "otitis media": {

                minDose:
                    75,

                maxDose:
                    100,

                unit:
                    "mg/kg/day",

                frequency:
                    4,

                interval:
                    "every 6 hours",

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

    contraindications: [
        "Known hypersensitivity to cefalexin or cephalosporins"
    ],

    warnings: [
        "Assess history of serious beta-lactam allergy.",
        "Dose adjustment is required in significant renal impairment.",
        "Evaluate significant antibiotic-associated diarrhea.",
        "Use only for proven or strongly suspected bacterial infections."
    ],

    commonAdverseEffects: [
        "Diarrhea",
        "Nausea",
        "Vomiting",
        "Abdominal pain",
        "Rash"
    ],

    seriousAdverseEffects: [
        "Anaphylaxis",
        "C. difficile-associated diarrhea",
        "Drug-induced hemolytic anemia",
        "Seizures in susceptible patients"
    ],

    interactions: [
        "Warfarin and other anticoagulants may require monitoring.",
        "Probenecid may increase cephalexin exposure."
    ],

    pharmacyNotes:
        "Check renal function and allergy history. Verify whether the infection requires the standard, severe-infection or otitis-media dose range.",

    references: [

        {
            organization:
                "DailyMed",

            title:
                "Cephalexin for Oral Suspension",

            year:
                2026,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/getFile.cfm?setid=25ef498a-7a7e-4543-a544-b9d0e99f9cd9&type=pdf"
        },

        {
            organization:
                "World Health Organization",

            title:
                "WHO AWaRe Antibiotic Book",

            year:
                2022,

            url:
                "https://www.who.int/publications/i/item/9789240062382"
        }

    ]

});


/* =========================================
   CEFUROXIME
========================================= */

medicines.push({

    id:
        "cefuroxime",

    genericName:
        "Cefuroxime",

    name:
        "Cefuroxime",

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

    dosageForms: [
        "oral suspension",
        "tablet"
    ],

    commonConcentrations: [
        "125 mg/5 mL",
        "250 mg/5 mL"
    ],

    indications:
        "Treatment of selected mild to moderate bacterial infections including pharyngitis/tonsillitis, acute otitis media, acute bacterial maxillary sinusitis and impetigo.",

    moa:
        "Binds to penicillin-binding proteins and inhibits bacterial cell-wall synthesis.",

    spectrum:
        "Second-generation cephalosporin with activity against susceptible Gram-positive and Gram-negative organisms.",

    pediatric:
        "The oral suspension labeling provides pediatric dosing for children 3 months through 12 years. The suspension must be administered with food.",

    dosing: {

        type:
            "condition_based",

        regimens: {

            "pharyngitis": {

                dose:
                    20,

                unit:
                    "mg/kg/day",

                frequency:
                    2,

                interval:
                    "every 12 hours",

                maxDailyDose:
                    500,

                duration:
                    "10 days"

            },

            "tonsillitis": {

                dose:
                    20,

                unit:
                    "mg/kg/day",

                frequency:
                    2,

                interval:
                    "every 12 hours",

                maxDailyDose:
                    500,

                duration:
                    "10 days"

            },

            "acute otitis media": {

                dose:
                    30,

                unit:
                    "mg/kg/day",

                frequency:
                    2,

                interval:
                    "every 12 hours",

                maxDailyDose:
                    1000,

                duration:
                    "10 days"

            },

            "acute bacterial sinusitis": {

                dose:
                    30,

                unit:
                    "mg/kg/day",

                frequency:
                    2,

                interval:
                    "every 12 hours",

                maxDailyDose:
                    1000,

                duration:
                    "10 days"

            },

            "impetigo": {

                dose:
                    30,

                unit:
                    "mg/kg/day",

                frequency:
                    2,

                interval:
                    "every 12 hours",

                maxDailyDose:
                    1000,

                duration:
                    "10 days"

            }

        },

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

    contraindications: [
        "Serious hypersensitivity to cefuroxime or cephalosporins"
    ],

    warnings: [
        "Assess history of beta-lactam allergy.",
        "Dose adjustment may be required in renal impairment.",
        "Oral tablets and oral suspension are not interchangeable on a mg-for-mg basis.",
        "Suspension should be administered with food."
    ],

    commonAdverseEffects: [
        "Diarrhea",
        "Nausea",
        "Vomiting",
        "Abdominal pain",
        "Rash"
    ],

    seriousAdverseEffects: [
        "Anaphylaxis",
        "C. difficile-associated diarrhea",
        "Seizures in susceptible patients"
    ],

    interactions: [
        "Medicines that reduce gastric acidity may reduce absorption of cefuroxime axetil.",
        "Anticoagulants may require monitoring."
    ],

    pharmacyNotes:
        "Shake the suspension well before use and administer with food. Do not substitute tablet and suspension doses milligram-for-milligram.",

    references: [

        {
            organization:
                "DailyMed",

            title:
                "Cefuroxime Axetil for Oral Suspension",

            year:
                2026,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/getFile.cfm?setid=135e2dfc-eb47-4d04-a903-a081d36c267e&type=pdf"
        }

    ]

});


/* =========================================
   CEFIXIME
========================================= */

medicines.push({

    id:
        "cefixime",

    genericName:
        "Cefixime",

    name:
        "Cefixime",

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

    dosageForms: [
        "oral suspension",
        "capsule",
        "tablet"
    ],

    commonConcentrations: [
        "100 mg/5 mL",
        "200 mg/5 mL"
    ],

    indications:
        "Treatment of susceptible uncomplicated urinary tract infections, otitis media, pharyngitis/tonsillitis and selected other labeled infections.",

    moa:
        "Inhibits bacterial cell-wall synthesis by binding to penicillin-binding proteins.",

    spectrum:
        "Third-generation cephalosporin with activity against selected Gram-negative and Gram-positive organisms.",

    pediatric:
        "For pediatric patients 6 months and older, the recommended dose is 8 mg/kg/day, given once daily or divided as 4 mg/kg every 12 hours.",

    dosing: {

        type:
            "standard_weight_based",

        regimens: {

            "standard pediatric dose": {

                dose:
                    8,

                unit:
                    "mg/kg/day",

                frequencyOptions: [
                    1,
                    2
                ],

                intervalOptions: [
                    "once daily",
                    "every 12 hours"
                ],

                maxDailyDose:
                    400,

                duration:
                    "indication dependent"

            },

            "streptococcal pharyngitis": {

                dose:
                    8,

                unit:
                    "mg/kg/day",

                frequencyOptions: [
                    1,
                    2
                ],

                maxDailyDose:
                    400,

                duration:
                    "at least 10 days"

            }

        },

        route:
            "oral",

        minimumAgeMonths:
            6,

        configured:
            true

    },

    indicationSpecific:
        false,

    contraindications: [
        "Known hypersensitivity to cefixime or cephalosporins"
    ],

    warnings: [
        "Evaluate significant beta-lactam allergy history.",
        "Adjust dose when clinically indicated in significant renal impairment.",
        "Evaluate significant diarrhea for C. difficile-associated disease.",
        "Use only for proven or strongly suspected bacterial infections."
    ],

    commonAdverseEffects: [
        "Diarrhea",
        "Nausea",
        "Loose stools",
        "Abdominal pain",
        "Vomiting"
    ],

    seriousAdverseEffects: [
        "Severe hypersensitivity",
        "C. difficile-associated diarrhea"
    ],

    interactions: [
        "Warfarin and other anticoagulants may require monitoring."
    ],

    pharmacyNotes:
        "The oral suspension is available in different concentrations. The concentration must always be known before converting the calculated mg dose into mL.",

    references: [

        {
            organization:
                "DailyMed",

            title:
                "Cefixime for Oral Suspension",

            year:
                2026,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6d68dbd9-7d75-4ff1-91db-79ff8ae879ec"
        },

        {
            organization:
                "World Health Organization",

            title:
                "Consensus Guidance on Pediatric Dosing Regimens",

            year:
                2019,

            url:
                "https://cdn.who.int/media/docs/default-source/essential-medicines/2019-eml-expert-committee/late-papers/abwg_paediatric_dosing_ab.pdf"
        }

    ]

});


/* =========================================
   CLINDAMYCIN
========================================= */

medicines.push({

    id:
        "clindamycin",

    genericName:
        "Clindamycin",

    name:
        "Clindamycin",

    brandNames: [
        "Cleocin",
        "Dalacin"
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

    dosageForms: [
        "oral solution",
        "capsule",
        "IV injection",
        "IM injection"
    ],

    commonConcentrations: [
        "75 mg/5 mL oral solution"
    ],

    indications:
        "Treatment of serious infections caused by susceptible organisms, including selected anaerobic, streptococcal and staphylococcal infections.",

    moa:
        "Binds to the 50S bacterial ribosomal subunit and inhibits bacterial protein synthesis.",

    spectrum:
        "Active against selected Gram-positive organisms and anaerobes. Susceptibility testing and local resistance patterns are important.",

    pediatric:
        "Oral pediatric dosing is based on total body weight and severity of infection. The labeled oral regimen is divided into 3 or 4 equal doses.",

    dosing: {

        type:
            "severity_based",

        regimens: {

            "serious infections": {

                minDose:
                    8,

                maxDose:
                    12,

                unit:
                    "mg/kg/day",

                frequencyOptions: [
                    3,
                    4
                ],

                intervalOptions: [
                    "every 8 hours",
                    "every 6 hours"
                ]

            },

            "severe infections": {

                minDose:
                    13,

                maxDose:
                    16,

                unit:
                    "mg/kg/day",

                frequencyOptions: [
                    3,
                    4
                ],

                intervalOptions: [
                    "every 8 hours",
                    "every 6 hours"
                ]

            },

            "more severe infections": {

                minDose:
                    17,

                maxDose:
                    25,

                unit:
                    "mg/kg/day",

                frequencyOptions: [
                    3,
                    4
                ],

                intervalOptions: [
                    "every 8 hours",
                    "every 6 hours"
                ]

            }

        },

        route:
            "oral",

        minimumAgeMonths:
            0,

        configured:
            true

    },

    indicationSpecific:
        false,

    contraindications: [
        "History of hypersensitivity to clindamycin or lincomycin"
    ],

    warnings: [
        "Clindamycin carries an important risk of C. difficile-associated diarrhea and colitis.",
        "Discontinue and evaluate significant diarrhea during therapy.",
        "Dose according to total body weight.",
        "Reserve use for infections where clindamycin is an appropriate option."
    ],

    commonAdverseEffects: [
        "Diarrhea",
        "Abdominal pain",
        "Nausea",
        "Vomiting",
        "Rash"
    ],

    seriousAdverseEffects: [
        "C. difficile-associated diarrhea and colitis",
        "Anaphylaxis",
        "Severe skin reactions"
    ],

    interactions: [
        "May enhance effects of neuromuscular blocking agents.",
        "Caution with other medicines affecting neuromuscular transmission."
    ],

    pharmacyNotes:
        "This is one of the antibiotics where the diarrhea warning is especially important. If significant diarrhea occurs, the patient requires prompt clinical evaluation.",

    references: [

        {
            organization:
                "DailyMed",

            title:
                "Clindamycin Palmitate Hydrochloride Pediatric Oral Solution",

            year:
                2026,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a85e28ea-03be-471f-ad7f-f5c55c67ac97"
        },

        {
            organization:
                "World Health Organization",

            title:
                "Consensus Guidance on Pediatric Dosing Regimens",

            year:
                2019,

            url:
                "https://cdn.who.int/media/docs/default-source/essential-medicines/2019-eml-expert-committee/late-papers/abwg_paediatric_dosing_ab.pdf"
        }

    ]

});


/* =========================================
   CEFTRIAXONE
========================================= */

medicines.push({

    id:
        "ceftriaxone",

    genericName:
        "Ceftriaxone",

    name:
        "Ceftriaxone",

    brandNames: [
        "Rocephin"
    ],

    drugClass: [
        "Cephalosporin",
        "Third-generation cephalosporin",
        "Beta-lactam",
        "Antibiotic"
    ],

    class:
        "Third-generation Cephalosporin · Beta-lactam",

    conditions: [
        "serious bacterial infections",
        "pneumonia",
        "meningitis",
        "septicemia",
        "skin and soft tissue infections",
        "acute otitis media"
    ],

    condition:
        "Serious bacterial infections",

    route:
        "IV · IM",

    dosageForms: [
        "injection"
    ],

    commonConcentrations: [
        "250 mg/vial",
        "500 mg/vial",
        "1 g/vial",
        "2 g/vial"
    ],

    indications:
        "Treatment of serious susceptible bacterial infections including pneumonia, meningitis, septicemia, skin/skin-structure infections and acute otitis media.",

    moa:
        "Binds to penicillin-binding proteins and inhibits bacterial cell-wall synthesis.",

    spectrum:
        "Broad-spectrum third-generation cephalosporin with activity against many Gram-negative and Gram-positive organisms.",

    pediatric:
        "Pediatric dosing is indication-specific. WHO consensus guidance lists 50–100 mg/kg/day for children, while meningitis requires higher dosing. Neonatal use requires special attention to bilirubin and calcium-related risks.",

    dosing: {

        type:
            "condition_based",

        regimens: {

            "serious infections": {

                minDose:
                    50,

                maxDose:
                    100,

                unit:
                    "mg/kg/day",

                frequency:
                    1,

                interval:
                    "every 24 hours",

                maxDailyDose:
                    4000

            },

            "meningitis": {

                dose:
                    100,

                unit:
                    "mg/kg/day",

                frequency:
                    1,

                interval:
                    "every 24 hours",

                maxDailyDose:
                    4000

            },

            "acute otitis media": {

                dose:
                    50,

                unit:
                    "mg/kg",

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

        minimumAgeMonths:
            0,

        configured:
            true

    },

    indicationSpecific:
        true,

    contraindications: [
        "Known serious hypersensitivity to ceftriaxone or cephalosporins",
        "Certain neonates with hyperbilirubinemia",
        "Neonates requiring or expected to require calcium-containing IV solutions in the situations specified by labeling"
    ],

    warnings: [
        "Special neonatal precautions are required.",
        "Do not mix or simultaneously administer with calcium-containing IV solutions in contraindicated neonatal situations.",
        "Assess severe beta-lactam allergy history.",
        "Biliary sludge or pseudolithiasis may occur."
    ],

    commonAdverseEffects: [
        "Diarrhea",
        "Rash",
        "Injection-site reactions",
        "Eosinophilia"
    ],

    seriousAdverseEffects: [
        "Anaphylaxis",
        "C. difficile-associated diarrhea",
        "Biliary pseudolithiasis",
        "Hemolytic anemia"
    ],

    interactions: [
        "Calcium-containing IV solutions are clinically important in neonates.",
        "Warfarin and anticoagulants may require monitoring."
    ],

    pharmacyNotes:
        "Before administration verify age, weight, indication, route, renal/hepatic status, neonatal bilirubin status and calcium-containing IV therapy.",

    references: [

        {
            organization:
                "World Health Organization",

            title:
                "Consensus Guidance on Pediatric Dosing Regimens",

            year:
                2019,

            url:
                "https://cdn.who.int/media/docs/default-source/essential-medicines/2019-eml-expert-committee/late-papers/abwg_paediatric_dosing_ab.pdf"
        },

        {
            organization:
                "World Health Organization",

            title:
                "WHO AWaRe Antibiotic Book",

            year:
                2022,

            url:
                "https://www.who.int/publications/i/item/9789240062382"
        }

    ]

});


/* =========================================
   CEFOTAXIME
========================================= */

medicines.push({

    id:
        "cefotaxime",

    genericName:
        "Cefotaxime",

    name:
        "Cefotaxime",

    brandNames: [
        "Claforan"
    ],

    drugClass: [
        "Cephalosporin",
        "Third-generation cephalosporin",
        "Beta-lactam",
        "Antibiotic"
    ],

    class:
        "Third-generation Cephalosporin · Beta-lactam",

    conditions: [
        "serious bacterial infections",
        "pneumonia",
        "meningitis",
        "septicemia",
        "bone and joint infections",
        "skin and soft tissue infections"
    ],

    condition:
        "Serious bacterial infections",

    route:
        "IV · IM",

    dosageForms: [
        "injection"
    ],

    commonConcentrations: [
        "500 mg/vial",
        "1 g/vial",
        "2 g/vial"
    ],

    indications:
        "Treatment of serious infections caused by susceptible bacteria, including pneumonia, meningitis, septicemia and selected bone, joint and skin/soft tissue infections.",

    moa:
        "Binds to penicillin-binding proteins and inhibits bacterial cell-wall synthesis.",

    spectrum:
        "Broad-spectrum third-generation cephalosporin with activity against many Gram-negative and Gram-positive organisms.",

    pediatric:
        "Dose depends on age, weight, infection severity and route. WHO consensus guidance lists higher doses and more frequent dosing for severe infections and meningitis.",

    dosing: {

        type:
            "age_and_severity_based",

        regimens: {

            "neonates 0 to 7 days": {

                dose:
                    50,

                unit:
                    "mg/kg/dose",

                frequency:
                    2,

                interval:
                    "every 12 hours"

            },

            "neonates 1 to 4 weeks": {

                dose:
                    50,

                unit:
                    "mg/kg/dose",

                frequency:
                    3,

                interval:
                    "every 8 hours"

            },

            "children standard": {

                minDose:
                    100,

                maxDose:
                    150,

                unit:
                    "mg/kg/day",

                frequencyOptions: [
                    4,
                    6
                ],

                intervalOptions: [
                    "every 6 hours",
                    "every 4 hours"
                ],

                maxDailyDose:
                    12000

            },

            "severe infections": {

                minDose:
                    150,

                maxDose:
                    200,

                unit:
                    "mg/kg/day",

                frequencyOptions: [
                    4,
                    6
                ],

                intervalOptions: [
                    "every 6 hours",
                    "every 4 hours"
                ],

                maxDailyDose:
                    12000

            }

        },

        route:
            "IV · IM",

        minimumAgeMonths:
            0,

        configured:
            true

    },

    indicationSpecific:
        true,

    contraindications: [
        "Known serious hypersensitivity to cefotaxime or cephalosporins"
    ],

    warnings: [
        "Assess severe beta-lactam allergy history.",
        "Dose adjustment may be required in renal impairment.",
        "High doses may increase seizure risk, particularly with renal impairment.",
        "Use only for appropriate suspected or confirmed bacterial infections."
    ],

    commonAdverseEffects: [
        "Diarrhea",
        "Rash",
        "Injection-site reactions",
        "Nausea"
    ],

    seriousAdverseEffects: [
        "Anaphylaxis",
        "C. difficile-associated diarrhea",
        "Seizures",
        "Severe skin reactions"
    ],

    interactions: [
        "Anticoagulants may require monitoring.",
        "Other nephrotoxic medicines may require additional clinical monitoring."
    ],

    pharmacyNotes:
        "Verify age group, weight, infection severity, renal function, route and total daily dose before administration.",

    references: [

        {
            organization:
                "World Health Organization",

            title:
                "Consensus Guidance on Pediatric Dosing Regimens",

            year:
                2019,

            url:
                "https://cdn.who.int/media/docs/default-source/essential-medicines/2019-eml-expert-committee/late-papers/abwg_paediatric_dosing_ab.pdf"
        },

        {
            organization:
                "World Health Organization",

            title:
                "WHO AWaRe Antibiotic Book",

            year:
                2022,

            url:
                "https://www.who.int/publications/i/item/9789240062382"
        }

    ]

});


/* =========================================
   END OF ANTIBIOTICS DATABASE
========================================= */
