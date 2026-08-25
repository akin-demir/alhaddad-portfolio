import * as THREE from 'three';

/**
 * Each artifact is a self-contained Group with an `update(p, t)` where
 * `p` is 0..1 section scroll progress and `t` is elapsed seconds.
 *
 * Everything here is procedural — points, lines, and planes. No loaded models,
 * no textures, no fabricated readable content. Keeps the payload to Three's
 * core and keeps the visuals abstract, which is what the brief asks for.
 */
export interface Artifact {
  group: THREE.Group;
  update(p: number, t: number): void;
  dispose(): void;
}

const CYAN = new THREE.Color('#4ec5da');
const ICE = new THREE.Color('#9fd8e3');
const VIOLET = new THREE.Color('#8b6fd4');
const AMBER = new THREE.Color('#d98a4a');

/** Deterministic PRNG so the layout is identical on every load. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const ease = (x: number) => 1 - Math.pow(1 - x, 3);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
/** Ramp from 0..1 across the window [a,b] of a progress value. */
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

function disposeGroup(g: THREE.Group) {
  g.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.geometry) m.geometry.dispose();
    const mat = m.material as THREE.Material | THREE.Material[] | undefined;
    if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
    else mat?.dispose();
  });
}

function pointsMaterial(color: THREE.Color, size: number) {
  return new THREE.PointsMaterial({
    color,
    size,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

function lineMaterial(color: THREE.Color, opacity = 0.35) {
  return new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    // stored so we can scale the target opacity per-artifact
    userData: { max: opacity },
  } as THREE.LineBasicMaterialParameters);
}

/* ---------------------------------------------------------------------------
 * Knowledge graph — a compact seed unfolds into clustered nodes and relations.
 * ------------------------------------------------------------------------- */
export function knowledgeGraph(): Artifact {
  const group = new THREE.Group();
  const N = 90;
  const rand = rng(7);

  // Three clusters, so the result reads as entities resolving into groups
  const centres = [
    new THREE.Vector3(-1.5, 0.6, 0),
    new THREE.Vector3(1.4, -0.3, -0.6),
    new THREE.Vector3(0.1, 1.5, 0.7),
  ];

  const start = new Float32Array(N * 3);
  const end = new Float32Array(N * 3);
  const cluster: number[] = [];

  for (let i = 0; i < N; i++) {
    // start: tight crystalline seed
    const a = rand() * Math.PI * 2;
    const b = Math.acos(2 * rand() - 1);
    const r = 0.12 + rand() * 0.06;
    start[i * 3] = r * Math.sin(b) * Math.cos(a);
    start[i * 3 + 1] = r * Math.sin(b) * Math.sin(a);
    start[i * 3 + 2] = r * Math.cos(b);

    const ci = Math.floor(rand() * centres.length);
    cluster.push(ci);
    const c = centres[ci];
    const spread = 0.75;
    end[i * 3] = c.x + (rand() - 0.5) * spread * 2;
    end[i * 3 + 1] = c.y + (rand() - 0.5) * spread * 2;
    end[i * 3 + 2] = c.z + (rand() - 0.5) * spread * 2;
  }

  const pos = new Float32Array(start);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = pointsMaterial(ICE, 0.055);
  const points = new THREE.Points(geo, mat);
  group.add(points);

  // Edges: mostly intra-cluster, a few bridges between clusters
  const pairs: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    for (let k = 0; k < 2; k++) {
      const j = Math.floor(rand() * N);
      if (j !== i && (cluster[i] === cluster[j] || rand() < 0.12)) pairs.push([i, j]);
    }
  }
  const linePos = new Float32Array(pairs.length * 6);
  const lgeo = new THREE.BufferGeometry();
  lgeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
  const lmat = lineMaterial(CYAN, 0.22);
  const lines = new THREE.LineSegments(lgeo, lmat);
  group.add(lines);

  return {
    group,
    update(p, t) {
      const unfold = ease(seg(p, 0.05, 0.75));
      for (let i = 0; i < N; i++) {
        for (let a = 0; a < 3; a++) {
          const idx = i * 3 + a;
          pos[idx] = start[idx] + (end[idx] - start[idx]) * unfold;
        }
      }
      geo.attributes.position.needsUpdate = true;

      pairs.forEach(([i, j], k) => {
        linePos[k * 6] = pos[i * 3];
        linePos[k * 6 + 1] = pos[i * 3 + 1];
        linePos[k * 6 + 2] = pos[i * 3 + 2];
        linePos[k * 6 + 3] = pos[j * 3];
        linePos[k * 6 + 4] = pos[j * 3 + 1];
        linePos[k * 6 + 5] = pos[j * 3 + 2];
      });
      lgeo.attributes.position.needsUpdate = true;

      mat.opacity = 0.9;
      lmat.opacity = 0.22 * unfold;
      group.rotation.y = t * 0.06 + unfold * 0.4;
      group.scale.setScalar(0.9 + unfold * 0.25);
    },
    dispose: () => disposeGroup(group),
  };
}

