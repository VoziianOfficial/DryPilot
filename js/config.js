"use strict";

/* ==========================================================
   DRYPILOT — GLOBAL CONFIG
   File: /js/config.js

   Important:
   This file is the single source of truth for all repeated
   business data, services, footer data, forms, legal text,
   page meta, FAQ, reviews, and routing content.

   config.js MUST be loaded before main.js on every page.
   ========================================================== */

window.SITE_CONFIG = {
    companyName: "DryPilot",
    companyId: "DryPilot Provider Matching LLC",

    brand: {
        shortName: "DryPilot",
        tagline: "Compare water damage provider options with clarity and speed.",
        logoLabel: "DryPilot home",
        logoText: "DryPilot",
        logoKicker: "Independent Provider Matching"
    },

    phone: "(866) 217-1347",
    phoneHref: "tel:+18662171347",
    phoneLabel: "Call DryPilot at (866) 217-1347",
    phoneButtonText: "(866) 217-1347",

    email: "hello@drypilot.com",

    address: {
        line1: "120 Riverfront Blvd",
        city: "Charleston",
        state: "SC",
        zip: "29401",
        country: "USA",
        full: "120 Riverfront Blvd, Charleston, SC 29401, USA"
    },

    serviceArea: "USA water damage provider matching platform",

    footerText:
        "DryPilot helps homeowners compare independent water damage provider options after leaks, floods, pipe bursts, and moisture concerns.",

    disclaimer:
        "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

    legalNotice:
        "DryPilot is an independent provider matching platform. Provider availability, pricing, timelines, documentation, warranties, and service options vary by location and provider.",

    navigation: [
        {
            label: "Home",
            href: "index.html",
            icon: "home"
        },
        {
            label: "Services",
            href: "services.html",
            icon: "droplet"
        },
        {
            label: "About Us",
            href: "about.html",
            icon: "shield"
        },
        {
            label: "Contact",
            href: "contact.html",
            icon: "phone"
        }
    ],

    legalLinks: [
        {
            label: "Privacy Policy",
            href: "privacy-policy.html"
        },
        {
            label: "Cookie Policy",
            href: "cookie-policy.html"
        },
        {
            label: "Terms of Service",
            href: "terms-of-service.html"
        }
    ],

    services: [
        {
            id: "cleanup",
            title: "Water Damage Cleanup",
            shortTitle: "Cleanup",
            href: "water-damage-cleanup.html",
            icon: "droplet",
            image: "./assets/images/service-water-cleanup.jpg",
            eyebrow: "Standing Water / Wet Surfaces",
            technicalLabel: "Cleanup Route",
            summary:
                "Compare provider options for standing water, wet surfaces, and interior water damage cleanup requests.",
            moduleText:
                "For visible water, damp surfaces, and interior cleanup concerns where homeowners want to compare local provider options.",
            cta: "Explore cleanup options"
        },
        {
            id: "flood",
            title: "Flood Damage Restoration",
            shortTitle: "Flood Damage",
            href: "flood-damage-restoration.html",
            icon: "waves",
            image: "./assets/images/service-flood-damage.jpg",
            eyebrow: "Flood / Interior Damage",
            technicalLabel: "Flood Route",
            summary:
                "Explore independent provider options for flood-related water damage, drying, documentation, and restoration needs.",
            moduleText:
                "For flood-related damage requests where project scope, drying needs, documentation, and provider fit may vary.",
            cta: "Review flood options"
        },
        {
            id: "burst-pipe",
            title: "Burst Pipe Water Damage",
            shortTitle: "Burst Pipe",
            href: "burst-pipe-water-damage.html",
            icon: "pipe",
            image: "./assets/images/service-burst-pipe.jpg",
            eyebrow: "Pipe Burst / Ceiling Water",
            technicalLabel: "Pipe Route",
            summary:
                "Review provider options after pipe leaks, pipe bursts, ceiling water, wall moisture, and interior water spread.",
            moduleText:
                "For water damage linked to burst pipes, leaking lines, ceiling stains, wall moisture, and fast-moving interior spread.",
            cta: "Compare pipe damage options"
        },
        {
            id: "basement",
            title: "Basement Water Removal",
            shortTitle: "Basement Water",
            href: "basement-water-removal.html",
            icon: "basement",
            image: "./assets/images/service-basement-water.jpg",
            eyebrow: "Basement / Moisture Concern",
            technicalLabel: "Basement Route",
            summary:
                "Compare providers for basement water concerns, moisture checks, drying options, and water removal requests.",
            moduleText:
                "For basement water, damp lower levels, seepage concerns, and moisture-related provider comparison requests.",
            cta: "Check basement options"
        }
    ],

    forms: {
        leadTitle: "Request provider options",
        leadIntro:
            "Share a few details and compare independent water damage provider options near your ZIP code.",
        submitText: "Request Provider Options",
        successMessage: "Thank you. Your request has been received.",
        errorMessage: "Please complete the required fields.",
        fields: {
            fullName: "Full Name",
            phone: "Phone",
            email: "Email",
            zip: "ZIP Code",
            damageType: "Damage Type",
            happened: "When did it happen?",
            message: "Optional Message"
        },
        placeholders: {
            fullName: "Your full name",
            phone: "(555) 123-4567",
            email: "you@example.com",
            zip: "Enter ZIP code",
            message: "Briefly describe the water damage concern"
        },
        damageTypes: [
            "Water Damage Cleanup",
            "Flood Damage",
            "Burst Pipe",
            "Basement Water",
            "Moisture Concern",
            "Not Sure Yet"
        ],
        timingOptions: [
            "Today",
            "Within the last 24 hours",
            "This week",
            "More than a week ago",
            "Not sure"
        ]
    },

    cookieBanner: {
        storageKey: "drypilot_cookie_choice",
        title: "Privacy preferences",
        text:
            "DryPilot uses cookies to improve site experience and understand visitor interactions.",
        accept: "Accept",
        decline: "Decline",
        links: [
            {
                label: "Privacy Policy",
                href: "privacy-policy.html"
            },
            {
                label: "Cookie Policy",
                href: "cookie-policy.html"
            },
            {
                label: "Terms of Service",
                href: "terms-of-service.html"
            }
        ]
    },

    text: {
        heroTitle: "Water Damage? Compare Local Help Fast.",
        heroAccent: "Fast.",
        heroIntro:
            "DryPilot helps homeowners explore independent water damage provider options after leaks, floods, pipe bursts, and moisture concerns.",
        heroPrimaryCta: "Compare Providers",
        heroSecondaryCta: "How It Works",

        aboutIntro:
            "DryPilot helps homeowners organize urgent water damage requests and compare independent provider options more clearly.",

        contactIntro:
            "Share a few details and DryPilot can help you explore water damage provider options near your ZIP code.",

        footerShort:
            "Compare independent water damage provider options with clarity."
    },

    home: {
        hero: {
            kicker: "Independent Provider Matching",
            title: "Water Damage? Compare Local Help Fast.",
            intro:
                "DryPilot helps homeowners explore independent water damage provider options after leaks, floods, pipe bursts, and moisture concerns.",
            primaryCta: "Compare Providers",
            secondaryCta: "How It Works",
            backgroundImage: "./assets/images/hero-home-flood.jpg",
            emergencyPanel: [
                {
                    label: "ZIP Status",
                    value: "29401",
                    status: "Matched",
                    icon: "map-pin"
                },
                {
                    label: "Service Category",
                    value: "Water Damage",
                    status: "",
                    icon: "droplet"
                },
                {
                    label: "Damage Type",
                    value: "Flood / Interior",
                    status: "",
                    icon: "waves"
                },
                {
                    label: "Provider Match Readiness",
                    value: "High",
                    status: "",
                    icon: "gauge"
                }
            ]
        },

        leakPath: {
            kicker: "Water Damage Routing System",
            title: "A clearer path from incident details to provider options.",
            nodes: [
                {
                    label: "Leak Found",
                    text: "Issue detected",
                    icon: "leak"
                },
                {
                    label: "Damage Type",
                    text: "Identify the damage",
                    icon: "target"
                },
                {
                    label: "ZIP Match",
                    text: "Check availability",
                    icon: "map-pin"
                },
                {
                    label: "Provider Options",
                    text: "Compare local choices",
                    icon: "network"
                },
                {
                    label: "Independent Choice",
                    text: "You decide",
                    icon: "shield"
                }
            ]
        },

        serviceDelta: {
            kicker: "Service Delta System",
            title: "Water damage categories routed through one comparison platform.",
            intro:
                "Explore common water damage request types and compare independent provider options by category, ZIP code, and project details."
        },

        atlas: {
            kicker: "ZIP-Based Provider Availability",
            title: "Local provider options can vary by ZIP code.",
            intro:
                "Provider availability varies by ZIP code, service category, and request details.",
            markerLabel: "29401 Charleston, SC",
            panels: [
                {
                    title: "Local Availability",
                    text: "Varies by ZIP code",
                    icon: "network"
                },
                {
                    title: "Damage Categories",
                    text: "Multiple categories",
                    icon: "target"
                },
                {
                    title: "Response Practices",
                    text: "Vary by provider",
                    icon: "clipboard"
                }
            ]
        },

        intakeLab: {
            kicker: "Incident Intake Lab",
            title: "Share the essentials before comparing provider options.",
            intro:
                "The more clearly the request is described, the easier it is to compare provider fit, availability, timelines, and documentation practices.",
            checklistTitle: "Moisture Readiness",
            checklist: [
                "Note where water entered",
                "Ask about drying equipment",
                "Compare written estimates",
                "Confirm insurance and licensing",
                "Request timeline details",
                "Check availability by ZIP code"
            ]
        },

        reports: {
            kicker: "Latest Incident Reports",
            title: "Homeowners compare options before making a decision.",
            backgroundImage: "./assets/images/wet-glass-reports.jpg"
        }
    },

    servicesPage: {
        hero: {
            kicker: "Damage Category Command",
            title: "Explore water damage categories without the contractor guesswork.",
            intro:
                "Use DryPilot to review common water damage request types and compare independent local provider options.",
            backgroundImage: "./assets/images/hero-services-damage.jpg",
            chips: [
                "Leaks",
                "Flood Water",
                "Burst Pipes",
                "Basements",
                "Moisture",
                "Documentation"
            ]
        },

        selectorWall: {
            kicker: "Damage Type Selector Wall",
            title: "Different water damage concerns need different provider questions.",
            intro:
                "Use these categories to frame the request before comparing provider options.",
            items: [
                {
                    title: "Leak Concern",
                    text: "Ask how the provider evaluates the affected area and documents moisture."
                },
                {
                    title: "Flood Damage",
                    text: "Ask about drying equipment, scope, timeline, and written estimates."
                },
                {
                    title: "Burst Pipe",
                    text: "Ask how they approach ceiling, wall, and flooring water spread."
                },
                {
                    title: "Basement Water",
                    text: "Ask about pumping, moisture checks, drying, and follow-up documentation."
                },
                {
                    title: "Moisture Concern",
                    text: "Ask how moisture readings, photos, and written findings are provided."
                }
            ]
        },

        gaugeComparison: {
            kicker: "Flood-Level Gauge Comparison",
            title: "Compare provider fit using practical factors.",
            gauges: [
                {
                    title: "Response Timing",
                    text: "Ask how soon they can review the request."
                },
                {
                    title: "Equipment",
                    text: "Ask what drying or extraction equipment may be used."
                },
                {
                    title: "Documentation",
                    text: "Ask whether photos, notes, or readings are provided."
                },
                {
                    title: "Scope Clarity",
                    text: "Ask what is included and what is not included."
                },
                {
                    title: "Warranty Notes",
                    text: "Ask what warranty or follow-up details are available."
                },
                {
                    title: "ZIP Availability",
                    text: "Ask whether your location is currently covered."
                }
            ]
        },

        matrix: {
            kicker: "Provider Fit Matrix",
            title: "Questions that help homeowners compare options more clearly.",
            columns: ["Factor", "Why It Matters", "What to Ask", "Provider Variation"],
            rows: [
                [
                    "Equipment Used",
                    "Tools can vary by damage type.",
                    "What equipment may be used?",
                    "Varies by provider and scope."
                ],
                [
                    "Moisture Documentation",
                    "Documentation helps compare findings.",
                    "Do you provide readings or photos?",
                    "Some providers document more thoroughly."
                ],
                [
                    "Timeline",
                    "Drying and review windows can vary.",
                    "What timeline should I expect?",
                    "Depends on availability and damage."
                ],
                [
                    "Estimate Format",
                    "Written details make comparison easier.",
                    "Can I receive a written estimate?",
                    "Format varies by provider."
                ],
                [
                    "Insurance Familiarity",
                    "Some requests involve claim documentation.",
                    "Do you work with insurance-related documentation?",
                    "Experience varies."
                ],
                [
                    "Area Coverage",
                    "Not every provider covers every ZIP code.",
                    "Do you serve my ZIP code?",
                    "Coverage varies by location."
                ]
            ]
        }
    },

    aboutPage: {
        hero: {
            kicker: "Storm Origin",
            title: "Built for clearer provider comparison after water damage.",
            intro:
                "DryPilot was created to help homeowners organize urgent water damage details and compare independent provider options with less confusion.",
            backgroundImage: "./assets/images/hero-about-storm.jpg"
        },

        story: {
            kicker: "Wet Blueprint Story",
            title: "A matching platform for moments when details matter.",
            text:
                "Water damage situations can feel urgent, unclear, and difficult to compare. DryPilot gives homeowners a structured way to describe the issue, understand category fit, and review independent provider options before making a decision.",
            labels: ["Why We Built This", "Independent Matching"]
        },

        channels: {
            title: "What DryPilot helps with — and what it does not do.",
            helpTitle: "What We Help With",
            notTitle: "What We Do Not Do",
            helpItems: [
                "Organize request details",
                "Compare provider options",
                "Review category fit",
                "Prepare questions before choosing"
            ],
            notItems: [
                "We do not restore homes directly",
                "We do not dry properties directly",
                "We do not employ restoration crews",
                "We do not guarantee provider work"
            ]
        },

        routing: {
            kicker: "Routing Diagram",
            title: "From homeowner request to independent review.",
            nodes: [
                "Homeowner Request",
                "Damage Type",
                "ZIP Match",
                "Provider Category",
                "Independent Review"
            ]
        },

        preparation: {
            kicker: "Preparation Board",
            title: "Better questions create clearer comparisons.",
            panels: [
                {
                    title: "Document the Damage",
                    text: "Take photos, note affected rooms, and record when the issue was noticed."
                },
                {
                    title: "Compare Timelines",
                    text: "Ask providers how quickly they can review the request and what the process may involve."
                },
                {
                    title: "Review Estimates",
                    text: "Compare written estimates, scope details, exclusions, and warranty notes."
                }
            ]
        }
    },

    contactPage: {
        hero: {
            kicker: "Request Command",
            title: "Request Water Damage Provider Options",
            intro:
                "Share a few request details and explore independent water damage provider options near your ZIP code.",
            backgroundImage: "./assets/images/hero-contact-request.jpg"
        },

        intakeBoard: {
            title: "Emergency Intake Board",
            intro:
                "Use this form to organize the basic request details before comparing provider options.",
            sideItems: [
                {
                    title: "ZIP-Based Matching",
                    text: "Availability can vary by location.",
                    icon: "map-pin"
                },
                {
                    title: "Provider Availability",
                    text: "Independent providers set their own schedules.",
                    icon: "network"
                },
                {
                    title: "Independent Review",
                    text: "Homeowners choose who to contact or hire.",
                    icon: "shield"
                }
            ]
        },

        pipeRail: {
            title: "Contact Pipe Rail",
            nodes: [
                {
                    label: "Phone",
                    valueKey: "phone",
                    icon: "phone"
                },
                {
                    label: "Email",
                    valueKey: "email",
                    icon: "email"
                },
                {
                    label: "Service Area",
                    valueKey: "serviceArea",
                    icon: "map"
                },
                {
                    label: "Office Address",
                    valueKey: "address",
                    icon: "map-pin"
                }
            ]
        },

        map: {
            title: "Storm Coverage Map",
            intro:
                "DryPilot focuses on ZIP-based provider matching for water damage request categories.",
            label: "Charleston, SC 29401",
            note:
                "Provider availability varies by ZIP code, service category, and request details.",
            texture: "./assets/images/flood-map-texture.jpg"
        }
    },

    servicePages: {
        "water-damage-cleanup.html": {
            serviceId: "cleanup",
            heroTitle: "Water Damage Cleanup Provider Options",
            heroIntro:
                "Compare independent provider options for standing water, wet surfaces, and interior cleanup-related requests.",
            heroImage: "./assets/images/service-water-cleanup.jpg",
            sections: [
                {
                    type: "scopeBoard",
                    kicker: "Wet Surface Scope Board",
                    title: "Clarify the affected areas before comparing providers.",
                    items: [
                        "Standing water",
                        "Wet flooring",
                        "Interior surfaces",
                        "Damp walls",
                        "Moisture concerns"
                    ]
                },
                {
                    type: "checklist",
                    kicker: "Standing Water Checklist",
                    title: "Details worth preparing before you request options.",
                    items: [
                        "Where is the water visible?",
                        "When was it first noticed?",
                        "Is the source still active?",
                        "Are floors, walls, or ceilings affected?",
                        "Do you need documentation for insurance?"
                    ]
                },
                {
                    type: "questionRoute",
                    kicker: "Provider Question Route",
                    title: "Ask clearer questions before choosing a provider.",
                    items: [
                        "Do you provide written estimates?",
                        "What equipment may be used?",
                        "How do you document moisture?",
                        "What is included in the scope?"
                    ]
                }
            ]
        },

        "flood-damage-restoration.html": {
            serviceId: "flood",
            heroTitle: "Flood Damage Restoration Provider Options",
            heroIntro:
                "Explore provider options for flood-related water damage, drying-related needs, and restoration request comparisons.",
            heroImage: "./assets/images/service-flood-damage.jpg",
            sections: [
                {
                    type: "floodScale",
                    kicker: "Flood-Level Scale System",
                    title: "Flood requests can involve different levels of scope.",
                    items: [
                        "Room-level water",
                        "Multi-area moisture",
                        "Flooring impact",
                        "Wall or trim concerns",
                        "Documentation needs"
                    ]
                },
                {
                    type: "reportPanels",
                    kicker: "Horizontal Report Panels",
                    title: "Compare the details that can vary by provider.",
                    items: [
                        "Drying plan",
                        "Equipment approach",
                        "Estimate format",
                        "Timeline expectations"
                    ]
                },
                {
                    type: "comparisonMatrix",
                    kicker: "Comparison Matrix",
                    title: "Use written information to compare provider options."
                }
            ]
        },

        "burst-pipe-water-damage.html": {
            serviceId: "burst-pipe",
            heroTitle: "Burst Pipe Water Damage Provider Options",
            heroIntro:
                "Compare provider options after pipe leaks, pipe bursts, ceiling water, wall moisture, and interior water spread.",
            heroImage: "./assets/images/service-burst-pipe.jpg",
            sections: [
                {
                    type: "pipeBurst",
                    kicker: "Pipe Burst Illustration",
                    title: "Fast-moving water can affect more than the visible area.",
                    items: [
                        "Pipe source",
                        "Ceiling spread",
                        "Wall moisture",
                        "Floor impact",
                        "Hidden damp areas"
                    ]
                },
                {
                    type: "valveRail",
                    kicker: "Valve Info Rail",
                    title: "Questions to ask before selecting a provider.",
                    items: [
                        "Can you inspect affected rooms?",
                        "Do you document moisture readings?",
                        "Can I get a written scope?",
                        "What timing is realistic?"
                    ]
                },
                {
                    type: "damageMosaic",
                    kicker: "Damage Area Mosaic",
                    title: "Burst pipe requests often involve multiple surfaces."
                }
            ]
        },

        "basement-water-removal.html": {
            serviceId: "basement",
            heroTitle: "Basement Water Removal Provider Options",
            heroIntro:
                "Compare providers for basement water concerns, moisture checks, drying options, and water removal requests.",
            heroImage: "./assets/images/service-basement-water.jpg",
            sections: [
                {
                    type: "basementSplit",
                    kicker: "Basement Conditions Split",
                    title: "Basement water concerns can vary by source and depth.",
                    items: [
                        "Floor-level water",
                        "Wall seepage",
                        "Sump pump concerns",
                        "Moisture odor",
                        "Lower-level humidity"
                    ]
                },
                {
                    type: "moistureMeters",
                    kicker: "Moisture Meter Gauge Cards",
                    title: "Compare how providers discuss moisture and drying.",
                    items: [
                        "Water depth",
                        "Moisture readings",
                        "Drying approach",
                        "Follow-up notes"
                    ]
                },
                {
                    type: "homeownerNotes",
                    kicker: "Homeowner Report Notes",
                    title: "Prepare details before requesting provider options."
                }
            ]
        }
    },

    reviews: [
        {
            category: "Flood Damage",
            issueType: "Interior Water",
            quote:
                "DryPilot helped me find providers who were available in my area after the flood.",
            name: "Sarah M.",
            location: "Charleston, SC"
        },
        {
            category: "Burst Pipe",
            issueType: "Ceiling Water",
            quote:
                "I was able to compare options and ask the right questions before deciding.",
            name: "James M.",
            location: "Austin, TX"
        },
        {
            category: "Basement Water",
            issueType: "Lower-Level Moisture",
            quote:
                "The checklist and questions helped me understand what to look for.",
            name: "Linda K.",
            location: "Denver, CO"
        },
        {
            category: "Water Damage Cleanup",
            issueType: "Standing Water",
            quote:
                "Good way to explore providers and compare what they offer.",
            name: "Robert P.",
            location: "Tampa, FL"
        }
    ],

    faqs: {
        general: [
            {
                question: "Does DryPilot perform water damage restoration directly?",
                answer:
                    "No. DryPilot is an independent provider matching platform. It does not perform restoration, drying, repair, cleanup, or water removal work directly."
            },
            {
                question: "How does DryPilot help compare water damage providers?",
                answer:
                    "DryPilot helps homeowners organize request details, review service categories, and explore independent local provider options."
            },
            {
                question: "What should I ask before choosing a provider?",
                answer:
                    "Ask about licensing, insurance, timelines, written estimates, documentation, equipment, pricing, and warranty details."
            },
            {
                question: "Can provider availability vary by ZIP code?",
                answer:
                    "Yes. Provider availability, response practices, pricing, and service categories can vary by ZIP code and provider."
            }
        ],

        contact: [
            {
                question: "Does DryPilot perform restoration work directly?",
                answer:
                    "No. DryPilot does not perform water damage restoration, drying, cleanup, repair, or mold remediation directly."
            },
            {
                question: "Can provider availability vary by ZIP code?",
                answer:
                    "Yes. Availability can vary based on ZIP code, service category, timing, and independent provider coverage."
            },
            {
                question: "What should I ask before choosing a provider?",
                answer:
                    "Ask for written estimates, proof of licensing and insurance, timeline details, documentation practices, and warranty terms."
            },
            {
                question: "Are estimates always free?",
                answer:
                    "Estimate policies vary by provider. Homeowners should confirm any visit fees, estimate fees, or service charges directly with the provider."
            },
            {
                question: "How do I compare provider options?",
                answer:
                    "Compare provider availability, service scope, documentation, pricing, reviews, timelines, insurance familiarity, and warranty details."
            }
        ],

        cleanup: [
            {
                question: "Does DryPilot clean up water damage directly?",
                answer:
                    "No. DryPilot helps homeowners compare independent provider options but does not perform cleanup work directly."
            },
            {
                question: "What affects water damage cleanup pricing?",
                answer:
                    "Pricing can vary based on water amount, affected materials, equipment needs, documentation, location, and provider practices."
            },
            {
                question: "Should I ask for documentation?",
                answer:
                    "Yes. Homeowners may want to ask whether photos, written notes, moisture readings, or written estimates are available."
            }
        ],

        flood: [
            {
                question: "Does DryPilot restore flood damage directly?",
                answer:
                    "No. DryPilot is not a restoration company and does not perform flood damage restoration directly."
            },
            {
                question: "Can flood damage providers offer different scopes?",
                answer:
                    "Yes. Scope, equipment, documentation, pricing, and timeline can vary by provider and by the details of the request."
            },
            {
                question: "What should I compare for flood damage requests?",
                answer:
                    "Compare availability, written scope, drying approach, documentation, insurance familiarity, pricing, and timeline."
            }
        ],

        "burst-pipe": [
            {
                question: "Does DryPilot repair burst pipes?",
                answer:
                    "No. DryPilot does not repair pipes or perform restoration work. It helps homeowners compare independent provider options."
            },
            {
                question: "What should I ask after a burst pipe?",
                answer:
                    "Ask how affected rooms are evaluated, whether moisture readings are documented, and what written estimate details are provided."
            },
            {
                question: "Can ceiling and wall water spread be included?",
                answer:
                    "Provider scope varies. Homeowners should ask each provider how they evaluate ceiling water, wall moisture, flooring, and hidden damp areas."
            }
        ],

        basement: [
            {
                question: "Does DryPilot remove basement water directly?",
                answer:
                    "No. DryPilot does not remove water directly. It helps homeowners compare independent provider options."
            },
            {
                question: "What should I ask about basement water removal?",
                answer:
                    "Ask about water extraction, moisture checks, drying equipment, follow-up documentation, estimate format, and service area coverage."
            },
            {
                question: "Can basement water provider availability vary?",
                answer:
                    "Yes. Availability can vary by ZIP code, provider schedule, request type, and service category."
            }
        ]
    },

    pageMeta: {
        "index.html": {
            title: "DryPilot | Compare Water Damage Provider Options",
            description:
                "Compare independent local water damage provider options after leaks, floods, burst pipes, and moisture concerns."
        },
        "services.html": {
            title: "Water Damage Services | DryPilot",
            description:
                "Explore water damage service categories and compare independent provider options near you."
        },
        "about.html": {
            title: "About DryPilot | Water Damage Provider Matching",
            description:
                "Learn how DryPilot helps homeowners compare independent water damage provider options."
        },
        "contact.html": {
            title: "Contact DryPilot | Request Provider Options",
            description:
                "Contact DryPilot to request information and compare water damage provider options."
        },
        "water-damage-cleanup.html": {
            title: "Water Damage Cleanup Provider Options | DryPilot",
            description:
                "Compare provider options for water damage cleanup requests and wet interior concerns."
        },
        "flood-damage-restoration.html": {
            title: "Flood Damage Restoration Provider Options | DryPilot",
            description:
                "Compare independent provider options for flood damage restoration and drying-related requests."
        },
        "burst-pipe-water-damage.html": {
            title: "Burst Pipe Water Damage Provider Options | DryPilot",
            description:
                "Explore provider options after burst pipes, leaks, and interior water damage."
        },
        "basement-water-removal.html": {
            title: "Basement Water Removal Provider Options | DryPilot",
            description:
                "Compare provider options for basement water removal and moisture-related concerns."
        },
        "privacy-policy.html": {
            title: "Privacy Policy | DryPilot",
            description:
                "Read the DryPilot privacy policy for information about data collection, cookies, and user choices."
        },
        "cookie-policy.html": {
            title: "Cookie Policy | DryPilot",
            description:
                "Read the DryPilot cookie policy to understand how cookies may be used on this website."
        },
        "terms-of-service.html": {
            title: "Terms of Service | DryPilot",
            description:
                "Read the DryPilot terms of service for use of this provider matching website."
        }
    },

    legalPages: {
        privacy: {
            title: "Privacy Policy",
            updated: "Last updated: 2026",
            intro:
                "This Privacy Policy explains how DryPilot may collect, use, and protect information submitted through this website."
        },
        cookies: {
            title: "Cookie Policy",
            updated: "Last updated: 2026",
            intro:
                "This Cookie Policy explains how DryPilot may use cookies and similar technologies to improve the website experience."
        },
        terms: {
            title: "Terms of Service",
            updated: "Last updated: 2026",
            intro:
                "These Terms of Service explain the conditions for using the DryPilot provider matching website."
        }
    }
};