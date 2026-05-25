import { useCallback } from 'react';

import type { GameEvent } from '@game/events/GameEvent';
import { useGameEngine } from '@game/hooks/useGameEngine';

export function useGameDispatch(): (event: GameEvent) => void {
  const engine = useGameEngine();

  return useCallback(
    (event: GameEvent) => {
      engine.dispatch(event);
    },
    [engine],
  );
}
