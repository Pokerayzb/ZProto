import { startNextTask } from '@game/systems/tasks';
import type { StartQueue } from '@game/events/StartQueue';
import type { GameState } from '@game/state/types';

export function handleStartQueue(state: GameState, event: StartQueue): GameState {
  return startNextTask(state, event.professionId, Date.now());
}
