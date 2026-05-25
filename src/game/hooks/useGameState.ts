import { useRef, useSyncExternalStore } from 'react';

import { useGameEngine } from '@game/hooks/useGameEngine';
import type { GameState } from '@game/state/types';

export function useGameState<T>(selector: (state: GameState) => T): T {
  const engine = useGameEngine();
  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  const cacheRef = useRef<{ state: GameState; value: T } | null>(null);

  return useSyncExternalStore(
    (onStoreChange) => engine.subscribe(onStoreChange),
    () => {
      const state = engine.getState();

      if (cacheRef.current?.state === state) {
        return cacheRef.current.value;
      }

      const value = selectorRef.current(state);
      cacheRef.current = { state, value };
      return value;
    },
  );
}
