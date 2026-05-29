import { createInitialState } from '@game/state/initialState';
import type { GameState } from '@game/state/types';

import type { SaveBlob } from './type';
import { migrate, version } from './migration';

const storageKey = 'zproto:game';

function isGameState(value: unknown): value is GameState {
  if (typeof value !== 'object' || value === null)
    return false;

  const state = value as GameState;

  return (
    typeof state.player === 'object' &&
    state.player !== null &&
    typeof state.professions === 'object' &&
    state.professions !== null &&
    Array.isArray(state.taskQueue) &&
    (state.currentTask === null || typeof state.currentTask === 'object')
  );
}

function normalizeLoadedState(state: GameState): GameState {
  const initial = createInitialState();
  const maxQueueId = state.taskQueue.reduce(
    (max, task) => Math.max(max, task.id),
    0,
  );

  return {
    ...initial,
    ...state,
    player: {
      ...initial.player,
      ...state.player,
      reputation: {
        ...initial.player.reputation,
        ...state.player.reputation,
      },
    },
    inventory: {
      ...initial.inventory,
      ...state.inventory,
    },
    professions: {
      ...initial.professions,
      ...state.professions,
    },
    nextQueueId: state.nextQueueId ?? Math.max(maxQueueId + 1, 1),
  };
}

export function saveState(state: GameState): void {
  localStorage.setItem(
    storageKey,
    JSON.stringify({ state, version } satisfies SaveBlob)
  );
}

export function loadState(): GameState | null {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw === null)
      return null;

    const blob = JSON.parse(raw);
    const state = migrate(blob);
    if (!state || !isGameState(state))
      return null;

    return normalizeLoadedState(state);
  } catch {
    return null;
  }
}

export function clearSavedState(): void {
  localStorage.removeItem(storageKey);
}
