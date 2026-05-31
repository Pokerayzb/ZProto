import { useEffect, useState, type ReactNode } from 'react';
import { Frame } from '@components/Frame';
import { useNavigation } from '@navigation/useNavigation';
import { useFactionVisit } from '@game/factions/useFactionVisit';
import { BurningDot } from '@components/Book/BurningDot';
import '@components/Book/index.css';
import frameName from '@components/Book/assets/frame_name.png';
import frameNameActive from '@components/Book/assets/frame_name_add.png';
import {
  factionOrder,
  factions,
  type Faction,
  type FactionId,
  type FactionQuest,
  type FactionMilestone,
} from '@game/factions';

function CoinValue({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-button-text">
      <span className="inline-block size-3 rounded-full bg-button-text/80" aria-hidden />
      {value}
    </span>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 text-center font-serif text-xl font-bold tracking-wide text-page-text/80">
      {children}
    </h3>
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
    <Frame className="flex flex-col items-center gap-0.5 border border-page-text/10 bg-page-text/10 px-5 py-2.5 text-center">
      <div className="flex size-20 items-center justify-center rounded border border-page-text/10 bg-page-text/15 p-2">
        <img src={icon} alt={name} className="size-full object-contain" />
      </div>
      <h4 className="line-clamp-2 font-serif text-sm font-bold leading-tight">{name}</h4>
      {sub && <span className="text-xs font-bold text-page-text/60">{sub}</span>}
      <CoinValue value={price} />
      <button
        type="button"
        className="mt-1 w-full cursor-pointer rounded border border-button-text/40 bg-button-bg px-2 py-1 text-xs font-bold text-button-text transition-colors hover:bg-button-bg/80"
      >
        {action}
      </button>
    </Frame>
  );
}

function QuestCard({ quest }: { quest: FactionQuest }) {
  const done = quest.delivered >= quest.required;
  const started = quest.delivered > 0 && !done;
  return (
    <Frame className="relative flex flex-col items-center gap-2 border border-page-text/10 bg-page-text/10 p-3 text-center">
      {!started && !done && (
        <span className="absolute left-2 top-2 rounded bg-accent-cyan px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-page-bg">
          Новое
        </span>
      )}

      <h4 className="font-serif text-sm font-bold leading-tight">{quest.itemName}</h4>

      <div className="flex size-34 items-center justify-center rounded border border-page-text/10 bg-page-text/15 p-2">
        <img src={quest.icon} alt={quest.itemName} className="size-full object-contain" />
      </div>

      <p className="text-[11px] leading-tight text-page-text/65">Принесите: {quest.itemName}</p>
      <span className="font-mono text-lg font-bold text-page-text/75">
        {quest.delivered} / {quest.required}
      </span>

      <div className="mt-auto flex w-full flex-col items-center gap-1 border-t border-page-text/10 pt-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-page-text/45">
          Награда
        </span>
        <div className="flex items-center gap-4 text-xs font-bold text-page-text/75">
          <span className="inline-flex items-center gap-1">
            <span className="inline-block size-3.5 rounded-full bg-button-text/70" aria-hidden />
            {quest.reward.coins}
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="inline-block size-3.5 rounded-sm bg-accent-cyan/70" aria-hidden />
            +{quest.reward.reputation}
          </span>
        </div>
      </div>

      {done ? (
        <span className="w-full translate-y-5 rounded border border-accent-cyan/50 bg-accent-cyan/10 px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-cyan">
          Выполнено
        </span>
      ) : (
        <button
          type="button"
          className={
            'w-full translate-y-5 cursor-pointer rounded border px-2 py-1.5 text-sm font-bold transition-colors ' +
            (started
              ? 'border-green-500/60 bg-green-600 text-white hover:bg-green-500'
              : 'border-button-text/40 bg-button-bg text-button-text hover:bg-button-bg/80')
          }
        >
          {started ? 'Сдать' : 'Взять'}
        </button>
      )}
    </Frame>
  );
}

