import { initialLevelProgress } from '@game/progression';
import type { FactionId, GameState } from '@game/state/types';

export function createInitialState(): GameState {
  return {
    player: {
      name: 'Richard Bower',
      status: 'Newcomer',
      level: initialLevelProgress,
      gold: 0,
      reputation: {
        traders: 0,
        aristocrats: 0,
        mystics: 0,
        artisans: 0,
      } satisfies Record<FactionId, number>,
    },
    inventory: {},
    professions: {
      blacksmithing: { skills: { } },
      cooking: { skills: {} },
      carpentry: { skills: {} },
      forest: { skills: {} },
      mine: { skills: {} },
      river: { skills: {} },
    },
    taskQueue: [],
    currentTask: null,
    nextQueueId: 1,
    lastTickAt: 0,
  };
}
