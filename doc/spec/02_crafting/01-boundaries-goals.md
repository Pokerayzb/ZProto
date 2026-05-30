# 01 — Boundaries & goals

Define what this refactor is optimizing for and what it intentionally does not touch.

**Depends on:** nothing  
**Used by:** all following phases

---

## Goals

1. Establish a strict **single source of truth** for profession/domain mappings used by game logic, selectors, persistence, and UI routing.
2. Keep player skill state as an **all-or-missing object** in runtime (`present => fully typed`, absent => unlearned).
3. Ensure migration/normalization absorbs legacy variability so app code can rely on typed runtime contracts.
4. Move craftability and similar business rules to `src/game/**`; UI consumes prepared answers.
5. Simplify UI components to reduce mapping boilerplate and effect-driven state synchronization.

---

## Non-goals

- Merge `Craft` and `Gathering` page components.
- Introduce backend sync.
- Expand migration for long-term backward compatibility beyond current live shape upgrades.

---

## Acceptance

- Refactor plan stays compatible with current game behavior.
- New code paths remove duplicated domain constants and duplicated BL calculations.
- Post-refactor code reads from domain APIs/selectors, not ad-hoc derivations in UI files.
