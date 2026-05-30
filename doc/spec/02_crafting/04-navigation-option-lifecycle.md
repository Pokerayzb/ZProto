# 04 — Navigation option lifecycle

Make `navigate(pageId, options)` deterministic across direct nav, tab switch, and browser history.

**Depends on:** [01-boundaries-goals](./01-boundaries-goals.md)  
**Used by:** [08](./08-validation-cleanup.md)

---

## Problem

`pageOptions` are set on navigate calls but not reset on `popstate`, so stale options can leak into later page renders.

---

## Plan

1. Define explicit lifecycle rules:
   - options apply only to the target navigation transaction
   - history/back navigation resolves page id and clears transient options unless options are encoded in URL
2. Apply rule in `NavigationProvider`:
   - on `popstate`, update `pageId` and reset `pageOptions` to `null`
3. Keep current URL model simple (no query param encoding yet).

---

## Acceptance

- Returning to `craft` from history does not accidentally reuse previous `professionId` option.
- `Book initialChapterId` behavior remains stable for direct `navigate('craft', { professionId })`.
