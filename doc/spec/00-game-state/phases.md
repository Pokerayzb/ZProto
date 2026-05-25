# Phases

| # | Spec | Code | Status |
|---|------|------|--------|
| 01 | [State](./01-state.md) | — | Draft |
| 02 | [Library](./02-library.md) | — | Planned |
| 03 | [Actions](./03-actions.md) | — | Planned |
| 04 | [Types](./04-types.md) | `src/game/**` types | Planned |
| 05 | [Engine](./05-engine.md) | engine, provider, hooks | Planned |
| 06 | [Tasks](./06-tasks.md) | task systems | Planned |
| 07 | [Selectors](./07-selectors.md) | selectors, derived hooks | Planned |
| 08 | [Tower UI](./08-tower-ui.md) | `Building` | Planned |
| 09 | [Persistence](./09-persistence.md) | save/load | Planned |
| 10 | [Overlay](./10-overlay.md) | header HUD | Planned |

```mermaid
flowchart LR
  P01[01] --> P04[04]
  P02[02] --> P04
  P03[03] --> P05[05]
  P04 --> P05
  P05 --> P06[06]
  P02 --> P06
  P04 --> P07[07]
  P02 --> P07
  P06 --> P07
  P07 --> P08[08]
  P05 --> P09[09]
  P06 --> P09
  P04 --> P10[10]
  P06 --> P10
  P07 --> P10
```

Review specs **01 → 03** before code. **04–07** need no UI. **08** first visible change.

**Out of scope:** inventory, Craft/Gathering pages, Web Worker, backend.
