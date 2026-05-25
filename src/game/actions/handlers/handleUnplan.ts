import type { Unplan } from '@game/events/Unplan';
import type { GameState } from '@game/state/types';

export function handleUnplan(state: GameState, event: Unplan): GameState {
  const taskQueue = state.taskQueue.filter((task) => task.id !== event.queueId);

  if (taskQueue.length === state.taskQueue.length) {
    return state;
  }

  return {
    ...state,
    taskQueue,
  };
}
