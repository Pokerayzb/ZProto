# 03 — Guaranteed skill state

Keep skill state strict at runtime: unlearned means missing key; learned means fully shaped object.

**Depends on:** [01-boundaries-goals](./01-boundaries-goals.md), [02-single-source-of-truth](./02-single-source-of-truth.md)  
**Used by:** [05](./05-bl-ui-responsibility-split.md), [06](./06-component-simplification.md), [07](./07-migration-isolation.md)

---

## Contract

- `profession.skills[skillId] === undefined` => skill is unlearned.
- `profession.skills[skillId]` exists => object is complete and valid (`PlayerSkill`).
- App/runtime logic never handles partial skill objects.
- Runtime map type is sparse by design: `Partial<Record<string, PlayerSkill>>`.

This keeps the model backend-friendly and secret-skill-friendly.

---

## Type note

`Record<string, PlayerSkill>` is too strong for sparse learned skills because it implies every string key is present.
Use `Partial<Record<string, PlayerSkill>>` to represent exact runtime semantics:

- unknown/missing key: `undefined` (unlearned)
- existing key: fully shaped `PlayerSkill`

---

## Plan

1. Define one normalization function for profession skill maps in `persist/storage`.
2. Ensure migration converts all legacy skill entries to full `PlayerSkill`.
3. Add runtime guards/helpers for writes (`learnSkill`, `setFavorite`, `recordApplication`) so no code can insert partial objects.
4. Keep migration concerns out of normal selectors/components.

---

## Acceptance

- All writes to `profession.skills` create full `PlayerSkill` objects.
- No component or selector checks inner `PlayerSkill` optional fields.
- Legacy shapes are consumed only in migration/normalization path.
