import type { GameState } from '@game/state/types';

export interface SaveBlob<TState = GameState> {
  version: number;
  state: TState;
}
