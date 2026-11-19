// Own-code Three.js scenes for the QUANTUM mode of the personal site.
// Design language borrowed from Active Theory's public work: a dense drifting
// particle field as the main character, one glowing focal object, minimal text,
// luminous cyan/pink accents, pointer as a force that stirs the field.
// No Active Theory code is used here — only Three.js + public techniques.

import * as THREE from 'three';

export type VisualType =
  | 'distributed'
  | 'compiler'
  | 'vector'
  | 'persian-nlp'
  | 'edge-kv'
  | 'wasm-audio'
  | 'hero';

export type SkillDomain = 'android' | 'crypto' | 'ai';

export interface Pointer {
  x: number;
  y: number;
}

export interface ViewScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  update: (t: number, dt: number, pointer: Pointer, low: boolean) => void;
  dispose: () => void;
}

export const CYAN = 0x00e5ff;
export const PINK = 0xff2a6d;
export const BLUE = 0x60a5fa;
export const WHITE = 0xfafafa;

function disposeObject(root: THREE.Object3D): void {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const mat = (mesh as THREE.Mesh).material as
      | THREE.Material
      | THREE.Material[]
      | undefined;
    if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
    else if (mat) mat.dispose();
  });
}

function makeCamera(z: number, fov = 45): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);
  camera.position.set(0, 0, z);
  return camera;
}

function addLights(scene: THREE.Scene, intensity = 1): void {
  scene.add(new THREE.AmbientLight(0xffffff, 0.35 * intensity));
  const key = new THREE.PointLight(CYAN, 28 * intensity, 30);
  key.position.set(-3, 3, 4);
  scene.add(key);
  const rim = new THREE.PointLight(PINK, 20 * intensity, 30);
  rim.position.set(3.5, -2.5, 3);
  scene.add(rim);
}

function std(
  color: number,
  opts: Partial<THREE.MeshStandardMaterialParameters> = {},
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: 0.65,
    roughness: 0.32,
    ...opts,
  });
}

/** Small drifting dust points shared by the card scenes. */
function dust(
  count: number,
  spread: number,
  color: number,
): THREE.Points {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * spread * 2;
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 1.2;
    pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    color,
    size: 0.035,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const points = new THREE.Points(geo, mat);
  points.userData.base = (geo.getAttribute('position') as THREE.BufferAttribute).array.slice();
  return points;
}

function driftDust(points: THREE.Points, t: number): void {
  const attr = points.geometry.getAttribute('position') as THREE.BufferAttribute;
  const base = points.userData.base as Float32Array;
  const arr = attr.array as Float32Array;
  for (let i = 0; i < arr.length; i += 3) {
    arr[i] = base[i] + Math.sin(t * 0.25 + base[i + 1] * 2.1) * 0.08;
    arr[i + 1] = base[i + 1] + Math.cos(t * 0.2 + base[i] * 1.7) * 0.08;
  }
  attr.needsUpdate = true;
}

/** Smooth pointer parallax for a group (lerped so it never snaps). */
function parallax(
  group: THREE.Group,
  pointer: Pointer,
  amount: number,
  dt: number,
): void {
  const tx = pointer.x * amount;
  const ty = pointer.y * amount;
  group.rotation.x += (ty - group.rotation.x) * Math.min(1, dt * 3);
  group.rotation.y += (tx - group.rotation.y) * Math.min(1, dt * 3);
}

// ---------------------------------------------------------------------------
// Background particle field (full-screen, shader-driven, zero CPU per frame)
// ---------------------------------------------------------------------------

const BG_VERT = /* glsl */ `
  attribute float aSeed;
  attribute vec3 aColor;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPixelRatio;
  varying vec3 vColor;
  void main() {
    vec3 p = position;
    float s = aSeed;
    p.x += sin(uTime * 0.12 + s * 6.2831) * 0.6;
    p.y += cos(uTime * 0.10 + s * 6.2831) * 0.45;
    p.z += sin(uTime * 0.07 + s * 12.0) * 0.3;
    vec2 d = p.xy - uPointer;
    float dist = length(d);
    float push = smoothstep(3.0, 0.0, dist) * 1.4;
    p.xy += (d / max(dist, 0.001)) * push;
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (2.0 + aSeed * 2.6) * uPixelRatio * (10.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const BG_FRAG = /* glsl */ `
  varying vec3 vColor;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float a = smoothstep(0.5, 0.05, length(c));
    gl_FragColor = vec4(vColor, a * 0.85);
  }
