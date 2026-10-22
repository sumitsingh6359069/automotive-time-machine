import { useRef, useEffect, useCallback, useImperativeHandle, forwardRef, useState } from 'react';
import type { EraConfig } from '../data/eras';
import type { Vehicle } from '../data/vehicles';
import EraSection from './EraSection';
import '../styles/timeline.css';

export interface HorizontalTimelineHandle {
  scrollToEra: (slug: string) => void;
}

interface Props {
  eras: EraConfig[];
  vehiclesByEra: Record<string, Vehicle[]>;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onEraChange: (eraSlug: string, theme: string, progress: number) => void;
  selectedVehicle: Vehicle | null;
}

const HorizontalTimeline = forwardRef<HorizontalTimelineHandle, Props>(function HorizontalTimeline(
  { eras, vehiclesByEra, onSelectVehicle, onEraChange, selectedVehicle },
  ref
) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTrackRef = useRef<HTMLDivElement>(null);
  const watermarkTrackRef = useRef<HTMLDivElement>(null);
  const telemetryTrackRef = useRef<HTMLDivElement>(null);
  const eraRefs = useRef<Map<string, HTMLElement>>(new Map());

  const [activeEraSlug, setActiveEraSlug] = useState<string>(eras[0]?.slug ?? 'birth');
  const [timelineProgress, setTimelineProgress] = useState(0);

  // Register individual era element references
  const registerEraRef = useCallback((slug: string, el: HTMLElement | null) => {
    if (el) eraRefs.current.set(slug, el);
    else eraRefs.current.delete(slug);
  }, []);

  // Update total wrapper height based on horizontal track width on desktop
  const updateLayout = useCallback(() => {
    if (!wrapperRef.current || !trackRef.current) return;
    const isDesktop =
      window.innerWidth >= 1024 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isDesktop) {
      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const maxHorizontalDistance = Math.max(0, trackWidth - windowWidth);

      // Wrapper height = 100vh + total horizontal scroll distance
      wrapperRef.current.style.height = `${window.innerHeight + maxHorizontalDistance}px`;
    } else {
      wrapperRef.current.style.height = 'auto';
      if (trackRef.current) trackRef.current.style.transform = '';
      if (bgTrackRef.current) bgTrackRef.current.style.transform = '';
      if (watermarkTrackRef.current) watermarkTrackRef.current.style.transform = '';
      if (telemetryTrackRef.current) telemetryTrackRef.current.style.transform = '';
    }
  }, []);

  // Smooth scroll to an era
  const scrollToEra = useCallback(
    (slug: string) => {
      const eraEl = eraRefs.current.get(slug);
      if (!eraEl || !wrapperRef.current || !trackRef.current) return;

      const isDesktop =
        window.innerWidth >= 1024 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (isDesktop) {
        const maxHorizontalDistance = trackRef.current.scrollWidth - window.innerWidth;
        const totalVerticalScroll = wrapperRef.current.offsetHeight - window.innerHeight;
        const targetX = Math.max(0, Math.min(maxHorizontalDistance, eraEl.offsetLeft - 30));
        const targetProgress = maxHorizontalDistance > 0 ? targetX / maxHorizontalDistance : 0;
        const targetScrollY = wrapperRef.current.offsetTop + targetProgress * totalVerticalScroll;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      } else {
        eraEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    []
  );

  useImperativeHandle(ref, () => ({ scrollToEra }), [scrollToEra]);

  // Main scroll loop coordinating horizontal progression & parallax
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (!wrapperRef.current || !trackRef.current) return;
      const isDesktop =
        window.innerWidth >= 1024 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!isDesktop) return;

      const wrapperTop = wrapperRef.current.offsetTop;
      const totalVerticalScroll = wrapperRef.current.offsetHeight - window.innerHeight;

      if (totalVerticalScroll <= 0) return;

      const currentScroll = Math.max(0, Math.min(totalVerticalScroll, window.scrollY - wrapperTop));
      const progress = currentScroll / totalVerticalScroll;

      setTimelineProgress(progress);

      const maxHorizontalDistance = trackRef.current.scrollWidth - window.innerWidth;
      const currentX = progress * maxHorizontalDistance;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${-currentX}px, 0, 0)`;
        }
        if (bgTrackRef.current) {
          bgTrackRef.current.style.transform = `translate3d(${-currentX * 0.35}px, 0, 0)`;
        }
        if (watermarkTrackRef.current) {
          watermarkTrackRef.current.style.transform = `translate3d(${-currentX * 0.65}px, 0, 0)`;
        }
        if (telemetryTrackRef.current) {
          telemetryTrackRef.current.style.transform = `translate3d(${-currentX * 1.15}px, 0, 0)`;
        }
      });

      // Find closest active era
      const viewportCenter = currentX + window.innerWidth * 0.45;
      let activeEra = eras[0];
      let minDiff = Infinity;

      eraRefs.current.forEach((el, slug) => {
        const eraCenter = el.offsetLeft + el.offsetWidth * 0.5;
        const diff = Math.abs(eraCenter - viewportCenter);
        if (diff < minDiff) {
          minDiff = diff;
          const found = eras.find((e) => e.slug === slug);
          if (found) activeEra = found;
        }
      });

      // Only update era/theme if user is actively within timeline section
      const isInsideTimeline =
        window.scrollY >= wrapperTop - 80 &&
        window.scrollY <= wrapperTop + totalVerticalScroll + 80;

      if (isInsideTimeline && activeEra && activeEra.slug !== activeEraSlug) {
        setActiveEraSlug(activeEra.slug);
        onEraChange(activeEra.slug, activeEra.theme, progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateLayout, { passive: true });

    // Initial measurement
    const timer = setTimeout(() => {
      updateLayout();
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateLayout);
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [eras, activeEraSlug, onEraChange, updateLayout]);

  // Keyboard navigation between eras
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedVehicle) return;
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const currentIndex = eras.findIndex((e) => e.slug === activeEraSlug);

      if (e.key === 'ArrowRight' && currentIndex < eras.length - 1) {
        e.preventDefault();
        scrollToEra(eras[currentIndex + 1].slug);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        scrollToEra(eras[currentIndex - 1].slug);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVehicle, activeEraSlug, eras, scrollToEra]);

  const activeIndex = eras.findIndex((e) => e.slug === activeEraSlug);

  return (
    <section
      ref={wrapperRef}
      id="historical-timeline"
      className="timeline-journey-wrapper"
      aria-label="Chronological Automotive Timeline"
    >
      <div className="timeline-sticky-viewport">
        {/* Parallax Background Layer */}
        <div ref={bgTrackRef} className="timeline-bg-track" aria-hidden="true">
          {eras.map((era) => (
            <div
              key={`bg-${era.id}`}
              className="timeline-bg-panel"
              style={{ background: era.bgGradient }}
            />
          ))}
        </div>

        {/* Parallax Watermark Dates Layer */}
        <div ref={watermarkTrackRef} className="timeline-watermark-track" aria-hidden="true">
          {eras.map((era) => (
            <div key={`watermark-${era.id}`} className="timeline-watermark-item">
              <span>{era.period.split(' — ')[0]}</span>
            </div>
          ))}
        </div>

        {/* Scale Stage (Provides cinematic background depth during vehicle inspection) */}
        <div className={`timeline-scale-stage ${selectedVehicle ? 'is-inspecting' : ''}`}>
          <div ref={trackRef} className="timeline-track" role="region" aria-label="Automotive Eras Track">
            {eras.map((config, index) => (
              <div
                key={config.id}
                ref={(el) => registerEraRef(config.slug, el)}
                style={{ display: 'contents' }}
              >
                <EraSection
                  config={config}
                  vehicles={vehiclesByEra[config.id] ?? []}
                  onSelectVehicle={onSelectVehicle}
                />
                {index < eras.length - 1 && (
                  <div className="era-gateway-divider" aria-hidden="true">
                    <div className="era-gateway-line" />
                    <span className="era-gateway-badge">
                      {config.period.split(' — ')[0]} ➔ {eras[index + 1].period.split(' — ')[0]}
                    </span>
                    <div className="era-gateway-line" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Parallax Foreground Telemetry Track */}
        <div ref={telemetryTrackRef} className="timeline-telemetry-track" aria-hidden="true">
          {eras.map((era, i) => (
            <div key={`telemetry-${era.id}`} className="timeline-telemetry-item">
              <span className="timeline-telemetry-item__code">
                TIME.COORD 0{i + 1} // {era.period}
              </span>
              <div className="timeline-telemetry-item__line" />
            </div>
          ))}
        </div>

        {/* Floating HUD Controls */}
        <div className="timeline-hud" aria-label="Timeline navigation controls">
          <div className="timeline-hud__hint">
            <span>HISTORIC TIMELINE (1885–1995)</span>
            <span aria-hidden="true">← →</span>
            <div
              className="timeline-hud__meter"
              role="progressbar"
              aria-valuenow={Math.round(timelineProgress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Timeline scroll progress"
            >
              <div
                className="timeline-hud__meter-fill"
                style={{ width: `${Math.round(timelineProgress * 100)}%` }}
              />
            </div>
            <span className="timeline-hud__percent">{Math.round(timelineProgress * 100)}%</span>
          </div>

          <div className="timeline-hud__nav-buttons">
            <button
              type="button"
              className="timeline-hud__btn"
              onClick={() => {
                if (activeIndex > 0) scrollToEra(eras[activeIndex - 1].slug);
              }}
              disabled={activeIndex <= 0}
              aria-label="Previous automotive era"
              title="Previous automotive era (Left Arrow)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className="timeline-hud__btn"
              onClick={() => {
                if (activeIndex < eras.length - 1) scrollToEra(eras[activeIndex + 1].slug);
              }}
              disabled={activeIndex >= eras.length - 1}
              aria-label="Next automotive era"
              title="Next automotive era (Right Arrow)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HorizontalTimeline;
