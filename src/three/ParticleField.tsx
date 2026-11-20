// Full-screen WebGL particle field that replaces the flat 2D starfield in
// QUANTUM mode: a dense, drifting, pointer-stirred field (Active Theory's
// "particles as the main character"). Shader-driven, zero CPU per frame.
// Own code.
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createBackgroundScene } from './scenes';
import { prefersReducedMotion } from './quality';

export function ParticleField({ dim, low }: { dim?: boolean; low: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lowRef = useRef(low);
  lowRef.current = low;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    const view = createBackgroundScene();
    const reduced = prefersReducedMotion();
    const pointer = { x: 0, y: 0 };
    let raf = 0;
    let last = performance.now();
    let t = 0;
    let lastDpr = 0;

    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    const resize = () => {
      const wantDpr = lowRef.current ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      if (wantDpr !== lastDpr) {
        renderer.setPixelRatio(wantDpr);
        lastDpr = wantDpr;
      }
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      const mat = view.scene.children[0] as THREE.Points | undefined;
      const smat = mat?.material as THREE.ShaderMaterial | undefined;
      if (smat?.uniforms?.uPixelRatio) smat.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      renderer.render(view.scene, view.camera);
    };

    if (reduced) {
      // One static frame, no loop.
      view.update(0, 0, pointer, lowRef.current);
      render();
    } else {
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        t += dt;
        view.update(t, dt, pointer, lowRef.current);
        render();
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      view.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
        style={{
          // Dim the field hard in Low mode so the toggle visibly clears the noise.
          opacity: dim ? (low ? 0.08 : 0.18) : low ? 0.22 : 0.5,
        }}
      />
      {/* Text scrim: fades the field out behind the central content column
          (where headings, body copy, code and stats sit) while leaving the
          particle field visible at the page edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: dim
            ? 'radial-gradient(ellipse 78% 68% at 50% 36%, rgba(248,247,244,0.94) 0%, rgba(248,247,244,0.55) 55%, rgba(248,247,244,0) 82%)'
            : 'radial-gradient(ellipse 78% 68% at 50% 36%, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.45) 55%, rgba(5,5,5,0) 82%)',
        }}
      />
    </>
  );
}
