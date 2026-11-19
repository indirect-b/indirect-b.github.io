// Single-canvas multi-view stage (three.js "multiple elements" pattern):
// ONE WebGL context renders every card/hero/skill mini-scene into its
// element's rectangle via viewport+scissor. This keeps the page far below
// the browser's WebGL context limit (12+ cards would otherwise each need
// their own context). Own code.
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import * as THREE from 'three';
import { createCardScene, createHeroScene, createSkillScene } from './scenes';
import type { ViewScene, VisualType, SkillDomain, Pointer } from './scenes';
import { prefersReducedMotion } from './quality';

export type StageKind = 'card' | 'hero' | 'skill';

interface ViewRec {
  id: number;
  el: HTMLElement;
  kind: StageKind;
  type: string;
  scene: ViewScene | null;
  aspect: number;
}

interface StageCtxValue {
  register: (el: HTMLElement, kind: StageKind, type: string) => number;
  unregister: (id: number) => void;
  enabled: boolean;
}

const StageCtx = createContext<StageCtxValue>({
  register: () => 0,
  unregister: () => {},
  enabled: false,
});

function buildScene(kind: StageKind, type: string, low: boolean): ViewScene {
  if (kind === 'hero') return createHeroScene(low);
  if (kind === 'skill') return createSkillScene(type as SkillDomain, low);
  return createCardScene(type as VisualType, low);
}

export function StageProvider({
  enabled,
  low,
  children,
}: {
  enabled: boolean;
  low: boolean;
  children: React.ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewsRef = useRef(new Map<number, ViewRec>());
  const idRef = useRef(0);
  const lowRef = useRef(low);
  const pointerRef = useRef<Pointer>({ x: 0, y: 0 });

  const register = useCallback(
    (el: HTMLElement, kind: StageKind, type: string): number => {
      const id = ++idRef.current;
      viewsRef.current.set(id, { id, el, kind, type, scene: null, aspect: 0 });
      return id;
    },
    [],
  );

  const unregister = useCallback((id: number) => {
    const rec = viewsRef.current.get(id);
    if (rec?.scene) rec.scene.dispose();
    viewsRef.current.delete(id);
  }, []);

  // Rebuild all scenes when quality toggles (particle counts / materials differ).
  useEffect(() => {
    lowRef.current = low;
    if (!enabled) {
      viewsRef.current.forEach((rec) => {
        rec.scene?.dispose();
        rec.scene = null;
      });
      return;
    }
    viewsRef.current.forEach((rec) => {
      rec.scene?.dispose();
      rec.scene = buildScene(rec.kind, rec.type, low);
      rec.aspect = 0;
    });
  }, [low, enabled]);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    let raf = 0;
    let last = performance.now();
    let t = 0;
    let lastDpr = 0;
    const reduced = prefersReducedMotion();

    const onPointer = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!reduced) t += dt;

      const W = window.innerWidth;
      const H = window.innerHeight;
      const wantDpr = lowRef.current ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      if (wantDpr !== lastDpr) {
        renderer.setPixelRatio(wantDpr);
        renderer.setSize(W, H, false);
        lastDpr = wantDpr;
      }
      const dpr = renderer.getPixelRatio();
      renderer.setScissorTest(false);
      renderer.setViewport(0, 0, W, H);
      renderer.clear();

      viewsRef.current.forEach((rec) => {
        if (!rec.scene) rec.scene = buildScene(rec.kind, rec.type, lowRef.current);
        const r = rec.el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4 || r.bottom < 0 || r.top > H || r.right < 0 || r.left > W) return;
        const aspect = r.width / r.height;
        if (Math.abs(aspect - rec.aspect) > 0.001) {
          rec.scene.camera.aspect = aspect;
          rec.scene.camera.updateProjectionMatrix();
          rec.aspect = aspect;
        }
        const x = Math.max(0, r.left) * dpr;
        const y = Math.max(0, H - r.bottom) * dpr;
        const w = Math.min(r.width, W - r.left) * dpr;
        const h = Math.min(r.height, H - r.top) * dpr;
        renderer.setViewport(x, y, w, h);
        renderer.setScissor(x, y, w, h);
        renderer.setScissorTest(true);
        rec.scene.update(t, dt, pointerRef.current, lowRef.current);
        renderer.render(rec.scene.scene, rec.scene.camera);
      });
      renderer.setScissorTest(false);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      viewsRef.current.forEach((rec) => {
        rec.scene?.dispose();
        rec.scene = null;
      });
      renderer.dispose();
    };
  }, [enabled]);

  return (
    <StageCtx.Provider value={{ register, unregister, enabled }}>
      {enabled && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
        />
      )}
      {children}
    </StageCtx.Provider>
  );
}

export function StageView({
  kind,
  type,
  className,
  style,
}: {
  kind: StageKind;
  type: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { register, unregister, enabled } = useContext(StageCtx);
  const ref = useRef<HTMLDivElement>(null);
  const kindRef = useRef(kind);
  const typeRef = useRef(type);
  kindRef.current = kind;
  typeRef.current = type;

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const id = register(ref.current, kindRef.current, typeRef.current);
    return () => unregister(id);
  }, [enabled, register, unregister]);

  return <div ref={ref} className={className} style={style} aria-hidden="true" />;
}
