import * as THREE from 'three';
import { REGISTRY, type Artifact } from './artifacts';

/**
 * Fixed WebGL layer sitting behind the DOM.
 *
 * Sections opt in with `data-scene="<name>"`. Their scroll progress drives the
 * matching artifact; only the nearest-to-centre section renders at a time, so
 * cost stays flat regardless of how many sections exist.
 *
 * The DOM is the source of truth for all content — this layer is decoration and
 * never gates information. If WebGL is unavailable, or the visitor prefers
 * reduced motion, nothing here runs and the page is unchanged.
 */

interface Slot {
  el: HTMLElement;
  name: string;
  artifact: Artifact | null;
}

export function initScene(canvas: HTMLCanvasElement) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return () => {};

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
      failIfMajorPerformanceCaveat: true,
    });
  } catch {
    return () => {}; // no WebGL — page stays exactly as it is
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 5.2);

  const root = new THREE.Group();
  scene.add(root);

  const isNarrow = () => innerWidth < 900;

  const resize = () => {
    const w = innerWidth;
    const h = innerHeight;
    renderer.setSize(w, h, false);
    // cap DPR — the artifacts are additive points, extra pixels buy nothing
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    // On desktop the artifact sits in the right-hand negative space, clear of
    // the text column. On narrow screens it centres and shrinks behind content.
    if (isNarrow()) {
      root.position.set(0, 0.2, -1.2);
      root.scale.setScalar(0.72);
    } else {
      root.position.set(1.75, 0, 0);
      root.scale.setScalar(1);
    }
  };
  resize();

  const slots: Slot[] = Array.from(
    document.querySelectorAll<HTMLElement>('[data-scene]'),
  )
    .map((el) => ({ el, name: el.dataset.scene!, artifact: null }))
    .filter((s) => s.name in REGISTRY);

  if (!slots.length) {
    renderer.dispose();
    return () => {};
  }

  let active: Slot | null = null;
  let fade = 0; // 0..1 opacity envelope for the active artifact
  const clock = new THREE.Clock();
  let raf = 0;
  let visible = true;

  /** Progress of an element through the viewport, 0 entering to 1 leaving. */
  function progressOf(el: HTMLElement) {
    const r = el.getBoundingClientRect();
    const total = r.height + innerHeight;
    return Math.min(1, Math.max(0, (innerHeight - r.top) / total));
  }

  function pickActive(): Slot | null {
    let best: Slot | null = null;
    let bestDist = Infinity;
    const mid = innerHeight / 2;
    for (const s of slots) {
      const r = s.el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) continue;
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestDist) {
        bestDist = d;
        best = s;
      }
    }
    return best;
  }

  function setActive(next: Slot | null) {
    if (active === next) return;
    // free the outgoing artifact — only one lives at a time
    if (active?.artifact) {
      root.remove(active.artifact.group);
      active.artifact.dispose();
      active.artifact = null;
    }
    active = next;
    if (active && !active.artifact) {
      active.artifact = REGISTRY[active.name]();
      root.add(active.artifact.group);
    }
    fade = 0;
  }

  function frame() {
    raf = requestAnimationFrame(frame);
    if (!visible) return;

    const next = pickActive();
    setActive(next);

    const t = clock.getElapsedTime();
    if (active?.artifact) {
      const p = progressOf(active.el);
      active.artifact.update(p, t);
      fade = Math.min(1, fade + 0.045);
      // ease the whole group in, so switching artifacts never pops
      active.artifact.group.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.Material | undefined;
        if (m && 'opacity' in m && m.transparent) {
          (m as THREE.Material & { opacity: number }).opacity *= fade;
        }
      });
    }

    renderer.render(scene, camera);
  }

  const onVisibility = () => {
    visible = document.visibilityState === 'visible';
  };

  addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', onVisibility);
    slots.forEach((s) => s.artifact?.dispose());
    renderer.dispose();
  };
}
