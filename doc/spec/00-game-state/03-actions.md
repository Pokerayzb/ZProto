# 03 — Actions & events

UI and engine send **event objects**; reducer returns new [GameState](./01-state.md).

Events are **classes** with typed constructor params — no `{ type: "…", … }` unions.

**Depends on:** [01-state](./01-state.md), [02-library](./02-library.md)  
**Used by:** [05-engine](./05-engine.md), [06-tasks](./06-tasks.md)

---

## Base

```ts
abstract class GameEvent {}
```

All events extend `GameEvent`. Dispatch accepts `GameEvent`. Handlers branch with `instanceof`.

---

## Events

```ts
class Tick extends GameEvent {
  constructor(readonly now: number) {
    super();
  }
}

class Plan extends GameEvent {
  constructor(
    readonly skillId: string,
    readonly count: number,
  ) {
    super();
  }
}

class Unplan extends GameEvent {
  constructor(readonly queueId: number) {
    super();
  }
}

class StartQueue extends GameEvent {}

class CancelTask extends GameEvent {}

class LearnSkill extends GameEvent {
  constructor(readonly skillId: string) {
    super();
  }
}
```

| Class | Who dispatches | Usage |
|-------|----------------|-------|
| `Tick` | Engine timer | `new Tick(Date.now())` |
| `Plan` | UI | `new Plan("cook_stew", 5)` — enqueue skill × count |
| `Unplan` | UI | `new Unplan(3)` — remove queue entry by id |
| `StartQueue` | UI | `new StartQueue()` |
| `CancelTask` | UI | `new CancelTask()` |
| `LearnSkill` | UI / dev | `new LearnSkill("cook_stew")` |

`CompleteTask` is internal ([06-tasks](./06-tasks.md)) — not dispatched from UI.

---

## Dispatch

```ts
engine.dispatch(new Plan("forge_nails", 3));
engine.dispatch(new StartQueue());
```

```ts
class GameEngine {
  dispatch(event: GameEvent): void;
}
```

---

## Reducer

```ts
type Reduce = (state: GameState, event: GameEvent, library: GameLibrary) => GameState;
```

```ts
function reduce(state: GameState, event: GameEvent, library: GameLibrary): GameState {
  if (event instanceof Plan) {
    return {
      ...state,
      taskQueue: [...state.taskQueue, { id: state.nextQueueId, skillId: event.skillId, count: event.count }],
      nextQueueId: state.nextQueueId + 1,
    };
  }
  if (event instanceof Tick) {
    // see 06-tasks
  }
  // ...
  return state;
}
```

Pure. Unknown skill id → no-op.

Handler module may split per event: `handlePlan`, `handleTick`, … called from `reduce`.

---

## Effect summary

| Event | Effect |
|-------|--------|
| `Plan` | Append `{ id, skillId, count }` to `taskQueue`; bump `nextQueueId` |
| `Unplan` | Remove entry with matching `id` |
| `StartQueue` | If idle and queue non-empty → set `currentTask` from head |
| `CancelTask` | Clear `currentTask` — queue unchanged; behavior TBD |
| `LearnSkill` | Add skill at level 1, progress 0 |
| `Tick` | Update `lastTickAt`; may complete task — [06-tasks](./06-tasks.md) |

---

## Files (phase 04–05)

```
src/game/events/
  GameEvent.ts
  Tick.ts
  Plan.ts
  Unplan.ts
  StartQueue.ts
  CancelTask.ts
  LearnSkill.ts
  index.ts
src/game/actions/
  reduce.ts
  handlers/
```

One class per file, or grouped — decide at implementation.

---

## Open questions

1. Auto-start queue on `new Plan(…)`?
2. `CancelTask` — lose progress or pause?
