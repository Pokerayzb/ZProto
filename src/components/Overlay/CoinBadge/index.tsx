import { Panel } from '@components/Panel';
import { useGameState } from '@game/hooks/useGameState';

import crownIcon from './assets/btn-crown.svg';

function formatGold(amount: number): string {
  return amount.toLocaleString('en-US').replace(/,/g, '\u00A0');
}

export function CoinBadge() {
  const gold = useGameState((state) => state.player.gold);

  return (
    <div className="shrink-0">
      <Panel layout="horizontal">
      <div
        className="flex shrink-0 items-center gap-3 px-2 py-1 text-button-text"
        aria-label={`Gold: ${gold}`}
      >
        <img
          className="size-6 shrink-0 object-contain"
          src={crownIcon}
          alt=""
          aria-hidden
          decoding="async"
        />
        <h2 className="-mt-1 min-w-[3ch] tabular-nums text-right">{formatGold(gold)}</h2>
      </div>
      </Panel>
    </div>
  );
}
