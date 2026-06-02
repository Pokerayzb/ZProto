# 01 - Current state audit

Document what exists right now before changing architecture.

**Depends on:** nothing  
**Used by:** all following phases

---

## Rendering stack status

1. Active runtime is **Pixi v8 + Spine Pixi runtime** (`pixi.js`, `@esotericsoftware/spine-pixi-v8`), wired through:
   - `src/engine/stage/GameStageProvider.tsx`
   - `src/engine/spine/loadSpine.ts`
   - `src/engine/spine/SpineActor.tsx`
   - `src/pages/Tower/TowerScene/index.tsx`
2. There is **no Spline runtime usage** in current code paths.
3. A vendored runtime exists in repo (`src/vendor/spine-webgl/**`) but is not imported by application code.

---

## Dead or duplicate render assets/paths

1. Spine exports are loaded from `public/spine/**` by `src/engine/spine/spineAssets.ts`.
2. Duplicate copies exist under `src/pages/Tower/Building/assets/flag/**` and `src/pages/Tower/Building/assets/zeppelin/**`, with no code references.
3. Legacy DOM tower rendering path still exists:
   - `src/pages/Tower/Building/index.tsx`
   - `src/pages/Tower/Room/index.tsx`
   - `src/pages/Tower/Building/rooms/**`
4. New Pixi scene (`src/pages/Tower/TowerScene/index.tsx`) is the active tower page path.

---

## Boundary and maintainability issues

1. `src/pages/Zeppelins/FactionVisit/index.tsx` is oversized and mixes:
   - page shell/layout
   - reusable presentation blocks
   - faction-specific domain display logic
2. Page/UI composition contains component-like chunks built inline instead of extracted into the component library.
3. Navigation options currently allow generic optional fields (`professionId?`, `factionId?`) for every page, which weakens route-state boundaries.

---

## Performance risks observed

1. Pixi stage is initialized with high-cost defaults for this use case:
   - `antialias: true`
   - `resolution: window.devicePixelRatio || 1` (uncapped)
2. Zeppelin setup preloads and mounts all faction skeletons at once; hidden instances still increase memory/update pressure.
3. Render loop currently runs continuously (default ticker behavior), even when scene is mostly static.

---

## Acceptance for audit phase

- Runtime reality is documented (Spine-on-Pixi, not Spline).
- Dead/duplicate render files and legacy paths are listed explicitly.
- Performance and architecture pain points are concrete enough to drive refactor tasks.
