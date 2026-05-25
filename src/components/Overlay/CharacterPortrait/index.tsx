import { LevelBadge } from '@components/LevelBadge';
import { useGameState } from '@game/hooks/useGameState';

import avatarFrame from './assets/big_butt_skill.png';

export function CharacterPortrait() {
  const name = useGameState((state) => state.player.name);
  const status = useGameState((state) => state.player.status);
  const level = useGameState((state) => state.player.level);

  return (
    <div className="flex items-center gap-3 text-button-text">
      <div className="relative shrink-0 overflow-visible">
        <div className="relative h-40">
          <div className="absolute bottom-0 right-0 z-2">
            <LevelBadge level={level} size="large" />
          </div>
          <img
            className="relative z-1 size-full object-contain pointer-events-none"
            src={avatarFrame}
            alt=""
            aria-hidden
            decoding="async"
          />
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <h2 className="m-0 truncate">{name}</h2>
        <h3 className="m-0 truncate text-button-text/70">{status || '\u00A0'}</h3>
      </div>
    </div>
  );
}

export type { CharacterPortraitProps } from './types';
