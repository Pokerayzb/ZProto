import { useContext } from 'react';

import { GameContext } from '@game/context/GameContext';
import type { GameEngine } from '@game/engine/GameEngine';

export function useGameEngine(): GameEngine {
  const context = useContext(GameContext);

  if (context === null) {
    throw new Error('useGameEngine must be used within GameProvider');
  }

  return context.engine;
}
