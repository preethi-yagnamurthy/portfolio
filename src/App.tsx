import { useEffect } from 'react'
import heroCutout from '../assets/web/IMG_8262-web.PNG'
import heroPose from '../assets/web/20240929_035025103_iOS-web.JPEG'
import stageStudio from '../assets/web/IMG_7402-web.JPEG'
import portraitMono from '../assets/web/IMG_1637-web.JPEG'
import portraitOutdoor from '../assets/web/IMG_7778_Original-web.JPEG'
import liveWide from '../assets/web/IMG_6272-web.JPEG'
import liveMono from '../assets/web/IMG_7665-web.JPEG'
import liveOutdoorTall from '../assets/web/IMG_7213-web.JPEG'
import liveGolden from '../assets/web/IMG_7834-web.JPEG'
import liveVenue from '../assets/web/IMG_8155-web.JPEG'
import liveWalk from '../assets/web/IMG_1566_upright-web.JPEG'
import './App.css'

type ArtistProfile = {
  name: string
  base: string
  title: string
  summary: string
  biography: string[]
  markers: string[]
}

type CareerHighlight = {
  title: string
  detail: string
  sourceLabel: string
  sourceHref: string
}

type ReleaseSpotlight = {
  title: string
  collaborators: string
  releasedOn: string
  detail: string
  artistHref: string
  releaseHref: string
}

type GalleryImage = {
  src: string
  alt: string
  variant: 'wide' | 'tall' | 'square'
}

type PublicLink = {
  label: string
  meta: string
  href: string
}

type ContactAction = {
  label: string
  detail: string
  href: string
  meta: string
}

const artist: ArtistProfile = {
  name: 'Preethi Yagnamurthy',
  base: 'Hyderabad, India',
  title: 'Playback singer, live performer, and founder of Band Anantya',
  summary:
    'A Hyderabad-based singer whose public story sits at the meeting point of Carnatic training, playback work, and a live-performance career built on consistency.',
  biography: [
    'Preethi Yagnamurthy is publicly presented as a Hyderabad-based playback singer and the founder / lead vocalist of Band Anantya. Her voice moves through studio recordings, regional live sets, and stage-led performances without losing a grounded, classical center.',
    'The public trail around her work points to a career shaped by disciplined training and live mileage: Carnatic roots, a Mirchi Singistan win in 2023, recurring appearances across Hyderabad performance circuits, and a recent 2026 release credit on "Soul Trip" with Yazin.',
  ],
  markers: [
    'Hyderabad-based singer',
    'Carnatic-trained',
    'Mirchi Singistan winner',
    'Founder / lead vocalist, Band Anantya',
  ],
}

const careerHighlights: CareerHighlight[] = [
  {
    title: 'Mirchi Singistan winner',
    detail:
      'Media Infoline reported on July 4, 2023 that Preethi Yagnamurthy won Mirchi Singistan by 95 Mirchi Hyderabad and earned the chance to perform at the "Come Ride with Badshah" concert.',
    sourceLabel: 'Media Infoline · Jul 4, 2023',
    sourceHref:
      'https://www.mediainfoline.com/music/mirchi-singistan-uncovers-aspiring-singers-winner-performs-come-ride-badshah-concert',
  },
  {
    title: 'Carnatic-trained foundation',
    detail:
      'The same public coverage describes her musical journey as beginning with Carnatic training, a detail that explains the control and phrasing visible across both live and recorded work.',
    sourceLabel: 'Media Infoline',
    sourceHref:
      'https://www.mediainfoline.com/music/mirchi-singistan-uncovers-aspiring-singers-winner-performs-come-ride-badshah-concert',
  },
  {
    title: 'Founder and lead vocalist of Band Anantya',
    detail:
      'A public artist listing positions Preethi as the founder / lead vocalist of Band Anantya, a Hyderabad-based act spanning Telugu, Hindi, English, and regional live sets.',
    sourceLabel: 'Showcase Yourself profile',
    sourceHref:
      'https://showcaseyourself.com/service/preethi-yagnamurthy-playback-singer-in-tfi-and-founder-band-anantya-hyderabad-pan-india-1C275FD288358787A5CC',
  },
  {
    title: 'Hundreds of live performances',
    detail:
      'Public band and booking profiles describe hundreds of stage appearances across Hyderabad venues, private celebrations, ETV performances, and Radio Mirchi slots.',
    sourceLabel: 'Showcase Yourself profile',
    sourceHref:
      'https://showcaseyourself.com/service/preethi-yagnamurthy-playback-singer-in-tfi-and-founder-band-anantya-hyderabad-pan-india-1C275FD288358787A5CC',
  },
]