`;

export const BG_COUNT = 5000;
export const BG_COUNT_LOW = 1200;

export function createBackgroundScene(): ViewScene {
  const scene = new THREE.Scene();
  const camera = makeCamera(8, 60);

  const positions = new Float32Array(BG_COUNT * 3);
  const seeds = new Float32Array(BG_COUNT);
  const colors = new Float32Array(BG_COUNT * 3);
  const palette = [new THREE.Color(CYAN), new THREE.Color(PINK), new THREE.Color(0xbfdbfe)];
  for (let i = 0; i < BG_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 28;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    seeds[i] = Math.random();
    const c = palette[Math.random() < 0.62 ? 0 : Math.random() < 0.55 ? 1 : 2];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.ShaderMaterial({
    vertexShader: BG_VERT,
    fragmentShader: BG_FRAG,
    uniforms: {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: 1 },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  scene.add(points);

  return {
    scene,
    camera,
    update(t, _dt, pointer, low) {
      mat.uniforms.uTime.value = t;
      mat.uniforms.uPointer.value.set(pointer.x * 14, pointer.y * 8);
      geo.setDrawRange(0, low ? BG_COUNT_LOW : BG_COUNT);
    },
    dispose() {
      disposeObject(scene);
    },
  };
}

// ---------------------------------------------------------------------------
// Hero: glass torus knot (AETHER style) + orbiting particles + glow shell
// ---------------------------------------------------------------------------

export function createHeroScene(low: boolean): ViewScene {
  const scene = new THREE.Scene();
  const camera = makeCamera(4.6, 42);

  // Gradient backdrop sphere — the glass refracts this (transmission target).
  const bgGeo = new THREE.SphereGeometry(30, 24, 16);
  const bgMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: /* glsl */ `
      varying vec3 vPos;
      void main() { vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vPos;
      void main() {
        vec3 d = normalize(vPos);
        float cyanBlob = pow(max(dot(d, normalize(vec3(-0.5, 0.6, 0.4))), 0.0), 3.0);
        float pinkBlob = pow(max(dot(d, normalize(vec3(0.6, -0.5, 0.3))), 0.0), 3.0);
        vec3 col = vec3(0.02, 0.02, 0.03) + vec3(0.0, 0.45, 0.55) * cyanBlob * 0.55 + vec3(0.55, 0.08, 0.3) * pinkBlob * 0.5;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  scene.add(new THREE.Mesh(bgGeo, bgMat));

  const group = new THREE.Group();
  scene.add(group);

  const knotGeo = new THREE.TorusKnotGeometry(1.02, 0.32, 260, 36);
  const knotMat = low
    ? std(0x0aa8c0, { metalness: 0.85, roughness: 0.28, emissive: 0x003a44, emissiveIntensity: 0.9 })
    : new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.08,
        transmission: 0.92,
        thickness: 1.4,
        ior: 1.45,
        iridescence: 0.7,
        iridescenceIOR: 1.3,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        attenuationColor: new THREE.Color(0x00e5ff),
        attenuationDistance: 2.5,
        specularIntensity: 1,
      });
  const knot = new THREE.Mesh(knotGeo, knotMat);
  group.add(knot);

  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.05, 1),
    new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.1 }),
  );
  group.add(shell);

  const orbit = dust(low ? 200 : 700, 2.4, CYAN);
  group.add(orbit);

  addLights(scene, 1.2);
  const inner = new THREE.PointLight(0xffffff, 6, 8);
  inner.position.set(0, 0, 0);
  scene.add(inner);

  return {
    scene,
    camera,
    update(t, dt, pointer) {
      knot.rotation.x = t * 0.16;
      knot.rotation.y = t * 0.22;
      shell.rotation.x = -t * 0.05;
      shell.rotation.y = t * 0.07;
      orbit.rotation.y = t * 0.03;
      driftDust(orbit, t);
      parallax(group, pointer, 0.28, dt);
    },
    dispose() {
      disposeObject(scene);
    },
  };
}

// ---------------------------------------------------------------------------
// Card mini-scenes (one live 3D diagram per project visualType)
// ---------------------------------------------------------------------------

function cardBase(low: boolean): {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  group: THREE.Group;
  dustPoints: THREE.Points;
} {
  const scene = new THREE.Scene();
  const camera = makeCamera(5.2, 42);
  const group = new THREE.Group();
  scene.add(group);
  addLights(scene, 1);
  const dustPoints = dust(low ? 80 : 170, 2.6, CYAN);
  group.add(dustPoints);
  return { scene, camera, group, dustPoints };
}