/* ---------------------------------------------------------------------------
 * Document intelligence — sheets fan out, a scan pass sweeps, structure emerges.
 * ------------------------------------------------------------------------- */
export function documents(): Artifact {
  const group = new THREE.Group();
  const SHEETS = 5;
  const sheets: THREE.Mesh[] = [];
  const rand = rng(21);

  for (let i = 0; i < SHEETS; i++) {
    const g = new THREE.PlaneGeometry(1.25, 1.7, 1, 1);
    const m = new THREE.MeshBasicMaterial({
      color: 0x1b2630,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(g, m);
    mesh.userData.rot = (rand() - 0.5) * 0.25;
    mesh.userData.off = new THREE.Vector3((rand() - 0.5) * 0.4, (rand() - 0.5) * 0.3, 0);
    sheets.push(mesh);
    group.add(mesh);

    // Abstract "content" — short line segments, never readable text
    const rows = 9;
    const lp: number[] = [];
    for (let r = 0; r < rows; r++) {
      const y = 0.7 - r * 0.16;
      const w = 0.35 + rand() * 0.5;
      lp.push(-0.5, y, 0.001, -0.5 + w, y, 0.001);
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3));
    const lm = lineMaterial(ICE, 0.5);
    const ln = new THREE.LineSegments(lg, lm);
    mesh.add(ln);
    mesh.userData.lines = lm;
  }

  // Scanning bar
  const scanGeo = new THREE.PlaneGeometry(1.7, 0.03);
  const scanMat = new THREE.MeshBasicMaterial({
    color: CYAN,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const scan = new THREE.Mesh(scanGeo, scanMat);
  group.add(scan);

  // Structured blocks that resolve after the scan
  const blocks: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const g = new THREE.PlaneGeometry(0.5, 0.14);
    const m = new THREE.MeshBasicMaterial({
      color: AMBER,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const b = new THREE.Mesh(g, m);
    b.position.set(0.95, 0.5 - i * 0.28, 0.2);
    blocks.push(b);
    group.add(b);
  }

  return {
    group,
    update(p, t) {
      const fan = ease(seg(p, 0.05, 0.45));
      sheets.forEach((s, i) => {
        const m = s.material as THREE.MeshBasicMaterial;
        m.opacity = 0.55 * fan;
        (s.userData.lines as THREE.LineBasicMaterial).opacity = 0.28 * fan;
        const spread = (i - (SHEETS - 1) / 2) * 0.34 * fan;
        s.position.set(
          spread + s.userData.off.x * fan,
          s.userData.off.y * fan,
          -i * 0.05,
        );
        s.rotation.z = s.userData.rot * fan;
        s.rotation.y = -0.35 * fan;
      });

      const sweep = seg(p, 0.4, 0.75);
      scanMat.opacity = sweep > 0 && sweep < 1 ? 0.75 : 0;
      scan.position.set(0, 1.0 - sweep * 2.0, 0.35);

      const resolved = ease(seg(p, 0.62, 0.95));
      blocks.forEach((b, i) => {
        const bm = b.material as THREE.MeshBasicMaterial;
        const d = clamp01((resolved - i * 0.12) / 0.5);
        bm.opacity = 0.7 * d;
        b.scale.x = 0.4 + d * 0.6;
      });

      group.rotation.y = Math.sin(t * 0.15) * 0.08;
    },
    dispose: () => disposeGroup(group),
  };
}

/* ---------------------------------------------------------------------------
 * Semantic similarity — unordered tokens reorganise by spatial proximity.
 * ------------------------------------------------------------------------- */
export function semantic(): Artifact {
  const group = new THREE.Group();
  const N = 120;
  const rand = rng(43);

  // Five reference anchors; tokens migrate to their nearest anchor
  const anchors = Array.from({ length: 5 }, (_, i) => {
    const a = (i / 5) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(a) * 1.35, Math.sin(a) * 1.0, Math.sin(a * 2) * 0.4);
  });

  const start = new Float32Array(N * 3);
  const end = new Float32Array(N * 3);
  const owner: number[] = [];

  for (let i = 0; i < N; i++) {
    start[i * 3] = (rand() - 0.5) * 3.4;
    start[i * 3 + 1] = (rand() - 0.5) * 2.6;
    start[i * 3 + 2] = (rand() - 0.5) * 1.6;

    // weight one anchor more heavily so a dominant cluster emerges
    const ai = rand() < 0.34 ? 0 : Math.floor(rand() * anchors.length);
    owner.push(ai);
    const a = anchors[ai];
    const tight = ai === 0 ? 0.34 : 0.46;
    end[i * 3] = a.x + (rand() - 0.5) * tight;
    end[i * 3 + 1] = a.y + (rand() - 0.5) * tight;
    end[i * 3 + 2] = a.z + (rand() - 0.5) * tight;
  }

  const pos = new Float32Array(start);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

  const colors = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const c = owner[i] === 0 ? AMBER : owner[i] % 2 ? CYAN : VIOLET;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  group.add(new THREE.Points(geo, mat));

  // The similarity field emanating from the reference point
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.2, 0.22, 64),
    new THREE.MeshBasicMaterial({
      color: AMBER,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  group.add(ring);

  return {
    group,
    update(p, t) {
      const settle = ease(seg(p, 0.15, 0.85));
      for (let i = 0; i < N; i++) {
        // staggered so clusters form progressively, not all at once
        const d = clamp01((settle - (i / N) * 0.25) / 0.75);
        for (let a = 0; a < 3; a++) {
          const idx = i * 3 + a;
          pos[idx] = start[idx] + (end[idx] - start[idx]) * ease(d);
        }
      }
      geo.attributes.position.needsUpdate = true;
      mat.opacity = 0.85;

      const rm = ring.material as THREE.MeshBasicMaterial;
      const pulse = seg(p, 0.1, 0.5);
      rm.opacity = 0.5 * pulse * (1 - seg(p, 0.6, 0.9));
      const s = 0.4 + pulse * 5.5;
      ring.scale.setScalar(s);
      ring.position.copy(anchors[0]);
      ring.lookAt(0, 0, 4);

      group.rotation.y = t * 0.05;
    },
    dispose: () => disposeGroup(group),
  };
}

/* ---------------------------------------------------------------------------
 * Vision — a scan plane crosses a roadway; one anomalous object gets tracked.
 * ------------------------------------------------------------------------- */
export function vision(): Artifact {
  const group = new THREE.Group();
  const rand = rng(91);

  // Tunnel geometry, extremely faint
  const tunnel = new THREE.Mesh(
    new THREE.CylinderGeometry(2.2, 2.2, 9, 24, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0x2a3a45,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
      wireframe: true,
    }),
  );
  tunnel.rotation.z = Math.PI / 2;
  tunnel.position.z = -2;
  group.add(tunnel);

  // Vehicle silhouettes
  const cars: THREE.Mesh[] = [];
  for (let i = 0; i < 7; i++) {
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.24, 0.28),
      new THREE.MeshBasicMaterial({ color: 0x8fb3c4, transparent: true, opacity: 0 }),
    );
    box.userData.lane = (i % 3) - 1;
    box.userData.speed = 0.55 + rand() * 0.5;
    box.userData.z0 = rand() * 8;
    box.userData.stopped = i === 3; // the anomaly
    cars.push(box);
    group.add(box);
  }

  // Tracking outline on the stopped vehicle
  const track = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(0.78, 0.5, 0.55)),
    new THREE.LineBasicMaterial({ color: AMBER, transparent: true, opacity: 0 }),
  );
  group.add(track);

  // Scan plane
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(4.4, 2.6),
    new THREE.MeshBasicMaterial({
      color: CYAN,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  group.add(plane);

  return {
    group,
    update(p, t) {
      const on = ease(seg(p, 0.05, 0.4));
      (tunnel.material as THREE.MeshBasicMaterial).opacity = 0.14 * on;

      cars.forEach((c) => {
        const m = c.material as THREE.MeshBasicMaterial;
        m.opacity = 0.5 * on;
        const z = c.userData.stopped
          ? 0.6
          : ((c.userData.z0 + t * c.userData.speed) % 9) - 4.5;
        c.position.set(z, c.userData.lane * 0.55 - 0.3, 0);
      });

      const found = seg(p, 0.5, 0.7);
      const tm = track.material as THREE.LineBasicMaterial;
      tm.opacity = 0.85 * found;
      track.position.copy(cars[3].position);
      track.scale.setScalar(1 + (1 - found) * 0.5);

      const sweep = seg(p, 0.25, 0.65);
      const pm = plane.material as THREE.MeshBasicMaterial;
      pm.opacity = sweep > 0 && sweep < 1 ? 0.12 : 0;
      plane.rotation.y = Math.PI / 2;
      plane.position.x = -4.5 + sweep * 9;

      group.rotation.y = -0.25;
      group.rotation.x = 0.12;
    },
    dispose: () => disposeGroup(group),
  };
}

/* ---------------------------------------------------------------------------
 * Production stack — a model core, then the system that keeps it alive.
 * ------------------------------------------------------------------------- */
export function stack(): Artifact {
  const group = new THREE.Group();
  const LAYERS = 7; // Model, Service, Queue, Retry, Evaluation, Storage, Production
  const nodes: THREE.Mesh[] = [];

  for (let i = 0; i < LAYERS; i++) {
    const isCore = i === 0;
    const geo = isCore
      ? new THREE.IcosahedronGeometry(0.3, 1)
      : new THREE.BoxGeometry(0.9, 0.16, 0.5);
    const mat = new THREE.MeshBasicMaterial({
      color: isCore ? AMBER : 0x5f8ea0,
      transparent: true,
      opacity: 0,
      wireframe: true,
    });
    const n = new THREE.Mesh(geo, mat);
    n.position.y = 1.6 - i * 0.55;
    nodes.push(n);
    group.add(n);
  }

  const linkPos = new Float32Array((LAYERS - 1) * 6);
  const lgeo = new THREE.BufferGeometry();
  lgeo.setAttribute('position', new THREE.BufferAttribute(linkPos, 3));
  const lmat = lineMaterial(CYAN, 0.4);
  group.add(new THREE.LineSegments(lgeo, lmat));

  return {
    group,
    update(p, t) {
      // Core appears alone first — the point being that the model is one part
      const core = ease(seg(p, 0.02, 0.2));
      (nodes[0].material as THREE.MeshBasicMaterial).opacity = 0.9 * core;
      nodes[0].rotation.x = t * 0.3;
      nodes[0].rotation.y = t * 0.22;

      const build = seg(p, 0.22, 0.9);
      for (let i = 1; i < LAYERS; i++) {
        const d = ease(clamp01((build - ((i - 1) / (LAYERS - 1)) * 0.8) / 0.35));
        const m = nodes[i].material as THREE.MeshBasicMaterial;
        m.opacity = 0.55 * d;
        nodes[i].scale.setScalar(0.6 + d * 0.4);
      }

      for (let i = 0; i < LAYERS - 1; i++) {
        linkPos[i * 6] = 0;
        linkPos[i * 6 + 1] = nodes[i].position.y - 0.2;
        linkPos[i * 6 + 2] = 0;
        linkPos[i * 6 + 3] = 0;
        linkPos[i * 6 + 4] = nodes[i + 1].position.y + 0.1;
        linkPos[i * 6 + 5] = 0;
      }
      lgeo.attributes.position.needsUpdate = true;
      lmat.opacity = 0.3 * build;

      group.rotation.y = Math.sin(t * 0.12) * 0.25;
      group.position.y = -0.2;
    },
    dispose: () => disposeGroup(group),
  };
}

/* ---------------------------------------------------------------------------
 * Convergence — every prior motif drifts together into one system.
 * ------------------------------------------------------------------------- */
export function converge(): Artifact {
  const group = new THREE.Group();
  const N = 200;
  const rand = rng(133);

  const start = new Float32Array(N * 3);
  const end = new Float32Array(N * 3);
  const colors = new Float32Array(N * 3);

  for (let i = 0; i < N; i++) {
    start[i * 3] = (rand() - 0.5) * 6;
    start[i * 3 + 1] = (rand() - 0.5) * 4;
    start[i * 3 + 2] = (rand() - 0.5) * 3;

    // converge onto a sphere shell — one coherent object
    const a = rand() * Math.PI * 2;
    const b = Math.acos(2 * rand() - 1);
    const r = 1.15;
    end[i * 3] = r * Math.sin(b) * Math.cos(a);
    end[i * 3 + 1] = r * Math.sin(b) * Math.sin(a);
    end[i * 3 + 2] = r * Math.cos(b);

    const c = i % 3 === 0 ? AMBER : i % 3 === 1 ? CYAN : VIOLET;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const pos = new Float32Array(start);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  group.add(new THREE.Points(geo, mat));

  return {
    group,
    update(p, t) {
      const c = ease(seg(p, 0.0, 0.7));
      for (let i = 0; i < N; i++) {
        for (let a = 0; a < 3; a++) {
          const idx = i * 3 + a;
          pos[idx] = start[idx] + (end[idx] - start[idx]) * c;
        }
      }
      geo.attributes.position.needsUpdate = true;
      // fades out at the very end so attention returns to the contact links
      mat.opacity = 0.8 * (1 - seg(p, 0.82, 1));
      group.rotation.y = t * 0.08;
      group.rotation.x = Math.sin(t * 0.1) * 0.15;
    },
    dispose: () => disposeGroup(group),
  };
}

export const REGISTRY: Record<string, () => Artifact> = {
  graph: knowledgeGraph,
  documents,
  semantic,
  vision,
  stack,
  converge,
};
