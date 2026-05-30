# 07 — Migration isolation

Migration exists only to transform old saves into current state shape, not to host active runtime logic.

**Depends on:** [02-single-source-of-truth](./02-single-source-of-truth.md), [03-guaranteed-skill-state](./03-guaranteed-skill-state.md)  
**Used by:** [08](./08-validation-cleanup.md)

---

## Rules

1. Migration files may read canonical domain maps from shared domain module, but app code never imports migration internals.
2. Migration produces state that satisfies runtime invariants.
3. Runtime normalization in storage is limited to defensive completion, not business behavior.

---

## Plan

1. Keep all legacy-shape parsing in `src/game/persist/migration/**`.
2. Keep `storage.ts` focused on:
   - load/save orchestration
   - validation
   - lightweight normalization to current schema
3. Ensure migration and storage do not duplicate profession id lists or skill prefix maps.

---

## Acceptance

- Migration can be reasoned about independently from gameplay systems.
- Runtime selectors/systems assume current shape and do not branch on legacy variants.
