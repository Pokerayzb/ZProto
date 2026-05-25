# 08 — Tower UI

Wire Tower building to game selectors.

**Depends on:** [07-selectors](./07-selectors.md), [05-engine](./05-engine.md)

---

## Changes

| File | Change |
|------|--------|
| `src/pages/Tower/Building/index.tsx` | Remove demo `useState`; use `useRoomStates()` |
| `src/pages/Tower/Room/index.tsx` | `RoomState`: `"empty" \| "full" \| "busy"` |
| Room components | Map `full` → `idle` asset |

Remove `cycleRoomState` click demo.

---

## Optional (dev)

Small dev panel: `new LearnSkill(…)`, `new Plan(…)`, `new StartQueue()` for manual testing.

---

## Review

- [ ] Rooms match selector output
- [ ] State persists across navigation
- [ ] empty / full / busy artwork correct
