// QUANTUM-mode artwork: live 3D mini-scenes rendered by the shared stage,
// a WebGL hero panel, 3D skill objects, and a larger 3D viewer for the
// project modal (own renderer, mounted only while the modal is open).
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { StageView } from '../three/stage';
import { createCardScene } from '../three/scenes';
import { prefersReducedMotion } from '../three/quality';
import type { ProjectItem } from '../data/portfolioData';

export type VisualType = ProjectItem['visualType'];
export type SkillDomain = 'android' | 'crypto' | 'ai';

/** Card artwork: live 3D diagram in place of the flat SVG. */
export function CardArtwork3D({
  type,
  className,
}: {
  type: VisualType;
  className?: string;
}) {
  return (
    <StageView
      kind="card"
      type={type}
      className={`relative w-full bg-[#0B0B0E] ${className ?? ''}`}
    />
  );
}

/** Hero panel: real WebGL glass knot + particle field, with the same
 *  directory-path top bar and footer as the classic panel. */
export function HeroArtwork3D({ className }: { className?: string }) {
  return (
    <div
      className={`relative w-full h-full min-h-[380px] bg-[#0A0A0C] overflow-hidden border border-zinc-800/90 rounded-2xl ${className ?? ''}`}
    >
      <StageView kind="hero" type="hero" className="absolute inset-0" />
      <div
        className="relative z-10 flex items-center justify-between border-b border-zinc-800/80 px-6 lg:px-8 py-4 text-xs font-mono text-zinc-400"
        dir="ltr"
      >
        <span>github.com/indirect-b</span>
        <span>Android · Linux · AI · PQ-Crypto</span>
      </div>
      <div className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-between px-6 lg:px-8 py-4 border-t border-zinc-800/80 text-xs text-zinc-400">
        <span>متصل به اطلاعات مخازن گیت‌هاب</span>
        <span className="font-mono text-zinc-300" dir="ltr">
          indirect-b.github.io
        </span>
      </div>
    </div>
  );
}

/** Small 3D object at the top of a skill card. */
export function SkillArtwork3D({
  domain,
  className,
}: {
  domain: SkillDomain;
  className?: string;
}) {
  return (
    <StageView
      kind="skill"
      type={domain}
      className={`relative w-full bg-[#0B0B0E] rounded-xl ${className ?? ''}`}
    />
  );
}

/** Larger 3D viewer inside the project modal. Own WebGL context, created
 *  only while the modal is open and fully disposed on close. */
export function ModalViewer3D({
  type,
  low,
  className,
}: {
  type: VisualType;
  low: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const lowRef = useRef(low);
  lowRef.current = low;

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !lowRef.current,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    host.appendChild(renderer.domElement);

    const view = createCardScene(type, lowRef.current, true);
    const reduced = prefersReducedMotion();
    const pointer = { x: 0, y: 0 };
    let raf = 0;
    let last = performance.now();
    let t = 0;

    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w < 2 || h < 2) return;
      const dpr = lowRef.current ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      view.camera.aspect = w / h;
      view.camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const render = () => {
      view.update(t, 0.016, pointer, lowRef.current);
      renderer.render(view.scene, view.camera);
    };
    if (reduced) {
      render();
    } else {
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        t += dt;
        render();
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      view.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [type]);

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden bg-[#0B0B0E] ${className ?? ''}`}
      aria-hidden="true"
    />
  );
}
