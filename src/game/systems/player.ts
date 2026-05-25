import { applyExperience } from '@game/progression';
import type { GameState } from '@game/state/types';

export function addPlayerGold(state: GameState, gold: number): GameState {
  if (gold === 0) {
    return state;
  }

  return {
    ...state,
    player: {
      ...state.player,
      gold: Math.max(0, state.player.gold + gold),
    },
  };
}

export function addPlayerExperience(
  state: GameState,
  experience: number,
): GameState {
  if (experience === 0) {
    return state;
  }

  return {
    ...state,
    player: {
      ...state.player,
      level: applyExperience(state.player.level, experience),
    },
  };
}
