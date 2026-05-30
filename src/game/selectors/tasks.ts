import type { GameLibrary } from '@game/library/types';
import type { GameState, ProfessionId } from '@game/state/types';

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function getCurrentTaskProgress(
  state: GameState,
  professionId: ProfessionId,
  library: GameLibrary,
  now: number,
): number {
  const currentTask = state.professions[professionId].currentTask;
  if (currentTask === null) {
    return 0;
  }

  const skill = library.skills[currentTask.skillId];
  if (skill === undefined) {
    return 0;
  }

  const elapsed = now - currentTask.startedAt;
  return clamp(elapsed / skill.duration, 0, 1);
}

export function isTaskComplete(
  state: GameState,
  professionId: ProfessionId,
  library: GameLibrary,
  now: number,
): boolean {
  return getCurrentTaskProgress(state, professionId, library, now) >= 1;
}
