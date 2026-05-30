import { useEffect, useMemo, type ReactNode } from 'react';

import { GameContext } from '@game/context/GameContext';
import { createEngine } from '@game/engine/createEngine';
import { Award } from '@game/events/Award';
import { LearnSkill } from '@game/events/LearnSkill';
import type { GameEvent } from '@game/events/GameEvent';
import { saveState } from '@game/persist/storage';

const storageInterval = 5000;

export interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const engine = useMemo(() => createEngine(), []);

  useEffect(() => {
    engine.start();

    const saveIntervalId = setInterval(() => {
      saveState(engine.getState());
    }, storageInterval);

    if (import.meta.env.DEV) {
      window.__zproto = {
        dispatch: (event: GameEvent) => {
          engine.dispatch(event);
        },
        getState: () => engine.getState(),
        Award,
        LearnSkill,
      };
    }

    return () => {
      clearInterval(saveIntervalId);
      engine.stop();
      if (import.meta.env.DEV) {
        delete window.__zproto;
      }
    };
  }, [engine]);

  const value = useMemo(() => ({ engine }), [engine]);

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  );
}
