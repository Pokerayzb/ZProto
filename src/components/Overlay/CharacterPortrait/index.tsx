import { LevelBadge } from '@components/LevelBadge';
import { CoinBadge } from '@components/Overlay/CoinBadge';
import { useGameState } from '@game/hooks/useGameState';

import avatarFrame from './assets/big_butt_skill.png';

import type { CharacterPortraitProps } from './types';

export function CharacterPortrait({ className }: CharacterPortraitProps = {}) {
  const name = useGameState((state) => state.player.name);
  const status = useGameState((state) => state.player.status);
  const level = useGameState((state) => state.player.level);

  const classes =
    'flex w-max items-center gap-3 text-button-text' +
    (className ? ' ' + className : '');

  return (
    <div className={classes}>
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
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="m-0 whitespace-nowrap">{name}</h1>
          <h3 className="m-0 whitespace-nowrap text-button-text/70">{status || '\u00A0'}</h3>
        </div>
        <CoinBadge />
      </div>
    </div>
  );
}

export type { CharacterPortraitProps } from './types';
