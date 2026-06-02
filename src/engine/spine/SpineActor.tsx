import { useEffect, useState } from 'react';
import type { Spine } from '@esotericsoftware/spine-pixi-v8';

import { useGameStage } from '@engine/stage/useGameStage';
import { createSpine, loadSpineAsset, type SpineAssetUrls } from './loadSpine';

export type SpineActorProps = {
  /** Stable cache key for this Spine export (e.g. "flag", "zeppelin_workers"). */
  assetKey: string;
  urls: SpineAssetUrls;
  /** Position in world coordinates. */
  x: number;
  y: number;
  scale?: number;
  zIndex?: number;
  /** Optional looped animation to start immediately (e.g. an idle). */
  animation?: string;
  loop?: boolean;
  /**
   * Called once the Spine is built and added to the world. Use it to drive
   * custom animation logic (phase transitions, mixing, etc.).
   */
  onReady?: (spine: Spine) => void;
};

/**
 * Declarative bridge: mounts a single Spine skeleton into the shared Pixi world
 * and keeps its transform in sync with props. Replaces the old "one canvas +
 * one WebGL context per animation" components.
 */
export function SpineActor({
  assetKey,
  urls,
  x,
  y,
  scale = 1,
  zIndex = 0,
  animation,
  loop = true,
  onReady,
}: SpineActorProps) {
  const stage = useGameStage();
  const [spine, setSpine] = useState<Spine | null>(null);

  // Create / destroy the skeleton when the stage or asset changes.
  useEffect(() => {
    if (!stage) return;

    let disposed = false;
    let created: Spine | null = null;

    void loadSpineAsset(assetKey, urls).then(() => {
      if (disposed) return;
      const s = createSpine(assetKey);
      created = s;
      stage.world.addChild(s);
      setSpine(s);
      onReady?.(s);
    });

    return () => {
      disposed = true;
      setSpine(null);
      if (created) {
        created.parent?.removeChild(created);
        created.destroy();
      }
    };
    // onReady is intentionally excluded: callers pass inline closures.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, assetKey, urls.skeleton, urls.atlas]);

  // Keep transform in sync.
  useEffect(() => {
    if (!spine) return;
    spine.position.set(x, y);
    spine.scale.set(scale);
    spine.zIndex = zIndex;
  }, [spine, x, y, scale, zIndex]);

  // Drive the simple looped animation if one was requested.
  useEffect(() => {
    if (!spine || !animation) return;
    spine.state.setAnimation(0, animation, loop);
  }, [spine, animation, loop]);

  return null;
}
