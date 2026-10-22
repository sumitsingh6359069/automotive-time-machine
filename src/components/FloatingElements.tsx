import { useEffect, useRef } from 'react';
import '../styles/floating-elements.css';

// Automotive-inspired SVG icons used as floating decorative elements
const ICONS = [
  // Gear
  `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
    <circle cx="16" cy="16" r="4"/>
    <path d="M16 2v4M16 26v4M2 16h4M26 16h4M6.34 6.34l2.83 2.83M22.83 22.83l2.83 2.83M6.34 25.66l2.83-2.83M22.83 9.17l2.83-2.83"/>
  </svg>`,
  // Speedometer arc
  `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M4 22a12 12 0 1 1 24 0"/>
    <line x1="16" y1="22" x2="22" y2="12"/>
    <circle cx="16" cy="22" r="1.5" fill="currentColor"/>
  </svg>`,
  // Wheel
  `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
    <circle cx="16" cy="16" r="12"/>
    <circle cx="16" cy="16" r="4"/>
    <line x1="16" y1="4" x2="16" y2="12"/>
    <line x1="16" y1="20" x2="16" y2="28"/>
    <line x1="4" y1="16" x2="12" y2="16"/>
    <line x1="20" y1="16" x2="28" y2="16"/>
    <line x1="7.5" y1="7.5" x2="11.3" y2="11.3"/>
    <line x1="20.7" y1="20.7" x2="24.5" y2="24.5"/>
    <line x1="24.5" y1="7.5" x2="20.7" y2="11.3"/>
    <line x1="11.3" y1="20.7" x2="7.5" y2="24.5"/>
  </svg>`,
  // Piston
  `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="8" y="4" width="16" height="12" rx="1"/>
    <line x1="16" y1="16" x2="16" y2="22"/>
    <rect x="10" y="6" width="12" height="8" rx="0.5"/>
    <line x1="8" y1="22" x2="24" y2="22"/>
    <line x1="10" y1="25" x2="22" y2="25"/>
    <line x1="12" y1="28" x2="20" y2="28"/>
  </svg>`,
  // F1 car silhouette (simplified)
  `<svg viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M6 16c0 0 4-8 12-10h12c6 0 10 4 10 8v2H6v-0z"/>
    <circle cx="10" cy="18" r="3"/>
    <circle cx="38" cy="18" r="3"/>
    <line x1="2" y1="14" x2="6" y2="14"/>
    <line x1="42" y1="14" x2="46" y2="14"/>
  </svg>`,
  // Diamond / checkpoint
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <polygon points="12,2 22,12 12,22 2,12"/>
  </svg>`,
];

interface FloatingEl {
  id: number;
  icon: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
}

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<FloatingEl[]>([]);
  const rafRef = useRef<number>(0);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

    const count = window.innerWidth < 768 ? 6 : 12;
    elementsRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      icon: ICONS[i % ICONS.length],
      x: Math.random() * 100,
      y: Math.random() * 85 + 5,
      size: 14 + Math.random() * 22,
      speed: 0.02 + Math.random() * 0.04,
      opacity: 0.04 + Math.random() * 0.06,
      drift: (Math.random() - 0.5) * 0.015,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.3,
    }));

    // Render elements
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';
    elementsRef.current.forEach((el) => {
      const div = document.createElement('div');
      div.className = 'floating-el';
      div.style.cssText = `
        position: absolute;
        left: ${el.x}%;
        top: ${el.y}vh;
        width: ${el.size}px;
        height: ${el.size}px;
        opacity: ${el.opacity};
        color: var(--accent-primary, #C7A985);
        pointer-events: none;
        will-change: transform;
      `;
      div.innerHTML = el.icon;
      container.appendChild(div);
    });

    const children = Array.from(container.children) as HTMLElement[];

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let frame = 0;
    const animate = () => {
      frame++;
      const scrollFraction = scrollYRef.current / Math.max(1, document.body.scrollHeight - window.innerHeight);

      children.forEach((el, i) => {
        const cfg = elementsRef.current[i];
        if (!cfg) return;
        const yOffset = scrollFraction * 40 * cfg.speed * 100;
        const xOffset = Math.sin(frame * cfg.drift + i) * 20;
        const rot = cfg.rotation + frame * cfg.rotationSpeed;
        el.style.transform = `translate(${xOffset}px, ${-yOffset}px) rotate(${rot}deg)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="floating-elements-layer"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 'var(--z-floating)' as string,
        overflow: 'hidden',
      }}
    />
  );
}
