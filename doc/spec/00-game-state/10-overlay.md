# 10 — Player overlay

Header HUD from `state.player`.

**Depends on:** [01-state](./01-state.md), [05-engine](./05-engine.md)

---

## Changes

| Component | Binds to |
|-----------|----------|
| `CharacterPortrait` | `player.name`, `player.status`, `player.level` |
| `LevelBadge` | `player.level` (`LevelProgress`) |
| Header (extend) | `player.gold`, `player.reputation` — layout TBD |

Use `useGameState` selectors. Visible on all pages.

---

## Review

- [ ] Updates when player state changes
- [ ] Reputation shows all four factions
