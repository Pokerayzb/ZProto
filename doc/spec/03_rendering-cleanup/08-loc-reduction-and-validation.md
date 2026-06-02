# 08 - LOC reduction and validation

Finalize cleanup with measurable complexity reduction and regression checks.

**Depends on:** 03, 05, 06, 07  
**Used by:** implementation sign-off

---

## LOC reduction strategy

1. Delete dead files first (do not "keep just in case").
2. Extract reusable UI blocks once and reuse across pages.
3. Remove duplicated constants/style fragments and centralize by ownership.
4. Replace ad-hoc component-like inline code with library components.

---

## Validation checklist

1. Static checks:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run build`
2. Functional checks:
   - tower room click navigation works
   - zeppelin phase transitions still correct
   - reputation/zeppelins pages render faction data correctly
3. Performance checks:
   - baseline vs optimized measurements from Phase 07

---

## Done definition

- Selected rendering pipeline is the only one remaining.
- Runtime/assets are clean and singular in ownership.
- UI and game-logic boundaries are clear and enforced by structure/types.
- LOC is reduced in key hotspots with no behavior regressions.
