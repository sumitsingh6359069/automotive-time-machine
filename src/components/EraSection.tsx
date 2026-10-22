import { useRef, useEffect } from 'react';
import type { EraConfig } from '../data/eras';
import type { Vehicle } from '../data/vehicles';
import VehicleCard from './VehicleCard';
import '../styles/era-section.css';

interface Props {
  config: EraConfig;
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
}

// Grid layout strategy per era
const ERA_LAYOUTS: Record<string, ('landscape' | 'portrait' | 'wide')[]> = {
  birth:       ['landscape', 'portrait', 'portrait'],
  golden:      ['wide', 'portrait', 'portrait'],
  midcentury:  ['landscape', 'landscape', 'portrait', 'portrait'],
  performance: ['wide', 'landscape'],
  modern:      ['landscape', 'portrait'],
  supercar:    ['wide', 'portrait', 'portrait'],
  electric:    ['landscape', 'portrait', 'portrait'],
  formula1:    ['landscape', 'landscape', 'wide', 'portrait'],
  beyond:      ['portrait', 'landscape'],
};

// Era evolution phase mapping: Vintage -> Blueprint -> Futuristic
type EraPhase = 'vintage' | 'blueprint' | 'futuristic';

function getEraPhase(id: string): EraPhase {
  if (id === 'birth' || id === 'golden') return 'vintage';
  if (id === 'midcentury' || id === 'performance') return 'blueprint';
  return 'futuristic';
}

const PHASE_LABELS: Record<EraPhase, string> = {
  vintage: 'Parchment & Craft Archive',
  blueprint: 'Mechanical Technical Schematics',
  futuristic: 'Advanced Engineering & Telemetry',
};

