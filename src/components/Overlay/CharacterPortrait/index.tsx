import { LevelBadge } from '@components/LevelBadge';
import { ProgressBar } from '@components/ProgressBar';
import { CoinBadge } from '@components/Overlay/CoinBadge';
import { Portrait } from '@components/Portrait';
import { useGameState } from '@game/hooks/useGameState';

import type { CharacterPortraitProps } from './types';

export function CharacterPortrait({ className }: CharacterPortraitProps = {}) {
  const name = useGameState((state) => state.player.name);
  const status = useGameState((state) => state.player.status);
  const level = useGameState((state) => state.player.level);
  const levelRatio =
    level.target > 0 ? level.progress / level.target : 0;
  const levelLabel = `${String(level.progress)}/${String(level.target)}`;

  const classes =
    'flex w-max items-center gap-3 text-button-text' +
    (className ? ' ' + className : '');

  return (
    <div className={classes}>
      <Portrait className="character-portrait">
        <div className="absolute bottom-0 right-0 z-2">
          <LevelBadge level={level} size="large" />
        </div>
      </Portrait>
      <div className="flex items-center gap-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <h1 className="m-0 whitespace-nowrap">{name}</h1>
          <h3 className="m-0 whitespace-nowrap text-button-text/70">{status || '\u00A0'}</h3>
          <ProgressBar
            value={levelRatio}
            size="large"
            label={levelLabel}
            className="min-w-44"
          />
        </div>
        <CoinBadge />
      </div>
    </div>
  );
}

export type { CharacterPortraitProps } from './types';
