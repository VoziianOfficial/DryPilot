"use strict";


(function () {
    const APP = window.DryPilot;
    const CONFIG = window.SITE_CONFIG;

    if (!APP || !CONFIG) {
        console.warn("DryPilot legal.js requires main.js and config.js.");
        return;
    }

    document.addEventListener("DOMContentLoaded", () => {
        setActiveLegalLink();
        initLegalSections();
        initLegalSidebarCards();
    });



    function setActiveLegalLink() {
        const pageKey = getLegalPageKey();

        document.querySelectorAll("[data-legal-link]").forEach((link) => {
            const linkKey = link.getAttribute("data-legal-link");
            const isActive = linkKey === pageKey;

            link.classList.toggle("is-active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    function getLegalPageKey() {
        const bodyKey = document.body.getAttribute("data-legal-page");

        if (bodyKey) return bodyKey;

        if (APP.getCurrentPageKey) {
            return APP.getCurrentPageKey();
        }

        const path = window.location.pathname;
        return path.split("/").pop() || "index.html";
    }

   

    function initLegalSections() {
        const sections = Array.from(document.querySelectorAll(".legal-section"));

        if (!sections.length) return;

        sections.forEach((section, index) => {
            section.setAttribute("data-legal-section", String(index));
            section.setAttribute("tabindex", "-1");

            section.addEventListener("mouseenter", () => {
                activateLegalSection(sections, index);
            });

            section.addEventListener("focusin", () => {
                activateLegalSection(sections, index);
            });

            section.addEventListener("mouseleave", () => {
                clearLegalSections(sections);
            });

            section.addEventListener("focusout", (event) => {
                const documentBox = section.closest(".legal-document");

                if (!documentBox || !documentBox.contains(event.relatedTarget)) {
                    clearLegalSections(sections);
                }
            });
        });
    }

    function activateLegalSection(sections, activeIndex) {
        sections.forEach((section, index) => {
            const isActive = index === activeIndex;

            section.classList.toggle("is-active", isActive);
            section.classList.toggle("is-muted", !isActive);
        });
    }

    function clearLegalSections(sections) {
        sections.forEach((section) => {
            section.classList.remove("is-active", "is-muted");
        });
    }


    function initLegalSidebarCards() {
        const cards = Array.from(document.querySelectorAll(".legal-sidebar-card"));

        if (!cards.length) return;

        cards.forEach((card, index) => {
            card.setAttribute("data-legal-sidebar-card", String(index));

            card.addEventListener("mouseenter", () => {
                activateSidebarCard(cards, index);
            });

            card.addEventListener("focusin", () => {
                activateSidebarCard(cards, index);
            });

            card.addEventListener("mouseleave", () => {
                clearSidebarCards(cards);
            });

            card.addEventListener("focusout", (event) => {
                const sidebar = card.closest(".legal-sidebar");

                if (!sidebar || !sidebar.contains(event.relatedTarget)) {
                    clearSidebarCards(cards);
                }
            });
        });
    }

    function activateSidebarCard(cards, activeIndex) {
        cards.forEach((card, index) => {
            const isActive = index === activeIndex;

            card.classList.toggle("is-active", isActive);
            card.classList.toggle("is-muted", !isActive);
        });
    }

    function clearSidebarCards(cards) {
        cards.forEach((card) => {
            card.classList.remove("is-active", "is-muted");
        });
    }
})();