import { startNextTask } from '@game/systems/tasks';
import type { GameState } from '@game/state/types';

export function handleStartQueue(state: GameState): GameState {
  return startNextTask(state, Date.now());
}
