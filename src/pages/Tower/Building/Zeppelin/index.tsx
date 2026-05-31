import { useEffect, useRef } from 'react';
import spine from '@/vendor/spine-webgl/spine-webgl.js';

import workersAtlas from '../assets/zeppelin/zeppelin_workers.atlas?raw';
import workersJson from '../assets/zeppelin/zeppelin_workers.json';
import workersPng from '../assets/zeppelin/zeppelin_workers.png';
import tradeAtlas from '../assets/zeppelin/zeppelin_trade.atlas?raw';
import tradeJson from '../assets/zeppelin/zeppelin_trade.json';
import tradePng from '../assets/zeppelin/zeppelin_trade.png';
import aristAtlas from '../assets/zeppelin/zeppelin_arist.atlas?raw';
import aristJson from '../assets/zeppelin/zeppelin_arist.json';
import aristPng from '../assets/zeppelin/zeppelin_arist.png';
import mithAtlas from '../assets/zeppelin/zeppelin_mith.atlas?raw';
import mithJson from '../assets/zeppelin/zeppelin_mith.json';
import mithPng from '../assets/zeppelin/zeppelin_mith.png';

import type { VisitPhase } from '@game/factions/useFactionVisit';

type ZeppelinAsset = { atlas: string; json: unknown; png: string };

const ZEPPELIN_ASSETS: Record<string, ZeppelinAsset> = {
  zeppelin_workers: { atlas: workersAtlas, json: workersJson, png: workersPng },
  zeppelin_trade: { atlas: tradeAtlas, json: tradeJson, png: tradePng },
  zeppelin_arist: { atlas: aristAtlas, json: aristJson, png: aristPng },
  zeppelin_mith: { atlas: mithAtlas, json: mithJson, png: mithPng },
};

// World region the camera frames. Centered on the dock so the docked pose sits
// at the canvas center, but wide/tall enough to contain the full start/end
// flight (start enters from x≈+1185, end exits to x≈-2060 and rises to y≈+399),
// so the zeppelin is never clipped by the canvas rectangle — only by the page edge.
const VIEW_CENTER_X = 18;
const VIEW_CENTER_Y = 67;
const VIEW_WIDTH = 5000;
const VIEW_HEIGHT = 1400;

type SpineEntry = {
  skeleton: { updateWorldTransform: () => void };
  state: {
    update: (d: number) => void;
    apply: (s: unknown) => void;
    setAnimation: (track: number, name: string, loop: boolean) => unknown;
    addAnimation: (track: number, name: string, loop: boolean, delay: number) => unknown;
  };
};

export interface ZeppelinProps {
  className?: string;
  /** Which faction's zeppelin to show on arrival. */
  zeppelinId: string;
  /** Current visit phase — drives arrival (docked) and departure (incoming). */
  phase: VisitPhase;
  /** Visual scale of the zeppelin within its canvas. */
  scale?: number;
}

export function Zeppelin({ className, zeppelinId, phase, scale = 1 }: ZeppelinProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Latest props for the async setup to read once assets finish loading.
  const propsRef = useRef({ zeppelinId, phase });
  propsRef.current = { zeppelinId, phase };
  // Controller exposed by the setup effect once everything is ready.
  const controllerRef = useRef<{ sync: (phase: VisitPhase, id: string) => void } | null>(null);

  // One-time WebGL + skeleton setup.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false }) ||
      canvas.getContext('experimental-webgl', { alpha: true })) as WebGLRenderingContext | null;
    if (!gl) return;

    let disposed = false;
    let raf = 0;

    const renderer = new spine.webgl.SceneRenderer(canvas, gl);
    const entries: Record<string, SpineEntry> = {};
    let shownId: string | null = null;
    let prevPhase: VisitPhase = 'incoming';
    let initialized = false;

    function buildEntry(id: string, image: HTMLImageElement) {
      const asset = ZEPPELIN_ASSETS[id];
      if (!asset) return;
      const texture = new spine.webgl.GLTexture(gl, image);
      const atlas = new spine.TextureAtlas(asset.atlas, () => texture);
      const atlasLoader = new spine.AtlasAttachmentLoader(atlas);
      const skeletonData = new spine.SkeletonJson(atlasLoader).readSkeletonData(asset.json);
      const skeleton = new spine.Skeleton(skeletonData);
      const stateData = new spine.AnimationStateData(skeletonData);
      // Smooth arrival into hover and hover into departure. end -> start is left
      // at 0 so the re-arrival snaps off-screen instead of streaking across.
      stateData.setMix('start', 'idle', 0.25);
      stateData.setMix('idle', 'end', 0.25);
      const state = new spine.AnimationState(stateData);
      entries[id] = { skeleton, state } as SpineEntry;
    }

    function sync(nextPhase: VisitPhase, id: string) {
      if (!initialized) {
        // First reconcile after (re)mount: establish steady state without
        // replaying the fly-in. If we're already docked, drop straight into
        // the hover loop so revisiting the Tower mid-dock keeps it parked.
        initialized = true;
        prevPhase = nextPhase;
        if (nextPhase === 'docked') {
          shownId = id;
          const entry = entries[id];
          if (entry) entry.state.setAnimation(0, 'idle', true);
        }
        return;
      }

      if (nextPhase === 'docked' && prevPhase !== 'docked') {
        // Arrival: fly in, then hover indefinitely.
        shownId = id;
        const entry = entries[id];
        if (entry) {
          entry.state.setAnimation(0, 'start', false);
          entry.state.addAnimation(0, 'idle', true, 0);
        }
      } else if (nextPhase !== 'docked' && prevPhase === 'docked') {
        // Departure: the currently shown zeppelin flies away.
        const departing = shownId ? entries[shownId] : null;
        if (departing) {
          departing.state.setAnimation(0, 'end', false);
        }
      }
      prevPhase = nextPhase;
    }

    // Preload every faction zeppelin texture, then start the loop.
    const ids = Object.keys(ZEPPELIN_ASSETS);
    let remaining = ids.length;
    for (const id of ids) {
      const image = new Image();
      image.onload = () => {
        if (disposed) return;
        buildEntry(id, image);
        remaining -= 1;
        if (remaining === 0) {
          controllerRef.current = { sync };
          // Reconcile with whatever phase we're in now.
          sync(propsRef.current.phase, propsRef.current.zeppelinId);
        }
      };
      image.src = ZEPPELIN_ASSETS[id]!.png;
    }

    let last = performance.now();
    const render = () => {
      if (disposed) return;
      const now = performance.now();
      const delta = (now - last) / 1000;
      last = now;

      const { width, height } = canvas;
      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const entry = shownId ? entries[shownId] : null;
      if (entry) {
        entry.state.update(delta);
        entry.state.apply(entry.skeleton);
        entry.skeleton.updateWorldTransform();

        const camera = renderer.camera;
        camera.position.x = VIEW_CENTER_X;
        camera.position.y = VIEW_CENTER_Y;
        camera.viewportWidth = VIEW_WIDTH / scale;
        camera.viewportHeight = VIEW_HEIGHT / scale;
        camera.update();

        renderer.begin();
        renderer.drawSkeleton(entry.skeleton, false);
        renderer.end();
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      controllerRef.current = null;
    };
  }, [scale]);

  // Drive arrival/departure from the visit phase.
  useEffect(() => {
    controllerRef.current?.sync(phase, zeppelinId);
  }, [phase, zeppelinId]);

  return <canvas ref={canvasRef} width={VIEW_WIDTH} height={VIEW_HEIGHT} className={className} />;
}
