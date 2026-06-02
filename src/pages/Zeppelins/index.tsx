import { type ReactNode } from 'react';
import { Book } from '@components/Book';
import { NewTag } from '@components/BurningDot';
import { Button } from '@components/Button';
import { Frame } from '@components/Frame';
import { Panel } from '@components/Panel';
import {
  CaptainSidebar,
  LorePanel,
  QuestRewards,
  SectionHeading,
} from '@components/Faction';
import { ValueBadge, coinIcon } from '@components/ValueBadge';
import { useFactionVisit } from '@game/factions/useFactionVisit';
import {
  factions,
  type Faction,
  type FactionQuest,
} from '@game/factions';

import { definePage } from '../definePage';

import background from './assets/background.png';
import icon from './assets/icon.png';

function CardAction({ children, disabled }: { children: ReactNode; disabled?: boolean }) {
  return (
    <Panel layout="horizontal" className="w-full shrink-0">
      <Button
        className="w-full min-w-0 font-bold text-l"
        {...(disabled !== undefined ? { disabled } : {})}
      >
        {children}
      </Button>
    </Panel>
  );
}

function TradeCard({
  icon: itemIcon,
  name,
  sub,
  price,
  action,
}: {
  icon: string;
  name: string;
  sub?: string;
  price: number;
  action: string;
}) {
  return (
    <Frame
      className="h-full min-h-0"
      contentClassName="page-surface flex h-full min-h-0 flex-col gap-2 p-3 text-center"
    >
      <div className="flex min-h-0 flex-1 flex-col items-center gap-2">
        <div className="icon-slot size-16">
          <img src={itemIcon} alt={name} className="size-full object-contain" />
        </div>
        <h4 className="line-clamp-2 font-serif text-sm font-bold leading-tight">{name}</h4>
        {sub && <span className="text-xs font-bold opacity-60">{sub}</span>}
        <ValueBadge icon={coinIcon} value={price} label="Price" />
      </div>
      <CardAction>{action}</CardAction>
    </Frame>
  );
}

function QuestCard({ quest }: { quest: FactionQuest }) {
  const done = quest.delivered >= quest.required;
  const started = quest.delivered > 0 && !done;

  return (
    <Frame
      className="h-full min-h-0"
      contentClassName="page-surface flex h-full min-h-0 flex-col gap-2 p-3 text-center"
    >
      <div className="flex min-h-0 flex-1 flex-col items-center gap-2">
        <h4 className="font-serif text-sm font-bold leading-tight">{quest.itemName}</h4>

        <NewTag show={!started && !done}>
          <div className="icon-slot size-24">
            <img src={quest.icon} alt={quest.itemName} className="size-full object-contain" />
          </div>
        </NewTag>

        <p className="text-sm leading-snug opacity-75">{quest.description}</p>
        <span className="font-mono text-lg font-bold tabular-nums">
          {quest.delivered} / {quest.required}
        </span>

        <div className="mt-auto flex w-full flex-col items-center gap-1 border-t border-border-subtle pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-page-text/60">Reward</h4>
          <QuestRewards reward={quest.reward} />
        </div>
      </div>

      {done ? (
        <CardAction disabled>Complete</CardAction>
      ) : (
        <CardAction>{started ? 'Turn in' : 'Accept'}</CardAction>
      )}
    </Frame>
  );
}

function visitPanel(faction: Faction) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="flex shrink-0 gap-4">
        <CaptainSidebar faction={faction} />
        <LorePanel title="Arrival">
          <span className="text-2xl leading-none opacity-40">“</span>
          {faction.quote}
        </LorePanel>
      </div>

      <div className="flex min-h-0 flex-1 gap-5">
        <div className="flex min-h-0 min-w-0 flex-[3] flex-col">
          <SectionHeading>Captain&apos;s errands</SectionHeading>
          <div className="grid min-h-0 flex-1 grid-cols-4 items-stretch gap-3">
            {faction.quests.slice(0, 4).map((q) => (
              <QuestCard key={q.id} quest={q} />
            ))}
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-[2] flex-col border-l border-border-subtle pl-5">
          <SectionHeading>Trade</SectionHeading>
          <div className="grid min-h-0 flex-1 grid-cols-2 items-stretch gap-4">
            <div className="grid h-full min-h-0 grid-cols-2 grid-rows-2 items-stretch gap-2">
              {faction.buying.slice(0, 4).map((g) => (
                <TradeCard
                  key={g.itemId}
                  icon={g.icon}
                  name={g.name}
                  sub={`×${g.quantity}`}
                  price={g.price}
                  action="Sell"
                />
              ))}
            </div>
            <div className="grid h-full min-h-0 grid-cols-2 grid-rows-2 items-stretch gap-2 border-l border-border-subtle pl-4">
              {faction.goods.slice(0, 4).map((g) => (
                <TradeCard
                  key={g.itemId}
                  icon={g.icon}
                  name={g.name}
                  sub={`×${g.quantity}`}
                  price={g.price}
                  action="Buy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function awaitingDock() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
      <p className="font-serif text-2xl font-bold text-page-text/70">Awaiting the zeppelin…</p>
      <p className="max-w-md text-sm text-page-text/50">
        When a zeppelin docks at your tower, the captain will appear here ready to trade
        and hand out errands.
      </p>
    </div>
  );
}

function ZeppelinsBook() {
  const visit = useFactionVisit();
  const docked = visit.phase === 'docked';
  const faction = factions[visit.factionId];

  return (
    <Book
      name="Zeppelins"
      panels={[
        {
          id: 'visit',
          label: faction.name,
          content: docked ? visitPanel(faction) : awaitingDock(),
        },
      ]}
    />
  );
}

export const zeppelinsPage = definePage({
  id: "zeppelins",
  path: "/zeppelins",
  title: "Zeppelins",
  icon,
  background,
  children: <ZeppelinsBook />,
});
