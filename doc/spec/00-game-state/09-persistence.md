# 09 — Persistence

Save and restore [GameState](./01-state.md).

**Depends on:** [01-state](./01-state.md), [05-engine](./05-engine.md), [06-tasks](./06-tasks.md)

---

## Files

```
src/game/persist/storage.ts
src/game/persist/offline.ts
```

---

## Save format

```ts
type SaveBlob = {
  version: number;
  state: GameState;
};
```

- Key: `localStorage` — `zproto:game`
- Save every **5 seconds** while the game runs
- Missing / corrupt save → `createInitialState()`

---

## Offline catch-up

On load: `elapsed = now - state.lastTickAt` → fast-forward via task system ([06-tasks](./06-tasks.md)), not a separate formula.

---

## Review

- [ ] Reload restores queue + currentTask + skills
- [ ] Offline time completes tasks correctly
