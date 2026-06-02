# 02 - Rendering pipeline decision

Choose a single rendering pipeline and formalize what is allowed.

**Depends on:** [01 - Current state audit](./01-current-state-audit.md)  
**Used by:** 03, 04, 07

---

## Decision

Keep and harden **one pipeline**:

- **Renderer:** `pixi.js` (single shared `Application`)
- **Skeletal animation runtime:** `@esotericsoftware/spine-pixi-v8`
- **Asset source of truth:** `public/spine/**`

---

## Why this is optimal for current game scope

1. The tower already moved to a single shared world (`GameStageProvider` + `TowerScene`), which removes per-widget WebGL context overhead.
2. Spine-on-Pixi keeps animation and scene composition in one render graph (sky/tower/zeppelin/flag/rooms in one z-ordered stage).
3. It matches current dependency graph and requires minimal migration risk versus introducing a second runtime.

---

## Hard rules after this phase

1. No second animation renderer/runtime in app code.
2. No vendored runtime copies if package-managed runtime is active.
3. All animated tower entities must render through the shared stage APIs in `src/engine/**`.
4. DOM overlays remain DOM; world animation stays in Pixi.

---

## Architecture target

- `src/engine/stage/**` owns renderer lifecycle and render policy.
- `src/engine/spine/**` owns Spine loading/instantiation policy.
- `src/pages/Tower/**` owns scene composition only (not runtime internals).
- `src/components/**` owns reusable UI blocks, never ad-hoc page-local pseudo-components.

---

## Exit criteria

- Renderer choice is explicit and documented.
- Team-wide constraints prevent runtime drift (Spine vs Spline vs other ad-hoc stacks).
