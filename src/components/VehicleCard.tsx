import { useState, useRef, useCallback, useEffect } from 'react';
import type { Vehicle } from '../data/vehicles';
import { getAssetUrl } from '../utils/asset';
import '../styles/vehicle-card.css';

interface Props {
  vehicle: Vehicle;
  index: number;
  onSelect: (vehicle: Vehicle) => void;
  layout?: 'landscape' | 'portrait' | 'wide';
}

export default function VehicleCard({ vehicle, index, onSelect, layout = 'landscape' }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Intersection observer — fade in on scroll
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // 3D tilt on pointer move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      tiltRef.current = { x, y };
      if (el) {
        el.style.setProperty('--tilt-x', `${x}deg`);
        el.style.setProperty('--tilt-y', `${y}deg`);
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(vehicle);
    }
  };

  const cardStyle = {
    '--card-index': index,
    '--accent': vehicle.accentColor,
  } as React.CSSProperties;

  return (
    <article
      ref={cardRef as React.RefObject<HTMLElement>}
      className={`vehicle-card vehicle-card--${layout}`}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(vehicle)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${vehicle.manufacturer} ${vehicle.model} ${vehicle.year} — click to explore`}
      data-cursor="vehicle"
    >
      {/* Image */}
      <div className="vehicle-card__image-wrap">
        {!imgLoaded && !imgError && (
          <div className="vehicle-card__skeleton skeleton" aria-hidden="true" />
        )}
        {imgError ? (
          <div className="vehicle-card__fallback" aria-hidden="true">
            <span>Image unavailable</span>
          </div>
        ) : (
          <img
            src={getAssetUrl(vehicle.imageUrl)}
            alt={vehicle.imageAlt}
            className={`vehicle-card__img ${imgLoaded ? 'is-loaded' : ''}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}
        {/* Cinematic overlay */}
        <div className="vehicle-card__img-overlay" aria-hidden="true" />
        {/* Tilt reflection */}
        <div className="vehicle-card__reflection" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="vehicle-card__content">
        <div className="vehicle-card__meta">
          <span className="vehicle-card__year">{vehicle.year}</span>
          <span className="vehicle-card__category">{vehicle.category}</span>
        </div>
        <h3 className="vehicle-card__name">
          <span className="vehicle-card__manufacturer">{vehicle.manufacturer}</span>
          <span className="vehicle-card__model">{vehicle.model}</span>
        </h3>
        <p className="vehicle-card__significance">{vehicle.significance.slice(0, 120)}…</p>

        {/* Explore hint */}
        <div className="vehicle-card__cta" aria-hidden="true">
          <span>Explore</span>
          <span className="vehicle-card__cta-arrow">→</span>
        </div>
      </div>

      {/* Corner ornaments */}
      <div className="vehicle-card__ornament" aria-hidden="true" />
    </article>
  );
}