export default function EraSection({ config, vehicles, onSelectVehicle }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);

  const phase = getEraPhase(config.id);

  // Scroll-driven continuous parallax & depth
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId: number;

    const handleScroll = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const rect = section.getBoundingClientRect();
      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop) {
        // Horizontal relative progress
        const windowW = window.innerWidth;
        if (rect.right < -100 || rect.left > windowW + 100) return;

        const totalDist = windowW + rect.width;
        const currentDist = windowW - rect.left;
        const progress = Math.max(0, Math.min(1, currentDist / totalDist));

        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (yearRef.current) {
            const yearOffset = (progress - 0.5) * -80;
            yearRef.current.style.transform = `translate3d(${yearOffset}px, -50%, 0)`;
            yearRef.current.style.opacity = String(0.04 + Math.sin(progress * Math.PI) * 0.08);
          }
          if (atmosphereRef.current) {
            const atmoOffset = (progress - 0.5) * -35;
            atmosphereRef.current.style.transform = `translate3d(${atmoOffset}px, 0, 0)`;
          }
          if (headingRef.current) {
            const headingOffset = (progress - 0.5) * -16;
            headingRef.current.style.transform = `translate3d(${headingOffset}px, 0, 0)`;
          }
        });
      } else {
        // Vertical relative progress (mobile/tablet)
        const windowH = window.innerHeight;
        if (rect.bottom < -80 || rect.top > windowH + 80) return;

        const totalDist = windowH + rect.height;
        const currentDist = windowH - rect.top;
        const progress = Math.max(0, Math.min(1, currentDist / totalDist));

        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (yearRef.current) {
            const yearOffset = (progress - 0.5) * -70;
            yearRef.current.style.transform = `translate3d(0, calc(-50% + ${yearOffset}px), 0)`;
            yearRef.current.style.opacity = String(0.04 + Math.sin(progress * Math.PI) * 0.08);
          }
          if (atmosphereRef.current) {
            const atmoOffset = (progress - 0.5) * 30;
            atmosphereRef.current.style.transform = `translate3d(0, ${atmoOffset}px, 0)`;
          }
          if (headingRef.current) {
            const headingOffset = (progress - 0.5) * 12;
            headingRef.current.style.transform = `translate3d(0, ${headingOffset}px, 0)`;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const layouts = ERA_LAYOUTS[config.id] || ['landscape'];

  return (
    <section
      ref={sectionRef}
      id={config.slug}
      className={`era-section era-section--${phase} theme-${config.theme}`}
      aria-label={config.title}
      data-era={config.id}
      data-phase={phase}
    >
      {/* Top transition blend to preceding era */}
      <div className="era-section__transition-blend era-section__transition-blend--top" aria-hidden="true" />

      {/* Dynamic background gradient */}
      <div
        className="era-section__bg"
        style={{ background: config.bgGradient }}
        aria-hidden="true"
      />

      {/* Evolution Atmosphere Layers (Vintage / Blueprint / Futuristic) */}
      <div ref={atmosphereRef} className={`era-atmosphere era-atmosphere--${phase}`} aria-hidden="true">
        {phase === 'vintage' && (
          <div className="era-atmosphere__vintage-layer">
            <div className="vintage-sepia-glow" />
            <div className="vintage-corner-bracket vintage-corner-bracket--tl" />
            <div className="vintage-corner-bracket vintage-corner-bracket--tr" />
            <div className="vintage-insignia">
              <span>EST. 1885 // ARCHIVAL SPECIFICATION</span>
            </div>
          </div>
        )}

        {phase === 'blueprint' && (
          <div className="era-atmosphere__blueprint-layer">
            <div className="blueprint-grid" />
            <div className="blueprint-scan-line" />
            <div className="blueprint-crosshair blueprint-crosshair--tl">+</div>
            <div className="blueprint-crosshair blueprint-crosshair--tr">+</div>
            <div className="blueprint-crosshair blueprint-crosshair--bl">+</div>
            <div className="blueprint-crosshair blueprint-crosshair--br">+</div>
            <div className="blueprint-tech-tag">
              <span>ENG. SCHEMATICS // 1:1 CALIBRATION</span>
            </div>
          </div>
        )}

        {phase === 'futuristic' && (
          <div className="era-atmosphere__futuristic-layer">
            <div className="futuristic-metallic-sheen" />
            <div className="futuristic-telemetry-line" />
            <div className="futuristic-hex-accent" />
            <div className="futuristic-hud-marker">
              <span>AERO.DYNAMICS // ACTIVE TELEMETRY</span>
            </div>
          </div>
        )}
      </div>

      {/* Atmospheric vignette */}
      <div className="era-section__vignette" aria-hidden="true" />

      {/* Parallax Year watermark */}
      <div ref={yearRef} className="era-section__year-mark" aria-hidden="true">
        {config.period.split(' — ')[0]}
      </div>

      {/* Floating decorative line */}
      <div className="era-section__line-accent" aria-hidden="true" />

      <div className="container">
        {/* Section header */}
        <div ref={headingRef} className="era-section__header">
          <div className="era-section__header-left">
            <div className="era-section__phase-badge" aria-hidden="true">
              <span className="era-section__phase-dot" />
              <span>{PHASE_LABELS[phase]}</span>
            </div>
            <p className="section-label era-section__label">{config.subtitle}</p>
            <div className="era-section__period-tag" aria-hidden="true">
              {config.period}
            </div>
          </div>
          <div className="era-section__header-right">
            <h2 className="era-section__title">{config.title}</h2>
            <p className="era-section__narrative">{config.narrative}</p>
          </div>
        </div>

        <div className="era-section__divider" aria-hidden="true" />

        {/* Vehicles */}
        <div
          className="era-section__grid"
          role="list"
          aria-label={`Vehicles from ${config.title}`}
        >
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className={`era-section__grid-item era-section__grid-item--${layouts[index % layouts.length]}`}
              role="listitem"
            >
              <VehicleCard
                vehicle={vehicle}
                index={index}
                onSelect={onSelectVehicle}
                layout={layouts[index % layouts.length]}
              />
            </div>
          ))}
        </div>

        {/* Bottom decorative timeline ornament */}
        <div className="era-section__footer-ornament" aria-hidden="true">
          <div className="era-section__footer-line" />
          <span className="era-section__footer-period">{config.period}</span>
          <div className="era-section__footer-line" />
        </div>
      </div>

      {/* Bottom transition blend to subsequent era */}
      <div className="era-section__transition-blend era-section__transition-blend--bottom" aria-hidden="true" />
    </section>
  );
}