function finishCard(
  base: ReturnType<typeof cardBase>,
  animate: (t: number, dt: number, pointer: Pointer) => void,
): ViewScene {
  const { scene, camera, group, dustPoints } = base;
  return {
    scene,
    camera,
    update(t, dt, pointer) {
      driftDust(dustPoints, t);
      parallax(group, pointer, 0.22, dt);
      animate(t, dt, pointer);
    },
    dispose() {
      disposeObject(scene);
    },
  };
}

export function createCardScene(type: VisualType, low: boolean, large = false): ViewScene {
  const base = cardBase(low);
  const { group } = base;
  if (large) group.scale.setScalar(1.35);

  if (type === 'distributed') {
    // Post-quantum diamond: wireframe octahedron core + orbiting key nodes.
    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.85, 0),
      new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.85 }),
    );
    group.add(core);
    const inner = new THREE.Mesh(new THREE.OctahedronGeometry(0.45, 0), std(0x0aa8c0, { metalness: 0.9, roughness: 0.2, emissive: 0x003a44, emissiveIntensity: 1 }));
    group.add(inner);
    const nodeGeo = new THREE.SphereGeometry(0.11, 12, 12);
    const nodeMat = std(0xffffff, { metalness: 0.4, roughness: 0.3, emissive: CYAN, emissiveIntensity: 0.7 });
    const nodes: THREE.Mesh[] = [];
    const linePos: number[] = [];
    const verts: Array<[number, number, number]> = [
      [1.5, 0, 0], [-1.5, 0, 0], [0, 1.5, 0], [0, -1.5, 0], [0, 0, 1.1], [0, 0, -1.1],
    ];
    for (const [x, y, z] of verts) {
      const n = new THREE.Mesh(nodeGeo, nodeMat);
      n.position.set(x, y, z);
      group.add(n);
      nodes.push(n);
      linePos.push(0, 0, 0, x, y, z);
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePos), 3));
    group.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.45 })));
    return finishCard(base, (t) => {
      core.rotation.y = t * 0.5;
      core.rotation.x = t * 0.2;
      inner.rotation.y = -t * 0.7;
      nodes.forEach((n, i) => {
        const a = t * 0.4 + (i * Math.PI) / 3;
        n.position.y = Math.sin(a) * 0.25 + (verts[i][1] === 0 ? 0 : verts[i][1]);
      });
    });
  }

  if (type === 'compiler') {
    // 3D code editor: stacked glass slabs + floating cubes.
    const slabs: THREE.Mesh[] = [];
    [-0.4, 0, 0.4].forEach((z, i) => {
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(2.3, 1.45, 0.07),
        new THREE.MeshStandardMaterial({ color: 0x0b0b0e, metalness: 0.6, roughness: 0.35, transparent: true, opacity: 0.9 }),
      );
      slab.position.z = z;
      slab.rotation.y = (i - 1) * 0.1;
      group.add(slab);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(slab.geometry),
        new THREE.LineBasicMaterial({ color: i === 1 ? CYAN : 0x3f3f46 }),
      );
      edges.position.copy(slab.position);
      edges.rotation.copy(slab.rotation);
      group.add(edges);
      slabs.push(slab);
    });
    const cubes: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const c = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), std(i === 1 ? PINK : CYAN, { emissive: i === 1 ? PINK : CYAN, emissiveIntensity: 0.6 }));
      group.add(c);
      cubes.push(c);
    }
    return finishCard(base, (t) => {
      cubes.forEach((c, i) => {
        const a = t * 0.5 + (i * Math.PI * 2) / 3;
        c.position.set(Math.cos(a) * 1.5, Math.sin(a * 1.3) * 0.7, Math.sin(a) * 0.8);
        c.rotation.x = t * 0.8 + i;
        c.rotation.y = t * 0.6;
      });
      slabs[1].position.y = Math.sin(t * 0.8) * 0.05;
    });
  }

  if (type === 'persian-nlp') {
    // Concentric 3D rings (Quran pages 1..604 as orbital rings).
    const rings: THREE.Mesh[] = [];
    const specs: Array<[number, number, number, number]> = [
      [1.25, 0.035, CYAN, 0.9],
      [0.95, 0.03, PINK, 0.7],
      [0.62, 0.025, WHITE, 0.8],
    ];
    specs.forEach(([r, tube, color]) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, tube, 12, 90),
        std(color, { metalness: 0.7, roughness: 0.3, emissive: color, emissiveIntensity: 0.55 }),
      );
      group.add(ring);
      rings.push(ring);
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 24), std(0xffffff, { emissive: CYAN, emissiveIntensity: 1.2, metalness: 0.3, roughness: 0.2 }));
    group.add(core);
    rings[0].rotation.x = Math.PI / 2.6;
    rings[1].rotation.x = Math.PI / 3.4;
    rings[1].rotation.y = 0.5;
    rings[2].rotation.x = Math.PI / 2.2;
    rings[2].rotation.y = -0.6;
    return finishCard(base, (t) => {
      rings[0].rotation.z = t * 0.35;
      rings[1].rotation.z = -t * 0.5;
      rings[2].rotation.z = t * 0.65;
      const s = 1 + Math.sin(t * 1.6) * 0.08;
      core.scale.setScalar(s);
    });
  }

  if (type === 'vector') {
    // CLIENT -> VPN TUNNEL -> CA NODE, live in 3D with flowing pulses.
    const sphere = (x: number, r: number, color: number) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(r, 24, 24),
        std(color, { metalness: 0.6, roughness: 0.25, emissive: color, emissiveIntensity: 0.5 }),
      );
      m.position.set(x, 0, 0);
      group.add(m);
      return m;
    };
    sphere(-1.35, 0.3, 0xe4e4e7);
    sphere(0, 0.46, CYAN);
    sphere(1.35, 0.3, BLUE);
    const tube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 2.7, 12),
      new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.75 }),
    );
    tube.rotation.z = Math.PI / 2;
    group.add(tube);
    const arcMat = new THREE.LineBasicMaterial({ color: 0x52525b, transparent: true, opacity: 0.6 });
    const mkArc = (sign: number) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 24; i++) {
        const a = (i / 24) * Math.PI;
        pts.push(new THREE.Vector3(-1.35 + (2.7 * i) / 24, sign * Math.sin(a) * 0.85, 0));
      }
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      group.add(new THREE.Line(g, arcMat));
    };
    mkArc(1);
    mkArc(-1);
    const pulses: THREE.Mesh[] = [];
    for (let i = 0; i < 2; i++) {
      const p = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 12, 12),
        new THREE.MeshBasicMaterial({ color: PINK }),
      );
      group.add(p);
      pulses.push(p);
    }
    return finishCard(base, (t) => {
      pulses.forEach((p, i) => {
        const ph = ((t * 0.45 + i * 0.5) % 1) * 2 - 1;
        p.position.set(ph * 1.35, 0, 0);
        const s = 1 + Math.sin(t * 6 + i * 3) * 0.25;
        p.scale.setScalar(s);
      });
    });
  }

  if (type === 'edge-kv') {
    // 3D CI/CD bar chart with a live trend line.
    const heights = [0.5, 0.95, 0.7, 1.35, 1.05, 1.55];
    const bars: THREE.Mesh[] = [];
    heights.forEach((h, i) => {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, h, 0.34),
        std(i % 2 === 0 ? CYAN : 0x0aa8c0, { metalness: 0.6, roughness: 0.3, emissive: CYAN, emissiveIntensity: 0.25 }),
      );
      bar.position.set(-1.35 + i * 0.54, h / 2 - 0.75, 0);
      bar.userData.baseH = h;
      group.add(bar);
      bars.push(bar);
    });
    const linePts = heights.map((h, i) => new THREE.Vector3(-1.35 + i * 0.54, h - 0.75 + 0.28, 0.1));
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePts);
    group.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: PINK })));
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), new THREE.MeshBasicMaterial({ color: WHITE }));
    tip.position.copy(linePts[linePts.length - 1]);
    group.add(tip);
    return finishCard(base, (t) => {
      bars.forEach((bar, i) => {
        const s = 0.85 + 0.15 * Math.sin(t * 1.4 + i * 1.1);
        bar.scale.y = s;
        bar.position.y = (bar.userData.baseH as number) * s / 2 - 0.75;
      });
    });
  }

  // wasm-audio: live 3D audio waveform.
  const N = 90;
  const waveGeo = new THREE.BufferGeometry();
  const wavePos = new Float32Array(N * 3);
  waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePos, 3));
  const wave = new THREE.Line(
    waveGeo,
    new THREE.LineBasicMaterial({ color: PINK, transparent: true, opacity: 0.95 }),
  );
  group.add(wave);
  const bars: THREE.Mesh[] = [];
  for (let i = 0; i < 26; i++) {
    const b = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 1, 0.07),
      std(i % 3 === 0 ? PINK : CYAN, { emissive: i % 3 === 0 ? PINK : CYAN, emissiveIntensity: 0.4 }),
    );
    b.position.set(-1.6 + (3.2 * i) / 25, 0, 0);
    group.add(b);
    bars.push(b);
  }
  return finishCard(base, (t) => {
    const arr = waveGeo.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < N; i++) {
      const x = -1.6 + (3.2 * i) / (N - 1);
      const y = Math.sin(x * 4 + t * 2.2) * 0.5 * Math.cos(x * 0.8);
      arr.setXYZ(i, x, y, Math.sin(x * 2 + t) * 0.15);
    }
    arr.needsUpdate = true;
    bars.forEach((b, i) => {
      const x = -1.6 + (3.2 * i) / 25;
      const h = 0.15 + Math.abs(Math.sin(x * 4 + t * 2.2)) * 0.9;
      b.scale.y = h;
      b.position.y = 0;
    });
  });
}

