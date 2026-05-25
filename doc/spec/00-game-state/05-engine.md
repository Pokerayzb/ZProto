# 05 — Engine core

Simulation shell: hold state, dispatch, tick, subscribe.

**Depends on:** [03-actions](./03-actions.md), [04-types](./04-types.md)  
**Used by:** [06-tasks](./06-tasks.md), [09-persistence](./09-persistence.md)

---

## Files

```
src/game/
  engine/GameEngine.ts
  engine/createEngine.ts
  actions/reduce.ts
  events/
  context/GameProvider.tsx
  hooks/useGameEngine.ts
  hooks/useGameState.ts
  hooks/useGameDispatch.ts
```

Mount `GameProvider` in `App.tsx` above navigation.

---

## GameEngine API

```ts
class GameEngine {
  getState(): GameState;
  dispatch(event: GameEvent): void;
  subscribe(listener: () => void): () => void;
  start(tickMs?: number): void;
  stop(): void;
}
```

- Tick interval default **250ms** → `dispatch(new Tick(Date.now()))`
- Single instance survives route changes
- Handlers may stub unimplemented actions until [06-tasks](./06-tasks.md)

---

## Hooks

| Hook | Returns |
|------|---------|
| `useGameEngine()` | engine instance |
| `useGameDispatch()` | `dispatch` |
| `useGameState(selector)` | selected slice, re-renders on change |

---

## Review

- [ ] Dispatch + subscribe works
- [ ] StrictMode: one engine instance
