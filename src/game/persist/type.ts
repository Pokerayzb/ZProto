import type { GameState } from '@game/state/types';

export type SaveBlob = {
    version: number;
    state: GameState;
};
