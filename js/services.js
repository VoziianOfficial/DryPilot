"use strict";



(function () {
    const APP = window.DryPilot;
    const CONFIG = window.SITE_CONFIG;

    if (!APP || !CONFIG) {
        console.warn("DryPilot services.js requires main.js and config.js.");
        return;
    }

    const state = {
        activeServiceIndex: 0,
        activeDamageIndex: 0
    };

    document.addEventListener("DOMContentLoaded", () => {
        initValveCarousel();
        initDamageSelectorWall();
        renderGaugeComparison();
        renderProviderMatrix();
    });



    function initValveCarousel() {
        const shell = document.querySelector("[data-valve-carousel]");
        const tabsMount = document.querySelector("[data-valve-service-tabs]");
        const stageMount = document.querySelector("[data-valve-active-stage]");

        if (!shell || !tabsMount || !stageMount) return;

        renderValveTabs(tabsMount);
        renderActiveService(stageMount, state.activeServiceIndex);

        tabsMount.addEventListener("click", (event) => {
            const button = event.target.closest("[data-valve-tab]");
            if (!button) return;

            const index = Number(button.getAttribute("data-valve-tab"));

            if (Number.isNaN(index)) return;

            state.activeServiceIndex = index;
            renderValveTabs(tabsMount);
            renderActiveService(stageMount, state.activeServiceIndex);
        });

        tabsMount.addEventListener("keydown", (event) => {
            const currentButton = event.target.closest("[data-valve-tab]");
            if (!currentButton) return;

            if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
                return;
            }

            event.preventDefault();

            const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
            const nextIndex = wrapIndex(state.activeServiceIndex + direction, CONFIG.services.length);

            state.activeServiceIndex = nextIndex;
            renderValveTabs(tabsMount);
            renderActiveService(stageMount, state.activeServiceIndex);

            const nextButton = tabsMount.querySelector(`[data-valve-tab="${nextIndex}"]`);
            nextButton?.focus();
        });
    }

    function renderValveTabs(mount) {
        mount.innerHTML = CONFIG.services
            .map((service, index) => {
                const isActive = index === state.activeServiceIndex;

                return `
          <button
            class="valve-tab ${isActive ? "is-active" : ""}"
            type="button"
            data-valve-tab="${index}"
            aria-pressed="${isActive ? "true" : "false"}"
          >
            <span class="valve-tab-icon" aria-hidden="true">
              ${APP.iconSvg(service.icon)}
            </span>

            <span class="valve-tab-copy">
              <strong>${APP.escapeHtml(service.shortTitle || service.title)}</strong>
              <span>${APP.escapeHtml(service.technicalLabel || "Service route")}</span>
            </span>
          </button>
        `;
            })
            .join("");
    }

    function renderActiveService(mount, index) {
        const service = CONFIG.services[index] || CONFIG.services[0];

        if (!service) return;

        mount.innerHTML = `
      <article class="pipe-bend-frame">
        <div class="active-service-media">
          <img src="${APP.escapeHtml(service.image)}" alt="" loading="lazy">
        </div>

        <div class="active-service-content">
          <p class="active-service-label">
            ${APP.iconSvg(service.icon)}
            <span>${APP.escapeHtml(service.technicalLabel || "Service route")}</span>
          </p>

          <h3>${APP.escapeHtml(service.title)}</h3>

          <p>${APP.escapeHtml(service.summary)}</p>

          <div class="active-service-mini">
            <span>Compare independent local provider options.</span>
            <span>Provider availability can vary by ZIP code.</span>
            <span>Verify licensing, insurance, timelines, and written estimates.</span>
          </div>

          <div class="hero-actions">
            <a class="btn btn-primary" href="${APP.escapeHtml(service.href)}">
              ${APP.escapeHtml(service.cta || "Explore service route")}
              ${APP.iconSvg("arrow", "btn-icon")}
            </a>

            <a class="btn btn-secondary" href="contact.html#request">
              Request Options
            </a>
          </div>
        </div>
      </article>
    `;
    }



    function initDamageSelectorWall() {
        const wall = document.querySelector("[data-damage-selector]");
        const rail = document.querySelector("[data-damage-selector-rail]");
        const panel = document.querySelector("[data-damage-panel]");

        if (!wall || !rail || !panel) return;

        const items = CONFIG.servicesPage?.selectorWall?.items || [];

        if (!items.length) return;

        renderDamageSelectorRail(rail, items);
        updateDamagePanel(panel, items[state.activeDamageIndex], state.activeDamageIndex);

        rail.addEventListener("click", (event) => {
            const button = event.target.closest("[data-damage-selector-button]");
            if (!button) return;

            const index = Number(button.getAttribute("data-damage-selector-button"));

            if (Number.isNaN(index)) return;

            state.activeDamageIndex = index;
            renderDamageSelectorRail(rail, items);
            updateDamagePanel(panel, items[index], index);
        });

        rail.addEventListener("keydown", (event) => {
            const currentButton = event.target.closest("[data-damage-selector-button]");
            if (!currentButton) return;

            if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
                return;
            }

            event.preventDefault();

            const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
            const nextIndex = wrapIndex(state.activeDamageIndex + direction, items.length);

            state.activeDamageIndex = nextIndex;
            renderDamageSelectorRail(rail, items);
            updateDamagePanel(panel, items[nextIndex], nextIndex);

            const nextButton = rail.querySelector(`[data-damage-selector-button="${nextIndex}"]`);
            nextButton?.focus();
        });
    }

    function renderDamageSelectorRail(mount, items) {
        const iconMap = ["leak", "waves", "pipe", "basement", "droplet"];

        mount.innerHTML = items
            .map((item, index) => {
                const isActive = index === state.activeDamageIndex;

                return `
          <button
            class="selector-button ${isActive ? "is-active" : ""}"
            type="button"
            data-damage-selector-button="${index}"
            aria-pressed="${isActive ? "true" : "false"}"
          >
            <span class="selector-button-icon" aria-hidden="true">
              ${APP.iconSvg(iconMap[index] || "droplet")}
            </span>

            <span>
              <strong>${APP.escapeHtml(item.title)}</strong>
              <span>${APP.escapeHtml(getShortSelectorText(item.text))}</span>
            </span>
          </button>
        `;
            })
            .join("");
    }

    function updateDamagePanel(panel, item, index) {
        if (!item) return;

        const kicker = panel.querySelector("[data-damage-panel-kicker]");
        const title = panel.querySelector("[data-damage-panel-title]");
        const text = panel.querySelector("[data-damage-panel-text]");
        const tags = panel.querySelector(".damage-panel-tags");

        if (kicker) {
            kicker.textContent = `Damage signal ${String(index + 1).padStart(2, "0")}`;
        }

        if (title) {
            title.textContent = item.title;
        }

        if (text) {
            text.textContent = item.text;
        }

        if (tags) {
            tags.innerHTML = getPanelTags(index)
                .map((tag) => `<span>${APP.escapeHtml(tag)}</span>`)
                .join("");
        }
    }

    function getShortSelectorText(text) {
        const value = String(text || "");
        if (value.length <= 46) return value;

        return `${value.slice(0, 43).trim()}...`;
    }

    function getPanelTags(index) {
        const tagSets = [
            ["Scope clarity", "Moisture review", "Written estimate"],
            ["Drying approach", "Documentation", "Timeline"],
            ["Source control", "Wall moisture", "Ceiling spread"],
            ["Lower level", "Water depth", "Follow-up notes"],
            ["Readings", "Photos", "Provider variation"]
        ];

        return tagSets[index] || tagSets[0];
    }



    function renderGaugeComparison() {
        const mount = document.querySelector("[data-gauge-grid]");
        const gauges = CONFIG.servicesPage?.gaugeComparison?.gauges || [];

        if (!mount || !gauges.length) return;

        const icons = ["gauge", "pipe", "clipboard", "target", "shield", "map-pin"];

        mount.innerHTML = gauges
            .map((gauge, index) => {
                return `
          <article class="gauge-card">
            <div class="gauge-card-content">
              <span class="gauge-icon" aria-hidden="true">
                ${APP.iconSvg(icons[index] || "droplet")}
              </span>

              <h3>${APP.escapeHtml(gauge.title)}</h3>
              <p>${APP.escapeHtml(gauge.text)}</p>
            </div>
          </article>
        `;
            })
            .join("");
    }

 

    function renderProviderMatrix() {
        const mount = document.querySelector("[data-provider-matrix]");
        const matrix = CONFIG.servicesPage?.matrix;

        if (!mount || !matrix) return;

        const columns = matrix.columns || [];
        const rows = matrix.rows || [];

        mount.innerHTML = `
      <table class="provider-matrix-table">
        <thead>
          <tr>
            ${columns.map((column) => `<th scope="col">${APP.escapeHtml(column)}</th>`).join("")}
          </tr>
        </thead>

        <tbody>
          ${rows
                .map((row) => {
                    return `
                <tr>
                  ${row
                            .map((cell, index) => {
                                if (index === 0) {
                                    return `<td><strong>${APP.escapeHtml(cell)}</strong></td>`;
                                }

                                return `<td>${APP.escapeHtml(cell)}</td>`;
                            })
                            .join("")}
                </tr>
              `;
                })
                .join("")}
        </tbody>
      </table>
    `;
    }

    

    function wrapIndex(index, length) {
        if (!length) return 0;

        if (index < 0) return length - 1;
        if (index >= length) return 0;

        return index;
    }
})();