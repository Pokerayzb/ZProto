# 05 — BL/UI responsibility split

Game directory provides derived answers; UI renders them.

**Depends on:** [02-single-source-of-truth](./02-single-source-of-truth.md), [03-guaranteed-skill-state](./03-guaranteed-skill-state.md)  
**Used by:** [06](./06-component-simplification.md), [08](./08-validation-cleanup.md)

---

## Problem

Craftability logic is duplicated:

- `src/game/library/skillDisplay.ts` (`getMaxCraftableQuantity`)
- `src/components/Book/Recipe/index.tsx` (`getAvailableQuantity`)

This is fragile and violates domain ownership.

---

## Plan

1. Move/keep craftability and queue-related derivations in `src/game/selectors/**`.
2. Expose UI-ready entities (example shape):
   - `craftableCount`
   - `isLearned`
   - `isQueued`
   - `isCurrent`
   - `isFavorite`
3. Update `Recipe` and `WorkshopCreation` to consume selectors, not compute business rules locally.
4. Keep presentation-only formatting local if needed (classes, labels), but not inventory/task logic.

---

## Acceptance

- No craftability math in component files.
- Changing ingredient rules requires selector/domain change only.
- `Recipe` and `WorkshopCreation` show consistent quantities.
