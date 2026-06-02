# 06 - Game-state boundary cleanup

Keep game logic in `src/game/**` and keep route/state contracts strict.

**Depends on:** [01 - Current state audit](./01-current-state-audit.md)  
**Used by:** 08

---

## Scope

1. Keep faction visit lifecycle/timing in `src/game/**` only.
2. Move UI-only helpers out of game domain if they are pure presentation (for example countdown text formatting).
3. Replace broad optional navigation options with page-scoped route option contracts.

---

## Refactor targets

1. `src/navigation/types.ts`
   - Replace generic `NavigateOptions` with discriminated page option typing.
2. `src/game/factions/useFactionVisit.tsx`
   - Keep domain state + transitions.
   - Expose raw values; formatting/UI labels handled in UI layer.
3. `src/game/factions/index.ts`
   - Keep data model clean; split static content and helpers if needed.

---

## Acceptance

- Business transitions remain testable without React UI.
- UI files do not implement timing or faction transition logic.
- Navigation option misuse becomes a type error.