/** The full captain window for a single faction (no tabs). */
export function FactionPanelContent({ faction }: { faction: Faction }) {
  const repPct = Math.min(
    100,
    Math.round((faction.reputation.current / faction.reputation.next) * 100),
  );

  return (
    <>
      {/* TOP: captain header — portrait, info, arrival */}
      <div className="flex shrink-0 gap-4">
        <div className="size-36 shrink-0 overflow-hidden rounded-full border border-page-text/15 bg-page-text/5">
          <img src={faction.portrait} alt={faction.name} className="size-full object-cover object-top" />
        </div>

        {/* Captain info */}
        <div className="flex w-64 shrink-0 flex-col gap-2">
          <div className="px-0.5">
            <h3 className="font-serif text-lg font-bold leading-tight">{faction.name}</h3>
            <p className="text-xs text-page-text/60">Капитан дирижабля</p>
          </div>
          <Frame className="flex flex-col gap-1.5 border border-page-text/10 bg-page-text/5 p-2.5">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-page-text/55">
                Репутация
              </span>
              <span className="font-mono text-xs font-bold text-page-text/70">
                {faction.reputation.current} / {faction.reputation.next}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full border border-page-text/15 bg-page-text/10">
              <div className="h-full rounded-full bg-accent-cyan" style={{ width: `${repPct}%` }} />
            </div>
          </Frame>
          <Frame className="flex items-center justify-between border border-page-text/10 bg-page-text/5 px-2.5 py-2">
            <span className="text-xs font-bold uppercase tracking-wider text-page-text/55">
              Отношение
            </span>
            <span className="text-sm font-bold uppercase tracking-wide text-accent-cyan">
              {faction.reputation.label}
            </span>
          </Frame>
        </div>

        {/* Arrival */}
        <Frame className="flex flex-1 flex-col gap-2 border border-page-text/10 bg-page-text/5 p-4">
          <h3 className="text-center font-serif text-lg font-bold text-page-text/80">Прибытие</h3>
          <p className="font-serif text-sm italic leading-snug text-page-text/85">
            <span className="mr-1 font-serif text-2xl leading-none text-page-text/40">“</span>
            {faction.quote}
          </p>
        </Frame>
      </div>

      {/* BOTTOM: quests + trade */}
      <div className="flex min-h-0 flex-1 gap-5">
        {/* Quests */}
        <div className="flex min-h-0 min-w-0 flex-[3] flex-col">
          <SectionHeading>Поручения капитана</SectionHeading>
          <div className="grid min-h-0 flex-1 grid-cols-4 grid-rows-1 gap-3">
            {faction.quests.slice(0, 4).map((q) => (
              <QuestCard key={q.id} quest={q} />
            ))}
          </div>
        </div>

        {/* Trade */}
        <div className="flex min-h-0 min-w-0 flex-[2] flex-col border-l border-page-text/15 pl-5">
          <SectionHeading>Торговля</SectionHeading>
          <div className="min-h-0 flex-1">
            <div className="grid grid-cols-2 gap-6">
              {/* Sell to captain */}
              <div className="pr-3">
                <div className="grid grid-cols-2 gap-2">
                  {faction.buying.slice(0, 4).map((g) => (
                    <TradeCard
                      key={g.itemId}
                      icon={g.icon}
                      name={g.name}
                      sub={`x${g.quantity}`}
                      price={g.price}
                      action="Продать"
                    />
                  ))}
                </div>
              </div>

              {/* Buy from captain */}
              <div className="border-l border-page-text/15 pl-3">
                <div className="grid grid-cols-2 gap-2">
                  {faction.goods.slice(0, 4).map((g) => (
                    <TradeCard
                      key={g.itemId}
                      icon={g.icon}
                      name={g.name}
                      sub={`x${g.quantity}`}
                      price={g.price}
                      action="Купить"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/** Small coloured reward pill (coins / reputation / blueprints). */
function RewardPills({ reward }: { reward: FactionQuest['reward'] }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-page-text/75">
      <span className="inline-flex items-center gap-1">
        <span className="inline-block size-3.5 rounded-full bg-button-text/70" aria-hidden />
        {reward.coins}
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="inline-block size-3.5 rounded-sm bg-accent-cyan/70" aria-hidden />
        +{reward.reputation}
      </span>
      {reward.blueprints > 0 && (
        <span className="inline-flex items-center gap-1">
          <span className="inline-block size-3.5 rounded-sm border border-page-text/50 bg-page-text/20" aria-hidden />
          Чертёж ×{reward.blueprints}
        </span>
      )}
    </div>
  );
}

/** Detailed quest card for the reputation page (text + requirement + rewards). */
function DetailedQuestCard({ quest }: { quest: FactionQuest }) {
  const done = quest.delivered >= quest.required;
  const started = quest.delivered > 0 && !done;
  const status = done ? 'Выполнено' : started ? 'В процессе' : 'Новое';
  const statusClass = done
    ? 'border-accent-cyan/50 bg-accent-cyan/10 text-accent-cyan'
    : started
      ? 'border-green-500/50 bg-green-600/15 text-green-400'
      : 'border-page-text/25 bg-page-text/10 text-page-text/60';

  return (
    <Frame className="flex gap-3 border border-page-text/10 bg-page-text/10 p-3">
      <div className="flex size-20 shrink-0 items-center justify-center rounded border border-page-text/10 bg-page-text/15 p-1.5">
        <img src={quest.icon} alt={quest.itemName} className="size-full object-contain" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-serif text-sm font-bold leading-tight">{quest.itemName}</h4>
          <span
            className={
              'shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ' +
              statusClass
            }
          >
            {status}
          </span>
        </div>
        <p className="text-[11px] leading-snug text-page-text/65">{quest.description}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-page-text/70">
            Требуется: {quest.itemName}
          </span>
          <span className="font-mono text-sm font-bold text-page-text/80">
            {quest.delivered} / {quest.required}
          </span>
        </div>
        <div className="mt-auto border-t border-page-text/10 pt-1.5">
          <RewardPills reward={quest.reward} />
        </div>
      </div>
    </Frame>
  );
}

/** One reputation milestone: threshold + blueprint reward + decoration reward. */
function MilestoneRow({ milestone, index }: { milestone: FactionMilestone; index: number }) {
  const { reached } = milestone;
  return (
    <Frame
      className={
        'flex items-center gap-3 border p-2.5 ' +
        (reached
          ? 'border-accent-cyan/40 bg-accent-cyan/10'
          : 'border-page-text/10 bg-page-text/5')
      }
    >
      {/* Milestone marker */}
      <div className="flex shrink-0 flex-col items-center gap-0.5">
        <span
          className={
            'flex size-7 items-center justify-center rounded-full border text-xs font-bold ' +
            (reached
              ? 'border-accent-cyan bg-accent-cyan text-page-bg'
              : 'border-page-text/30 bg-page-text/10 text-page-text/60')
          }
        >
          {index + 1}
        </span>
        <span className="font-mono text-[10px] font-bold text-page-text/55">
          {milestone.reputation}
        </span>
      </div>

      {/* Two rewards */}
      <div className="flex min-w-0 flex-1 gap-2">
        <RewardChip
          icon={milestone.blueprintReward.icon}
          name={milestone.blueprintReward.name}
          kind="Чертёж"
          dimmed={!reached}
        />
        <RewardChip
          icon={milestone.decorationReward.icon}
          name={milestone.decorationReward.name}
          kind="Украшение"
          dimmed={!reached}
        />
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
    <div
      className={
        'flex min-w-0 flex-1 items-center gap-2 rounded border border-page-text/10 bg-page-text/10 p-1.5 ' +
        (dimmed ? 'opacity-50' : '')
      }
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded border border-page-text/10 bg-page-text/15 p-1">
        <img src={icon} alt={name} className="size-full object-contain" />
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="text-[9px] font-bold uppercase tracking-wider text-page-text/45">
          {kind}
        </span>
        <span className="truncate text-[11px] font-bold leading-tight text-page-text/80">
          {name}
        </span>
      </div>
    </div>
  );
}

/** Reputation-page panel: captain header + lore + detailed quests + milestones. */
export function FactionReputationContent({ faction }: { faction: Faction }) {
  const repPct = Math.min(
    100,
    Math.round((faction.reputation.current / faction.reputation.next) * 100),
  );

  return (
    <>
      {/* TOP: captain header — portrait, reputation, lore */}
      <div className="flex shrink-0 gap-4">
        <div className="size-36 shrink-0 overflow-hidden rounded-full border border-page-text/15 bg-page-text/5">
          <img src={faction.portrait} alt={faction.name} className="size-full object-cover object-top" />
        </div>

        {/* Captain info */}
        <div className="flex w-64 shrink-0 flex-col gap-2">
          <div className="px-0.5">
            <h3 className="font-serif text-lg font-bold leading-tight">{faction.name}</h3>
            <p className="text-xs text-page-text/60">Капитан дирижабля</p>
          </div>
          <Frame className="flex flex-col gap-1.5 border border-page-text/10 bg-page-text/5 p-2.5">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-page-text/55">
                Репутация
              </span>
              <span className="font-mono text-xs font-bold text-page-text/70">
                {faction.reputation.current} / {faction.reputation.next}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full border border-page-text/15 bg-page-text/10">
              <div className="h-full rounded-full bg-accent-cyan" style={{ width: `${repPct}%` }} />
            </div>
          </Frame>
          <Frame className="flex items-center justify-between border border-page-text/10 bg-page-text/5 px-2.5 py-2">
            <span className="text-xs font-bold uppercase tracking-wider text-page-text/55">
              Отношение
            </span>
            <span className="text-sm font-bold uppercase tracking-wide text-accent-cyan">
              {faction.reputation.label}
            </span>
          </Frame>
        </div>

        {/* Lore / what we know */}
        <Frame className="flex flex-1 flex-col gap-2 border border-page-text/10 bg-page-text/5 p-4">
          <h3 className="text-center font-serif text-lg font-bold text-page-text/80">Что мы знаем</h3>
          <p className="font-serif text-sm italic leading-snug text-page-text/85">
            {faction.lore}
          </p>
        </Frame>
      </div>

      {/* BOTTOM: detailed quests + reputation milestones */}
      <div className="flex min-h-0 flex-1 gap-5">
        {/* Quests */}
        <div className="flex min-h-0 min-w-0 flex-[3] flex-col">
          <SectionHeading>Поручения капитана</SectionHeading>
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
            {faction.quests.map((q) => (
              <DetailedQuestCard key={q.id} quest={q} />
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="flex min-h-0 min-w-0 flex-[2] flex-col border-l border-page-text/15 pl-5">
          <SectionHeading>Награды за репутацию</SectionHeading>
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
            {faction.milestones.map((m, i) => (
              <MilestoneRow key={m.reputation} milestone={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/** Top faction selector tabs. */
export function FactionTabs({
  activeId,
  onSelect,
}: {
  activeId: FactionId;
  onSelect: (id: FactionId) => void;
}) {
  const tabWidthPercent = 100 / factionOrder.length;
  return (
    <div className="book-tabs relative z-20 flex justify-center gap-1">
      {factionOrder.map((id) => {
        const f = factions[id];
        const isActive = id === activeId;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className="book-tab relative flex cursor-pointer items-end justify-center text-button-text transition-all"
            style={{
              width: `${tabWidthPercent}%`,
              ['--book-tab-bg' as string]: `url(${isActive ? frameNameActive : frameName})`,
            }}
          >
            {isActive && <BurningDot />}
            <span className="flex items-center gap-2 pb-2">
              <img src={f.crest} alt="" className="size-7 object-contain" />
              <span className="font-serif text-xl font-bold leading-none">{f.name}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Shared book-window shell. */
function FactionWindow({ tabs, children }: { tabs?: ReactNode; children: ReactNode }) {
  return (
    <div className="box-border flex h-dvh flex-col px-[var(--book-inset-x)] pt-[var(--book-inset-top)] pb-[var(--book-inset-bottom)]">
      <div className="book-wrapper mx-auto flex min-h-0 w-full max-w-[var(--book-max-width)] flex-1 flex-col">
        {tabs}
        <div className="book relative z-0 min-h-0 flex-1">
          <div className="page page-surface h-full">
            <div className="inner flex h-full min-h-0 flex-col gap-3 p-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Zeppelins page — shows only the faction that is currently docked. When no
 * zeppelin is at the dock, shows a waiting message.
 */
export function FactionVisit() {
  const visit = useFactionVisit();
  const docked = visit.phase === 'docked';
  const faction = factions[visit.factionId];

  return (
    <FactionWindow>
      {docked ? (
        <FactionPanelContent faction={faction} />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
          <p className="font-serif text-2xl font-bold text-page-text/70">
            Ждём прибытия дирижабля…
          </p>
          <p className="max-w-md text-sm text-page-text/50">
            Когда дирижабль причалит к башне, здесь появится капитан, готовый к торговле и
            поручениям.
          </p>
        </div>
      )}
    </FactionWindow>
  );
}

/**
 * Reputation page — browse every faction via the top tabs.
 */
export function FactionBrowser() {
  const { pageOptions } = useNavigation();
  const [activeFactionId, setActiveFactionId] = useState<FactionId>(
    pageOptions?.factionId ?? 'workers',
  );

  const requestedFactionId = pageOptions?.factionId;
  useEffect(() => {
    if (requestedFactionId) {
      setActiveFactionId(requestedFactionId);
    }
  }, [requestedFactionId]);

  const faction = factions[activeFactionId];

  return (
    <FactionWindow tabs={<FactionTabs activeId={activeFactionId} onSelect={setActiveFactionId} />}>
      <FactionReputationContent faction={faction} />
    </FactionWindow>
  );
}