// ---------------------------------------------------------------------------
// Skill cards: small 3D objects per domain
// ---------------------------------------------------------------------------

export function createSkillScene(domain: SkillDomain, low: boolean): ViewScene {
  const scene = new THREE.Scene();
  const camera = makeCamera(4.6, 42);
  const group = new THREE.Group();
  scene.add(group);
  addLights(scene, 1);
  const dustPoints = dust(low ? 60 : 130, 2.2, CYAN);
  group.add(dustPoints);

  if (domain === 'android') {
    // Phone slab with glowing screen + orbit ring.
    const phone = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.85, 0.12), std(0x18181b, { metalness: 0.7, roughness: 0.3 }));
    group.add(phone);
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.86, 1.6),
      new THREE.MeshBasicMaterial({ color: 0x06222a }),
    );
    screen.position.z = 0.07;
    group.add(screen);
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(0.86, 0.5),
      new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.5 }),
    );
    glow.position.set(0, 0.45, 0.075);
    group.add(glow);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.45, 0.025, 10, 80),
      new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.55 }),
    );
    ring.rotation.x = Math.PI / 2.4;
    group.add(ring);
    return {
      scene, camera,
      update(t, dt, pointer) {
        driftDust(dustPoints, t);
        parallax(group, pointer, 0.25, dt);
        phone.rotation.y = Math.sin(t * 0.4) * 0.18;
        ring.rotation.z = t * 0.4;
      },
      dispose() { disposeObject(scene); },
    };
  }

  if (domain === 'crypto') {
    // Diamond: solid octahedron + pink wireframe shell.
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.95, 0), std(CYAN, { metalness: 0.9, roughness: 0.15, emissive: 0x003a44, emissiveIntensity: 1 }));
    group.add(gem);
    const shell = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.3, 0),
      new THREE.MeshBasicMaterial({ color: PINK, wireframe: true, transparent: true, opacity: 0.5 }),
    );
    group.add(shell);
    return {
      scene, camera,
      update(t, dt, pointer) {
        driftDust(dustPoints, t);
        parallax(group, pointer, 0.25, dt);
        gem.rotation.y = t * 0.6;
        shell.rotation.y = -t * 0.35;
        shell.rotation.x = t * 0.2;
      },
      dispose() { disposeObject(scene); },
    };
  }

  // ai: neural network — 3 layers of nodes + connections.
  const nodeGeo = new THREE.SphereGeometry(0.13, 14, 14);
  const layers: Array<Array<[number, number]>> = [
    [[-0.95, 0.7], [-0.95, 0], [-0.95, -0.7]],
    [[0, 0.95], [0, 0.32], [0, -0.32], [0, -0.95]],
    [[0.95, 0.7], [0.95, 0], [0.95, -0.7]],
  ];
  const nodeMat = std(0xffffff, { emissive: CYAN, emissiveIntensity: 0.9, metalness: 0.4, roughness: 0.3 });
  const pinkMat = std(0xffffff, { emissive: PINK, emissiveIntensity: 0.9, metalness: 0.4, roughness: 0.3 });
  const linePts: number[] = [];
  layers.forEach((layer, li) => {
    layer.forEach(([x, y], ni) => {
      const n = new THREE.Mesh(nodeGeo, (li + ni) % 3 === 0 ? pinkMat : nodeMat);
      n.position.set(x, y, 0);
      group.add(n);
      if (li < layers.length - 1) {
        layers[li + 1].forEach(([nx, ny]) => {
          linePts.push(x, y, 0, nx, ny, 0);
        });
      }
    });
  });
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePts), 3));
  group.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.4 })));
  return {
    scene, camera,
    update(t, dt, pointer) {
      driftDust(dustPoints, t);
      parallax(group, pointer, 0.25, dt);
      group.rotation.z = Math.sin(t * 0.25) * 0.06;
    },
    dispose() { disposeObject(scene); },
  };
}
