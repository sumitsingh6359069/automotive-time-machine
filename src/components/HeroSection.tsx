import { useRef, useEffect } from 'react';
import { getAssetUrl } from '../utils/asset';
import '../styles/hero.css';

interface Props {
  onBeginJourney: () => void;
}

export default function HeroSection({ onBeginJourney }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = scrollY / window.innerHeight;
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${progress * 15}%) scale(${1 + progress * 0.04})`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${progress * 8}%)`;
        textRef.current.style.opacity = String(Math.max(0, 1 - progress * 2.5));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section theme-renaissance"
      aria-label="Hero: Automotive Time Machine introduction"
    >
      {/* Background image layer */}
      <div ref={imageRef} className="hero-bg" aria-hidden="true">
        <img
          src={getAssetUrl('vehicles/benz-patent-1886.jpg')}
          alt="Karl Benz Patent-Motorwagen 1885"
          className="hero-bg__img"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero-bg__overlay" />
      </div>

      {/* Atmospheric vignette */}
      <div className="hero-vignette" aria-hidden="true" />

      {/* Decorative linework */}
      <svg className="hero-ornament" viewBox="0 0 100 100" aria-hidden="true" preserveAspectRatio="none">
        <rect x="1" y="1" width="98" height="98" fill="none" stroke="currentColor" strokeWidth="0.3" />
        <rect x="3" y="3" width="94" height="94" fill="none" stroke="currentColor" strokeWidth="0.15" />
        <line x1="1" y1="1" x2="8" y2="1" stroke="currentColor" strokeWidth="0.5" />
        <line x1="1" y1="1" x2="1" y2="8" stroke="currentColor" strokeWidth="0.5" />
        <line x1="99" y1="1" x2="92" y2="1" stroke="currentColor" strokeWidth="0.5" />
        <line x1="99" y1="1" x2="99" y2="8" stroke="currentColor" strokeWidth="0.5" />
        <line x1="1" y1="99" x2="8" y2="99" stroke="currentColor" strokeWidth="0.5" />
        <line x1="1" y1="99" x2="1" y2="92" stroke="currentColor" strokeWidth="0.5" />
        <line x1="99" y1="99" x2="92" y2="99" stroke="currentColor" strokeWidth="0.5" />
        <line x1="99" y1="99" x2="99" y2="92" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      {/* Main content */}
      <div ref={textRef} className="hero-content container">
        <div className="hero-content__inner">
          <p className="hero-eyebrow section-label">An Immersive Journey Through Automotive History</p>

          <h1 className="hero-headline">
            <span className="hero-headline__line">The Machine</span>
            <span className="hero-headline__line hero-headline__line--italic">That Changed</span>
            <span className="hero-headline__line">The World</span>
          </h1>

          <div className="hero-divider" aria-hidden="true" />

          <p className="hero-subtext">
            From Benz's first gasoline engine to today's electric hypercars and Formula&nbsp;1
            racing machines — a chronological journey through one hundred and forty years of
            automotive history, engineering ambition, and design.
          </p>

          <button
            className="hero-cta"
            onClick={onBeginJourney}
            aria-label="Begin the automotive journey"
          >
            <span className="hero-cta__text">Begin the Journey</span>
            <span className="hero-cta__arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="hero-scroll-indicator__line" />
        <span>Scroll</span>
      </div>

      {/* Era year watermark */}
      <div className="hero-year" aria-hidden="true">1885</div>
    </section>
  );
}
