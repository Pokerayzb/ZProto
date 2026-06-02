# 05 - UI composition boundaries

Stop page files from becoming local component libraries.

**Depends on:** [01 - Current state audit](./01-current-state-audit.md)  
**Used by:** 08

---

## Problem

`src/pages/Zeppelins/FactionVisit/index.tsx` currently contains many reusable UI blocks inline (cards, tabs, rows, reward chips, shell). This inflates page LOC and bypasses `src/components/**` ownership.

---

## Scope

1. Split reusable UI blocks into component-library modules under `src/components/**`.
2. Keep page files as orchestration only:
   - select data
   - pass props
   - route/page-level composition
3. Standardize naming and file structure (`ComponentName/index.tsx`) for extracted blocks.

---

## Proposed component split

1. `FactionTabs`
2. `FactionHeaderCard` (portrait + reputation + mood)
3. `FactionQuestCard` (compact + detailed variants)
4. `FactionTradeCard`
5. `FactionMilestoneRow`
6. `FactionWindow` shell

---

## Guardrails

1. Keep business calculations out of UI components.
2. Keep style tokens and shared classes aligned with existing book/frame components.
3. No page-local pseudo-components if they are reusable in multiple pages.

---

## Exit criteria

- Page files are slim orchestration layers.
- Reusable visual blocks are in `src/components/**`.
- Total LOC in `FactionVisit/index.tsx` and `Reputation/index.tsx` is materially reduced.
