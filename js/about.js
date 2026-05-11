"use strict";

/* ==========================================================
   DRYPILOT — ABOUT PAGE JS
   File: /js/about.js

   About behavior:
   - routing node active states
   - drainage channel hover states
   - preparation board interaction states
   - reduced-motion safe micro-interactions
   ========================================================== */

(function () {
    const APP = window.DryPilot;
    const CONFIG = window.SITE_CONFIG;

    if (!APP || !CONFIG) {
        console.warn("DryPilot about.js requires main.js and config.js.");
        return;
    }

    document.addEventListener("DOMContentLoaded", () => {
        initRoutingDiagram();
        initDrainageChannels();
        initPreparationBoard();
    });

    /* ========================================================
       ROUTING DIAGRAM
       ======================================================== */

    function initRoutingDiagram() {
        const diagram = document.querySelector(".routing-diagram");
        const nodes = document.querySelectorAll(".routing-node");

        if (!diagram || !nodes.length) return;

        nodes.forEach((node, index) => {
            node.setAttribute("data-routing-node", String(index));

            node.addEventListener("mouseenter", () => {
                setActiveRoutingNode(diagram, nodes, index);
            });

            node.addEventListener("focusin", () => {
                setActiveRoutingNode(diagram, nodes, index);
            });
        });

        diagram.addEventListener("mouseleave", () => {
            clearActiveRoutingNodes(diagram, nodes);
        });

        diagram.addEventListener("focusout", (event) => {
            if (!diagram.contains(event.relatedTarget)) {
                clearActiveRoutingNodes(diagram, nodes);
            }
        });
    }

    function setActiveRoutingNode(diagram, nodes, activeIndex) {
        diagram.style.setProperty("--active-routing-node", String(activeIndex));

        nodes.forEach((node, index) => {
            node.classList.toggle("is-active", index === activeIndex);
            node.classList.toggle("is-muted", index !== activeIndex);
        });
    }

    function clearActiveRoutingNodes(diagram, nodes) {
        diagram.style.removeProperty("--active-routing-node");

        nodes.forEach((node) => {
            node.classList.remove("is-active", "is-muted");
        });
    }

    /* ========================================================
       DRAINAGE CHANNELS
       ======================================================== */

    function initDrainageChannels() {
        const shell = document.querySelector(".drainage-shell");
        const channels = document.querySelectorAll(".drainage-channel");

        if (!shell || !channels.length) return;

        channels.forEach((channel) => {
            channel.addEventListener("mouseenter", () => {
                shell.classList.add("has-active-channel");
                channel.classList.add("is-active");
            });

            channel.addEventListener("mouseleave", () => {
                shell.classList.remove("has-active-channel");
                channel.classList.remove("is-active");
            });

            channel.addEventListener("focusin", () => {
                shell.classList.add("has-active-channel");
                channel.classList.add("is-active");
            });

            channel.addEventListener("focusout", (event) => {
                if (!channel.contains(event.relatedTarget)) {
                    channel.classList.remove("is-active");
                }

                const hasFocusedChannel = Array.from(channels).some((item) => {
                    return item.contains(document.activeElement);
                });

                if (!hasFocusedChannel) {
                    shell.classList.remove("has-active-channel");
                }
            });
        });
    }

    /* ========================================================
       PREPARATION BOARD
       ======================================================== */

    function initPreparationBoard() {
        const panels = document.querySelectorAll(".prep-panel");

        if (!panels.length) return;

        panels.forEach((panel, index) => {
            panel.setAttribute("data-prep-panel", String(index));

            panel.addEventListener("mouseenter", () => {
                activatePreparationPanel(panels, index);
            });

            panel.addEventListener("focusin", () => {
                activatePreparationPanel(panels, index);
            });

            panel.addEventListener("mouseleave", () => {
                clearPreparationPanels(panels);
            });

            panel.addEventListener("focusout", (event) => {
                if (!panel.contains(event.relatedTarget)) {
                    clearPreparationPanels(panels);
                }
            });
        });
    }

    function activatePreparationPanel(panels, activeIndex) {
        panels.forEach((panel, index) => {
            panel.classList.toggle("is-active", index === activeIndex);
            panel.classList.toggle("is-muted", index !== activeIndex);
        });
    }

    function clearPreparationPanels(panels) {
        panels.forEach((panel) => {
            panel.classList.remove("is-active", "is-muted");
        });
    }
})();