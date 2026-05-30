# Phases

| # | Spec | Code | Status |
|---|------|------|--------|
| 01 | [Boundaries & goals](./01-boundaries-goals.md) | `src/game/**`, `src/components/**`, `src/navigation/**`, `src/pages/**` | Done |
| 02 | [Single source of truth](./02-single-source-of-truth.md) | shared domain constants/selectors | Done |
| 03 | [Guaranteed skill state](./03-guaranteed-skill-state.md) | `state`, `persist`, `migration` | Done |
| 04 | [Navigation option lifecycle](./04-navigation-option-lifecycle.md) | `src/navigation/**` | Done |
| 05 | [BL/UI responsibility split](./05-bl-ui-responsibility-split.md) | selectors + workshop UI | Done |
| 06 | [Component simplification](./06-component-simplification.md) | book/workshop components | Done |
| 07 | [Migration isolation](./07-migration-isolation.md) | `src/game/persist/migration/**` | Done |
| 08 | [Validation & cleanup](./08-validation-cleanup.md) | lint/typecheck + regression checks | Done |

```mermaid
flowchart LR
  P01[01] --> P02[02]
  P01 --> P03[03]
  P01 --> P04[04]
  P02 --> P05[05]
  P03 --> P05
  P05 --> P06[06]
  P03 --> P07[07]
  P02 --> P08[08]
  P03 --> P08
  P04 --> P08
  P05 --> P08
  P06 --> P08
  P07 --> P08
```

Execution order: lock domain contracts first (**02–04**), then simplify UI on top (**05–06**), then isolate migration concerns (**07**), then run full cleanup and acceptance (**08**).
