# 04 - Tower scene consolidation

Finish migration to a single tower rendering path and remove legacy DOM remnants.

**Depends on:** [02 - Rendering pipeline decision](./02-rendering-pipeline-decision.md), [03 - Runtime and asset cleanup](./03-runtime-and-asset-cleanup.md)  
**Used by:** 07, 08

---

## Scope

1. Keep `src/pages/Tower/TowerScene/index.tsx` as the only tower scene entry.
2. Remove unused legacy DOM building stack if no references remain:
   - `src/pages/Tower/Building/index.tsx`
   - `src/pages/Tower/Building/index.css`
   - `src/pages/Tower/Room/**`
   - `src/pages/Tower/Building/rooms/**` wrappers that only serve removed DOM path
3. Preserve room-state and navigation behavior through the Pixi scene.

---

## Refactor tasks

1. Extract shared tower constants (anchors/z-order/room coordinates) into a dedicated module.
2. Keep scene composition declarative in `TowerScene`; push runtime helpers into `src/engine/**`.
3. Ensure resize behavior updates every world actor position consistently (including flag/zeppelin anchors).

---

## Risks

1. Removing DOM fallback without parity checks may break click targets.
2. Hidden dependencies on removed room wrappers may exist in tests or future imports.

Mitigation: run targeted search and add scene parity checklist before deletion.

---

## Exit criteria

- One tower scene path remains.
- No dead DOM tower files survive.
- Room click navigation and z-order parity are confirmed.
