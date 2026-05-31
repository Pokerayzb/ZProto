import { useContext } from 'react';

import { GameStageContext } from './GameStageContext';

/**
 * Access the shared Pixi world. Returns `null` until the Application has
 * finished its async init, so callers must guard for it.
 */
export function useGameStage() {
  return useContext(GameStageContext);
}
