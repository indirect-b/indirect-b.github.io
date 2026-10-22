import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Fixed animated backdrop: faint grid + drifting aurora orbs + twinkling stars. */
export function BackgroundFX({ dim }: { dim?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = prefersReducedMotion();
    let raf = 0;
    let stars: { x: number; y: number; r: number; p: number; s: number }[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const count = w < 640 ? 40 : 80;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.4,
        p: Math.random() * Math.PI * 2,
        s: 0.4 + Math.random() * 0.9,
      }));
    };

    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = (t: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t / 1000 * s.s + s.p));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(191, 219, 254, ${0.55 * tw})`;
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ zIndex: -1 }}
      className={`pointer-events-none fixed inset-0 overflow-hidden ${
        dim ? 'opacity-40' : ''
      }`}
    >
      <div className="fx-grid absolute inset-0" />
      <div className="fx-scanlines absolute inset-0 opacity-50" />
      <div className="fx-orb absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#00e5ff]/25 blur-[120px]" />
      <div className="fx-orb fx-orb-delay absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-[#ff2a6d]/20 blur-[130px]" />
      <div className="fx-orb fx-orb-delay2 absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-400/15 blur-[110px]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />
    </div>
  );
}

/** Soft glow that follows the mouse (desktop pointers only). */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || prefersReducedMotion()) return;
    setEnabled(true);
    const el = ref.current;
    if (!el) return;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.transform = `translate3d(${cx - 250}px, ${cy - 250}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div
      aria-hidden="true"
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[500px] w-[500px] rounded-full opacity-25"
      style={{
        background:
          'radial-gradient(circle, rgba(0,229,255,0.35) 0%, rgba(255,42,109,0.18) 40%, transparent 70%)',
      }}
    />
  );
}

/** Fade-and-rise on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/** 3D tilt + moving glare on hover (mouse only; harmless on touch). */
export function Tilt({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = 'transform 0.1s ease-out';
    el.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateY(-3px)`;
    el.style.setProperty('--glare-x', `${((px + 0.5) * 100).toFixed(0)}%`);
    el.style.setProperty('--glare-y', `${((py + 0.5) * 100).toFixed(0)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.45s ease-out';
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-glare ${className || ''}`}
    >
      {children}
    </div>
  );
}

/** Typing effect cycling through tech keywords. */
export function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0]);
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const word = words[wordIdx % words.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && text === '') {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(word.slice(0, text.length + (deleting ? -1 : 1)));
        },
        deleting ? 45 : 95,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words]);

  return (
    <span>
      {text}
      <span className="fx-caret ms-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-[#00e5ff]" />
    </span>
  );
}

/** Counts a leading number up when scrolled into view; other text renders as-is. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^(\d+)([\s\S]*)$/);
    if (!match) return;
    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2];    const start = performance.now();
    const duration = 1300;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(`${Math.round(target * eased)}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}
