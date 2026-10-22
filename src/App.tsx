import { useState, useEffect, useCallback, useRef } from 'react';
import HeroSection from './components/HeroSection';
import Navigation from './components/Navigation';
import HorizontalTimeline, { type HorizontalTimelineHandle } from './components/HorizontalTimeline';
import VehicleGallery from './components/VehicleGallery';
import EraSection from './components/EraSection';
import VehicleDetail from './components/VehicleDetail';
import CustomCursor from './components/CustomCursor';
import FloatingElements from './components/FloatingElements';
import { eraConfigs } from './data/eras';
import { allVehicles, vehiclesByEra } from './data/vehicles';
import type { Vehicle } from './data/vehicles';
import './styles/global.css';
import './styles/footer.css';

export default function App() {
  const [currentEra, setCurrentEra] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [appTheme, setAppTheme] = useState<string>('renaissance');

  const timelineRef = useRef<HorizontalTimelineHandle>(null);

  // 1. Historical Eras — only these 4 eras are traversed in the horizontal timeline
  const historicalEras = eraConfigs
    .filter((e) => ['birth', 'golden', 'midcentury', 'performance'].includes(e.id))
    .sort((a, b) => a.order - b.order);

  // 2. Modern & Future Eras — vertical scrolling with layered parallax
  const modernEras = eraConfigs
    .filter((e) => ['modern', 'supercar', 'electric', 'formula1', 'beyond'].includes(e.id))
    .sort((a, b) => a.order - b.order);

  // Track global page scroll progress & active section for vertical sections
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? scrollY / totalHeight : 0;
      setScrollProgress(progress);

      // Section 1: Hero area
      if (scrollY < window.innerHeight * 0.45) {
        setCurrentEra('hero');
        setAppTheme('renaissance');
        return;
      }

      // Section 2: Historical Timeline bounds check
      const timelineEl = document.getElementById('historical-timeline');
      if (timelineEl) {
        const rect = timelineEl.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          // Inside horizontal timeline; HorizontalTimeline handles active era & theme
          return;
        }
      }

      // Sections 3 & 4: Gallery and vertical Modern eras below timeline
      const verticalSectionIds = [
        'gallery',
        'modern',
        'supercar',
        'electric',
        'formula1',
        'beyond',
      ];
      const triggerY = window.innerHeight * 0.4;
      let activeId: string | null = null;

      for (const id of verticalSectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY && rect.bottom > triggerY) {
            activeId = id;
            break;
          }
        }
      }

      if (activeId) {
        setCurrentEra(activeId);
        if (activeId === 'gallery') {
          setAppTheme('mythological');
        } else {
          const config = eraConfigs.find((e) => e.slug === activeId);
          if (config) {
            setAppTheme(config.theme);
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handle era change while inside the horizontal timeline
  const handleTimelineEraChange = useCallback((eraSlug: string, theme: string) => {
    const timelineEl = document.getElementById('historical-timeline');
    if (timelineEl) {
      const rect = timelineEl.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        setCurrentEra(eraSlug);
        setAppTheme(theme);
      }
    }
  }, []);

  // Navigate to any section (hero, timeline era, gallery, or vertical era)
  const handleNavigate = useCallback((slug: string) => {
    if (slug === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If it's one of the historical eras inside the horizontal timeline
    if (['birth', 'golden', 'midcentury', 'performance'].includes(slug)) {
      timelineRef.current?.scrollToEra(slug);
      return;
    }

    // If it's the vertical gallery or modern/future sections
    const targetEl = document.getElementById(slug);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Begin journey from Hero button
  const handleBeginJourney = useCallback(() => {
    handleNavigate('birth');
  }, [handleNavigate]);

  // Vehicle selection & modal detail
  const handleSelectVehicle = useCallback((vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedVehicle(null);
  }, []);

  return (
    <div className={`site-wrapper theme-${appTheme}`} data-theme={appTheme}>
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Upgraded instrument reticle cursor */}
      <CustomCursor />

      {/* Floating ambient elements */}
      <FloatingElements />

      {/* Primary Navigation & Era progress bar */}
      <Navigation
        currentEra={currentEra}
        scrollProgress={scrollProgress}
        onNavigate={handleNavigate}
      />

      {/* ── 1. HERO / LANDING SECTION (Normal vertical scrolling) ── */}
      <div id="hero">
        <HeroSection onBeginJourney={handleBeginJourney} />
      </div>

      {/* ── 2. MAIN HISTORICAL ERA TIMELINE ONLY (Horizontal scroll-driven) ── */}
      <HorizontalTimeline
        ref={timelineRef}
        eras={historicalEras}
        vehiclesByEra={vehiclesByEra}
        onSelectVehicle={handleSelectVehicle}
        onEraChange={handleTimelineEraChange}
        selectedVehicle={selectedVehicle}
      />

      {/* ── 3. VEHICLE COLLECTION / GALLERY (Normal vertical scrolling) ── */}
      <VehicleGallery
        vehicles={allVehicles}
        onSelectVehicle={handleSelectVehicle}
      />

      {/* ── 5. MODERN / FUTURE SECTIONS (Normal vertical scrolling) ── */}
      <div className="modern-eras-container">
        {modernEras.map((config) => (
          <div key={config.id} id={config.slug}>
            <EraSection
              config={config}
              vehicles={vehiclesByEra[config.id] ?? []}
              onSelectVehicle={handleSelectVehicle}
            />
          </div>
        ))}
      </div>

      {/* ── SITE FOOTER (Normal vertical scrolling) ── */}
      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <div className="site-footer__inner">
            <div className="site-footer__brand">
              <p className="site-footer__title">Automotive Time Machine</p>
              <p className="site-footer__sub">An Immersive Journey Through Automotive History</p>
            </div>
            <nav className="site-footer__nav" aria-label="Footer navigation">
              <button className="site-footer__link" onClick={() => handleNavigate('hero')}>
                Home
              </button>
              <button className="site-footer__link" onClick={() => handleNavigate('birth')}>
                Historical Timeline
              </button>
              <button className="site-footer__link" onClick={() => handleNavigate('gallery')}>
                Collection Gallery
              </button>
              {modernEras.map((e) => (
                <button
                  key={e.id}
                  className="site-footer__link"
                  onClick={() => handleNavigate(e.slug)}
                >
                  {e.title}
                </button>
              ))}
            </nav>
            <p className="site-footer__note">
              Specifications marked * are approximate or represent production ranges.
              All historical data sourced from established automotive records,
              manufacturer archives, and recognized motorsport authorities.
            </p>
          </div>
        </div>
      </footer>

      {/* ── 4. VEHICLE DETAIL MODAL (Photograph-first zoom presentation) ── */}
      {selectedVehicle && (
        <VehicleDetail
          vehicle={selectedVehicle}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}
