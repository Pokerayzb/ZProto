import { Assets } from 'pixi.js';
import { Spine } from '@esotericsoftware/spine-pixi-v8';

/**
 * URLs for one Spine export (4.3). `skeleton` is the `.json` or `.skel` file,
 * `atlas` is the `.atlas` file. The atlas references its `.png` page(s) by
 * relative filename, so keep all three side by side (we serve them from
 * `public/spine/<name>/` to keep that relative resolution intact).
 */
export type SpineAssetUrls = {
  skeleton: string;
  atlas: string;
};

const registered = new Set<string>();

/**
 * Register (once) and load a Spine asset into Pixi's shared asset cache.
 * Safe to call repeatedly for the same key — Pixi de-dupes the actual fetch.
 */
export async function loadSpineAsset(key: string, urls: SpineAssetUrls): Promise<void> {
  const skeletonAlias = `${key}:skeleton`;
  const atlasAlias = `${key}:atlas`;

  if (!registered.has(key)) {
    Assets.add({ alias: skeletonAlias, src: urls.skeleton });
    Assets.add({ alias: atlasAlias, src: urls.atlas });
    registered.add(key);
  }

  await Assets.load([skeletonAlias, atlasAlias]);
}

/** Build a fresh Spine display object from an already-loaded asset key. */
export function createSpine(key: string): Spine {
  return Spine.from({ skeleton: `${key}:skeleton`, atlas: `${key}:atlas` });
}
