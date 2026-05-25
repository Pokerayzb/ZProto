import {
  completeCurrentTask,
  startNextTask,
} from '@game/systems/tasks';
import type { GameLibrary } from '@game/library/types';
import type { GameState } from '@game/state/types';

export function applyOfflineProgress(
  state: GameState,
  now: number,
  library: GameLibrary,
): GameState {
  if (state.lastTickAt <= 0) {
    return {
      ...state,
      lastTickAt: now,
    };
  }

  if (now <= state.lastTickAt) {
    return state;
  }

  let next = state;
  let simulatedTime = state.lastTickAt;

  while (simulatedTime < now) {
    next = startNextTask(next, simulatedTime);

    if (next.currentTask === null) {
      break;
    }

    const skillDef = library.skills[next.currentTask.skillId];
    if (skillDef === undefined) {
      next = {
        ...next,
        currentTask: null,
      };
      break;
    }

    const finishAt =
      next.currentTask.startedAt + skillDef.durationSeconds * 1000;

    if (finishAt > now) {
      return {
        ...next,
        lastTickAt: now,
      };
    }

    next = completeCurrentTask(next, finishAt, library);
    simulatedTime = finishAt;
  }

  return {
    ...next,
    lastTickAt: now,
  };
}
