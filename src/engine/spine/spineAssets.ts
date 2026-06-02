import type { SpineAssetUrls } from './loadSpine';

// Spine exports live in `public/spine/<name>/` so each atlas can resolve its
// `.png` page by the relative filename it was exported with. BASE_URL keeps the
// paths correct under the GitHub Pages base (`/ZProto/`).
const base = import.meta.env.BASE_URL;

function spineUrls(name: string): SpineAssetUrls {
  return {
    skeleton: `${base}spine/${name}/${name}.json`,
    atlas: `${base}spine/${name}/${name}.atlas`,
  };
}

/** Tower flag skeleton (Spine 4.3). */
export const flagSpine: SpineAssetUrls = spineUrls('flag');

/** Per-faction zeppelin skeletons (Spine 4.3). Keys match `Faction.zeppelinId`. */
export const zeppelinSpine: Record<string, SpineAssetUrls> = {
  zeppelin_workers: spineUrls('zeppelin_workers'),
  zeppelin_trade: spineUrls('zeppelin_trade'),
  zeppelin_arist: spineUrls('zeppelin_arist'),
  zeppelin_mith: spineUrls('zeppelin_mith'),
};

export const zeppelinSpineKeys = Object.keys(zeppelinSpine);
