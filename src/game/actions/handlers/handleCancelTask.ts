import type { CancelTask } from '@game/events/CancelTask';
import type { GameState } from '@game/state/types';

export function handleCancelTask(state: GameState, event: CancelTask): GameState {
  const profession = state.professions[event.professionId];

  if (profession.currentTask === null) {
    return state;
  }

  return {
    ...state,
    professions: {
      ...state.professions,
      [event.professionId]: {
        ...profession,
        currentTask: null,
      },
    },
  };
}