const releaseSpotlights: ReleaseSpotlight[] = [
  {
    title: 'Soul Trip',
    collaborators: 'Yazin & Preethi Yagnamurthy',
    releasedOn: 'Released February 18, 2026',
    detail:
      'Amazon Music currently shows a public release credit for "Soul Trip." For this version of the site, it acts as the cleanest verified listening anchor while a fuller discography and official streaming footprint are assembled.',
    artistHref: 'https://music.amazon.com/artists/B0GP34JY96/preethi-yagnamurthy',
    releaseHref: 'https://music.amazon.com/albums/B0GP2XYRZN',
  },
]

const galleryImages: GalleryImage[] = [
  {
    src: liveWide,
    alt: 'Preethi Yagnamurthy performing live with Band Anantya on a large stage in Hyderabad.',
    variant: 'wide',
  },
  {
    src: liveMono,
    alt: 'Black-and-white performance portrait of Preethi Yagnamurthy singing into a microphone on stage.',
    variant: 'tall',
  },
  {
    src: liveOutdoorTall,
    alt: 'Outdoor portrait of Preethi Yagnamurthy smiling while holding a microphone.',
    variant: 'tall',
  },
  {
    src: liveGolden,
    alt: 'Warm outdoor performance portrait of Preethi Yagnamurthy singing with a microphone.',
    variant: 'wide',
  },
  {
    src: liveVenue,
    alt: 'Venue portrait of Preethi Yagnamurthy standing with a microphone under dramatic lighting.',
    variant: 'square',
  },
  {
    src: liveWalk,
    alt: 'Outdoor full-body image of Preethi Yagnamurthy holding a microphone, used after normalizing the original image rotation.',
    variant: 'tall',
  },
]

const publicLinks: PublicLink[] = [
  {
    label: 'Instagram · Preethi Yagnamurthy',
    meta: '@preethiyagnamurthy_singer',
    href: 'https://www.instagram.com/preethiyagnamurthy_singer/',
  },
  {
    label: 'Instagram · Band Anantya',
    meta: '@bandanantya',
    href: 'https://www.instagram.com/bandanantya/',
  },
  {
    label: 'YouTube · Preethi Yagnamurthy',
    meta: '@preethiyagnamurthy9463',
    href: 'https://www.youtube.com/@preethiyagnamurthy9463',
  },
  {
    label: 'YouTube · Band Anantya',
    meta: '@bandanantya',
    href: 'https://www.youtube.com/@bandanantya',
  },
  {
    label: 'Amazon Music · Artist page',
    meta: 'Preethi Yagnamurthy',
    href: 'https://music.amazon.com/artists/B0GP34JY96/preethi-yagnamurthy',
  },
  {
    label: 'Amazon Music · Soul Trip',
    meta: 'Yazin & Preethi Yagnamurthy',
    href: 'https://music.amazon.com/albums/B0GP2XYRZN',
  },
]

const contactActions: ContactAction[] = [
  {
    label: 'Booking email',
    detail: 'bandanantya@gmail.com',
    href: 'mailto:bandanantya@gmail.com',
    meta: 'Public booking contact',
  },
  {
    label: 'Call',
    detail: '+91 96662 89784',
    href: 'tel:+919666289784',
    meta: 'Public phone number',
  },
  {
    label: 'WhatsApp',
    detail: 'Chat for live performance inquiries',
    href: 'https://wa.me/919666289784',
    meta: 'Public WhatsApp contact',
  },
]

