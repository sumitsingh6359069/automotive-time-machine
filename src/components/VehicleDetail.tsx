import { useEffect, useRef, useState, useCallback } from 'react';
import type { Vehicle } from '../data/vehicles';
import { getAssetUrl } from '../utils/asset';
import '../styles/vehicle-detail.css';

interface Props {
  vehicle: Vehicle;
  onClose: () => void;
}

type PhotoMode = 'natural' | 'studio' | 'schematic';

export default function VehicleDetail({ vehicle, onClose }: Props) {
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [photoMode, setPhotoMode] = useState<PhotoMode>('natural');
  const [isZoomed, setIsZoomed] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  // Reset states when vehicle changes
  useEffect(() => {
    setPhotoMode('natural');
    setIsZoomed(false);
    setImgError(false);
  }, [vehicle.id]);

  // Focus management
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      previousFocus?.focus();
    };
  }, []);

  // Keyboard close (Escape)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, isZoomed]);

  // Trap focus inside modal
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelectors));
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    panel.addEventListener('keydown', handler);
    return () => panel.removeEventListener('keydown', handler);
  }, []);

  // Handle pointer coordinate for zoom focal point
  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  }, []);

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  return (
    <div
      className="detail-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-modal="true"
    >
      <article
        ref={panelRef as React.RefObject<HTMLElement>}
        className="detail-panel"
        role="dialog"
        aria-label={`${vehicle.manufacturer} ${vehicle.model} — archival detail`}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          className="detail-close"
          onClick={onClose}
          aria-label="Close vehicle detail view"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Hero Photographic Presentation */}
        <div
          className={`detail-hero detail-hero--mode-${photoMode} ${isZoomed ? 'is-zoomed' : ''}`}
          onMouseMove={handleHeroMouseMove}
          onClick={toggleZoom}
          title={isZoomed ? 'Click to reset view' : 'Click to zoom and inspect craftsmanship'}
          data-cursor="hover"
        >
          {imgError ? (
            <div className="detail-hero__fallback" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p>Archival Technical Rendering</p>
            </div>
          ) : (
            <div className="detail-hero__stage">
              <img
                src={getAssetUrl(vehicle.imageUrl)}
                alt={vehicle.imageAlt}
                className="detail-hero__img"
                style={{
                  transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                }}
                loading="eager"
                onError={() => setImgError(true)}
              />
              {/* Studio lighting or schematic grid overlay */}
              {photoMode === 'studio' && (
                <div className="detail-hero__studio-lighting" aria-hidden="true" />
              )}
              {photoMode === 'schematic' && (
                <div className="detail-hero__schematic-grid" aria-hidden="true">
                  <div className="schematic-target" style={{ left: `${zoomOrigin.x}%`, top: `${zoomOrigin.y}%` }} />
                  <span className="schematic-coord">X:{zoomOrigin.x.toFixed(0)} Y:{zoomOrigin.y.toFixed(0)}</span>
                </div>
              )}
            </div>
          )}

          {/* Gradients and subtle depth */}
          <div className="detail-hero__overlay" aria-hidden="true" />

          {/* Zoom hint badge */}
          <div className="detail-hero__zoom-hint" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <span>{isZoomed ? 'Click to reset' : 'Click to inspect'}</span>
          </div>

          {/* Archival camera / photography credit */}
          <div className="detail-hero__credits" aria-hidden="true">
            {vehicle.imageCredit && <small>Photo: {vehicle.imageCredit}</small>}
          </div>
        </div>

        {/* Photo Atmosphere Controls */}
        <div className="detail-photo-controls" role="toolbar" aria-label="Archival display modes">
          <span className="detail-photo-controls__label">LIGHTING & LENS:</span>
          <div className="detail-photo-controls__group">
            <button
              type="button"
              className={`detail-mode-btn ${photoMode === 'natural' ? 'is-active' : ''}`}
              onClick={() => setPhotoMode('natural')}
            >
              Natural Daylight
            </button>
            <button
              type="button"
              className={`detail-mode-btn ${photoMode === 'studio' ? 'is-active' : ''}`}
              onClick={() => setPhotoMode('studio')}
            >
              Studio Spotlight
            </button>
            <button
              type="button"
              className={`detail-mode-btn ${photoMode === 'schematic' ? 'is-active' : ''}`}
              onClick={() => setPhotoMode('schematic')}
            >
              Technical Overlay
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="detail-body">
          {/* Header */}
          <header className="detail-header">
            <div className="detail-header__meta">
              <span className="detail-header__era section-label">{vehicle.era.toUpperCase()}</span>
              <span className="detail-header__separator" aria-hidden="true">·</span>
              <span className="detail-header__category">{vehicle.category}</span>
            </div>
            <div className="detail-header__name">
              <p className="detail-header__manufacturer">{vehicle.manufacturer}</p>
              <h2 className="detail-header__model">{vehicle.model}</h2>
              <p className="detail-header__year">{vehicle.year}</p>
            </div>
          </header>

          <div className="detail-divider" aria-hidden="true" />

          {/* Significance */}
          <section className="detail-section" aria-label="Significance">
            <h3 className="detail-section__title">Significance</h3>
            <p className="detail-section__text">{vehicle.significance}</p>
          </section>

          {/* Engine */}
          <section className="detail-section" aria-label="Powertrain">
            <h3 className="detail-section__title">Powertrain & Architecture</h3>
            <p className="detail-section__engine">{vehicle.engineDescription}</p>
          </section>

          {/* Technical Specifications */}
          <section className="detail-section" aria-label="Technical Specifications">
            <h3 className="detail-section__title">Engineering Specifications</h3>
            <dl className="detail-specs">
              {vehicle.specs.map((spec) => (
                <div key={spec.label} className="detail-spec">
                  <dt className="detail-spec__label">{spec.label}</dt>
                  <dd className="detail-spec__value">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Historical Context */}
          <section className="detail-section" aria-label="Historical Context">
            <h3 className="detail-section__title">Historical Impact</h3>
            <p className="detail-section__text">{vehicle.historicalContext}</p>
          </section>

          {/* Archival Provenance Box */}
          <div className="detail-provenance" aria-label="Archival verification">
            <div className="detail-provenance__stamp">VERIFIED ARCHIVAL RECORD</div>
            <p className="detail-provenance__text">
              Preserved in the Automotive Time Machine collection. Specifications sourced from manufacturer archives,
              Goodwood Historical records, and documented automotive racing registries.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
