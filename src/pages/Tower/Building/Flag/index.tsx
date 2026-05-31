import { SpineActor } from '@engine/spine/SpineActor';
import { flagSpine } from '@engine/spine/spineAssets';

export interface FlagProps {
  /** Visual scale of the flag in the world. */
  scale?: number;
  /** Anchor as a fraction of the viewport (0..1). */
  anchorX?: number;
  anchorY?: number;
  zIndex?: number;
}

/**
 * Tower flag, rendered into the shared Pixi world (Spine 4.3). Replaces the old
 * standalone WebGL canvas — it now shares the single world context with the
 * zeppelin and everything else.
 */
export function Flag({ scale = 1, anchorX = 0.5, anchorY = 0.12, zIndex = 2 }: FlagProps) {
  const x = typeof window === 'undefined' ? 0 : window.innerWidth * anchorX;
  const y = typeof window === 'undefined' ? 0 : window.innerHeight * anchorY;
  return (
    <SpineActor
      assetKey="flag"
      urls={flagSpine}
      x={x}
      y={y}
      scale={scale}
      zIndex={zIndex}
      animation="idle"
      loop
    />
  );
}
