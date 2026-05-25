import { startNextTask } from '@game/systems/tasks';
import type { Plan } from '@game/events/Plan';
import type { GameLibrary } from '@game/library/types';
import type { GameState } from '@game/state/types';

export function handlePlan(state: GameState, event: Plan, library: GameLibrary): GameState {
  if (event.count < 1) {
    return state;
  }

  if (library.skills[event.skillId] === undefined) {
    return state;
  }

  const id = state.nextQueueId;
  const now = Date.now();

  const withPlan: GameState = {
    ...state,
    nextQueueId: id + 1,
    taskQueue: [
      ...state.taskQueue,
      { id, skillId: event.skillId, count: event.count },
    ],
  };

  return startNextTask(withPlan, now);
}
