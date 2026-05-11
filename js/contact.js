"use strict";

/* ==========================================================
   DRYPILOT — CONTACT PAGE JS
   File: /js/contact.js

   Contact behavior:
   - contact pipe rail active states
   - intake side board active states
   - storm map readout micro-interactions
   - accessible focus states
   ========================================================== */

(function () {
    const APP = window.DryPilot;
    const CONFIG = window.SITE_CONFIG;

    if (!APP || !CONFIG) {
        console.warn("DryPilot contact.js requires main.js and config.js.");
        return;
    }

    document.addEventListener("DOMContentLoaded", () => {
        initContactPipeRail();
        initIntakeSidePanel();
        initStormMapReadout();
        initContactMapPin();
    });

    /* ========================================================
       CONTACT PIPE RAIL
       ======================================================== */

    function initContactPipeRail() {
        const rail = document.querySelector(".contact-pipe-rail");
        const nodes = document.querySelectorAll(".contact-pipe-node");

        if (!rail || !nodes.length) return;

        nodes.forEach((node, index) => {
            node.setAttribute("data-contact-node", String(index));

            node.addEventListener("mouseenter", () => {
                setActivePipeNode(rail, nodes, index);
            });

            node.addEventListener("focusin", () => {
                setActivePipeNode(rail, nodes, index);
            });
        });

        rail.addEventListener("mouseleave", () => {
            clearActivePipeNodes(rail, nodes);
        });

        rail.addEventListener("focusout", (event) => {
            if (!rail.contains(event.relatedTarget)) {
                clearActivePipeNodes(rail, nodes);
            }
        });
    }

    function setActivePipeNode(rail, nodes, activeIndex) {
        rail.style.setProperty("--active-contact-node", String(activeIndex));

        nodes.forEach((node, index) => {
            const isActive = index === activeIndex;

            node.classList.toggle("is-active", isActive);
            node.classList.toggle("is-muted", !isActive);
        });
    }

    function clearActivePipeNodes(rail, nodes) {
        rail.style.removeProperty("--active-contact-node");

        nodes.forEach((node) => {
            node.classList.remove("is-active", "is-muted");
        });
    }

    /* ========================================================
       INTAKE SIDE PANEL
       ======================================================== */

    function initIntakeSidePanel() {
        const panel = document.querySelector(".intake-side-panel");
        const items = document.querySelectorAll(".intake-side-item");

        if (!panel || !items.length) return;

        items.forEach((item, index) => {
            item.setAttribute("tabindex", "0");
            item.setAttribute("data-intake-side-item", String(index));

            item.addEventListener("mouseenter", () => {
                activateIntakeItem(panel, items, index);
            });

            item.addEventListener("focusin", () => {
                activateIntakeItem(panel, items, index);
            });

            item.addEventListener("mouseleave", () => {
                clearIntakeItems(panel, items);
            });

            item.addEventListener("focusout", (event) => {
                if (!panel.contains(event.relatedTarget)) {
                    clearIntakeItems(panel, items);
                }
            });
        });
    }

    function activateIntakeItem(panel, items, activeIndex) {
        panel.style.setProperty("--active-intake-item", String(activeIndex));

        items.forEach((item, index) => {
            const isActive = index === activeIndex;

            item.classList.toggle("is-active", isActive);
            item.classList.toggle("is-muted", !isActive);
        });
    }

    function clearIntakeItems(panel, items) {
        panel.style.removeProperty("--active-intake-item");

        items.forEach((item) => {
            item.classList.remove("is-active", "is-muted");
        });
    }

    /* ========================================================
       STORM MAP READOUT
       ======================================================== */

    function initStormMapReadout() {
        const readout = document.querySelector(".storm-map-readout");
        const listItems = document.querySelectorAll(".map-readout-list li");

        if (!readout || !listItems.length) return;

        listItems.forEach((item, index) => {
            item.setAttribute("tabindex", "0");
            item.setAttribute("data-map-readout-item", String(index));

            item.addEventListener("mouseenter", () => {
                activateMapReadoutItem(readout, listItems, index);
            });

            item.addEventListener("focusin", () => {
                activateMapReadoutItem(readout, listItems, index);
            });

            item.addEventListener("mouseleave", () => {
                clearMapReadoutItems(readout, listItems);
            });

            item.addEventListener("focusout", (event) => {
                if (!readout.contains(event.relatedTarget)) {
                    clearMapReadoutItems(readout, listItems);
                }
            });
        });
    }

    function activateMapReadoutItem(readout, items, activeIndex) {
        readout.style.setProperty("--active-map-item", String(activeIndex));

        items.forEach((item, index) => {
            const isActive = index === activeIndex;

            item.classList.toggle("is-active", isActive);
            item.classList.toggle("is-muted", !isActive);
        });
    }

    function clearMapReadoutItems(readout, items) {
        readout.style.removeProperty("--active-map-item");

        items.forEach((item) => {
            item.classList.remove("is-active", "is-muted");
        });
    }

    /* ========================================================
       MAP PIN MICRO-INTERACTION
       ======================================================== */

    function initContactMapPin() {
        const map = document.querySelector(".storm-map-visual");
        const pin = document.querySelector(".storm-map-pin");
        const addressCard = document.querySelector(".storm-address-card");

        if (!map || !pin || !addressCard) return;

        map.addEventListener("mouseenter", () => {
            map.classList.add("is-map-active");
            pin.classList.add("is-active");
            addressCard.classList.add("is-active");
        });

        map.addEventListener("mouseleave", () => {
            map.classList.remove("is-map-active");
            pin.classList.remove("is-active");
            addressCard.classList.remove("is-active");
        });

        map.addEventListener("focusin", () => {
            map.classList.add("is-map-active");
            pin.classList.add("is-active");
            addressCard.classList.add("is-active");
        });

        map.addEventListener("focusout", (event) => {
            if (!map.contains(event.relatedTarget)) {
                map.classList.remove("is-map-active");
                pin.classList.remove("is-active");
                addressCard.classList.remove("is-active");
            }
        });
    }
})();