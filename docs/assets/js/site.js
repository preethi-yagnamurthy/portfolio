(function () {
  const site = window.SITE_DATA;
  const app = document.getElementById("app");
  if (!site || !app) return;

  const media = Object.fromEntries(
    site.gallery.map((item) => [item.usageRole, item])
  );

  const activeMusicLinks = site.musicLinks.filter((item) => item.active);
  const placeholderMusicLinks = site.musicLinks.filter((item) => !item.active);
  const desktopNav = [
    { label: "HOME", href: "#home", section: "home" },
    { label: "MUSIC", href: "#music", section: "music" },
    { label: "PERFORMANCE", href: "#live", section: "live" },
  ];

  const mobileNav = [
    { label: "Home", href: "#home", section: "home" },
    { label: "Story", href: "#story", section: "story" },
    { label: "Music", href: "#music", section: "music" },
    { label: "Highlights", href: "#highlights", section: "highlights" },
    { label: "Performance", href: "#live", section: "live" },
    { label: "Contact", href: "#contact", section: "contact" },
  ];

  function renderSocialDots() {
    return site.socialLinks
      .map((link) => {
        return `
          <a class="social-dot" href="${link.url}" target="_blank" rel="noopener" aria-label="${link.label}">
            ${
              link.iconPath
                ? `<img class="social-dot__image" src="${link.iconPath}" alt="" aria-hidden="true">`
                : `<span class="social-dot__fallback">${link.label.slice(0, 2).toUpperCase()}</span>`
            }
          </a>
        `;
      })
      .join("");
  }

  function renderMusicLinks() {
    return activeMusicLinks
      .map(
        (link) => `
          <a class="music-pill" href="${link.url}" target="_blank" rel="noopener">
            ${
              link.iconPath
                ? `<img class="music-pill__icon" src="${link.iconPath}" alt="" aria-hidden="true">`
                : ""
            }
            <span class="music-pill__content">
              <span>${link.label}</span>
              <small>${link.trust.replace(/-/g, " ")}</small>
            </span>
          </a>
        `
      )
      .join("");
  }

  function renderPlaceholders() {
    return placeholderMusicLinks
      .map(
        (link) => `
          <span class="music-pill music-pill--placeholder">
            <span class="music-pill__content">
              <span>${link.label}</span>
              <small>${link.fallback}</small>
            </span>
          </span>
        `
      )
      .join("");
  }

  function renderHighlightCards() {
    return site.highlights
      .map(
        (item) => `
          <article class="award-card">
            <p class="award-card__year">${item.year}</p>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </article>
        `
      )
      .join("");
  }

  function renderShowCards() {
    return site.shows
      .map(
        (show) => `
          <article class="format-card">
            <p class="section-micro">Format</p>
            <h3>${show.title}</h3>
            <p>${show.description}</p>
            <a href="#contact">${show.cta}</a>
          </article>
        `
      )
      .join("");
  }

  function renderDesktopNav() {
    return desktopNav
      .map(
        (item) => `
          <a class="mast-nav__link" href="${item.href}" data-section="${item.section}">
            ${item.label}
          </a>
        `
      )
      .join("");
  }

  function renderMobileNav() {
    return mobileNav
      .map(
        (item) => `
          <a class="drawer-link" href="${item.href}" data-section="${item.section}">
            ${item.label}
          </a>
        `
      )
      .join("");
  }

  function renderDockNav() {
    return [
      { label: "Story", href: "#story" },
      { label: "Highlights", href: "#highlights" },
      { label: "Contact", href: "#contact" },
    ]
      .map((item) => `<a href="${item.href}">${item.label}</a>`)
      .join("");
  }

  app.innerHTML = `
    <div class="site-shell">
      <header class="mast-nav">
        <div class="mast-nav__desktop">
          ${renderDesktopNav()}
        </div>
        <div class="mast-nav__mobile">
          <a class="mobile-brand" href="#home">${site.artist.name}</a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-drawer">
            MENU
          </button>
        </div>
        <nav id="nav-drawer" class="nav-drawer" aria-label="Mobile site navigation">
          ${renderMobileNav()}
        </nav>
      </header>

      <main>
        <section id="home" class="hero-panel">
          <div class="hero-panel__bg" style="background-image:url('${media["home-hero"].path}')"></div>
          <div class="hero-panel__shade"></div>
          <div class="hero-panel__content">
            <div class="hero-copy">
              <p class="section-micro">Hyderabad / Singer / Band Anantya</p>
              <h1>${site.artist.name}</h1>
              <p class="hero-copy__lead">${site.artist.positioning}</p>
              <div class="hero-copy__actions">
                <a class="button button--solid" href="#music">Listen now</a>
                <a class="button button--ghost" href="#live">Book a live set</a>
              </div>
            </div>

            <aside class="hero-note">
              <p class="section-micro">Featured release</p>
              <h2>Soul Trip</h2>
              <p>Publicly listed on Amazon Music as a February 18, 2026 release by Yazin and Preethi Yagnamurthy.</p>
              <a href="${activeMusicLinks[1].url}" target="_blank" rel="noopener">Open release</a>
            </aside>

            <img class="hero-cutout" src="${media["hero-overlay"].path}" alt="${media["hero-overlay"].alt}">
          </div>
        </section>

        <section class="reel-section" aria-label="Artist visual reel">
          <figure class="reel-frame reel-frame--wide">
            <img src="${media["home-spotlight"].path}" alt="${media["home-spotlight"].alt}" loading="lazy">
            <figcaption>
              <p class="section-micro">Scene One</p>
              <h2>Outdoor performance energy with a softer city-frame mood</h2>
            </figcaption>
          </figure>

          <div class="reel-grid">
            <figure class="reel-frame reel-frame--tall">
              <img src="${media["live-marquee"].path}" alt="${media["live-marquee"].alt}" loading="lazy">
              <figcaption>
                <p class="section-micro">Live presence</p>
                <h2>Built for stage light, movement, and front-of-room focus</h2>
              </figcaption>
            </figure>

            <div class="reel-stack">
              <figure class="reel-frame reel-frame--stack">
                <img src="${media["gallery-wide"].path}" alt="${media["gallery-wide"].alt}" loading="lazy">
                <figcaption>
                  <p class="section-micro">Band Anantya</p>
                  <h2>Female-fronted live format with room to scale</h2>
                </figcaption>
              </figure>

              <figure class="reel-frame reel-frame--stack">
                <img src="${media["music-portrait"].path}" alt="${media["music-portrait"].alt}" loading="lazy">
                <figcaption>
                  <p class="section-micro">Recorded voice</p>
                  <h2>Studio-ready material and a growing release narrative</h2>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="highlights" class="awards-section">
          <div class="section-head section-head--center">
            <p class="section-label">Highlights</p>
            <h2>Verified milestones, arranged with the same sparse editorial pacing</h2>
          </div>
          <div class="awards-grid">
            ${renderHighlightCards()}
          </div>
        </section>

        <section id="story" class="spotlight-section">
          <div class="section-head section-head--center">
            <p class="section-label">Story</p>
            <h2>Classical grounding, contemporary stagecraft</h2>
          </div>

          <article class="spotlight-card">
            <div class="spotlight-card__copy">
              <p class="section-micro">From Hyderabad</p>
              <h3>${site.bio.intro[0]}</h3>
              <p>${site.bio.intro[1]}</p>
              <p>${site.bio.intro[2]}</p>
              <ul class="story-pills">
                <li>Carnatic training from age 5</li>
                <li>Mirchi Singistan winner</li>
                <li>Band Anantya lead vocalist</li>
                <li>Multilingual live repertoire</li>
              </ul>
              <div class="spotlight-card__dots" aria-hidden="true">
                <span class="is-active"></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <figure class="spotlight-card__media">
              <img src="${media["about-portrait"].path}" alt="${media["about-portrait"].alt}" loading="lazy">
            </figure>
          </article>
        </section>

        <section id="music" class="poster-section">
          <div class="section-head section-head--center">
            <p class="section-label">Music</p>
            <h2>A poster-like release panel instead of a generic card grid</h2>
          </div>

          <article class="poster-card">
            <div class="poster-card__wash"></div>
            <div class="poster-card__copy">
              <p class="section-micro">Now listening</p>
              <h3>Soul Trip</h3>
              <p>Amazon Music currently provides the strongest public listening proof-point, while Spotify, Apple Music, and a formal press kit remain clearly marked placeholders.</p>
              <div class="music-pills">
                ${renderMusicLinks()}
                ${renderPlaceholders()}
              </div>
            </div>

            <div class="poster-card__media">
              <img class="poster-card__portrait" src="${media["music-portrait"].path}" alt="${media["music-portrait"].alt}" loading="lazy">
              <figure class="poster-card__badge">
                <img src="${media["press-portrait"].path}" alt="${media["press-portrait"].alt}" loading="lazy">
              </figure>
            </div>
          </article>
        </section>

        <section class="gallery-section">
          <div class="section-head section-head--center">
            <p class="section-label">Stage & Collaborations</p>
            <h2>Black-space composition, monochrome live stills, and a cleaner press lane</h2>
          </div>

          <div class="gallery-layout">
            <figure class="gallery-panel gallery-panel--wide">
              <img src="${media["gallery-wide"].path}" alt="${media["gallery-wide"].alt}" loading="lazy">
            </figure>
            <div class="gallery-column">
              <figure class="gallery-panel">
                <img src="${media["gallery-portrait"].path}" alt="${media["gallery-portrait"].alt}" loading="lazy">
              </figure>
              <figure class="gallery-panel">
                <img src="${media["press-portrait"].path}" alt="${media["press-portrait"].alt}" loading="lazy">
              </figure>
            </div>
          </div>
        </section>

        <section id="live" class="performance-section">
          <div class="performance-tabs" aria-hidden="true">
            <span class="is-active">Upcoming</span>
            <span>Bookings</span>
          </div>

          <div class="performance-list">
            <article class="performance-row">
              <div>
                <h3>Band Anantya Live Set</h3>
                <p>Hyderabad / Pan-India</p>
              </div>
              <div>
                <p>Flexible 4-piece to 6-piece format</p>
                <strong>Clubs, private events, corporate stages</strong>
              </div>
              <a class="ticket-button" href="#contact">Start Booking</a>
            </article>

            <article class="performance-row">
              <div>
                <h3>Soul Trip Showcase</h3>
                <p>Artist-led set with originals and curated covers</p>
              </div>
              <div>
                <p>2026 schedule</p>
                <strong>Available on request</strong>
              </div>
              <a class="ticket-button" href="${activeMusicLinks[1].url}" target="_blank" rel="noopener">Listen First</a>
            </article>
          </div>

          <div class="format-grid">
            ${renderShowCards()}
          </div>
        </section>

        <section id="contact" class="contact-section">
          <div class="section-head">
            <p class="section-label">Contact</p>
            <h2>Use the local form now, keep the public booking routes visible until launch</h2>
          </div>

          <div class="contact-layout">
            <article class="contact-panel">
              <p class="section-micro">Preview inquiry</p>
              <h3>Tell us about the event</h3>
              <form id="contact-form" class="contact-form">
                <label>
                  <span>Name</span>
                  <input type="text" name="name" placeholder="Your name" required>
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" placeholder="you@example.com" required>
                </label>
                <label>
                  <span>Event type</span>
                  <select name="eventType" required>
                    <option value="">Choose one</option>
                    <option>Club / lounge</option>
                    <option>Private celebration</option>
                    <option>Corporate event</option>
                    <option>Campus / festival</option>
                    <option>Media / collaboration</option>
                  </select>
                </label>
                <label>
                  <span>Message</span>
                  <textarea name="message" rows="5" placeholder="Share date, city, format, and expectations." required></textarea>
                </label>
                <button class="button button--solid" type="submit">Send preview inquiry</button>
                <p id="form-feedback" class="form-feedback" aria-live="polite"></p>
              </form>
            </article>

            <div class="contact-column">
              <article class="contact-card">
                <p class="section-micro">Temporary public booking contact</p>
                <h3>${site.bookingContacts.primary.name}</h3>
                <p>${site.bookingContacts.primary.role}</p>
                <a href="tel:${site.bookingContacts.primary.phone.replace(/\s+/g, "")}">${site.bookingContacts.primary.phone}</a>
                <a href="mailto:${site.bookingContacts.primary.email}">${site.bookingContacts.primary.email}</a>
                <small>${site.bookingContacts.primary.sourceLabel}</small>
              </article>

              <article class="contact-card">
                <p class="section-micro">Alternative booking desk</p>
                <h3>${site.bookingContacts.secondary.name}</h3>
                <a href="tel:${site.bookingContacts.secondary.phone.replace(/\s+/g, "")}">${site.bookingContacts.secondary.phone}</a>
                <a href="https://wa.me/919550641961" target="_blank" rel="noopener">${site.bookingContacts.secondary.whatsapp}</a>
                <a href="mailto:${site.bookingContacts.secondary.email}">${site.bookingContacts.secondary.email}</a>
                <small>${site.bookingContacts.secondary.sourceLabel}</small>
              </article>

              <article class="contact-card">
                <p class="section-micro">Location & socials</p>
                <h3>${site.artist.city}</h3>
                <p>${site.bio.narrative[1]}</p>
                <div class="contact-socials">
                  ${renderSocialDots()}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="private" class="notes-section">
          <div class="notes-grid">
            <article class="note-card">
              <p class="section-micro">Private EPK route</p>
              <h3>Reserved for a future press room</h3>
              <p>Use this lane later for hi-res portraits, technical rider details, stage plot, and downloadable biography variants.</p>
            </article>

            <article id="policies" class="note-card">
              <p class="section-micro">Policies</p>
              <h3>Single-page preview notice</h3>
              <p>This local build keeps the inquiry form browser-only and leaves unsupported profiles clearly labeled as placeholders until the final launch stack is confirmed.</p>
            </article>
          </div>
        </section>
      </main>

      <aside class="floating-dock" aria-label="Persistent site dock">
        <nav class="floating-dock__links">
          ${renderDockNav()}
        </nav>
        <div class="floating-dock__socials">
          ${renderSocialDots()}
        </div>
      </aside>

      <aside id="preview-toast" class="preview-toast">
        <div>
          <p>Preview Build</p>
          <span>Public contact details and placeholder music links should be confirmed before publish.</span>
        </div>
        <div class="preview-toast__actions">
          <a href="#policies">Policies</a>
          <button id="preview-dismiss" type="button">Hide</button>
        </div>
      </aside>
    </div>
  `;

  function updateMeta() {
    document.title = site.pages.home.title;

    const metaMap = {
      description: site.pages.home.description,
      "og:title": site.pages.home.title,
      "og:description": site.pages.home.description,
      "twitter:title": site.pages.home.title,
      "twitter:description": site.pages.home.description,
      "og:image": media["home-hero"].path,
      "twitter:image": media["home-hero"].path,
    };

    Object.entries(metaMap).forEach(([name, value]) => {
      const selector = name.startsWith("og:")
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      const meta = document.querySelector(selector);
      if (meta) meta.setAttribute("content", value);
    });

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", new URL("index.html", window.location.href).href);
    }
  }

  function wireForm() {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");
    if (!form || !feedback) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = form.elements.name.value.trim() || "there";
      feedback.textContent =
        `Thanks, ${name}. This preview form stays local for now. Use the booking cards on this page while the final workflow is being set up.`;
      form.reset();
    });
  }

  function wireToast() {
    const toast = document.getElementById("preview-toast");
    const dismiss = document.getElementById("preview-dismiss");
    if (!toast || !dismiss) return;

    dismiss.addEventListener("click", function () {
      toast.classList.add("is-hidden");
    });
  }

  function wireNav() {
    const toggle = document.querySelector(".nav-toggle");
    const drawer = document.getElementById("nav-drawer");
    const drawerLinks = drawer ? Array.from(drawer.querySelectorAll("a")) : [];

    if (toggle && drawer) {
      toggle.addEventListener("click", function () {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        drawer.classList.toggle("is-open");
        document.body.classList.toggle("nav-open");
      });
    }

    drawerLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (!toggle || !drawer) return;
        toggle.setAttribute("aria-expanded", "false");
        drawer.classList.remove("is-open");
        document.body.classList.remove("nav-open");
      });
    });

    const sections = Array.from(document.querySelectorAll("section[id]"));
    const navLinks = Array.from(document.querySelectorAll("[data-section]"));

    if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) {
      return;
    }

    const setActive = function (sectionId) {
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.section === sectionId);
      });
    };

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function scrollToHash() {
    if (!window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    if (!target) return;
    window.requestAnimationFrame(function () {
      target.scrollIntoView({ block: "start" });
    });
  }

  updateMeta();
  wireForm();
  wireToast();
  wireNav();
  scrollToHash();
  window.addEventListener("hashchange", scrollToHash);
})();
