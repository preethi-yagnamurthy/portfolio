(function () {
  const site = window.SITE_DATA;
  const app = document.getElementById("app");
  if (!site || !app) return;

  const media = Object.fromEntries(
    site.gallery.map((item) => [item.usageRole, item])
  );
  const featuredPress = site.press && site.press.featured ? site.press.featured : null;
  const listeningRoom = site.listeningRoom || null;
  const bandLinks = Array.isArray(site.bandLinks) ? site.bandLinks : [];

  const activeMusicLinks = site.musicLinks.filter((item) => item.active);
  const desktopNav = [
    { label: "HOME", href: "#home", section: "home" },
    { label: "PRESS", href: "#press", section: "press" },
    { label: "MUSIC", href: "#music", section: "music" },
    { label: "LISTENING ROOM", href: "#listening-room", section: "listening-room" },
    { label: "PERFORMANCE", href: "#live", section: "live" },
  ];
  const consentStorageKey = "preethi-cookie-consent";

  const mobileNav = [
    { label: "Home", href: "#home", section: "home" },
    { label: "Press", href: "#press", section: "press" },
    { label: "Story", href: "#story", section: "story" },
    { label: "Music", href: "#music", section: "music" },
    { label: "Listening Room", href: "#listening-room", section: "listening-room" },
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

  function buildInstagramEmbedUrl(url, embedMode) {
    if (!url || embedMode !== "instagram-reel") return url;

    try {
      const parsed = new URL(url);
      const cleanPath = parsed.pathname.replace(/\/+$/, "");
      return `${parsed.origin}${cleanPath}/embed`;
    } catch (error) {
      return url;
    }
  }

  function buildDriveFolderEmbedUrl(url) {
    if (!url) return "";

    try {
      const parsed = new URL(url);
      const match = parsed.pathname.match(/\/folders\/([^/?#]+)/);
      if (!match) return "";
      return `https://drive.google.com/embeddedfolderview?id=${match[1]}#grid`;
    } catch (error) {
      return "";
    }
  }

  function renderListeningCards(items) {
    if (!Array.isArray(items) || !items.length) return "";

    return items
      .map(
        (item) => `
          <article class="listening-card">
            <p class="section-micro">${item.label}</p>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="listening-card__meta">
              <span>${item.type.replace(/-/g, " ")}</span>
              <span>Open folder</span>
            </div>
            <a class="button button--ghost" href="${item.url}" target="_blank" rel="noopener">Open folder</a>
          </article>
        `
      )
      .join("");
  }

  function renderListeningRoomSection() {
    if (!listeningRoom || !listeningRoom.featuredReel || !Array.isArray(listeningRoom.recordingCards) || !listeningRoom.recordingCards.length) return "";

    const reel = listeningRoom.featuredReel;
    const embedUrl = buildInstagramEmbedUrl(reel.url, reel.embedMode);
    const [primaryFolder, ...secondaryFolders] = listeningRoom.recordingCards;
    const driveEmbedUrl = buildDriveFolderEmbedUrl(primaryFolder.url);

    return `
      <section id="listening-room" class="listening-room-section">
        <div class="section-head section-head--center">
          <p class="section-label">${listeningRoom.eyebrow}</p>
          <h2>${listeningRoom.title}</h2>
          <p class="listening-room-section__intro">${listeningRoom.intro}</p>
        </div>

        <article class="listening-room-feature listening-room-feature--drive">
          <div class="listening-room-feature__copy">
            <p class="section-micro">${primaryFolder.label}</p>
            <h3>${primaryFolder.title}</h3>
            <p>${primaryFolder.description}</p>
            <p>A fuller recordings lane sits here inside the page first, so the listening room opens with the archive before moving into the featured reel.</p>
            <a class="button button--ghost" href="${primaryFolder.url}" target="_blank" rel="noopener">Open full folder</a>
          </div>

          <div class="listening-room-feature__media">
            <div class="listening-room-frame">
              ${
                driveEmbedUrl
                  ? `<iframe
                      src="${driveEmbedUrl}"
                      title="${primaryFolder.title}"
                      loading="lazy"
                    ></iframe>`
                  : `<a class="button button--ghost" href="${primaryFolder.url}" target="_blank" rel="noopener">Open folder</a>`
              }
            </div>
            <p class="listening-room-feature__note">Inline Google Drive folder preview with direct folder access if you want the full view.</p>
          </div>
        </article>

        <div class="listening-room-grid">
          ${renderListeningCards(secondaryFolders)}
        </div>

        <article class="listening-room-feature listening-room-feature--reel">
          <div class="listening-room-feature__copy">
            <p class="section-micro">${reel.label}</p>
            <h3>${reel.title}</h3>
            <p>After the archive comes the live spark: one featured performance frame that keeps the room moving, without taking over the section.</p>
            <a class="button button--ghost" href="${reel.url}" target="_blank" rel="noopener">${reel.fallbackLabel}</a>
          </div>

          <div class="listening-room-feature__media">
            <div class="listening-room-frame listening-room-frame--reel">
              <iframe
                src="${embedUrl}"
                title="${reel.title}"
                loading="lazy"
                allowtransparency="true"
                allowfullscreen
              ></iframe>
            </div>
            <p class="listening-room-feature__note">Inline reel preview with direct Instagram fallback.</p>
          </div>
        </article>
      </section>
    `;
  }

  function renderPressSection() {
    if (!featuredPress) return "";

    const summary = featuredPress.summary
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("");

    const keyMoments = featuredPress.keyMoments
      .map((item) => `<li>${item}</li>`)
      .join("");

    return `
      <section id="press" class="press-section">
        <div class="section-head section-head--center">
          <p class="section-label">Press</p>
          <h2>${site.press.heading}</h2>
        </div>

        <article class="press-feature">
          <div class="press-feature__copy">
            <p class="section-micro">${featuredPress.source} / ${featuredPress.date}</p>
            <h3>${featuredPress.title}</h3>
            ${summary}
            <ul class="press-points">
              ${keyMoments}
            </ul>
            <a class="button button--ghost" href="${featuredPress.url}" target="_blank" rel="noopener">Read the full article</a>
          </div>

          <figure class="press-feature__media">
            <img src="${media["press-portrait"].path}" alt="${media["press-portrait"].alt}" loading="lazy">
            <figcaption>
              <p class="section-micro">${featuredPress.mediaEyebrow}</p>
              <h3>${featuredPress.mediaTitle}</h3>
              <p>${featuredPress.mediaCaption}</p>
            </figcaption>
          </figure>
        </article>
      </section>
    `;
  }

  function renderBandLinks() {
    return bandLinks
      .map(
        (link) => `
          <a class="band-link-pill" href="${link.url}" target="_blank" rel="noopener">
            <span>${link.label}</span>
          </a>
        `
      )
      .join("");
  }

  function renderFeaturedReleaseSection() {
    return `
      <section id="featured-release" class="featured-release-section">
        <article class="featured-release-card">
          <div class="featured-release-card__copy">
            <p class="section-label">Featured release</p>
            <h2>Soul Trip</h2>
            <p>Listed on Amazon Music as a February 18, 2026 single by Yazin and Preethi Yagnamurthy, and now moved below the landing frame so the hero can stay fully with the image.</p>
            <a class="button button--ghost" href="${activeMusicLinks[1].url}" target="_blank" rel="noopener">Open release</a>
          </div>

          <figure class="featured-release-card__media">
            <img src="${media["press-portrait"].path}" alt="${media["press-portrait"].alt}" loading="lazy">
          </figure>
        </article>
      </section>
    `;
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
              <p class="hero-copy__lead">${site.artist.positioning}</p>
              <div class="hero-copy__actions">
                <a class="button button--solid" href="#music">Listen now</a>
                <a class="button button--ghost" href="#live">Book a live set</a>
              </div>
            </div>
          </div>
        </section>

        ${renderFeaturedReleaseSection()}

        <section class="spotlight-reveal" data-spotlight-reveal aria-label="Spotlight reveal section">
          <div class="spotlight-reveal__stage">
            <div class="spotlight-reveal__grid">
              <div class="spotlight-reveal__copy">
                <p class="section-label">Spotlight On!</p>
                <h2>When the lights rise, the room listens.</h2>
                <p>A multilingual voice, rooted in classical training and built for the stage.</p>
              </div>

              <div class="spotlight-reveal__visual">
                <div class="spotlight-reveal__beam" aria-hidden="true"></div>
                <img
                  class="spotlight-reveal__image"
                  src="${media["spotlight-reveal"].path}"
                  alt="${media["spotlight-reveal"].alt}"
                  loading="lazy"
                >
              </div>
            </div>
            <div id="spotlight-on" class="spotlight-reveal__anchor" aria-hidden="true"></div>
          </div>
        </section>

        <section class="reel-section" aria-label="Artist visual reel">
          <figure class="reel-frame reel-frame--wide">
            <img src="${media["home-spotlight"].path}" alt="${media["home-spotlight"].alt}" loading="lazy">
            <figcaption>
              <p class="section-micro">Open air</p>
              <h2>A voice that settles into dusk, skyline, and first note.</h2>
            </figcaption>
          </figure>

          <div class="reel-grid">
            <figure class="reel-frame reel-frame--tall">
              <img src="${media["live-marquee"].path}" alt="${media["live-marquee"].alt}" loading="lazy">
              <figcaption>
                <p class="section-micro">Live presence</p>
                <h2>From the first phrase, the stage answers back.</h2>
              </figcaption>
            </figure>

            <div class="reel-stack">
              <figure class="reel-frame reel-frame--stack">
                <img src="${media["gallery-wide"].path}" alt="${media["gallery-wide"].alt}" loading="lazy">
                <figcaption>
                  <p class="section-micro">Band Anantya</p>
                  <h2>A live ensemble built for lift, rhythm, and shared energy.</h2>
                </figcaption>
              </figure>

              <figure class="reel-frame reel-frame--stack">
                <img src="${media["music-portrait"].path}" alt="${media["music-portrait"].alt}" loading="lazy">
                <figcaption>
                  <p class="section-micro">Recorded voice</p>
                  <h2>Playback instinct with the warmth of a live singer&apos;s pulse.</h2>
                </figcaption>
              </figure>
            </div>
          </div>
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

        ${renderPressSection()}

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
            <h2>Songs that travel from playback rooms to live listening.</h2>
          </div>

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

            <div class="poster-card__media">
              <img class="poster-card__portrait" src="${media["music-portrait"].path}" alt="${media["music-portrait"].alt}" loading="lazy">
              <figure class="poster-card__badge">
                <img src="${media["press-portrait"].path}" alt="${media["press-portrait"].alt}" loading="lazy">
              </figure>
            </div>
          </article>
        </section>

        ${renderListeningRoomSection()}

        <section class="gallery-section">
          <div class="section-head section-head--center">
            <p class="section-label">Stage & Collaborations</p>
            <h2>Performance, afterglow, and the stillness between songs.</h2>
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
            <span class="is-active">Live</span>
            <span>Bookings</span>
          </div>

          <div class="performance-list">
            <article class="performance-row">
              <div>
                <h3>Band Anantya Live Set</h3>
                <p>Hyderabad / Pan-India</p>
              </div>
              <div>
                <p>4-piece to 6-piece live ensemble</p>
                <strong>Clubs, private celebrations, corporate stages</strong>
              </div>
              <a class="ticket-button" href="#contact">Start Booking</a>
            </article>

            <article class="performance-row">
              <div>
                <h3>Soul Trip Showcase</h3>
                <p>Originals, reinterpretations, and multilingual favourites</p>
              </div>
              <div>
                <p>Artist-led set</p>
                <strong>Select stage bookings</strong>
              </div>
              <a class="ticket-button" href="${activeMusicLinks[1].url}" target="_blank" rel="noopener">Listen First</a>
            </article>
          </div>

          <div class="format-grid">
            ${renderShowCards()}
          </div>

          <article class="band-links-card">
            <div class="band-links-card__brand">
              ${
                site.branding && site.branding.bandLogoPath
                  ? `<img class="band-links-card__logo" src="${site.branding.bandLogoPath}" alt="Band Anantya">`
                  : ""
              }
              <div>
                <p class="section-micro">Band Anantya</p>
                <h3>Supporting channels for the live project.</h3>
                <p>Kept separate from the main artist socials, but close at hand when the full ensemble story matters.</p>
              </div>
            </div>
            <div class="band-links-card__links">
              ${renderBandLinks()}
            </div>
          </article>
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

            <div class="contact-column">
              <article class="contact-card">
                <p class="section-micro">${site.contactForm.featureEyebrow}</p>
                <h3>${site.contactForm.featureTitle}</h3>
                <p>${site.contactForm.featureBody}</p>
                <p class="contact-card__location">${site.artist.city}</p>
                <p>${site.contactForm.featureFootnote}</p>
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
              <p class="section-micro">Press Room</p>
              <h3>Selected materials available on request.</h3>
              <p>High-resolution portraits, biography variants, and live materials can be shared for press, promoters, and collaborators.</p>
            </article>

            <article id="policies" class="note-card">
              <p class="section-micro">Cookies & privacy</p>
              <h3>Simple, direct, and browser-based.</h3>
              <p>This site remembers your cookie choice in your browser and keeps booking enquiries moving directly into WhatsApp.</p>
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
    };

    syncScrollChrome();
    window.addEventListener("scroll", syncScrollChrome, { passive: true });
  }

  function wireSpotlightReveal() {
    const section = document.querySelector("[data-spotlight-reveal]");
    if (!section) return;

    let frame = null;

    const syncReveal = function () {
      frame = null;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const rawProgress = Math.max(0, Math.min(1, (-rect.top) / travel));
      const easedProgress = Math.pow(rawProgress, 1.4);
      section.style.setProperty("--spotlight-progress", easedProgress.toFixed(3));
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
  wireSpotlightReveal();
  scrollToHash();
  window.addEventListener("hashchange", scrollToHash);
})();