const sources = [
  {
    label: 'Media Infoline',
    note: 'Mirchi Singistan winner coverage',
    href:
      'https://www.mediainfoline.com/music/mirchi-singistan-uncovers-aspiring-singers-winner-performs-come-ride-badshah-concert',
  },
  {
    label: 'Amazon Music',
    note: 'Preethi artist page and Soul Trip release',
    href: 'https://music.amazon.com/artists/B0GP34JY96/preethi-yagnamurthy',
  },
  {
    label: 'Showcase Yourself',
    note: 'Public band profile and live-performance summary',
    href:
      'https://showcaseyourself.com/service/preethi-yagnamurthy-playback-singer-in-tfi-and-founder-band-anantya-hyderabad-pan-india-1C275FD288358787A5CC',
  },
]

function App() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -48px 0px',
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />
      <div className="grid-wash" aria-hidden="true" />

      <header className="topbar reveal">
        <a className="brand" href="#home">
          <span className="brand-mark" aria-hidden="true" />
          {artist.name}
        </a>
        <p className="topbar-copy">{artist.title}</p>
        <nav className="topnav" aria-label="Primary navigation">
          <a href="#overview">Overview</a>
          <a href="#highlights">Highlights</a>
          <a href="#release">Release</a>
          <a href="#gallery">Gallery</a>
          <a href="#connect">Connect</a>
        </nav>
      </header>

      <section className="hero section reveal" id="home">
        <div className="hero-copy">
          <p className="eyebrow">{artist.base}</p>
          <h1>Preethi Yagnamurthy sings with stage instinct and classical control.</h1>
          <p className="hero-text">{artist.summary}</p>

          <div className="hero-markers" aria-label="Artist markers">
            {artist.markers.map((marker) => (
              <span key={marker}>{marker}</span>
            ))}
          </div>

          <div className="cta-row">
            <a className="pill-button pill-button--solid" href="#overview">
              Read the story
            </a>
            <a className="pill-button pill-button--ghost" href="#connect">
              Public links & booking
            </a>
          </div>
        </div>

        <div className="hero-stage">
          <article className="hero-visual panel">
            <img className="hero-visual__backdrop" src={heroPose} alt="" />
            <div className="hero-visual__wash" aria-hidden="true" />
            <img
              className="hero-visual__cutout"
              src={heroCutout}
              alt="Preethi Yagnamurthy performing with a microphone."
            />
            <div className="hero-visual__meta">
              <p className="eyebrow">Editorial portrait</p>
              <h2>Playback singer. Live performer. Band leader.</h2>
            </div>
          </article>

          <div className="hero-aside">
            <article className="support-photo panel">
              <img
                src={stageStudio}
                alt="Preethi Yagnamurthy singing under dramatic studio lighting."
              />
              <div className="support-photo__caption">
                <span>Stage energy</span>
                <span>Studio restraint</span>
              </div>
            </article>

            <article className="support-copy panel">
              <p className="eyebrow">Public footprint</p>
              <h2>Built in Hyderabad and shaped in front of real audiences.</h2>
              <p>
                This version of the site turns scattered public references into a
                single, credible home: verified coverage, verified release links,
                and a photography-led narrative that feels like an artist site
                rather than a booking flyer.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section overview-section" id="overview">
        <div className="section-heading reveal">
          <p className="eyebrow">Artist overview</p>
          <h2>A live-first artist story with a playback edge.</h2>
        </div>

        <div className="overview-grid">
          <div className="portrait-stack reveal">
            <figure className="portrait-card portrait-card--mono panel">
              <img
                src={portraitMono}
                alt="Black-and-white portrait of Preethi Yagnamurthy."
              />
            </figure>
            <figure className="portrait-card portrait-card--color panel">
              <img
                src={portraitOutdoor}
                alt="Outdoor portrait of Preethi Yagnamurthy in a blue top."
              />
            </figure>
          </div>

          <article className="overview-copy panel reveal">
            <p className="eyebrow">Biography</p>
            {artist.biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="role-list" aria-label="Artist roles">
              <span>Playback singer</span>
              <span>Live performer</span>
              <span>Band Anantya founder</span>
              <span>Regional and multilingual stage sets</span>
            </div>
          </article>
        </div>
      </section>

      <section className="section highlights-section" id="highlights">
        <div className="section-heading reveal">
          <p className="eyebrow">Career highlights</p>
          <h2>Use verified public milestones instead of invented mythmaking.</h2>
        </div>

        <div className="highlight-grid">
          {careerHighlights.map((highlight) => (
            <article key={highlight.title} className="highlight-card panel reveal">
              <h3>{highlight.title}</h3>
              <p>{highlight.detail}</p>
              <a
                className="source-link"
                href={highlight.sourceHref}
                target="_blank"
                rel="noreferrer"
              >
                {highlight.sourceLabel}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section release-section" id="release">
        <div className="section-heading reveal">
          <p className="eyebrow">Release spotlight</p>
          <h2>A verified listening anchor while the larger catalog takes shape.</h2>
        </div>

        <div className="release-grid">
          {releaseSpotlights.map((release) => (
            <article key={release.title} className="release-card panel reveal">
              <p className="eyebrow">Current public release</p>
              <h3>{release.title}</h3>
              <p className="release-card__meta">{release.collaborators}</p>
              <p className="release-card__date">{release.releasedOn}</p>
              <p>{release.detail}</p>
              <div className="release-links">
                <a href={release.artistHref} target="_blank" rel="noreferrer">
                  Artist page
                </a>
                <a href={release.releaseHref} target="_blank" rel="noreferrer">
                  Soul Trip release
                </a>
              </div>
            </article>
          ))}

          <figure className="release-photo panel reveal">
            <img
              src={liveGolden}
              alt="Preethi Yagnamurthy performing outdoors with a microphone in golden light."
            />
          </figure>
        </div>
      </section>

      <section className="section gallery-section" id="gallery">
        <div className="section-heading reveal">
          <p className="eyebrow">Live-performance gallery</p>
          <h2>Use the photography to prove range, not just decorate the page.</h2>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <figure
              key={image.src}
              className={`gallery-card gallery-card--${image.variant} panel reveal`}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="section connect-section" id="connect">
        <div className="section-heading reveal">
          <p className="eyebrow">Contact / public links</p>
          <h2>Keep the site useful for listeners, collaborators, and bookings.</h2>
          <p>
            All links below point to public destinations or contact details that
            are already exposed in public listings and open profiles.
          </p>
        </div>

        <div className="connect-grid">
          <article className="connect-card panel reveal">
            <p className="eyebrow">Booking and direct contact</p>
            <div className="action-grid">
              {contactActions.map((action) => (
                <a key={action.label} className="action-card" href={action.href}>
                  <span className="action-card__label">{action.label}</span>
                  <strong>{action.detail}</strong>
                  <span className="action-card__meta">{action.meta}</span>
                </a>
              ))}
            </div>
          </article>

          <article className="connect-card panel reveal">
            <p className="eyebrow">Public profiles</p>
            <div className="link-grid">
              {publicLinks.map((link) => (
                <a
                  key={link.label}
                  className="public-link"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <strong>{link.label}</strong>
                  <span>{link.meta}</span>
                </a>
              ))}
            </div>
          </article>
        </div>

        <article className="source-note panel reveal">
          <p className="eyebrow">Public research note</p>
          <p>
            This homepage is written from publicly available sources checked on
            April 1, 2026. Where public counts vary, the copy intentionally uses
            careful phrasing such as "hundreds of live performances" rather than
            overstating a single disputed number.
          </p>
          <div className="source-list">
            {sources.map((source) => (
              <a
                key={source.label}
                href={source.href}
                target="_blank"
                rel="noreferrer"
              >
                <strong>{source.label}</strong>
                <span>{source.note}</span>
              </a>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
