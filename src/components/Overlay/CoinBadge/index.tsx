import { Panel } from '@components/Panel';
import { coinIcon, formatResourceValue } from '@components/ValueBadge';
import { useGameState } from '@game/hooks/useGameState';

export interface CoinBadgeProps {
  className?: string;
}

export function CoinBadge({ className }: CoinBadgeProps = {}) {
  const gold = useGameState((state) => state.player.gold);

  const classes = 'shrink-0' + (className ? ' ' + className : '');

  return (
    <div className={classes}>
      <Panel layout="horizontal">
        <div
          className="flex shrink-0 items-center justify-center gap-3 px-2 py-1 text-button-text"
          aria-label={`Gold: ${gold}`}
        >
          <img
            className="size-6 shrink-0 object-contain"
            src={coinIcon}
            alt=""
            aria-hidden
            decoding="async"
          />
          <h2 className="-mt-1 min-w-[3ch] tabular-nums text-right">{formatResourceValue(gold)}</h2>
        </div>
      </Panel>
    </div>
  );
}
