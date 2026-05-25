import type { Award } from '@game/events/Award';
import { addInventoryItems } from '@game/systems/inventory';
import { addPlayerExperience, addPlayerGold } from '@game/systems/player';
import type { GameLibrary } from '@game/library/types';
import type { GameState } from '@game/state/types';

export function handleAward(
  state: GameState,
  event: Award,
  library: GameLibrary,
): GameState {
  let next = addPlayerGold(state, event.gold);
  next = addPlayerExperience(next, event.experience);
  next = addInventoryItems(next, event.items, library);
  return next;
}
