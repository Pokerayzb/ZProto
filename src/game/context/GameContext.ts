import { createContext } from 'react';

import type { GameEngine } from '@game/engine/GameEngine';

export interface GameContextValue {
  engine: GameEngine;
}

export const GameContext = createContext<GameContextValue | null>(null);
