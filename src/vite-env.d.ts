/// <reference types="vite/client" />

import type { Award } from '@game/events/Award';
import type { LearnSkill } from '@game/events/LearnSkill';
import type { GameEvent } from '@game/events/GameEvent';
import type { GameState } from '@game/state/types';

interface ZProtoDevTools {
  dispatch: (event: GameEvent) => void;
  getState: () => GameState;
  Award: typeof Award;
  LearnSkill: typeof LearnSkill;
}

declare global {
  interface Window {
    __zproto?: ZProtoDevTools;
  }
}

export {};
