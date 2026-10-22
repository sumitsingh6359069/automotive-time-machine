import { useEffect, useRef, useCallback } from 'react';
import '../styles/cursor.css';

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

const TRAIL_LENGTH = 16;
const TRAIL_DECAY_MS = 300;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -200, y: -200 });
  const ringPosRef = useRef({ x: -200, y: -200 });
  const isVisibleRef = useRef(false);
  const hoverTypeRef = useRef<'none' | 'button' | 'vehicle'>('none');
  const reticleLockTimeoutRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    if (!isVisibleRef.current) {
      isVisibleRef.current = true;
      dotRef.current?.classList.add('is-visible');
      ringRef.current?.classList.add('is-visible');
    }
    trailRef.current.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    if (trailRef.current.length > TRAIL_LENGTH * 2) {
      trailRef.current = trailRef.current.slice(-TRAIL_LENGTH * 2);
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    dotRef.current?.classList.add('is-clicking');
    ringRef.current?.classList.add('is-clicking');
  }, []);

  const handleMouseUp = useCallback(() => {
    dotRef.current?.classList.remove('is-clicking');
    ringRef.current?.classList.remove('is-clicking');
  }, []);

  useEffect(() => {
    // Only activate on pointer devices with fine hover capability
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const updateHoverTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        setHoverState('none');
        return;
      }

      if (target.closest('.vehicle-card, [data-cursor="vehicle"]')) {
        setHoverState('vehicle');
      } else if (target.closest('a, button, [role="button"], .timeline-dot, [data-cursor="hover"]')) {
        setHoverState('button');
      } else {
        setHoverState('none');
      }
    };

    const setHoverState = (type: 'none' | 'button' | 'vehicle') => {
      if (hoverTypeRef.current === type) return;
      hoverTypeRef.current = type;

      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;

      ring.classList.remove('is-hover-button', 'is-hover-vehicle');
      dot.classList.remove('is-hover-button', 'is-hover-vehicle');

      if (type === 'button') {
        ring.classList.add('is-hover-button');
        dot.classList.add('is-hover-button');
      } else if (type === 'vehicle') {
        ring.classList.add('is-hover-vehicle');
        dot.classList.add('is-hover-vehicle');
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      updateHoverTarget(e.target);
    };

    const handleMouseLeaveWindow = () => {
      isVisibleRef.current = false;
      setHoverState('none');
      dotRef.current?.classList.remove('is-visible', 'is-clicking');
      ringRef.current?.classList.remove('is-visible', 'is-clicking', 'is-locked');
    };

    // Reticle lock pulse on vehicle selection
    const handleVehicleSelection = () => {
      const ring = ringRef.current;
      if (!ring) return;
      ring.classList.add('is-locked');
      if (reticleLockTimeoutRef.current) clearTimeout(reticleLockTimeoutRef.current);
      reticleLockTimeoutRef.current = window.setTimeout(() => {
        ring.classList.remove('is-locked');
      }, 650);
    };

    const handleDocumentClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('.vehicle-card, [data-cursor="vehicle"]')) {
        handleVehicleSelection();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('click', handleDocumentClick, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const render = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      // Precision central point
      if (dot) {
        dot.style.transform = `translate3d(${mouseRef.current.x - 3}px, ${mouseRef.current.y - 3}px, 0)`;
      }

      // Trailing outer reticle ring with restrained damping
      ringPosRef.current.x = lerp(ringPosRef.current.x, mouseRef.current.x, 0.16);
      ringPosRef.current.y = lerp(ringPosRef.current.y, mouseRef.current.y, 0.16);

      if (ring) {
        ring.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`;
      }

      // Restrained instrumental sweep trail on canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const now = Date.now();
        const recent = trailRef.current.filter((p) => now - p.time < TRAIL_DECAY_MS);

        if (recent.length > 2) {
          const wrapperEl = document.querySelector('.site-wrapper') || document.documentElement;
          const trailColor = getComputedStyle(wrapperEl).getPropertyValue('--cursor-color').trim() || '#C7A985';

          ctx.beginPath();
          ctx.moveTo(recent[0].x, recent[0].y);
          for (let i = 1; i < recent.length; i++) {
            const age = Math.max(0, 1 - (now - recent[i].time) / TRAIL_DECAY_MS);
            const prev = recent[i - 1];
            const curr = recent[i];
            const mx = (prev.x + curr.x) / 2;
            const my = (prev.y + curr.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
            ctx.save();
            ctx.strokeStyle = trailColor;
            ctx.globalAlpha = age * 0.25;
            ctx.lineWidth = age * 1.2;
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.restore();
            ctx.beginPath();
            ctx.moveTo(mx, my);
          }
        }
        trailRef.current = recent;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (reticleLockTimeoutRef.current) clearTimeout(reticleLockTimeoutRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="cursor-canvas"
        aria-hidden="true"
      />
      {/* Precision center dot */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />

      {/* Reticle / Gauge Instrument Ring */}
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="cursor-reticle cursor-reticle--t" />
        <span className="cursor-reticle cursor-reticle--b" />
        <span className="cursor-reticle cursor-reticle--l" />
        <span className="cursor-reticle cursor-reticle--r" />
        <span className="cursor-badge-text">EXPLORE</span>
      </div>
    </>
  );
}
