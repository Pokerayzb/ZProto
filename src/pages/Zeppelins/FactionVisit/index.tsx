import { type ReactNode } from 'react';
import { Book } from '@components/Book';
import { NewTag } from '@components/BurningDot';
import { Button } from '@components/Button';
import { Frame } from '@components/Frame';
import { Panel } from '@components/Panel';
import { LevelBadge } from '@components/LevelBadge';
import { ProgressBar } from '@components/ProgressBar';
import { ScrollArea } from '@components/ScrollArea';
import crownIcon from '@components/Overlay/CoinBadge/assets/btn-crown.svg';
import { useFactionVisit } from '@game/factions/useFactionVisit';
import {
  factions,
  factionOrder,
  type Faction,
  type FactionQuest,
  type FactionMilestone,
} from '@game/factions';

const surface = 'page-surface';

/** One panel, one button — full width at the bottom of a card frame. */
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

function CoinValue({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-xs font-bold">
      <img src={crownIcon} alt="" className="size-3.5 shrink-0 object-contain" aria-hidden />
      {value}
    </span>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 shrink-0 text-center font-serif text-xl font-bold tracking-wide text-page-text/80">
      {children}
    </h3>
  );
}

function QuestRewards({ reward }: { reward: FactionQuest['reward'] }) {
  const hasBlueprint = reward.blueprints > 0;

  return (
    <div className="flex w-full flex-col items-center gap-1 text-xs font-bold leading-snug text-page-text/75">
      <div className="flex items-center justify-center gap-3">
        <CoinValue value={reward.coins} />
        <span>+{reward.reputation} rep</span>
      </div>
      <span className={hasBlueprint ? '' : 'invisible'} aria-hidden={!hasBlueprint}>
        Blueprint ×{hasBlueprint ? reward.blueprints : 1}
      </span>
    </div>
  );
}

function TradeCard({
  icon,
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
      className="trade-card h-full min-h-0"
      contentClassName={`${surface} flex h-full min-h-0 flex-col gap-2 p-3 text-center`}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center gap-2">
        <div className="icon-slot size-16">
          <img src={icon} alt={name} className="size-full object-contain" />
        </div>
        <h4 className="line-clamp-2 font-serif text-sm font-bold leading-tight">{name}</h4>
        {sub && <span className="text-xs font-bold opacity-60">{sub}</span>}
        <CoinValue value={price} />
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
      className="quest-card h-full min-h-0"
      contentClassName={`${surface} flex h-full min-h-0 flex-col gap-2 p-3 text-center`}
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

function DetailedQuestCard({ quest }: { quest: FactionQuest }) {
  const done = quest.delivered >= quest.required;
  const started = quest.delivered > 0 && !done;
  const isNew = !started && !done;

  return (
    <Frame
      className="detailed-quest"
      contentClassName={`${surface} flex gap-3 p-3`}
    >
      <NewTag show={isNew}>
        <div className="icon-slot size-20 shrink-0">
          <img src={quest.icon} alt={quest.itemName} className="size-full object-contain" />
        </div>
      </NewTag>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h4 className="font-serif text-sm font-bold leading-tight">{quest.itemName}</h4>
        <p className="text-sm leading-snug opacity-75">{quest.description}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm opacity-70">Required: {quest.required}</span>
          <span className="font-mono text-sm font-bold tabular-nums">
            {quest.delivered} / {quest.required}
          </span>
        </div>
        <div className="mt-auto border-t border-border-subtle pt-1.5">
          <QuestRewards reward={quest.reward} />
        </div>
      </div>
    </Frame>
  );
}

function RewardChip({
  icon,
  name,
  kind,
  dimmed,
}: {
  icon: string;
  name: string;
  kind: string;
  dimmed: boolean;
}) {
  return (
    <div className={'flex min-w-0 flex-1 items-center gap-2 ' + (dimmed ? 'opacity-50' : '')}>
      <div className="icon-slot size-9 shrink-0">
        <img src={icon} alt={name} className="size-full object-contain" />
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="text-xs font-bold uppercase tracking-wider text-page-text/60">{kind}</span>
        <span className="truncate text-sm font-bold leading-tight">{name}</span>
      </div>
    </div>
  );
}

function MilestoneRow({ milestone, index }: { milestone: FactionMilestone; index: number }) {
  const { reached } = milestone;

  return (
    <Frame
      className={'milestone-row' + (reached ? ' selected' : '')}
      contentClassName={`${surface} flex items-center gap-3 p-2.5`}
    >
      <div className="flex shrink-0 flex-col items-center gap-0.5">
        <LevelBadge
          level={{ value: index + 1, progress: reached ? 1 : 0, target: 1 }}
          size="small"
          className={reached ? '' : 'opacity-disabled'}
        />
        <span className="font-mono text-[10px] font-bold opacity-55">{milestone.reputation}</span>
      </div>

      <div className="flex min-w-0 flex-1 gap-2">
        <RewardChip
          icon={milestone.blueprintReward.icon}
          name={milestone.blueprintReward.name}
          kind="Blueprint"
          dimmed={!reached}
        />
        <RewardChip
          icon={milestone.decorationReward.icon}
          name={milestone.decorationReward.name}
          kind="Decoration"
          dimmed={!reached}
        />
      </div>
    </Frame>
  );
}

function CaptainSidebar({ faction }: { faction: Faction }) {
  const repRatio =
    faction.reputation.next > 0
      ? faction.reputation.current / faction.reputation.next
      : 0;

  return (
    <div className="flex shrink-0 gap-4">
      <div className="size-36 shrink-0 overflow-hidden rounded-full border border-border-subtle bg-page-text/5">
        <img src={faction.portrait} alt={faction.name} className="size-full object-cover object-top" />
      </div>

      <div className="flex w-64 shrink-0 flex-col gap-2">
        <div className="px-0.5">
          <h3 className="font-serif text-lg font-bold leading-tight">{faction.name}</h3>
          <p className="text-xs opacity-60">Zeppelin captain</p>
        </div>
        <Frame contentClassName={`${surface} flex flex-col gap-1.5 p-2.5`}>
          <ProgressBar
            value={repRatio}
            size="small"
            label={`${faction.reputation.current} / ${faction.reputation.next}`}
          />
        </Frame>
        <Frame contentClassName={`${surface} flex items-center justify-between px-2.5 py-2`}>
          <span className="text-xs font-bold uppercase tracking-wider text-page-text/60">Standing</span>
          <span className="text-sm font-bold uppercase tracking-wide text-accent-cyan">
            {faction.reputation.label}
          </span>
        </Frame>
      </div>
    </div>
  );
}

function LorePanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Frame className="min-w-0 flex-1" contentClassName={`${surface} flex flex-col gap-2 p-4`}>
      <h3 className="text-center font-serif text-lg font-bold text-page-text/80">{title}</h3>
      <div className="font-serif text-sm italic leading-snug opacity-85">{children}</div>
    </Frame>
  );
}

