"use strict";



(function () {
    const APP = window.DryPilot;
    const CONFIG = window.SITE_CONFIG;

    if (!APP || !CONFIG) {
        console.warn("DryPilot service-page.js requires main.js and config.js.");
        return;
    }

    const state = {
        pageKey: "",
        pageData: null,
        service: null
    };

    document.addEventListener("DOMContentLoaded", () => {
        state.pageKey = APP.getCurrentPageKey();
        state.pageData = getCurrentPageData();
        state.service = getCurrentService();

        if (!state.pageData || !state.service) {
            console.warn("No service page config found for:", state.pageKey);
            return;
        }

        applyServicePageData();
        renderServiceCommandCard();
        renderServiceFaq();
        initServiceInteractions();
        initServicePageForms();
    });

 

    function getCurrentPageData() {
        return CONFIG.servicePages && CONFIG.servicePages[state.pageKey]
            ? CONFIG.servicePages[state.pageKey]
            : null;
    }

    function getCurrentService() {
        if (!state.pageData || !state.pageData.serviceId) return null;

        return CONFIG.services.find((service) => service.id === state.pageData.serviceId) || null;
    }

    function getFaqKey() {
        if (!state.service) return "general";
        return state.service.id || "general";
    }



    function applyServicePageData() {
        document.querySelectorAll("[data-service-title]").forEach((el) => {
            el.textContent = state.service.title;
        });

        document.querySelectorAll("[data-service-short-title]").forEach((el) => {
            el.textContent = state.service.shortTitle || state.service.title;
        });

        document.querySelectorAll("[data-service-summary]").forEach((el) => {
            el.textContent = state.service.summary;
        });

        document.querySelectorAll("[data-service-page-title]").forEach((el) => {
            el.textContent = state.pageData.heroTitle || state.service.title;
        });

        document.querySelectorAll("[data-service-page-intro]").forEach((el) => {
            el.textContent = state.pageData.heroIntro || state.service.summary;
        });

        document.querySelectorAll("[data-service-technical-label]").forEach((el) => {
            el.textContent = state.service.technicalLabel || "Service route";
        });

        document.querySelectorAll("[data-service-eyebrow]").forEach((el) => {
            el.textContent = state.service.eyebrow || state.service.technicalLabel || "Water damage route";
        });

        document.querySelectorAll("[data-service-cta]").forEach((el) => {
            el.textContent = state.service.cta || "Explore provider options";
        });

        document.querySelectorAll("[data-service-link]").forEach((el) => {
            el.setAttribute("href", state.service.href);
        });

        document.querySelectorAll("[data-service-image]").forEach((img) => {
            img.setAttribute("src", state.pageData.heroImage || state.service.image);
            img.setAttribute("alt", "");
        });

        document.querySelectorAll("[data-service-hero-media]").forEach((media) => {
            const img = media.querySelector("img");

            if (img) {
                img.setAttribute("src", state.pageData.heroImage || state.service.image);
                img.setAttribute("alt", "");
            }
        });

        document.body.setAttribute("data-current-service", state.service.id);
    }



    function renderServiceCommandCard() {
        document.querySelectorAll("[data-service-command-card]").forEach((mount) => {
            const items = getCommandItems();

            mount.innerHTML = `
        <h2>${APP.escapeHtml(state.service.technicalLabel || "Service route")}</h2>

        <div class="service-command-list">
          ${items
                    .map((item) => {
                        return `
                <article class="service-command-item">
                  <span class="svg-icon" aria-hidden="true">
                    ${APP.iconSvg(item.icon)}
                  </span>

                  <p>
                    <strong>${APP.escapeHtml(item.title)}</strong>
                    <span>${APP.escapeHtml(item.text)}</span>
                  </p>
                </article>
              `;
                    })
                    .join("")}
        </div>
      `;
        });
    }

    function getCommandItems() {
        const baseItems = [
            {
                icon: state.service.icon || "droplet",
                title: state.service.shortTitle || state.service.title,
                text: state.service.eyebrow || "Water damage request category"
            },
            {
                icon: "map-pin",
                title: "ZIP availability",
                text: "Provider options can vary by location"
            },
            {
                icon: "shield",
                title: "Independent review",
                text: "Homeowners compare and choose directly"
            }
        ];

        if (state.service.id === "cleanup") {
            return [
                {
                    icon: "droplet",
                    title: "Wet surface request",
                    text: "Standing water, damp floors, and affected interiors"
                },
                ...baseItems.slice(1)
            ];
        }

        if (state.service.id === "flood") {
            return [
                {
                    icon: "waves",
                    title: "Flood damage route",
                    text: "Flood-related scope, drying, and documentation questions"
                },
                ...baseItems.slice(1)
            ];
        }

        if (state.service.id === "burst-pipe") {
            return [
                {
                    icon: "pipe",
                    title: "Pipe damage route",
                    text: "Burst pipes, leaks, ceiling water, and wall moisture"
                },
                ...baseItems.slice(1)
            ];
        }

        if (state.service.id === "basement") {
            return [
                {
                    icon: "basement",
                    title: "Basement water route",
                    text: "Lower-level water, seepage, moisture, and drying questions"
                },
                ...baseItems.slice(1)
            ];
        }

        return baseItems;
    }


    function renderServiceFaq() {
        document.querySelectorAll("[data-service-faq]").forEach((mount) => {
            mount.setAttribute("data-faq-list", getFaqKey());
        });

        document.querySelectorAll("[data-faq-list='service-auto']").forEach((mount) => {
            mount.setAttribute("data-faq-list", getFaqKey());
        });

        APP.renderFaqs();

        if (typeof APP.initFaqAccordions === "function") {
            APP.initFaqAccordions();
        }
    }



    function initServicePageForms() {
        document.querySelectorAll("[data-service-page-form]").forEach((form) => {
            form.setAttribute("data-lead-form", "");

            const select = form.querySelector('select[name="damageType"]');

            if (select && state.service) {
                Array.from(select.options).forEach((option) => {
                    option.selected = option.value === state.service.title;
                });
            }
        });

        APP.initForms();
    }



    function initServiceInteractions() {
        initScopeBoard();
        initWaterChecklist();
        initQuestionRoute();
        initReportPanels();
        initRoutingNodes();
        initPipeBurstBoard();
        initValveInfoRail();
        initDamageMosaic();
        initBasementConditions();
        initMoistureMeters();
        initProviderColumns();
        initHomeownerNotes();
    }

    function initScopeBoard() {
        const items = document.querySelectorAll(".scope-board-item");

        if (!items.length) return;

        bindActiveGroup(items, {
            activeClass: "is-active",
            mutedClass: "is-muted"
        });
    }

    function initWaterChecklist() {
        const rows = document.querySelectorAll(".water-check-row");

        if (!rows.length) return;

        bindActiveGroup(rows, {
            activeClass: "is-active",
            mutedClass: "is-muted"
        });
    }

    function initQuestionRoute() {
        const nodes = document.querySelectorAll(".question-route-node");

        if (!nodes.length) return;

        bindActiveGroup(nodes, {
            activeClass: "is-active",
            mutedClass: "is-muted"
        });
    }

    function initReportPanels() {
        initReportSwiper();

        const panels = document.querySelectorAll(".report-panel");

        if (!panels.length) return;

        bindActiveGroup(panels, {
            activeClass: "is-active",
            mutedClass: "is-muted"
        });
    }

    function initRoutingNodes() {
        const nodes = document.querySelectorAll(".restoration-node");

        if (!nodes.length) return;

        bindActiveGroup(nodes, {
            activeClass: "is-active",
            mutedClass: "is-muted"
        });
    }

    function initPipeBurstBoard() {
        const notes = document.querySelectorAll(".pipe-burst-note");

        if (!notes.length) return;

        bindActiveGroup(notes, {
            activeClass: "is-active",
            mutedClass: "is-muted"
        });
    }

    function initValveInfoRail() {
        const nodes = document.querySelectorAll(".valve-info-node");

        if (!nodes.length) return;

        bindActiveGroup(nodes, {
            activeClass: "is-active",
            mutedClass: "is-muted"
        });
    }

    function initDamageMosaic() {
        const tiles = document.querySelectorAll(".damage-mosaic-tile");

        if (!tiles.length) return;

        bindActiveGroup(tiles, {
            activeClass: "is-active",
            mutedClass: "is-muted"
        });
    }

    function initBasementConditions() {
        const items = document.querySelectorAll(".basement-condition-item");

        if (!items.length) return;

        bindActiveGroup(items, {
            activeClass: "is-active",
            mutedClass: "is-muted"
        });
    }

    function initMoistureMeters() {
        const cards = document.querySelectorAll(".moisture-meter-card");

        if (!cards.length) return;

        bindActiveGroup(cards, {
            activeClass: "is-active",
            mutedClass: "is-muted"
        });
    }

    function initProviderColumns() {
        const columns = document.querySelectorAll(".provider-eval-column");

        if (!columns.length) return;

        bindActiveGroup(columns, {
            activeClass: "is-active",
            mutedClass: "is-muted"
        });
    }

    function initHomeownerNotes() {
        const notes = document.querySelectorAll(".homeowner-note-card");

        if (!notes.length) return;

        bindActiveGroup(notes, {
            activeClass: "is-active",
            mutedClass: "is-muted"
        });
    }

    function bindActiveGroup(elements, options) {
        const list = Array.from(elements);
        const activeClass = options.activeClass || "is-active";
        const mutedClass = options.mutedClass || "is-muted";

        list.forEach((el, index) => {
            el.setAttribute("tabindex", el.matches("a, button, input, select, textarea") ? el.getAttribute("tabindex") || "0" : "0");
            el.setAttribute("data-service-interactive", String(index));

            el.addEventListener("mouseenter", () => {
                activateItem(list, index, activeClass, mutedClass);
            });

            el.addEventListener("focusin", () => {
                activateItem(list, index, activeClass, mutedClass);
            });

            el.addEventListener("mouseleave", () => {
                clearItems(list, activeClass, mutedClass);
            });

            el.addEventListener("focusout", (event) => {
                const parent = findClosestCommonParent(list);

                if (!parent || !parent.contains(event.relatedTarget)) {
                    clearItems(list, activeClass, mutedClass);
                }
            });
        });
    }

    function activateItem(list, activeIndex, activeClass, mutedClass) {
        list.forEach((item, index) => {
            const isActive = index === activeIndex;

            item.classList.toggle(activeClass, isActive);
            item.classList.toggle(mutedClass, !isActive);
        });
    }

    function clearItems(list, activeClass, mutedClass) {
        list.forEach((item) => {
            item.classList.remove(activeClass, mutedClass);
        });
    }

    function findClosestCommonParent(list) {
        if (!list.length) return null;

        const first = list[0];
        const candidates = [
            first.parentElement,
            first.closest("section"),
            first.closest(".container-wide"),
            first.closest(".container")
        ].filter(Boolean);

        return candidates[0] || document.body;
    }
})();

