import type { AwardItem } from '@game/events/Award';
import type { GameLibrary } from '@game/library/types';
import type { GameState } from '@game/state/types';

export function addInventoryItems(
  state: GameState,
  items: readonly AwardItem[],
  library: GameLibrary,
): GameState {
  if (items.length === 0) {
    return state;
  }

  const inventory = { ...state.inventory };

  for (const [itemId, amount] of items) {
    if (amount <= 0 || library.items[itemId] === undefined) {
      continue;
    }

    inventory[itemId] = (inventory[itemId] ?? 0) + amount;
  }

  return { ...state, inventory };
}
