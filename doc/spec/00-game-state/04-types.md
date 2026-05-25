# 04 — TypeScript types

Mirror specs 01–03 in code. No engine, no React.

**Depends on:** [01-state](./01-state.md), [02-library](./02-library.md), [03-actions](./03-actions.md)  
**Used by:** [05-engine](./05-engine.md)

---

## Files

```
src/game/
  state/types.ts
  state/initialState.ts
  library/types.ts
  library/professions.ts
  library/skills.ts
  library/items.ts
  library/index.ts
  events/               # GameEvent classes (see 03)
  actions/reduce.ts
  index.ts
```

---

## Deliverables

- All types from 01 + 02; event classes from 03
- `createInitialState(): GameState` — matches [01-state initial](./01-state.md#initial-state)
- `gameLibrary: GameLibrary` — seed data from 02
- `tsc --noEmit` passes

---

## Review

- [ ] Types match approved specs
- [ ] No engine or UI imports
