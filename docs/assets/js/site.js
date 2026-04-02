(function () {
  const site = window.SITE_DATA;
  const app = document.getElementById("app");
  if (!site || !app) return;

  const media = Object.fromEntries(
    site.gallery.map((item) => [item.usageRole, item])
  );
  const listeningRoom = site.listeningRoom || null;
  const musicFeature = site.musicFeature || null;
  const featuredRelease = site.featuredRelease || null;
  const activeMusicLinks = site.musicLinks.filter((item) => item.active);
  const desktopNav = [
    { label: "HOME", href: "#home", section: "home" },
    { label: "MUSIC", href: "#music", section: "music" },
    { label: "CONTACT", href: "#contact", section: "contact" },
  ];
  const consentStorageKey = "preethi-cookie-consent";

  const mobileNav = [
    { label: "Home", href: "#home", section: "home" },
    { label: "Music", href: "#music", section: "music" },
    { label: "Story", href: "#story", section: "story" },
    { label: "Highlights", href: "#highlights", section: "highlights" },
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
          <a class="music-pill music-pill--icon" href="${link.url}" target="_blank" rel="noopener" aria-label="${link.label}" title="${link.label}">
            ${
              link.iconPath
                ? `<img class="music-pill__icon" src="${link.iconPath}" alt="" aria-hidden="true">`
                : `<span class="music-pill__fallback" aria-hidden="true">${link.label.slice(0, 2).toUpperCase()}</span>`
            }
          </a>
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

  function renderDrivePreviewItems(items) {
    if (!Array.isArray(items) || !items.length) return "";

    return items
      .map(
        (item) => `
          <a class="listening-room-preview__item" href="${item.url}" target="_blank" rel="noopener">
            <span class="listening-room-preview__title">${item.title}</span>
            <span class="listening-room-preview__meta">${item.modified}</span>
          </a>
        `
      )
      .join("");
  }

  function renderListeningFolderLinks(items) {
    if (!Array.isArray(items) || !items.length) return "";

    return `
      <ul class="listening-folder-list">
        ${items
          .map(
            (item) => `
              <li class="listening-folder-list__item">
                <a class="listening-folder-link" href="${item.url}" target="_blank" rel="noopener">
                  <span class="listening-folder-link__title">${item.title}</span>
                  <span class="listening-folder-link__meta">${item.type.replace(/-/g, " ")}</span>
                </a>
                <p>${item.description}</p>
              </li>
            `
          )
          .join("")}
      </ul>
    `;
  }

  function renderMusicSubsections() {
    if (!listeningRoom || !Array.isArray(listeningRoom.recordingCards) || !listeningRoom.recordingCards.length) return "";

    const [primaryFolder] = listeningRoom.recordingCards;
    const voiceOnlyFolders = listeningRoom.recordingCards.filter((item) => item.type === "voice-only");
    const previewItems = Array.isArray(listeningRoom.previewItems) ? listeningRoom.previewItems : [];

    return `
      <div class="music-subsections">
        <article class="listening-room-feature music-subsection">
          <div class="listening-room-feature__copy">
            <p class="section-micro">Playback</p>
            <h3>${primaryFolder.title}</h3>
            <p>${primaryFolder.description}</p>
            <div class="music-subsection__actions">
              <a class="button button--ghost" href="${primaryFolder.url}" target="_blank" rel="noopener">Open full folder</a>
            </div>
          </div>

          <div class="listening-room-feature__media">
            <div class="listening-room-preview-card" role="list" aria-label="${primaryFolder.title}">
              <div class="listening-room-preview-card__header">
                <span>Folder preview</span>
                <span>Updated</span>
              </div>
              <div class="listening-room-preview-card__body">
                ${renderDrivePreviewItems(previewItems)}
              </div>
            </div>
          </div>
        </article>

        <article class="listening-room-feature music-subsection">
          <div class="listening-room-feature__copy">
            <p class="section-micro">Raw vocals</p>
            <h3>Voice-only selections.</h3>
            <p>Stripped-back folders where phrasing, tonal range, and melodic contour sit forward without the weight of full production.</p>
          </div>

          <div class="listening-room-feature__media music-raw-vocals">
            ${renderListeningFolderLinks(voiceOnlyFolders)}
          </div>
        </article>
      </div>
    `;
  }

  function renderMusicVideoFeature() {
    if (!musicFeature) return "";

    return `
      <article class="music-video-feature">
        <div class="music-video-feature__art">
          <p class="section-micro">${musicFeature.eyebrow}</p>
          <h3>${musicFeature.title}</h3>
          <p>${musicFeature.description}</p>
          <figure class="music-video-feature__cover">
            <img src="${musicFeature.coverPath}" alt="${musicFeature.coverAlt}" loading="lazy">
          </figure>
        </div>

        <div class="music-video-feature__media">
          <video
            class="music-video-feature__player"
            controls
            preload="metadata"
            playsinline
            poster="${musicFeature.posterPath}"
          >
            <source src="${musicFeature.videoPath}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      </article>
    `;
  }

  function renderFeaturedReleaseSection() {
    const release = featuredRelease || {
      eyebrow: "Latest release",
      title: "Soul Trip",
      description:
        "Listed on Amazon Music as a February 18, 2026 single by Yazin and Preethi Yagnamurthy.",
      videoPath: "",
      posterPath: media["press-portrait"].path,
      posterAlt: media["press-portrait"].alt,
      releaseUrl: activeMusicLinks[1] ? activeMusicLinks[1].url : "#music",
    };

    return `
      <div class="featured-release-section featured-release-section--within-music" data-featured-release-reveal>
        <article class="featured-release-card">
          <figure class="featured-release-card__media">
            ${
              release.videoPath
                ? `
                  <video
                    class="featured-release-card__player"
                    controls
                    preload="metadata"
                    playsinline
                    poster="${release.posterPath}"
                    aria-label="${release.title}"
                  >
                    <source src="${release.videoPath}" type="video/mp4">
                  </video>
                `
                : `<img src="${release.posterPath}" alt="${release.posterAlt}" loading="lazy">`
            }
          </figure>
          <div class="featured-release-card__shade" aria-hidden="true"></div>
          <div class="featured-release-card__copy">
            <p class="section-label">${release.eyebrow}</p>
            <h2>${release.title}</h2>
            <p>${release.description}</p>
            <a class="button button--ghost" href="${release.releaseUrl}" target="_blank" rel="noopener">Open release</a>
          </div>
        </article>
      </div>
    `;
  }

  function renderDesktopNav() {
    const logoMarkup =
      site.branding && site.branding.primaryLogoPath
        ? `<img class="mast-nav__brand-image" src="${site.branding.primaryLogoPath}" alt="${site.artist.name}">`
        : `<span class="mast-nav__brand-text">${site.artist.name}</span>`;

    return `
      <a class="mast-nav__brand" href="#home" aria-label="${site.artist.name}">
        ${logoMarkup}
      </a>
      <nav class="mast-nav__desktop-links" aria-label="Primary site navigation">
        ${desktopNav
          .map(
            (item) => `
              <a class="mast-nav__link" href="${item.href}" data-section="${item.section}">
                ${item.label}
              </a>
            `
          )
          .join("")}
      </nav>
    `;
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
          <a class="mobile-brand" href="#home" aria-label="${site.artist.name}">
            ${
              site.branding && site.branding.primaryLogoPath
                ? `<img class="mobile-brand__image" src="${site.branding.primaryLogoPath}" alt="${site.artist.name}">`
                : site.artist.name
            }
          </a>
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
          <div class="hero-panel__content">
            <div class="hero-copy">
              <h1>${site.artist.name}</h1>
              <p class="hero-copy__tagline">Multilingual | Multi-genre playback singer</p>
              <div class="hero-copy__actions">
                <a class="button button--solid" href="#music">Listen now</a>
                <a class="button button--ghost" href="#contact">Book a live set</a>
              </div>
            </div>
          </div>
        </section>

        <section id="music" class="poster-section">
          <div class="section-head section-head--center">
            <p class="section-label">Music</p>
            <h2>Songs that travel from playback rooms to live listening.</h2>
          </div>

          ${renderMusicVideoFeature()}
          ${renderFeaturedReleaseSection()}

          <article class="poster-card">
            <div class="poster-card__wash"></div>
            <div class="poster-card__copy">
              <p class="section-micro">Now listening</p>
              <h3>Soul Trip</h3>
              <p>From Soul Trip to streaming trails across Amazon Music, Spotify, YouTube, and JioSaavn, the listening path gathers around a voice built for studio detail and stage immediacy.</p>
              <div class="music-pills">
                ${renderMusicLinks()}
              </div>
            </div>
          </article>

          ${renderMusicSubsections()}
        </section>

        <section id="story" class="spotlight-section">
          <div class="section-head section-head--center">
            <p class="section-label">Story</p>
            <h2>Where classical grounding meets stage light.</h2>
          </div>

          <article class="spotlight-card">
            <div class="spotlight-card__copy">
              <p class="section-micro">From Hyderabad</p>
              <h3>${site.bio.intro[0]}</h3>
              <p>${site.bio.intro[1]}</p>
              <p>${site.bio.intro[2]}</p>
            </div>
            <figure class="spotlight-card__media">
              <img src="${media["about-portrait"].path}" alt="${media["about-portrait"].alt}" loading="lazy">
            </figure>
          </article>
        </section>

        <section id="highlights" class="awards-section">
          <div class="section-head section-head--center">
            <p class="section-label">Highlights</p>
            <h2>Milestones in a voice still gathering momentum.</h2>
          </div>
          <div class="awards-grid">
            ${renderHighlightCards()}
          </div>
        </section>

        <section id="contact" class="contact-section">
          <div class="section-head">
            <p class="section-label">Contact</p>
            <h2>Bookings and collaborations begin with a single note.</h2>
          </div>

          <div class="contact-layout">
            <article class="contact-panel">
              <p class="section-micro">${site.contactForm.eyebrow}</p>
              <h3>${site.contactForm.title}</h3>
              <p>${site.contactForm.intro}</p>
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
                  <span>Event date</span>
                  <input type="date" name="eventDate" required>
                </label>
                <label>
                  <span>City</span>
                  <input type="text" name="city" placeholder="Hyderabad" required>
                </label>
                <label>
                  <span>Message</span>
                  <textarea name="message" rows="5" placeholder="Share venue, audience, repertoire ideas, and any special notes." required></textarea>
                </label>
                <button class="button button--solid" type="submit">${site.contactForm.submitLabel}</button>
                <p id="form-feedback" class="form-feedback" aria-live="polite"></p>
              </form>
            </article>
          </div>
        </section>

        <section id="private" class="notes-section">
          <div class="notes-grid">
            <article class="note-card note-card--brand">
              ${
                site.branding && site.branding.primaryLogoPath
                  ? `
                    <div class="note-card__logo-wrap">
                      <img class="note-card__logo" src="${site.branding.primaryLogoPath}" alt="${site.artist.name}">
                      <span class="note-card__mark" aria-hidden="true">®</span>
                    </div>
                  `
                  : ""
              }
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

      <aside id="consent-banner" class="consent-banner" role="dialog" aria-live="polite" aria-label="Cookie preferences">
        <div>
          <p>Cookies & privacy</p>
        </div>
        <div class="consent-banner__actions">
          <button id="consent-reject" class="consent-button consent-button--ghost" type="button">Reject</button>
          <button id="consent-accept" class="consent-button consent-button--solid" type="button">Accept</button>
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

    const sanitizeWhatsappNumber = function (value) {
      return String(value || "").replace(/\D/g, "");
    };

    const formatEventDate = function (value) {
      if (!value) return "";
      const parsed = new Date(`${value}T00:00:00`);
      if (Number.isNaN(parsed.getTime())) return value;
      return parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const eventType = form.elements.eventType.value.trim();
      const eventDate = formatEventDate(form.elements.eventDate.value);
      const city = form.elements.city.value.trim();
      const message = form.elements.message.value.trim();
      const whatsappNumber = sanitizeWhatsappNumber(site.contactForm.whatsappNumber);

      if (!whatsappNumber) {
        feedback.textContent = "WhatsApp booking is not configured yet.";
        return;
      }

      const whatsappMessage = [
        `Hello, I would like to enquire about booking ${site.artist.name}.`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Event type: ${eventType}`,
        `Event date: ${eventDate}`,
        `City: ${city}`,
        "",
        "Brief:",
        message,
      ].join("\n");

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      feedback.innerHTML =
        `Opening WhatsApp with your booking brief. If it doesn't open, <a href="${whatsappUrl}" target="_blank" rel="noopener">continue here</a>.`;
      window.location.assign(whatsappUrl);
    });
  }

  function wireConsentBanner() {
    const banner = document.getElementById("consent-banner");
    const accept = document.getElementById("consent-accept");
    const reject = document.getElementById("consent-reject");
    if (!banner || !accept || !reject) return;

    const persistChoice = function (value) {
      document.body.dataset.consent = value;
      try {
        window.localStorage.setItem(consentStorageKey, value);
      } catch (error) {
        // Ignore storage access issues and still honor the in-session choice.
      }
      banner.classList.add("is-hidden");
    };

    try {
      const storedChoice = window.localStorage.getItem(consentStorageKey);
      if (storedChoice === "accepted" || storedChoice === "rejected") {
        document.body.dataset.consent = storedChoice;
        banner.classList.add("is-hidden");
        return;
      }
    } catch (error) {
      // Fall through and show the banner if storage is unavailable.
    }

    accept.addEventListener("click", function () {
      persistChoice("accepted");
    });

    reject.addEventListener("click", function () {
      persistChoice("rejected");
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

  function wireScrollChrome() {
    const mastNav = document.querySelector(".mast-nav");
    if (!mastNav) return;

    const syncScrollChrome = function () {
      mastNav.classList.toggle("is-scrolled", window.scrollY > 36);
      document.body.classList.add("dock-visible");
    };

    syncScrollChrome();
    window.addEventListener("scroll", syncScrollChrome, { passive: true });
    window.addEventListener("resize", syncScrollChrome);
  }

  function wireFeaturedReleaseReveal() {
    const section = document.querySelector("[data-featured-release-reveal]");
    if (!section) return;

    let frame = null;

    const syncReveal = function () {
      frame = null;
      const rect = section.getBoundingClientRect();
      const start = window.innerHeight * 0.92;
      const end = window.innerHeight * 0.34;
      const rawProgress = Math.max(0, Math.min(1, (start - rect.top) / Math.max(1, start - end)));
      const easedProgress = Math.pow(rawProgress, 1.18);
      section.style.setProperty("--featured-release-progress", easedProgress.toFixed(3));
    };

    const requestSync = function () {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(syncReveal);
    };

    syncReveal();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
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
  wireConsentBanner();
  wireNav();
  wireScrollChrome();
  wireFeaturedReleaseReveal();
  scrollToHash();
  window.addEventListener("hashchange", scrollToHash);
})();
