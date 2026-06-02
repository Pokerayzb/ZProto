# 07 - GPU and render-cost optimization

Reduce frame cost of tower animation while preserving visual quality.

**Depends on:** [02 - Rendering pipeline decision](./02-rendering-pipeline-decision.md), [04 - Tower scene consolidation](./04-tower-scene-consolidation.md)  
**Used by:** 08

---

## Targets

1. Lower idle GPU usage significantly on tower page.
2. Keep animation smooth enough for game readability.
3. Avoid quality loss that breaks art direction.

---

## Planned optimizations

1. Tune Pixi init defaults in `GameStageProvider`:
   - disable antialias unless visually required
   - cap resolution (for example `min(devicePixelRatio, 1.5)`)
   - set low-power preference where supported
2. Ticker policy:
   - cap max FPS for world updates (30 as baseline candidate)
   - pause or reduce update cadence when no active transitions run
3. Spine lifecycle policy:
   - do not keep unnecessary hidden skeletons updating
   - load/mount only current + immediately needed faction skeletons
4. Resize policy:
   - centralize actor layout on renderer resize (no window-size reads in render paths)

---

## Measurement protocol

1. Capture baseline on current branch:
   - idle on tower page for 30s
   - zeppelin arrival/departure sequence
2. Record:
   - average FPS
   - main thread frame time
   - GPU utilization (system monitor)
3. Apply one optimization group at a time and compare.

---

## Acceptance

- Idle GPU usage drops materially from current baseline.
- No regressions in click hit-testing or animation sequencing.
- Visual quality remains acceptable at target resolution/FPS settings.
