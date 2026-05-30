# 08 — Validation & cleanup

Finalize refactor with explicit checks and commit slicing.

**Depends on:** [02](./02-single-source-of-truth.md), [03](./03-guaranteed-skill-state.md), [04](./04-navigation-option-lifecycle.md), [05](./05-bl-ui-responsibility-split.md), [06](./06-component-simplification.md), [07](./07-migration-isolation.md)

---

## Validation checklist

- [ ] `npm run typecheck` passes.
- [ ] `npm run lint` passes for touched files and does not add new violations.
- [ ] Navigation option lifecycle validated with:
  - tower room -> craft chapter preselect
  - browser back/forward
- [ ] Craftability numbers match between list (`Recipe`) and details (`WorkshopCreation`).
- [ ] Queue/current task behavior remains correct per profession.
- [ ] Save/load path still restores current runtime shape.

---

## Suggested commit slices

1. Domain single-source-of-truth extraction.
2. Skill state normalization + migration tightening.
3. Navigation lifecycle fix.
4. BL selector consolidation for workshop UI.
5. Component simplification and lint cleanup.

---

## Out-of-scope confirmations

- Keep `Craft` and `Gathering` page-level duplication for now.
- Do not broaden backward compatibility guarantees beyond current migration objective.