function initReportSwiper() {
    const swipers = document.querySelectorAll(".horizontal-report-swiper");

    if (!swipers.length) return;

    if (typeof Swiper === "undefined") {
        console.warn("Swiper is not loaded. Add Swiper JS/CSS before service-page.js.");
        return;
    }

    swipers.forEach((swiperEl) => {
        if (swiperEl.dataset.reportSwiperReady === "true") return;

        swiperEl.dataset.reportSwiperReady = "true";

        const shell = swiperEl.closest(".report-swiper-shell");
        const nextEl = shell ? shell.querySelector(".report-swiper-next") : null;
        const prevEl = shell ? shell.querySelector(".report-swiper-prev") : null;
        const paginationEl = shell ? shell.querySelector(".report-swiper-pagination") : null;

        new Swiper(swiperEl, {
            loop: true,
            speed: 520,
            grabCursor: true,
            watchOverflow: true,
            preventClicks: false,
            preventClicksPropagation: false,
            threshold: 4,
            touchRatio: 1.35,
            resistanceRatio: 0.55,
            slidesPerView: 3,
            spaceBetween: 16,

            autoplay: {
                delay: 2600,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },

            navigation: {
                nextEl,
                prevEl
            },

            pagination: {
                el: paginationEl,
                clickable: true
            },

            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    speed: 430,
                    touchRatio: 1.45
                },
                641: {
                    slidesPerView: 2,
                    spaceBetween: 14,
                    speed: 480,
                    touchRatio: 1.4
                },
                1025: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                    speed: 520,
                    touchRatio: 1.35
                }
            }
        });
    });
}