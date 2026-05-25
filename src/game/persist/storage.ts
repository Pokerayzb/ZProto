import { createInitialState } from '@game/state/initialState';
import type { GameState } from '@game/state/types';

export const SAVE_VERSION = 1;

export const STORAGE_KEY = 'zproto:game';

export const SAVE_INTERVAL_MS = 5000;

export type SaveBlob = {
  version: number;
  state: GameState;
};

function isGameState(value: unknown): value is GameState {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

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
    professions: {
      ...initial.professions,
      ...state.professions,
    },
    nextQueueId: state.nextQueueId ?? Math.max(maxQueueId + 1, 1),
  };
}

export function saveState(state: GameState): void {
  const blob: SaveBlob = {
    version: SAVE_VERSION,
    state,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(blob));
}

export function loadState(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      return null;
    }

    const blob = JSON.parse(raw) as SaveBlob;
    if (blob.version !== SAVE_VERSION || !isGameState(blob.state)) {
      return null;
    }

    return normalizeLoadedState(blob.state);
  } catch {
    return null;
  }
}

export function clearSavedState(): void {
  localStorage.removeItem(STORAGE_KEY);
}
