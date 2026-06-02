# 03 - Runtime and asset cleanup

Remove runtime/file noise that no longer belongs to the selected pipeline.

**Depends on:** [01 - Current state audit](./01-current-state-audit.md), [02 - Rendering pipeline decision](./02-rendering-pipeline-decision.md)  
**Used by:** 04, 07, 08

---

## Scope

1. Remove unused vendored runtime files:
   - `src/vendor/spine-webgl/spine-webgl.js`
   - `src/vendor/spine-webgl/spine-webgl.d.ts`
2. Remove duplicate, unreferenced Spine exports under:
   - `src/pages/Tower/Building/assets/flag/**`
   - `src/pages/Tower/Building/assets/zeppelin/**`
3. Keep `public/spine/**` as the only runtime Spine asset location.
4. Update any comments/docs still referencing old locations.

---

## Guardrails

1. Remove only files confirmed unreferenced by project search.
2. Keep package dependencies that are actually used (`pixi.js`, `@esotericsoftware/spine-pixi-v8`).
3. Do not touch gameplay assets that are still imported in non-Spine flows.

---

## Expected impact

- Smaller repository footprint and cleaner asset ownership.
- Lower cognitive load when tracking animation assets/runtime sources.
- Less chance of loading wrong export copies by mistake.

---

## Exit criteria

- No application import path points to removed runtime/asset duplicates.
- Build/typecheck/lint pass after cleanup.
