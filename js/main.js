"use strict";

/* ==========================================================
   DRYPILOT — MAIN JS
   File: /js/main.js

   Shared behavior:
   - config injection
   - header/footer rendering
   - mobile menu
   - service rendering
   - FAQ rendering + JSON-LD
   - form validation
   - cookie banner
   - accessibility helpers
   - hardcoded business data audit
   ========================================================== */

(function () {
    const CONFIG = window.SITE_CONFIG;

    if (!CONFIG) {
        console.warn("SITE_CONFIG is missing. Make sure /js/config.js is loaded before /js/main.js.");
        return;
    }

    const SELECTORS = {
        headerMount: "[data-site-header]",
        footerMount: "[data-site-footer]",
        mobileMenuMount: "[data-mobile-menu]",
        cookieMount: "[data-policy-banner]",
        faqList: "[data-faq-list]",
        faqSchema: "[data-faq-schema]",
        leadForm: "[data-lead-form]",
        serviceCards: "[data-service-cards]",
        footerServices: "[data-footer-services]",
        footerNav: "[data-footer-nav]",
        footerLegal: "[data-footer-legal]",
        mobileServicesList: "[data-mobile-services-list]",
        mobileNavList: "[data-mobile-nav-list]",
        configText: "[data-config-text]",
        configHtml: "[data-config-html]"
    };

    const state = {
        lastFocusedElement: null,
        activeCarouselIndex: 0
    };

    document.addEventListener("DOMContentLoaded", () => {
        applyPageMeta();
        ensureSharedMounts();
        renderHeader();
        renderFooter();
        applyConfig();
        renderServiceCollections();
        renderFaqs();
        renderCookieBanner();
        initForms();
        initMobileMenu();
        initFaqAccordions();
        initAnchorLinks();
        initInteractiveIcons();
        initReducedMotionSafety();
        auditHardcodedBusinessData();
    });

    /* ========================================================
       BASIC HELPERS
       ======================================================== */

    function getCurrentPageKey() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf("/") + 1);
        return filename || "index.html";
    }

    function safeText(value, fallback = "") {
        if (value === undefined || value === null) return fallback;
        return String(value);
    }

    function getByPath(object, path) {
        if (!object || !path) return "";

        return path.split(".").reduce((acc, key) => {
            if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
                return acc[key];
            }

            return "";
        }, object);
    }

    function createElement(tag, className, text) {
        const el = document.createElement(tag);

        if (className) {
            el.className = className;
        }

        if (text !== undefined && text !== null) {
            el.textContent = text;
        }

        return el;
    }

    function setTextAll(selector, value) {
        document.querySelectorAll(selector).forEach((el) => {
            el.textContent = safeText(value);
        });
    }

    function setAttributeAll(selector, attr, value) {
        document.querySelectorAll(selector).forEach((el) => {
            el.setAttribute(attr, safeText(value));
        });
    }

    function normalizePath(path) {
        return safeText(path).replace("./", "").replace("/", "");
    }

    function isCurrentPage(href) {
        return normalizePath(href) === normalizePath(getCurrentPageKey());
    }

    function escapeHtml(value) {
        return safeText(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    /* ========================================================
       SVG ICON SYSTEM
       ======================================================== */

    function iconSvg(name, extraClass = "") {
        const iconName = safeText(name).toLowerCase();

        const icons = {
            home: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 10.6 12 4l8 6.6v8.9a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 19.5v-8.9Z"/>
          <path d="M9 21v-7h6v7"/>
        </svg>
      `,

            droplet: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.5s6 6.7 6 11.1a6 6 0 0 1-12 0c0-4.4 6-11.1 6-11.1Z"/>
          <path d="M9.3 15.2c.2 1.5 1.3 2.5 2.8 2.5"/>
        </svg>
      `,

            waves: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 8.5c2 0 2-1.5 4-1.5s2 1.5 4 1.5S13 7 15 7s2 1.5 4 1.5 2-1.5 4-1.5"/>
          <path d="M3 13c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/>
          <path d="M3 17.5c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/>
        </svg>
      `,

            pipe: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h8a5 5 0 0 1 5 5v5"/>
          <path d="M14 17h6"/>
          <path d="M4 5v4"/>
          <path d="M2.5 5h3"/>
          <path d="M2.5 9h3"/>
          <path d="M18 15v4"/>
          <path d="M20.5 15h-5"/>
          <path d="M20.5 19h-5"/>
          <path class="icon-flow-line" d="M5.5 7H12a5 5 0 0 1 5 5v2"/>
        </svg>
      `,

            basement: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 11 12 4l8 7"/>
          <path d="M6 10.5V20h12v-9.5"/>
          <path d="M8 16c1.3 0 1.3-1 2.6-1s1.3 1 2.7 1 1.3-1 2.7-1"/>
          <path d="M8 18.5c1.3 0 1.3-1 2.6-1s1.3 1 2.7 1 1.3-1 2.7-1"/>
        </svg>
      `,

            shield: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 20 6v6c0 5-3.3 8.2-8 9-4.7-.8-8-4-8-9V6l8-3Z"/>
          <path d="M9 12.2 11.2 14.4 15.5 9.8"/>
        </svg>
      `,

            phone: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.5 4.5 10 7.8 8.4 10c1.2 2.5 3.1 4.4 5.6 5.6l2.2-1.6 3.3 2.5c.4.3.5.8.3 1.3-.6 1.4-1.8 2.4-3.2 2.8-.8.2-1.7.1-2.5-.2C9.1 18.5 5.5 14.9 3.6 9.9c-.3-.8-.4-1.7-.2-2.5.4-1.4 1.4-2.6 2.8-3.2.5-.2 1-.1 1.3.3Z"/>
          <path d="M15 4.5c2.3.6 4 2.2 4.6 4.5"/>
          <path d="M15.8 1.8c3.4.8 5.8 3.3 6.6 6.6"/>
        </svg>
      `,

            email: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.5 6.5h15A1.5 1.5 0 0 1 21 8v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18V8a1.5 1.5 0 0 1 1.5-1.5Z"/>
          <path d="m4 8 8 5.6L20 8"/>
        </svg>
      `,

            "map-pin": `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s7-5.4 7-11.2A7 7 0 0 0 5 9.8C5 15.6 12 21 12 21Z"/>
          <circle cx="12" cy="9.8" r="2.3"/>
        </svg>
      `,

            map: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m3 6 5-2 8 2 5-2v14l-5 2-8-2-5 2V6Z"/>
          <path d="M8 4v14"/>
          <path d="M16 6v14"/>
        </svg>
      `,

            network: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="6" cy="12" r="2.5"/>
          <circle cx="18" cy="6" r="2.5"/>
          <circle cx="18" cy="18" r="2.5"/>
          <path d="M8.2 10.8 15.8 7.2"/>
          <path d="M8.2 13.2 15.8 16.8"/>
        </svg>
      `,

            target: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="12" cy="12" r="1.2"/>
        </svg>
      `,

            gauge: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 15a8 8 0 1 1 16 0"/>
          <path d="M12 15 16.5 9"/>
          <path d="M7 15h10"/>
          <path d="M6.4 11.2 5 10.4"/>
          <path d="M17.6 11.2 19 10.4"/>
        </svg>
      `,

            clipboard: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 4h6l1 2h2a1.5 1.5 0 0 1 1.5 1.5V20A1.5 1.5 0 0 1 18 21.5H6A1.5 1.5 0 0 1 4.5 20V7.5A1.5 1.5 0 0 1 6 6h2l1-2Z"/>
          <path d="M9 6h6"/>
          <path d="M8 12h8"/>
          <path d="M8 16h6"/>
        </svg>
      `,

            leak: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h9a4 4 0 0 1 4 4v2"/>
          <path d="M17 13c-1.4 1.6-2.1 2.8-2.1 3.8a2.1 2.1 0 0 0 4.2 0c0-1-.7-2.2-2.1-3.8Z"/>
          <path d="M4 5v4"/>
          <path d="M2.5 5h3"/>
          <path d="M2.5 9h3"/>
        </svg>
      `,

            arrow: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14"/>
          <path d="m13 6 6 6-6 6"/>
        </svg>
      `,

            close: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12"/>
          <path d="M18 6 6 18"/>
        </svg>
      `,

            menu: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16"/>
          <path d="M4 12h16"/>
          <path d="M4 17h16"/>
        </svg>
      `
        };

        const svg = icons[iconName] || icons.droplet;

        return `<span class="svg-icon ${extraClass}" data-icon="${escapeHtml(iconName)}">${svg}</span>`;
    }

    function dryPilotLogoMarkup() {
        return `
      <span class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <path class="brand-shield" d="M24 4 39 9.8v12.8c0 10.3-6.3 17.2-15 20.5C15.3 39.8 9 32.9 9 22.6V9.8L24 4Z"/>
          <path class="brand-wave" d="M15 27.2c3.2 0 3.2-2.1 6.4-2.1s3.2 2.1 6.5 2.1 3.2-2.1 6.1-2.1"/>
          <path class="brand-drop" d="M24 12.5s5.1 5.8 5.1 9.5a5.1 5.1 0 0 1-10.2 0c0-3.7 5.1-9.5 5.1-9.5Z"/>
          <path class="brand-shimmer" d="M18 14.5 31 10"/>
        </svg>
      </span>
      <span class="brand-text" data-company-name>${escapeHtml(CONFIG.brand.logoText || CONFIG.companyName)}</span>
    `;
    }

    /* ========================================================
       PAGE META
       ======================================================== */

    function applyPageMeta() {
        const pageKey = getCurrentPageKey();
        const meta = CONFIG.pageMeta && CONFIG.pageMeta[pageKey];

        if (!meta) {
            console.warn("No pageMeta entry found for:", pageKey);
            return;
        }

        if (meta.title) {
            document.title = meta.title;
        }

        let description = document.querySelector('meta[name="description"]');

        if (!description) {
            description = document.createElement("meta");
            description.setAttribute("name", "description");
            document.head.appendChild(description);
        }

        description.setAttribute("content", meta.description || "");
    }

    /* ========================================================
       SHARED MOUNTS
       ======================================================== */

    function ensureSharedMounts() {
        if (!document.querySelector(SELECTORS.headerMount)) {
            const headerMount = document.createElement("div");
            headerMount.setAttribute("data-site-header", "");
            document.body.prepend(headerMount);
        }

        if (!document.querySelector(SELECTORS.footerMount)) {
            const footerMount = document.createElement("div");
            footerMount.setAttribute("data-site-footer", "");
            document.body.appendChild(footerMount);
        }

        if (!document.querySelector(SELECTORS.cookieMount)) {
            const cookieMount = document.createElement("div");
            cookieMount.setAttribute("data-policy-banner", "");
            document.body.appendChild(cookieMount);
        }
    }

    /* ========================================================
       HEADER
       ======================================================== */

    function renderHeader() {
        const mount = document.querySelector(SELECTORS.headerMount);
        if (!mount) return;

        const navLinks = CONFIG.navigation
            .map((item) => {
                const active = isCurrentPage(item.href) ? "is-active" : "";

                return `
          <a class="site-nav-link ${active}" href="${escapeHtml(item.href)}">
            ${escapeHtml(item.label)}
          </a>
        `;
            })
            .join("");

        mount.innerHTML = `
      <header class="site-header" data-header>
        <a class="skip-link" href="#main">Skip to content</a>

        <div class="container site-header-inner">
          <a class="site-logo" href="index.html" aria-label="${escapeHtml(CONFIG.brand.logoLabel)}">
            ${dryPilotLogoMarkup()}
          </a>

          <nav class="site-nav" aria-label="Primary navigation">
            ${navLinks}
          </nav>

          <div class="site-header-actions">
            <a class="header-phone" href="${escapeHtml(CONFIG.phoneHref)}" aria-label="${escapeHtml(CONFIG.phoneLabel)}" data-phone-link>
              ${iconSvg("phone")}
              <span data-phone-text>${escapeHtml(CONFIG.phoneButtonText || CONFIG.phone)}</span>
            </a>

            <a class="btn btn-primary header-cta" href="contact.html#request" data-form-submit-text>
              ${escapeHtml(CONFIG.forms.submitText)}
              ${iconSvg("arrow", "btn-icon")}
            </a>

            <button class="mobile-menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu" data-mobile-menu-open>
              ${iconSvg("menu")}
            </button>
          </div>
        </div>
      </header>

      <div class="mobile-menu-backdrop" data-mobile-menu-backdrop hidden></div>

      <aside class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation" data-mobile-menu inert>
        <div class="mobile-menu-shell">
          <div class="mobile-menu-top">
            <a class="site-logo mobile-menu-logo" href="index.html" aria-label="${escapeHtml(CONFIG.brand.logoLabel)}">
              ${dryPilotLogoMarkup()}
            </a>

            <button class="mobile-menu-close" type="button" aria-label="Close menu" data-mobile-menu-close>
              ${iconSvg("close")}
            </button>
          </div>

          <div class="mobile-menu-panel">
            <p class="mobile-menu-kicker">${escapeHtml(CONFIG.brand.logoKicker || CONFIG.brand.tagline)}</p>

            <nav class="mobile-menu-nav" aria-label="Mobile primary navigation" data-mobile-nav-list>
              ${renderMobileNavLinks()}
            </nav>

            <div class="mobile-service-block">
              <p class="mobile-service-title">Water damage routes</p>
              <div class="mobile-service-list" data-mobile-services-list>
                ${renderMobileServiceLinks()}
              </div>
            </div>

            <div class="mobile-contact-grid">
              <a class="mobile-contact-item" href="${escapeHtml(CONFIG.phoneHref)}" aria-label="${escapeHtml(CONFIG.phoneLabel)}" data-phone-link>
                ${iconSvg("phone")}
                <span data-phone-text>${escapeHtml(CONFIG.phoneButtonText || CONFIG.phone)}</span>
              </a>

              <a class="mobile-contact-item" href="mailto:${escapeHtml(CONFIG.email)}" aria-label="Email ${escapeHtml(CONFIG.companyName)}" data-email-link>
                ${iconSvg("email")}
                <span data-email-text>${escapeHtml(CONFIG.email)}</span>
              </a>
            </div>

            <a class="btn btn-primary mobile-menu-cta" href="contact.html#request">
              ${escapeHtml(CONFIG.forms.submitText)}
              ${iconSvg("arrow", "btn-icon")}
            </a>

            <p class="mobile-menu-note" data-legal-notice>
              ${escapeHtml(CONFIG.legalNotice)}
            </p>
          </div>
        </div>
      </aside>
    `;
    }

    function renderMobileNavLinks() {
        return CONFIG.navigation
            .map((item) => {
                const active = isCurrentPage(item.href) ? "is-active" : "";

                return `
          <a class="mobile-nav-link ${active}" href="${escapeHtml(item.href)}">
            ${iconSvg(item.icon || "droplet")}
            <span>${escapeHtml(item.label)}</span>
          </a>
        `;
            })
            .join("");
    }

    function renderMobileServiceLinks() {
        return CONFIG.services
            .map((service) => {
                return `
          <a class="mobile-service-link" href="${escapeHtml(service.href)}">
            ${iconSvg(service.icon)}
            <span>
              <strong>${escapeHtml(service.shortTitle || service.title)}</strong>
              <small>${escapeHtml(service.technicalLabel || "Service route")}</small>
            </span>
          </a>
        `;
            })
            .join("");
    }

    /* ========================================================
       FOOTER
       ======================================================== */

    function renderFooter() {
        const mount = document.querySelector(SELECTORS.footerMount);
        if (!mount) return;

        const navLinks = CONFIG.navigation
            .map((item) => {
                return `
          <li>
            <a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>
          </li>
        `;
            })
            .join("");

        const serviceLinks = CONFIG.services
            .map((service) => {
                return `
          <li>
            <a href="${escapeHtml(service.href)}">${escapeHtml(service.title)}</a>
          </li>
        `;
            })
            .join("");

        const legalLinks = CONFIG.legalLinks
            .map((item) => {
                return `
          <li>
            <a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>
          </li>
        `;
            })
            .join("");

        mount.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <a class="site-logo footer-logo" href="index.html" aria-label="${escapeHtml(CONFIG.brand.logoLabel)}">
              ${dryPilotLogoMarkup()}
            </a>

            <p class="footer-text" data-footer-text>
              ${escapeHtml(CONFIG.footerText)}
            </p>

            <div class="footer-action-row">
              <a class="footer-call" href="${escapeHtml(CONFIG.phoneHref)}" aria-label="${escapeHtml(CONFIG.phoneLabel)}" data-phone-link>
                ${iconSvg("phone")}
                <span data-phone-text>${escapeHtml(CONFIG.phoneButtonText || CONFIG.phone)}</span>
              </a>

              <a class="btn btn-primary btn-small" href="contact.html#request">
                ${escapeHtml(CONFIG.forms.submitText)}
              </a>
            </div>
          </div>

          <div class="footer-column">
            <h2 class="footer-title">Navigation</h2>
            <ul class="footer-links" data-footer-nav>
              ${navLinks}
            </ul>
          </div>

          <div class="footer-column">
            <h2 class="footer-title">Service routes</h2>
            <ul class="footer-links" data-footer-services>
              ${serviceLinks}
            </ul>
          </div>

          <div class="footer-column">
            <h2 class="footer-title">Contact</h2>

            <ul class="footer-contact-list">
              <li>
                ${iconSvg("email")}
                <a href="mailto:${escapeHtml(CONFIG.email)}" data-email-link>
                  <span data-email-text>${escapeHtml(CONFIG.email)}</span>
                </a>
              </li>

              <li>
                ${iconSvg("map-pin")}
                <span data-address-text>${escapeHtml(CONFIG.address.full)}</span>
              </li>

              <li>
                ${iconSvg("shield")}
                <span data-company-id>${escapeHtml(CONFIG.companyId)}</span>
              </li>

              <li>
                ${iconSvg("map")}
                <span data-service-area>${escapeHtml(CONFIG.serviceArea)}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="container footer-bottom">
          <div class="footer-legal-wrap">
            <ul class="footer-legal-links" data-footer-legal>
              ${legalLinks}
            </ul>

            <p class="footer-disclaimer" data-disclaimer>
              ${escapeHtml(CONFIG.disclaimer)}
            </p>
          </div>

          <p class="footer-copy">
            © <span data-current-year>${new Date().getFullYear()}</span>
            <span data-company-name>${escapeHtml(CONFIG.companyName)}</span>. All rights reserved.
          </p>
        </div>
      </footer>
    `;
    }

    /* ========================================================
       CONFIG INJECTION
       ======================================================== */

    function applyConfig() {
        setTextAll("[data-company-name]", CONFIG.companyName);
        setTextAll("[data-company-id]", CONFIG.companyId);
        setTextAll("[data-brand-short-name]", CONFIG.brand.shortName);
        setTextAll("[data-phone-text]", CONFIG.phoneButtonText || CONFIG.phone);
        setTextAll("[data-phone-label]", CONFIG.phoneLabel);
        setTextAll("[data-email-text]", CONFIG.email);
        setTextAll("[data-address-text]", CONFIG.address.full);
        setTextAll("[data-service-area]", CONFIG.serviceArea);
        setTextAll("[data-footer-text]", CONFIG.footerText);
        setTextAll("[data-disclaimer]", CONFIG.disclaimer);
        setTextAll("[data-legal-notice]", CONFIG.legalNotice);
        setTextAll("[data-form-submit-text]", CONFIG.forms.submitText);

        setAttributeAll("[data-phone-link]", "href", CONFIG.phoneHref);
        setAttributeAll("[data-phone-link]", "aria-label", CONFIG.phoneLabel);
        setAttributeAll("[data-email-link]", "href", `mailto:${CONFIG.email}`);
        setAttributeAll("[data-email-link]", "aria-label", `Email ${CONFIG.companyName}`);

        document.querySelectorAll(SELECTORS.configText).forEach((el) => {
            const path = el.getAttribute("data-config-text");
            const value = getByPath(CONFIG, path);
            el.textContent = safeText(value);
        });

        document.querySelectorAll(SELECTORS.configHtml).forEach((el) => {
            const path = el.getAttribute("data-config-html");
            const value = getByPath(CONFIG, path);
            el.innerHTML = safeText(value);
        });

        document.querySelectorAll("[data-current-year]").forEach((el) => {
            el.textContent = String(new Date().getFullYear());
        });
    }

    /* ========================================================
       SERVICE RENDERING
       ======================================================== */

    function renderServiceCollections() {
        document.querySelectorAll(SELECTORS.serviceCards).forEach((mount) => {
            mount.innerHTML = CONFIG.services.map(renderServiceCard).join("");
        });

        document.querySelectorAll("[data-service-delta]").forEach((mount) => {
            mount.innerHTML = renderServiceDelta();
        });

        document.querySelectorAll("[data-service-link-list]").forEach((mount) => {
            mount.innerHTML = CONFIG.services.map(renderSimpleServiceLink).join("");
        });
    }

    function renderServiceCard(service) {
        return `
      <article class="service-card" data-service-card="${escapeHtml(service.id)}">
        <a class="service-card-link" href="${escapeHtml(service.href)}">
          <div class="service-card-media">
            <img src="${escapeHtml(service.image)}" alt="" loading="lazy">
          </div>

          <div class="service-card-body">
            <span class="service-card-icon">
              ${iconSvg(service.icon)}
            </span>

            <p class="service-card-eyebrow">${escapeHtml(service.eyebrow || service.technicalLabel)}</p>
            <h3>${escapeHtml(service.title)}</h3>
            <p>${escapeHtml(service.summary)}</p>

            <span class="service-card-cta">
              ${escapeHtml(service.cta || "Explore options")}
              ${iconSvg("arrow", "inline-arrow")}
            </span>
          </div>
        </a>
      </article>
    `;
    }

    function renderSimpleServiceLink(service) {
        return `
      <a class="service-route-link" href="${escapeHtml(service.href)}">
        ${iconSvg(service.icon)}
        <span>
          <strong>${escapeHtml(service.title)}</strong>
          <small>${escapeHtml(service.summary)}</small>
        </span>
      </a>
    `;
    }

  function renderServiceDelta() {
    return `
      <div class="delta-system delta-droplet-system">
        ${CONFIG.services
        .map((service, index) => {
          const directionClass = index % 2 === 0 ? "delta-card--up" : "delta-card--down";

          return `
                  <article class="delta-card ${directionClass}" data-delta-card="${escapeHtml(service.id)}">
                    <a class="delta-card-link" href="${escapeHtml(service.href)}">
                      <img
                        class="delta-card-image"
                        src="${escapeHtml(service.image)}"
                        alt=""
                        loading="lazy"
                      >

                      <span class="delta-card-glow" aria-hidden="true"></span>
                      <span class="delta-card-line" aria-hidden="true"></span>

                      <div class="delta-card-content">
                        <div class="delta-card-topline">
                          ${iconSvg(service.icon)}
                          <span>${escapeHtml(service.technicalLabel || service.eyebrow || "Service route")}</span>
                        </div>

                        <h3>${escapeHtml(service.title)}</h3>

                        <p>${escapeHtml(service.moduleText || service.summary)}</p>

                        <span class="delta-card-cta">
                          ${escapeHtml(service.cta || "Explore options")}
                          ${iconSvg("arrow", "inline-arrow")}
                        </span>
                      </div>
                    </a>
                  </article>
                `;
        })
        .join("")}
      </div>
    `;
  }

    /* ========================================================
       FAQ
       ======================================================== */

    function renderFaqs() {
        document.querySelectorAll(SELECTORS.faqList).forEach((mount) => {
            const key = mount.getAttribute("data-faq-list") || "general";
            const faqs = CONFIG.faqs[key] || CONFIG.faqs.general || [];

            mount.innerHTML = faqs
                .map((faq, index) => {
                    const id = `faq-${key}-${index}`;
                    const panelId = `${id}-panel`;

                    return `
            <div class="faq-item">
              <button
                class="faq-button"
                type="button"
                id="${escapeHtml(id)}"
                aria-expanded="false"
                aria-controls="${escapeHtml(panelId)}"
                data-faq-button
              >
                <span class="faq-button-icon">${iconSvg("droplet")}</span>
                <span class="faq-button-text">${escapeHtml(faq.question)}</span>
                <span class="faq-button-marker" aria-hidden="true"></span>
              </button>

              <div
                class="faq-panel"
                id="${escapeHtml(panelId)}"
                role="region"
                aria-labelledby="${escapeHtml(id)}"
                hidden
              >
                <p>${escapeHtml(faq.answer)}</p>
              </div>
            </div>
          `;
                })
                .join("");

            renderFaqSchema(key, faqs);
        });
    }

    function renderFaqSchema(key, faqs) {
        if (!faqs.length) return;

        const existing = document.querySelector(`script[data-faq-schema-script="${key}"]`);
        if (existing) {
            existing.remove();
        }

        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer
                }
            }))
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-faq-schema-script", key);
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    }

    function initFaqAccordions() {
        document.querySelectorAll("[data-faq-button]").forEach((button) => {
            button.addEventListener("click", () => {
                const panelId = button.getAttribute("aria-controls");
                const panel = document.getElementById(panelId);
                const isOpen = button.getAttribute("aria-expanded") === "true";

                if (!panel) return;

                button.setAttribute("aria-expanded", String(!isOpen));
                panel.hidden = isOpen;
            });
        });
    }

    /* ========================================================
       FORMS
       ======================================================== */

    function initForms() {
        document.querySelectorAll(SELECTORS.leadForm).forEach((form) => {
            if (!form.children.length) {
                renderLeadFormFields(form);
            }

            form.setAttribute("novalidate", "");

            form.addEventListener("submit", (event) => {
                event.preventDefault();
                handleLeadFormSubmit(form);
            });
        });
    }

    function renderLeadFormFields(form) {
        const variant = form.getAttribute("data-form-variant") || "standard";
        const includeMessage = variant === "contact";
        const includeHappened = variant === "contact";

        form.innerHTML = `
      <div class="form-head">
        <p class="form-kicker">Incident details</p>
        <h2>${escapeHtml(CONFIG.forms.leadTitle)}</h2>
        <p>${escapeHtml(CONFIG.forms.leadIntro)}</p>
      </div>

      <div class="form-grid">
        ${renderInputField("fullName", "text", CONFIG.forms.fields.fullName, CONFIG.forms.placeholders.fullName, true)}
        ${renderInputField("phone", "tel", CONFIG.forms.fields.phone, CONFIG.forms.placeholders.phone, true)}
        ${renderInputField("email", "email", CONFIG.forms.fields.email, CONFIG.forms.placeholders.email, true)}
        ${renderInputField("zip", "text", CONFIG.forms.fields.zip, CONFIG.forms.placeholders.zip, true)}
        ${renderSelectField("damageType", CONFIG.forms.fields.damageType, CONFIG.forms.damageTypes, true)}
        ${includeHappened ? renderSelectField("happened", CONFIG.forms.fields.happened, CONFIG.forms.timingOptions, false) : ""}
        ${includeMessage ? renderTextareaField("message", CONFIG.forms.fields.message, CONFIG.forms.placeholders.message) : ""}
      </div>

      <button class="btn btn-primary form-submit" type="submit">
        <span>${escapeHtml(CONFIG.forms.submitText)}</span>
        ${iconSvg("arrow", "btn-icon")}
      </button>

      <p class="form-message" data-form-message role="status" aria-live="polite"></p>
      <p class="form-legal-note" data-legal-notice>${escapeHtml(CONFIG.legalNotice)}</p>
    `;
    }

    function renderInputField(name, type, label, placeholder, required) {
        return `
      <label class="field">
        <span>${escapeHtml(label)}${required ? " *" : ""}</span>
        <input
          type="${escapeHtml(type)}"
          name="${escapeHtml(name)}"
          placeholder="${escapeHtml(placeholder)}"
          ${required ? "required" : ""}
        >
      </label>
    `;
    }

    function renderSelectField(name, label, options, required) {
        return `
      <label class="field field-select">
        <span>${escapeHtml(label)}${required ? " *" : ""}</span>
        <select name="${escapeHtml(name)}" ${required ? "required" : ""}>
          <option value="">Select ${escapeHtml(label.toLowerCase())}</option>
          ${options
                .map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
                .join("")}
        </select>
      </label>
    `;
    }

    function renderTextareaField(name, label, placeholder) {
        return `
      <label class="field field-full">
        <span>${escapeHtml(label)}</span>
        <textarea
          name="${escapeHtml(name)}"
          rows="4"
          placeholder="${escapeHtml(placeholder)}"
        ></textarea>
      </label>
    `;
    }

    function handleLeadFormSubmit(form) {
        const message = form.querySelector("[data-form-message]");
        const requiredFields = Array.from(form.querySelectorAll("[required]"));

        const invalidFields = requiredFields.filter((field) => {
            return !safeText(field.value).trim();
        });

        form.querySelectorAll(".is-invalid").forEach((field) => {
            field.classList.remove("is-invalid");
        });

        if (invalidFields.length) {
            invalidFields.forEach((field) => {
                field.classList.add("is-invalid");
            });

            if (message) {
                message.textContent = CONFIG.forms.errorMessage;
                message.classList.remove("is-success");
                message.classList.add("is-error");
            }

            invalidFields[0].focus();
            return;
        }

        if (message) {
            message.textContent = CONFIG.forms.successMessage;
            message.classList.remove("is-error");
            message.classList.add("is-success");
        }

        form.reset();
    }

    /* ========================================================
       COOKIE BANNER
       ======================================================== */

    function renderCookieBanner() {
        const mount = document.querySelector(SELECTORS.cookieMount);
        if (!mount || !CONFIG.cookieBanner) return;

        const storageKey = CONFIG.cookieBanner.storageKey;
        const savedChoice = window.localStorage.getItem(storageKey);

        if (savedChoice) {
            mount.innerHTML = "";
            mount.hidden = true;
            return;
        }

        const links = CONFIG.cookieBanner.links
            .map((link) => {
                return `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`;
            })
            .join("");

        mount.hidden = false;
        mount.innerHTML = `
      <section class="cookie-banner" aria-label="${escapeHtml(CONFIG.cookieBanner.title)}">
        <div class="cookie-banner-copy">
          <h2>${escapeHtml(CONFIG.cookieBanner.title)}</h2>
          <p>${escapeHtml(CONFIG.cookieBanner.text)}</p>
          <div class="cookie-links">
            ${links}
          </div>
        </div>

        <div class="cookie-actions">
          <button class="btn btn-secondary btn-small" type="button" data-cookie-decline>
            ${escapeHtml(CONFIG.cookieBanner.decline)}
          </button>

          <button class="btn btn-primary btn-small" type="button" data-cookie-accept>
            ${escapeHtml(CONFIG.cookieBanner.accept)}
          </button>
        </div>
      </section>
    `;

        mount.querySelector("[data-cookie-accept]").addEventListener("click", () => {
            window.localStorage.setItem(storageKey, "accepted");
            mount.innerHTML = "";
            mount.hidden = true;
        });

        mount.querySelector("[data-cookie-decline]").addEventListener("click", () => {
            window.localStorage.setItem(storageKey, "declined");
            mount.innerHTML = "";
            mount.hidden = true;
        });
    }

    /* ========================================================
       MOBILE MENU
       ======================================================== */

    function initMobileMenu() {
        const menu = document.querySelector("[data-mobile-menu]");
        const openButton = document.querySelector("[data-mobile-menu-open]");
        const closeButton = document.querySelector("[data-mobile-menu-close]");
        const backdrop = document.querySelector("[data-mobile-menu-backdrop]");

        if (!menu || !openButton || !closeButton || !backdrop) return;

        openButton.addEventListener("click", () => {
            openMobileMenu(menu, openButton, backdrop);
        });

        closeButton.addEventListener("click", () => {
            closeMobileMenu(menu, openButton, backdrop);
        });

        backdrop.addEventListener("click", () => {
            closeMobileMenu(menu, openButton, backdrop);
        });

        menu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                closeMobileMenu(menu, openButton, backdrop);
            });
        });

        document.addEventListener("keydown", (event) => {
            if (!document.body.classList.contains("menu-open")) return;

            if (event.key === "Escape") {
                closeMobileMenu(menu, openButton, backdrop);
            }

            if (event.key === "Tab") {
                trapFocus(event, menu);
            }
        });
    }

    function openMobileMenu(menu, openButton, backdrop) {
        state.lastFocusedElement = document.activeElement;

        document.body.classList.add("menu-open");
        openButton.setAttribute("aria-expanded", "true");

        menu.removeAttribute("inert");
        menu.setAttribute("aria-hidden", "false");
        backdrop.hidden = false;

        const firstFocusable = getFocusableElements(menu)[0];
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }

    function closeMobileMenu(menu, openButton, backdrop) {
        document.body.classList.remove("menu-open");
        openButton.setAttribute("aria-expanded", "false");

        menu.setAttribute("inert", "");
        menu.setAttribute("aria-hidden", "true");
        backdrop.hidden = true;

        if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === "function") {
            state.lastFocusedElement.focus();
        } else {
            openButton.focus();
        }
    }

    function getFocusableElements(container) {
        return Array.from(
            container.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        ).filter((el) => {
            return !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden");
        });
    }

    function trapFocus(event, container) {
        const focusable = getFocusableElements(container);

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        }

        if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    /* ========================================================
       SMALL INTERACTIONS
       ======================================================== */

    function initAnchorLinks() {
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId = link.getAttribute("href");

                if (!targetId || targetId === "#") return;

                const target = document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();
                target.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                    block: "start"
                });
            });
        });
    }

    function initInteractiveIcons() {
        document.querySelectorAll(".svg-icon").forEach((icon) => {
            icon.setAttribute("aria-hidden", "true");
        });
    }

    function initReducedMotionSafety() {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduceMotion) {
            document.documentElement.classList.add("reduced-motion");
        }
    }

    /* ========================================================
       HARD-CODED BUSINESS DATA AUDIT
       ======================================================== */

    function auditHardcodedBusinessData() {
        const forbidden = [
            CONFIG.companyName,
            CONFIG.companyId,
            CONFIG.phone,
            CONFIG.phoneButtonText,
            CONFIG.email,
            CONFIG.address.full,
            CONFIG.serviceArea
        ].filter(Boolean);

        document.querySelectorAll("body *").forEach((el) => {
            if (el.children.length !== 0) return;
            if (el.hasAttribute("data-allow-static")) return;

            forbidden.forEach((value) => {
                if (!value) return;

                const text = el.textContent || "";

                if (text.includes(value) && !hasConfigDataAttribute(el)) {
                    console.warn("Possible hardcoded business data:", value, el);
                }
            });
        });
    }

    function hasConfigDataAttribute(el) {
        const allowedAttributes = [
            "data-company-name",
            "data-company-id",
            "data-brand-short-name",
            "data-phone-text",
            "data-phone-label",
            "data-email-text",
            "data-address-text",
            "data-service-area",
            "data-footer-text",
            "data-disclaimer",
            "data-legal-notice",
            "data-config-text",
            "data-config-html"
        ];

        return allowedAttributes.some((attr) => el.hasAttribute(attr));
    }

    /* ========================================================
       PUBLIC HELPERS FOR PAGE-SPECIFIC JS
       ======================================================== */

    window.DryPilot = {
        config: CONFIG,
        iconSvg,
        escapeHtml,
        getCurrentPageKey,
        renderServiceCard,
        renderSimpleServiceLink,
        renderServiceDelta,
        applyConfig,
        initForms,
        renderFaqs,
        auditHardcodedBusinessData
    };
})();