import type { GameLibrary } from '@game/library/types';
import type { GameState } from '@game/state/types';

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function getCurrentTaskProgress(
  state: GameState,
  library: GameLibrary,
  now: number,
): number {
  if (state.currentTask === null) {
    return 0;
  }

  const skill = library.skills[state.currentTask.skillId];
  if (skill === undefined) {
    return 0;
  }

  const elapsed = now - state.currentTask.startedAt;
  const durationMs = skill.durationSeconds * 1000;

  return clamp(elapsed / durationMs, 0, 1);
}

export function isTaskComplete(
  state: GameState,
  library: GameLibrary,
  now: number,
): boolean {
  return getCurrentTaskProgress(state, library, now) >= 1;
}
