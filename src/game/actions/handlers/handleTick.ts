import { advanceTick } from '@game/systems/tasks';
import type { Tick } from '@game/events/Tick';
import type { GameLibrary } from '@game/library/types';
import type { GameState } from '@game/state/types';

export function handleTick(
  state: GameState,
  event: Tick,
  library: GameLibrary,
): GameState {
  return advanceTick(state, event.now, library);
}
