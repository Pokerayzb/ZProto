# 07 — Derived state & selectors

Pure read helpers. Nothing here is persisted.

**Depends on:** [01-state](./01-state.md), [02-library](./02-library.md), [06-tasks](./06-tasks.md)  
**Used by:** [08-tower-ui](./08-tower-ui.md), [10-overlay](./10-overlay.md)

---

## Files

```
src/game/selectors/rooms.ts
src/game/selectors/tasks.ts
src/game/hooks/useRoomStates.ts
src/game/hooks/useCurrentTaskProgress.ts
```

---

## Task progress

```ts
progress = clamp((now - startedAt) / (durationSeconds * 1000), 0, 1)
isComplete = progress >= 1
```

Requires `currentTask` + library skill.

---

## Room visual state

```ts
type RoomId = "blacksmith" | "kitchen" | "carpentry";
type RoomVisualState = "empty" | "full" | "busy";
```

| ProfessionId | RoomId |
|--------------|--------|
| `blacksmithing` | `blacksmith` |
| `cooking` | `kitchen` |
| `carpentry` | `carpentry` |

**Rules** (priority top → bottom):

| State | Condition |
|-------|-----------|
| `empty` | No learned skills for profession |
| `busy` | `currentTask` skill belongs to this profession |
| `full` | Has learned skills, not busy |

Asset map: `full` → existing `idle` png ([08-tower-ui](./08-tower-ui.md)).

---

## Resolved

1. **Room `full`** — learning any skill in that profession is enough for now. Separate “build room” step and other rules may be added later.
