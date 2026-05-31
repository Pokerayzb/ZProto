import { useEffect, useRef } from 'react';
import type { Application } from 'pixi.js';
import type { Spine } from '@esotericsoftware/spine-pixi-v8';

import { useGameStage } from '@engine/stage/useGameStage';
import { createSpine, loadSpineAsset } from '@engine/spine/loadSpine';
import { zeppelinSpine, zeppelinSpineKeys } from '@engine/spine/spineAssets';
import type { VisitPhase } from '@game/factions/useFactionVisit';

export interface ZeppelinProps {
  /** Which faction's zeppelin to show on arrival (matches `Faction.zeppelinId`). */
  zeppelinId: string;
  /** Current visit phase — drives arrival (docked) and departure (incoming). */
  phase: VisitPhase;
  /** Visual scale of the zeppelin in the world. */
  scale?: number;
  /** Dock anchor as a fraction of the viewport (0..1). */
  anchorX?: number;
  anchorY?: number;
  /** World z-index (relative to sky / tower / flag). */
  zIndex?: number;
}

type Controller = { sync: (phase: VisitPhase, id: string) => void };

/** Place the spine at the viewport dock anchor. */
function place(app: Application, spine: Spine, scale: number, ax: number, ay: number) {
  spine.position.set(app.screen.width * ax, app.screen.height * ay);
  spine.scale.set(scale);
}

/**
 * Faction zeppelin rendered into the shared Pixi world. Replaces the old
 * per-instance WebGL canvas: all four skeletons live in the one world context,
 * and the visit phase drives fly-in / hover / fly-out on the docked one.
 */
export function Zeppelin({
  zeppelinId,
  phase,
  scale = 1,
  anchorX = 0.5,
  anchorY = 0.42,
  zIndex = 0,
}: ZeppelinProps) {
  const stage = useGameStage();
  const controllerRef = useRef<Controller | null>(null);
  // Latest props for the async setup to read once skeletons finish loading.
  const propsRef = useRef({ zeppelinId, phase });
  propsRef.current = { zeppelinId, phase };

  // One-time setup: load every faction zeppelin into the world.
  useEffect(() => {
    if (!stage) return;
    const { app, world } = stage;

    let disposed = false;
    const entries: Record<string, Spine> = {};
    let shownId: string | null = null;
    let prevPhase: VisitPhase = 'incoming';
    let initialized = false;

    function showOnly(id: string | null) {
      for (const key of Object.keys(entries)) {
        const s = entries[key];
        if (s) s.visible = key === id;
      }
    }

    function sync(nextPhase: VisitPhase, id: string) {
      if (!initialized) {
        // First reconcile after (re)mount: establish steady state without
        // replaying the fly-in. If already docked, drop straight into hover.
        initialized = true;
        prevPhase = nextPhase;
        if (nextPhase === 'docked') {
          shownId = id;
          showOnly(id);
          entries[id]?.state.setAnimation(0, 'idle', true);
        } else {
          showOnly(null);
        }
        return;
      }

      if (nextPhase === 'docked' && prevPhase !== 'docked') {
        // Arrival: fly in, then hover indefinitely.
        shownId = id;
        showOnly(id);
        const entry = entries[id];
        if (entry) {
          entry.state.setAnimation(0, 'start', false);
          entry.state.addAnimation(0, 'idle', true, 0);
        }
      } else if (nextPhase !== 'docked' && prevPhase === 'docked') {
        // Departure: the currently shown (old) zeppelin flies away.
        const departing = shownId ? entries[shownId] : null;
        if (departing) departing.state.setAnimation(0, 'end', false);
      }
      prevPhase = nextPhase;
    }

    // Preload every faction zeppelin, then reconcile with the current phase.
    void Promise.all(
      zeppelinSpineKeys.map(async (id) => {
        const urls = zeppelinSpine[id];
        if (!urls) return;
        await loadSpineAsset(id, urls);
        if (disposed) return;
        const s = createSpine(id);
        s.zIndex = zIndex;
        s.visible = false;
        s.state.data.setMix('start', 'idle', 0.25);
        s.state.data.setMix('idle', 'end', 0.25);
        place(app, s, scale, anchorX, anchorY);
        world.addChild(s);
        entries[id] = s;
      }),
    ).then(() => {
      if (disposed) return;
      controllerRef.current = { sync };
      sync(propsRef.current.phase, propsRef.current.zeppelinId);
    });

    // Keep the dock anchor correct on viewport resize.
    const onResize = () => {
      for (const key of Object.keys(entries)) {
        const s = entries[key];
        if (s) place(app, s, scale, anchorX, anchorY);
      }
    };
    app.renderer.on('resize', onResize);

    return () => {
      disposed = true;
      app.renderer.off('resize', onResize);
      controllerRef.current = null;
      for (const key of Object.keys(entries)) {
        entries[key]?.destroy();
      }
    };
  }, [stage, scale, anchorX, anchorY, zIndex]);

  // Drive arrival/departure from the visit phase.
  useEffect(() => {
    controllerRef.current?.sync(phase, zeppelinId);
  }, [phase, zeppelinId]);

  return null;
}
