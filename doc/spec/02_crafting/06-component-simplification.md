# 06 — Component simplification

Reduce indirection and effect-heavy state where direct render-time derivation is enough.

**Depends on:** [03-guaranteed-skill-state](./03-guaranteed-skill-state.md), [05-bl-ui-responsibility-split](./05-bl-ui-responsibility-split.md)  
**Used by:** [08](./08-validation-cleanup.md)

---

## Principles

1. Query store state as close to rendering usage as practical.
2. Prefer logical entity props (`professionId`, `skillId`) over flattened primitive bags.
3. Remove duplicated mappings and effect-driven sync when derivable at render.

---

## Targets

- `Book`: reduce effect-based chapter sync; handle `initialChapterId` with minimal state transitions.
- `CreationBlock` and `CurrentItem`: remove avoidable set-state-in-effect patterns.
- Workshop queue items/current item: extract shared visual shell component if it shrinks code.
- Keep `Craft` and `Gathering` separate per product direction; only simplify internals and shared leaf components.

---

## Acceptance

- Lint warnings/errors related to effect-state sync in touched components are removed.
- Components have fewer derived locals and less repeated mapping boilerplate.
- Props stay domain-oriented (profession/skill/task entities), not flattened field lists.
