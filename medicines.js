/* =========================================
   DoseCare
   Medicine Database
========================================= */


/*
    IMPORTANT

    This file contains the structure of the
    medicine database.

    Verified pediatric dosing data will be
    added medicine by medicine from reliable
    references.
*/


const medicines = [

    /* =====================================
       PARACETAMOL
    ===================================== */

    {

        id: "paracetamol",

        genericName: "Paracetamol",

        brandNames: [],

        drugClass: [
            "Analgesic",
            "Antipyretic"
        ],


        /* ================================
           MEDICAL CONDITIONS
        ================================= */

        conditions: [
            "fever",
            "pain"
        ],


        /* ================================
           MECHANISM OF ACTION
        ================================= */

        mechanismOfAction:
            "Produces analgesic and antipyretic effects primarily through inhibition of prostaglandin synthesis in the central nervous system.",


        /* ================================
           INDICATIONS
        ================================= */

        indications: [
            "Fever",
            "Mild to moderate pain"
        ],


        /* ================================
           DOSING INFORMATION
        ================================= */

        dosing: {

            method: "weight",

            unit: "mg/kg/dose",

            frequency: "",

            minimumAge: null,

            maximumAge: null,

            maximumSingleDose: null,

            maximumDailyDose: null

        },


        /* ================================
           AVAILABLE CONCENTRATIONS
        ================================= */

        concentrations: [],


        /* ================================
           ROUTES
        ================================= */

        routes: [
            "Oral"
        ],


        /* ================================
           DOSAGE FORMS
        ================================= */

        dosageForms: [
            "Oral suspension",
            "Tablet"
        ],


        /* ================================
           CONTRAINDICATIONS
        ================================= */

        contraindications: [],


        /* ================================
           WARNINGS & PRECAUTIONS
        ================================= */

        precautions: [],


        /* ================================
           COMMON SIDE EFFECTS
        ================================= */

        sideEffects: [],


        /* ================================
           DRUG INTERACTIONS
        ================================= */

        interactions: [],


        /* ================================
           PREGNANCY / LACTATION
        ================================= */

        pregnancy: "",

        lactation: "",


        /* ================================
           RENAL / HEPATIC
        ================================= */

        renalAdjustment: "",

        hepaticAdjustment: "",


        /* ================================
           PEDIATRIC NOTES
        ================================= */

        pediatricNotes: "",


        /* ================================
           REFERENCES
        ================================= */

        references: []

    },


    /* =====================================
       IBUPROFEN
    ===================================== */

    {

        id: "ibuprofen",

        genericName: "Ibuprofen",

        brandNames: [],

        drugClass: [
            "NSAID",
            "Analgesic",
            "Antipyretic",
            "Anti-inflammatory"
        ],


        conditions: [
            "fever",
            "pain",
            "inflammation"
        ],


        mechanismOfAction:
            "Inhibits cyclooxygenase enzymes, reducing prostaglandin synthesis and thereby producing analgesic, antipyretic, and anti-inflammatory effects.",


        indications: [
            "Fever",
            "Mild to moderate pain",
            "Inflammatory conditions"
        ],


        dosing: {

            method: "weight",

            unit: "mg/kg/dose",

            frequency: "",

            minimumAge: null,

            maximumAge: null,

            maximumSingleDose: null,

            maximumDailyDose: null

        },


        concentrations: [],


        routes: [
            "Oral"
        ],


        dosageForms: [
            "Oral suspension",
            "Tablet"
        ],


        contraindications: [],

        precautions: [],

        sideEffects: [],

        interactions: [],


        pregnancy: "",

        lactation: "",


        renalAdjustment: "",

        hepaticAdjustment: "",


        pediatricNotes: "",


        references: []

    },


    /* =====================================
       AMOXICILLIN
    ===================================== */

    {

        id: "amoxicillin",

        genericName: "Amoxicillin",

        brandNames: [],

        drugClass: [
            "Aminopenicillin",
            "Beta-lactam antibiotic"
        ],


        conditions: [
            "bacterial infection",
            "respiratory infection",
            "otitis media"
        ],


        mechanismOfAction:
            "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins, resulting in disruption of cell wall formation and bacterial cell death.",


        indications: [
            "Susceptible bacterial infections"
        ],


        dosing: {

            method: "weight",

            unit: "mg/kg/dose",

            frequency: "",

            minimumAge: null,

            maximumAge: null,

            maximumSingleDose: null,

            maximumDailyDose: null

        },


        concentrations: [],


        routes: [
            "Oral"
        ],


        dosageForms: [
            "Oral suspension",
            "Capsule",
            "Tablet"
        ],


        contraindications: [],

        precautions: [],

        sideEffects: [],

        interactions: [],


        pregnancy: "",

        lactation: "",


        renalAdjustment: "",

        hepaticAdjustment: "",


        pediatricNotes: "",


        references: []

    },


    /* =====================================
       CETIRIZINE
    ===================================== */

    {

        id: "cetirizine",

        genericName: "Cetirizine",

        brandNames: [],

        drugClass: [
            "Second-generation antihistamine"
        ],


        conditions: [
            "allergy",
            "urticaria"
        ],


        mechanismOfAction:
            "Selectively blocks peripheral histamine H1 receptors, reducing the effects of histamine responsible for allergic symptoms.",


        indications: [
            "Allergic rhinitis",
            "Urticaria"
        ],


        dosing: {

            method: "age",

            unit: "mg",

            frequency: "",

            minimumAge: null,

            maximumAge: null,

            maximumSingleDose: null,

            maximumDailyDose: null

        },


        concentrations: [],


        routes: [
            "Oral"
        ],


        dosageForms: [
            "Oral solution",
            "Tablet"
        ],


        contraindications: [],

        precautions: [],

        sideEffects: [],

        interactions: [],


        pregnancy: "",

        lactation: "",


        renalAdjustment: "",

        hepaticAdjustment: "",


        pediatricNotes: "",


        references: []

    }

];
