import { GameEngine } from '@game/engine/GameEngine';
import { gameLibrary } from '@game/library/gameLibrary';
import { applyOfflineProgress } from '@game/persist/offline';
import { loadState } from '@game/persist/storage';
import { createInitialState } from '@game/state/initialState';
import type { GameState } from '@game/state/types';

export function createEngine(state?: GameState): GameEngine {
  const base = state ?? loadState() ?? createInitialState();
  const ready = applyOfflineProgress(base, Date.now(), gameLibrary);

  return new GameEngine(ready, gameLibrary);
}
