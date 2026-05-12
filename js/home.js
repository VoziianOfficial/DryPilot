"use strict";

/* ==========================================================
   DRYPILOT — HOME PAGE JS
   File: /js/home.js

   Home behavior:
   - Flood Report Carousel
   - config-driven review rendering
   - valve controls
   - droplet pagination
   - keyboard support
   - mobile swipe support
   - reduced-motion safe autoplay
   ========================================================== */

(function () {
    const APP = window.DryPilot;
    const CONFIG = window.SITE_CONFIG;

    if (!APP || !CONFIG) {
        console.warn("DryPilot home.js requires main.js and config.js.");
        return;
    }

    const state = {
        carousels: []
    };

    document.addEventListener("DOMContentLoaded", () => {
        initReportCarousels();
        initHomeHoverRoutes();
    });

    window.addEventListener("resize", debounce(() => {
        state.carousels.forEach((carousel) => {
            updateCarousel(carousel);
        });
    }, 120));

    /* ========================================================
       FLOOD REPORT CAROUSEL
       ======================================================== */

    function initReportCarousels() {
        document.querySelectorAll("[data-report-carousel]").forEach((shell) => {
            const carousel = createReportCarousel(shell);

            if (!carousel) return;

            state.carousels.push(carousel);
            updateCarousel(carousel, false);
            bindCarouselEvents(carousel);
            startCarouselAutoplay(carousel);
        });
    }

    function createReportCarousel(shell) {
        const reviews = Array.isArray(CONFIG.reviews) ? CONFIG.reviews : [];

        if (!reviews.length) {
            console.warn("No CONFIG.reviews found for report carousel.");
            return null;
        }

        let track = shell.querySelector("[data-report-track]");

        if (!track) {
            track = document.createElement("div");
            track.className = "report-track";
            track.setAttribute("data-report-track", "");

            const wrap = document.createElement("div");
            wrap.className = "report-track-wrap";
            wrap.appendChild(track);

            shell.prepend(wrap);
        }

        track.innerHTML = renderLoopedReportCards(reviews);

        let controls = shell.querySelector(".report-controls");

        if (!controls) {
            controls = document.createElement("div");
            controls.className = "report-controls";
            shell.querySelector(".report-rail")?.appendChild(controls);
        }

        controls.innerHTML = `
      <div class="report-valves" aria-label="Report carousel controls">
        <button class="valve-control report-prev" type="button" aria-label="Previous report" data-report-prev>
          <span class="svg-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M19 12H5"></path>
              <path d="m11 6-6 6 6 6"></path>
            </svg>
          </span>
        </button>

        <button class="valve-control report-next" type="button" aria-label="Next report" data-report-next>
          <span class="svg-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14"></path>
              <path d="m13 6 6 6-6 6"></path>
            </svg>
          </span>
        </button>
      </div>

      <div class="report-dots" aria-label="Report carousel pagination">
        ${reviews
                .map((_, index) => {
                    return `
                  <button
                    class="report-dot"
                    type="button"
                    aria-label="Show report ${index + 1}"
                    data-report-dot="${index}"
                  ></button>
                `;
                })
                .join("")}
      </div>
    `;

        const cards = Array.from(shell.querySelectorAll(".report-card"));

        return {
            shell,
            track,
            trackWrap: shell.querySelector(".report-track-wrap"),
            cards,
            dots: Array.from(shell.querySelectorAll("[data-report-dot]")),
            prevButton: shell.querySelector("[data-report-prev]"),
            nextButton: shell.querySelector("[data-report-next]"),

            realCount: reviews.length,

            /*
              positionIndex includes clones:
              0 = clone of last
              1 = real first
              2 = real second
              ...
              realCount = real last
              realCount + 1 = clone of first
            */
            positionIndex: 1,
            realIndex: 0,

            autoplayId: null,
            isPaused: false,
            touchStartX: 0,
            touchCurrentX: 0,
            touchStarted: false,
            isAnimating: false
        };
    }

    function renderLoopedReportCards(reviews) {
        if (reviews.length === 1) {
            return renderReportCard(reviews[0], 0, false);
        }

        const firstReview = reviews[0];
        const lastReview = reviews[reviews.length - 1];

        return `
      ${renderReportCard(lastReview, reviews.length - 1, true, "last")}
      ${reviews.map((review, index) => renderReportCard(review, index, false)).join("")}
      ${renderReportCard(firstReview, 0, true, "first")}
    `;
    }

    function renderReportCard(review, realIndex, isClone = false, cloneType = "") {
        const category = APP.escapeHtml(review.category || "Water Damage");
        const issueType = APP.escapeHtml(review.issueType || "Provider Review");
        const quote = APP.escapeHtml(review.quote || "");
        const name = APP.escapeHtml(review.name || "Homeowner");
        const location = APP.escapeHtml(review.location || "");

        return `
      <article
        class="report-card"
        data-report-card="${realIndex}"
        ${isClone ? `data-report-clone="${cloneType}"` : ""}
      >
        <div class="report-card-inner">
          <div class="report-label-row">
            <span class="report-label">${category}</span>
            <span class="report-label green">${issueType}</span>
          </div>

          <p class="report-quote">
            “${quote}”
          </p>

          <p class="report-person">
            <strong>${name}</strong><br>
            ${location}
          </p>

          <span class="report-tech-line" aria-hidden="true"></span>
        </div>
      </article>
    `;
    }

    function bindCarouselEvents(carousel) {
        carousel.prevButton?.addEventListener("click", () => {
            goToReportPosition(carousel, carousel.positionIndex - 1);
            restartCarouselAutoplay(carousel);
        });

        carousel.nextButton?.addEventListener("click", () => {
            goToReportPosition(carousel, carousel.positionIndex + 1);
            restartCarouselAutoplay(carousel);
        });

        carousel.dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                const realIndex = Number(dot.getAttribute("data-report-dot"));

                if (Number.isNaN(realIndex)) return;

                goToRealReport(carousel, realIndex);
                restartCarouselAutoplay(carousel);
            });
        });

        carousel.track.addEventListener("transitionend", (event) => {
            /*
              Important:
              report-card also has transform transition.
              transitionend bubbles from cards to the track.
              We only want the track's own transform transition.
            */
            if (event.target !== carousel.track) return;
            if (event.propertyName !== "transform") return;

            resetLoopPositionIfNeeded(carousel);
        });

        carousel.shell.addEventListener("mouseenter", () => {
            carousel.isPaused = true;
        });

        carousel.shell.addEventListener("mouseleave", () => {
            carousel.isPaused = false;
        });

        carousel.shell.addEventListener("focusin", () => {
            carousel.isPaused = true;
        });

        carousel.shell.addEventListener("focusout", () => {
            carousel.isPaused = false;
        });

        carousel.shell.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                goToReportPosition(carousel, carousel.positionIndex - 1);
                restartCarouselAutoplay(carousel);
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                goToReportPosition(carousel, carousel.positionIndex + 1);
                restartCarouselAutoplay(carousel);
            }
        });

        carousel.trackWrap?.addEventListener("touchstart", (event) => {
            if (!event.touches || event.touches.length !== 1) return;

            carousel.touchStarted = true;
            carousel.touchStartX = event.touches[0].clientX;
            carousel.touchCurrentX = carousel.touchStartX;
            carousel.isPaused = true;
        }, { passive: true });

        carousel.trackWrap?.addEventListener("touchmove", (event) => {
            if (!carousel.touchStarted || !event.touches || event.touches.length !== 1) return;

            carousel.touchCurrentX = event.touches[0].clientX;
        }, { passive: true });

        carousel.trackWrap?.addEventListener("touchend", () => {
            if (!carousel.touchStarted) return;

            const diff = carousel.touchCurrentX - carousel.touchStartX;
            const threshold = 42;

            if (Math.abs(diff) > threshold) {
                if (diff < 0) {
                    goToReportPosition(carousel, carousel.positionIndex + 1);
                } else {
                    goToReportPosition(carousel, carousel.positionIndex - 1);
                }
            }

            carousel.touchStarted = false;
            carousel.touchStartX = 0;
            carousel.touchCurrentX = 0;
            carousel.isPaused = false;

            restartCarouselAutoplay(carousel);
        });
    }

    function goToRealReport(carousel, realIndex) {
        if (!carousel.cards.length) return;

        carousel.realIndex = realIndex;
        carousel.positionIndex = realIndex + 1;

        updateCarousel(carousel, true);
    }

    function goToReportPosition(carousel, nextPositionIndex) {
        if (!carousel.cards.length) return;

        if (carousel.isAnimating) return;

        carousel.positionIndex = nextPositionIndex;
        carousel.realIndex = getRealIndexFromPosition(carousel, nextPositionIndex);

        updateCarousel(carousel, true);
    }

    function getRealIndexFromPosition(carousel, positionIndex) {
        if (carousel.realCount <= 1) return 0;

        if (positionIndex === 0) {
            return carousel.realCount - 1;
        }

        if (positionIndex === carousel.realCount + 1) {
            return 0;
        }

        return positionIndex - 1;
    }

    function updateCarousel(carousel, animate = false) {
        const activeCard = carousel.cards[carousel.positionIndex];

        if (!activeCard || !carousel.track || !carousel.trackWrap) return;

        if (animate) {
            carousel.isAnimating = true;
            carousel.track.classList.remove("is-resetting");
        } else {
            carousel.track.classList.add("is-resetting");
        }

        carousel.cards.forEach((card, positionIndex) => {
            const isActive = positionIndex === carousel.positionIndex;
            const isClone = card.hasAttribute("data-report-clone");

            card.classList.toggle("is-active", isActive);
            card.setAttribute("aria-hidden", String(!isActive || isClone));
            card.setAttribute("tabindex", isActive && !isClone ? "0" : "-1");
        });

        carousel.dots.forEach((dot, index) => {
            const isActive = index === carousel.realIndex;

            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-current", isActive ? "true" : "false");
        });

        const wrapWidth = carousel.trackWrap.clientWidth;
        const activeLeft = activeCard.offsetLeft;
        const activeWidth = activeCard.offsetWidth;

        const targetOffset = (wrapWidth / 2) - activeLeft - (activeWidth / 2);

        carousel.track.style.transform = `translate3d(${targetOffset}px, 0, 0)`;

        if (!animate) {
            carousel.track.offsetHeight;

            requestAnimationFrame(() => {
                carousel.track.classList.remove("is-resetting");
                carousel.isAnimating = false;
            });
        }
    }

    function resetLoopPositionIfNeeded(carousel) {
        if (carousel.realCount <= 1) {
            carousel.isAnimating = false;
            return;
        }

        if (carousel.positionIndex === 0) {
            carousel.positionIndex = carousel.realCount;
            carousel.realIndex = carousel.realCount - 1;
            updateCarousel(carousel, false);
            return;
        }

        if (carousel.positionIndex === carousel.realCount + 1) {
            carousel.positionIndex = 1;
            carousel.realIndex = 0;
            updateCarousel(carousel, false);
            return;
        }

        carousel.isAnimating = false;
    }

    function startCarouselAutoplay(carousel) {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) return;

        stopCarouselAutoplay(carousel);

        carousel.autoplayId = window.setInterval(() => {
            if (carousel.isPaused) return;

            goToReportPosition(carousel, carousel.positionIndex + 1);
        }, 5200);
    }

    function stopCarouselAutoplay(carousel) {
        if (!carousel.autoplayId) return;

        window.clearInterval(carousel.autoplayId);
        carousel.autoplayId = null;
    }

    function restartCarouselAutoplay(carousel) {
        stopCarouselAutoplay(carousel);
        startCarouselAutoplay(carousel);
    }

    /* ========================================================
       HOME ROUTE HOVER DETAILS
       ======================================================== */

    function initHomeHoverRoutes() {
        initLeakNodeHover();
        initDeltaHover();
        initAtlasHover();
    }

    function initLeakNodeHover() {
        const ribbon = document.querySelector(".leak-ribbon-shell");
        const nodes = document.querySelectorAll(".leak-node");

        if (!ribbon || !nodes.length) return;

        nodes.forEach((node, index) => {
            node.addEventListener("mouseenter", () => {
                ribbon.style.setProperty("--active-node", String(index));
                node.classList.add("flow-active");
            });

            node.addEventListener("mouseleave", () => {
                node.classList.remove("flow-active");
            });

            node.addEventListener("focusin", () => {
                node.classList.add("flow-active");
            });

            node.addEventListener("focusout", () => {
                node.classList.remove("flow-active");
            });
        });
    }

    function initDeltaHover() {
        const modules = document.querySelectorAll(".delta-module");

        modules.forEach((module) => {
            module.addEventListener("mouseenter", () => {
                module.classList.add("flow-active");
            });

            module.addEventListener("mouseleave", () => {
                module.classList.remove("flow-active");
            });

            module.addEventListener("focusin", () => {
                module.classList.add("flow-active");
            });

            module.addEventListener("focusout", () => {
                module.classList.remove("flow-active");
            });
        });
    }

    function initAtlasHover() {
        const panels = document.querySelectorAll(".atlas-panel");

        panels.forEach((panel) => {
            panel.addEventListener("mouseenter", () => {
                panel.classList.add("flow-active");
            });

            panel.addEventListener("mouseleave", () => {
                panel.classList.remove("flow-active");
            });
        });
    }

    /* ========================================================
       HELPERS
       ======================================================== */

    function debounce(callback, delay) {
        let timerId;

        return function (...args) {
            window.clearTimeout(timerId);

            timerId = window.setTimeout(() => {
                callback.apply(this, args);
            }, delay);
        };
    }
})();