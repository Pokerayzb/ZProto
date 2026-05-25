import type { GameState } from '@game/state/types';

export function handleCancelTask(state: GameState): GameState {
  if (state.currentTask === null) {
    return state;
  }

  return {
    ...state,
    currentTask: null,
  };
}
