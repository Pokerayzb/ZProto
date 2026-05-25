# 01 — Game state

Persisted runtime state only. Everything here is saved and restored.

**Depends on:** nothing  
**Used by:** [02-library](./02-library.md), [03-actions](./03-actions.md), [04-types](./04-types.md)

---

## GameState

```ts
type GameState = {
  player: Player;
  professions: PlayerProfessions;
  taskQueue: TaskQueue;
  currentTask: CurrentTask;
  nextQueueId: number;
  lastTickAt: number;
};
```

| Field | Type | Notes |
|-------|------|-------|
| `player` | `Player` | Identity, level, currency, reputation |
| `professions` | `PlayerProfessions` | Per-profession skill progress |
| `taskQueue` | `TaskQueue` | Scheduled work |
| `currentTask` | `CurrentTask` | Active execution, or none |
| `nextQueueId` | `number` | Next id to assign to a queued task |
| `lastTickAt` | `number` | Last sim tick, ms since epoch |

---

## Player

```ts
type FactionId = "traders" | "aristocrats" | "mystics" | "artisans";

type Player = {
  name: string;
  status: string;
  level: LevelProgress;
  gold: number;
  reputation: Record<FactionId, number>;
};

type LevelProgress = {
  value: number;
  target: number;
  progress: number;
};
```

| Field | Notes |
|-------|-------|
| `name` | Display name |
| `status` | Status line — enum TBD |
| `level` | `LevelProgress` — player tier + XP toward next ([progression](../../src/game/progression.ts)) |
| `gold` | ≥ 0 |
| `reputation` | One value per faction — scale TBD |

**Deferred:** inventory (later spec).

---

## Professions & skills

```ts
type ProfessionId = "blacksmithing" | "cooking" | "carpentry";

type PlayerProfession = {
  skills: Partial<Record<string, LevelProgress>>;
};

type PlayerProfessions = Record<ProfessionId, PlayerProfession>;
```

- Skill referenced by `skillId` string (defined in [02-library](./02-library.md)).
- **Not learned:** no entry in `skills`.
- **Learned:** `LevelProgress` with `value` ≥ 1.

All three professions exist from start with empty `skills`.

---

## Task queue

```ts
type QueuedTask = {
  id: number;
  skillId: string;
  count: number; // ≥ 1
};

type TaskQueue = QueuedTask[];
```

Ordered list. Each entry has a stable `id`, a `skillId`, and a repeat `count`. Processing rules in [06-tasks](./06-tasks.md).

---

## Current task

```ts
type CurrentTask = {
  skillId: string;
  startedAt: number; // ms since epoch
} | null;
```

One active skill at a time. `null` = idle.

---

## Initial state

```json
{
  "player": {
    "name": "Player",
    "status": "",
    "level": { "value": 1, "target": 100, "progress": 0 },
    "gold": 0,
    "reputation": {
      "traders": 0,
      "aristocrats": 0,
      "mystics": 0,
      "artisans": 0
    }
  },
  "professions": {
    "blacksmithing": { "skills": {} },
    "cooking": { "skills": {} },
    "carpentry": { "skills": {} }
  },
  "taskQueue": [],
  "currentTask": null,
  "nextQueueId": 1,
  "lastTickAt": 0
}
```

---

## Open questions

1. `status` — free text or enum?
3. Reputation scale?
