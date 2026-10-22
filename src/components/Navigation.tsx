import { useState, useEffect } from 'react';
import { eraConfigs } from '../data/eras';
import '../styles/navigation.css';

interface Props {
  currentEra: string;
  scrollProgress: number;
  onNavigate: (slug: string) => void;
}

export default function Navigation({ currentEra, scrollProgress, onNavigate }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard navigation & scroll locking when fullscreen menu is open
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on nav
  const handleNavigate = (slug: string) => {
    setIsOpen(false);
    onNavigate(slug);
  };

  const currentConfig = eraConfigs.find((e) => e.slug === currentEra);
  let eraTitle = currentConfig?.title ?? '';
  let eraPeriod = currentConfig?.period ?? '';
  if (currentEra === 'gallery') {
    eraTitle = 'Curated Collection';
    eraPeriod = 'All 26 Vehicles';
  }

  return (
    <>
      {/* Progress bar */}
      <div
        className="progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Main nav bar */}
      <nav
        className={`site-nav ${isScrolled ? 'site-nav--scrolled' : ''}`}
        aria-label="Primary navigation"
      >
        <div className="site-nav__inner">
          {/* Logo / home link */}
          <button
            className="site-nav__wordmark"
            onClick={() => handleNavigate('hero')}
            aria-label="Return to beginning"
          >
            <span className="site-nav__logo-line">Automotive</span>
            <span className="site-nav__logo-line site-nav__logo-line--accent">Time Machine</span>
          </button>

          {/* Current era indicator (desktop) */}
          <div className="site-nav__era" aria-live="polite">
            {eraTitle && (
              <>
                <span className="site-nav__era-period">{eraPeriod}</span>
                <span className="site-nav__era-title">{eraTitle}</span>
              </>
            )}
          </div>

          {/* Desktop nav links */}
          <div className="site-nav__links" role="list">
            <button
              className="site-nav__link"
              onClick={() => handleNavigate('birth')}
              role="listitem"
            >
              Timeline
            </button>
            <button
              className="site-nav__link"
              onClick={() => handleNavigate('gallery')}
              role="listitem"
            >
              Collection
            </button>
            <button
              className="site-nav__link"
              onClick={() => handleNavigate('supercar')}
              role="listitem"
            >
              Supercars
            </button>
            <button
              className="site-nav__link"
              onClick={() => handleNavigate('electric')}
              role="listitem"
            >
              EVs
            </button>
            <button
              className="site-nav__link"
              onClick={() => handleNavigate('formula1')}
              role="listitem"
            >
              Formula 1
            </button>
            <button
              className="site-nav__link"
              onClick={() => handleNavigate('beyond')}
              role="listitem"
            >
              Beyond
            </button>
          </div>

          {/* Hamburger */}
          <button
            className={`site-nav__menu-btn ${isOpen ? 'is-open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="fullscreen-menu"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>

        {/* Chronological progress indicator dots */}
        <div className="site-nav__timeline" aria-label="Automotive eras timeline">
          {[...eraConfigs]
            .sort((a, b) => a.order - b.order)
            .map((era) => (
              <button
                key={era.id}
                className={`timeline-dot ${currentEra === era.slug ? 'is-active' : ''}`}
                onClick={() => handleNavigate(era.slug)}
                aria-label={`Jump to ${era.title}`}
                title={`${era.title} (${era.period})`}
              />
            ))}
        </div>
      </nav>

      {/* Full-screen menu */}
      <div
        id="fullscreen-menu"
        className={`fullscreen-menu ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsOpen(false);
        }}
      >
        <div className="fullscreen-menu__inner">
          <div className="fullscreen-menu__section">
            <p className="section-label">Historical Journey (Horizontal Timeline)</p>
            <ul className="fullscreen-menu__list" role="list">
              {eraConfigs
                .filter((e) => ['birth', 'golden', 'midcentury', 'performance'].includes(e.id))
                .sort((a, b) => a.order - b.order)
                .map((era) => (
                  <li key={era.id}>
                    <button
                      className={`fullscreen-menu__item ${currentEra === era.slug ? 'is-active' : ''}`}
                      onClick={() => handleNavigate(era.slug)}
                    >
                      <span className="fullscreen-menu__period">{era.period}</span>
                      <span className="fullscreen-menu__title">{era.title}</span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          <div className="fullscreen-menu__section">
            <p className="section-label">Exhibition & Modern Eras (Vertical)</p>
            <ul className="fullscreen-menu__list" role="list">
              <li>
                <button
                  className={`fullscreen-menu__item ${currentEra === 'gallery' ? 'is-active' : ''}`}
                  onClick={() => handleNavigate('gallery')}
                >
                  <span className="fullscreen-menu__period">All 26 Vehicles</span>
                  <span className="fullscreen-menu__title">Complete Collection</span>
                </button>
              </li>
              {eraConfigs
                .filter((e) => ['modern', 'supercar', 'electric', 'formula1', 'beyond'].includes(e.id))
                .sort((a, b) => a.order - b.order)
                .map((era) => (
                  <li key={era.id}>
                    <button
                      className={`fullscreen-menu__item ${currentEra === era.slug ? 'is-active' : ''}`}
                      onClick={() => handleNavigate(era.slug)}
                    >
                      <span className="fullscreen-menu__period">{era.period}</span>
                      <span className="fullscreen-menu__title">{era.title}</span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Close button */}
        <button
          className="fullscreen-menu__close"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>
    </>
  );
}