/** Captain visit panel: quests and trade while docked. */
export function FactionPanelContent({ faction }: { faction: Faction }) {
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

/** Reputation browser: lore, quest details, and milestone rewards. */
export function FactionReputationContent({ faction }: { faction: Faction }) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="flex shrink-0 gap-4">
        <CaptainSidebar faction={faction} />
        <LorePanel title="What we know">
          <p>{faction.lore}</p>
        </LorePanel>
      </div>

      <div className="flex min-h-0 flex-1 gap-5">
        <div className="flex min-h-0 min-w-0 flex-[3] flex-col">
          <SectionHeading>Captain&apos;s errands</SectionHeading>
          <ScrollArea className="min-h-0 flex-1">
            <div className="book-scroll-list">
              {faction.quests.map((q) => (
                <DetailedQuestCard key={q.id} quest={q} />
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex min-h-0 min-w-0 flex-[2] flex-col border-l border-border-subtle pl-5">
          <SectionHeading>Reputation rewards</SectionHeading>
          <ScrollArea className="min-h-0 flex-1">
            <div className="book-scroll-list">
              {faction.milestones.map((m, i) => (
                <MilestoneRow key={m.reputation} milestone={m} index={i} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export function FactionVisit() {
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
          content: docked ? (
            <FactionPanelContent faction={faction} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="font-serif text-2xl font-bold text-page-text/70">Awaiting the zeppelin…</p>
              <p className="max-w-md text-sm text-page-text/50">
                When a zeppelin docks at your tower, the captain will appear here ready to trade
                and hand out errands.
              </p>
            </div>
          ),
        },
      ]}
    />
  );
}

export function FactionBrowser() {
  return (
    <Book
      name="Reputation"
      panels={factionOrder.map((id) => ({
        id,
        label: factions[id].name,
        icon: factions[id].crest,
        content: <FactionReputationContent faction={factions[id]} />,
      }))}
    />
  );
}
