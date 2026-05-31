import { useEffect, useState, type ReactNode } from 'react';
import { Frame } from '@components/Frame';
import { ScrollArea } from '@components/ScrollArea';
import { useNavigation } from '@navigation/useNavigation';
import { BurningDot } from '@components/Book/BurningDot';
import '@components/Book/index.css';
import frameName from '@components/Book/assets/frame_name.png';
import frameNameActive from '@components/Book/assets/frame_name_add.png';
import {
  factionOrder,
  factions,
  type FactionGood,
  type FactionId,
  type FactionQuest,
} from '@game/factions';

type TabId = 'buy' | 'sell' | 'blueprints' | 'quests';

const TABS: Array<{ id: TabId; label: string }> = [
  { id: 'buy', label: 'Купить' },
  { id: 'sell', label: 'Продать' },
  { id: 'blueprints', label: 'Чертежи' },
  { id: 'quests', label: 'Задания' },
];

function CoinValue({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-sm font-bold text-button-text">
      <span className="inline-block size-3.5 rounded-full bg-button-text/80" aria-hidden />
      {value}
    </span>
  );
}

function GoodCard({ good, action }: { good: FactionGood; action: string }) {
  return (
    <Frame className="flex flex-col items-center gap-1 border border-page-text/10 bg-page-text/10 p-3 text-center">
      <div className="flex size-14 items-center justify-center rounded border border-page-text/10 bg-page-text/15 p-1">
        <img src={good.icon} alt={good.name} className="size-full object-contain" />
      </div>
      <h4 className="mt-1 line-clamp-2 font-serif text-sm font-bold leading-tight">{good.name}</h4>
      <span className="text-xs font-bold text-page-text/60">x{good.quantity}</span>
      <CoinValue value={good.price} />
      <button
        type="button"
        className="mt-1 w-full cursor-pointer rounded border border-button-text/40 bg-button-bg px-2 py-1 text-xs font-bold text-button-text transition-colors hover:bg-button-bg/80"
      >
        {action}
      </button>
    </Frame>
  );
}

function RewardRow({ quest }: { quest: FactionQuest }) {
  return (
    <div className="flex items-center justify-end gap-4 text-xs font-bold text-page-text/75">
      <span className="inline-flex items-center gap-1">
        <span className="inline-block size-3 rounded-full bg-button-text/70" aria-hidden />
        {quest.reward.coins}
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="inline-block size-3 rounded-sm bg-accent-cyan/70" aria-hidden />
        +{quest.reward.reputation}
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="inline-block size-3 rounded-sm bg-page-text/40" aria-hidden />
        x{quest.reward.blueprints}
      </span>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-page-text/55">{children}</h4>
  );
}

export function FactionVisit() {
  const { pageOptions } = useNavigation();
  const [activeFactionId, setActiveFactionId] = useState<FactionId>(
    pageOptions?.factionId ?? 'workers',
  );
  const [activeTab, setActiveTab] = useState<TabId>('buy');

  // Sync selection when the player jumps here from the visit status box while
  // the page is already mounted.
  const requestedFactionId = pageOptions?.factionId;
  useEffect(() => {
    if (requestedFactionId) {
      setActiveFactionId(requestedFactionId);
    }
  }, [requestedFactionId]);

  const faction = factions[activeFactionId];
  const repPct = Math.min(100, Math.round((faction.reputation.current / faction.reputation.next) * 100));
  const tabWidthPercent = 100 / factionOrder.length;

  return (
    <div className="box-border flex h-dvh flex-col px-[var(--book-inset-x)] pt-[var(--book-inset-top)] pb-[var(--book-inset-bottom)]">
      <div className="book-wrapper mx-auto flex min-h-0 w-full max-w-[var(--book-max-width)] flex-1 flex-col">
        {/* Faction tabs */}
        <div className="book-tabs relative z-20 flex justify-center gap-1">
          {factionOrder.map((id) => {
            const f = factions[id];
            const isActive = id === activeFactionId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveFactionId(id)}
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

        {/* Book panel */}
        <div className="book relative z-0 min-h-0 flex-1">
          <div className="page page-surface h-full">
            <div className="inner flex h-full min-h-0 flex-col gap-3 p-4">
              {/* Representative + quote */}
              <div className="flex shrink-0 gap-4">
                <div className="h-36 w-48 shrink-0 overflow-hidden rounded-lg border border-page-text/15 bg-page-text/5">
                  <img
                    src={faction.portrait}
                    alt={faction.name}
                    className="size-full object-cover object-top"
                  />
                </div>
                <Frame className="flex flex-1 items-center border border-page-text/10 bg-page-text/5 p-5">
                  <p className="font-serif text-lg italic leading-snug text-page-text/85">
                    <span className="mr-1 font-serif text-3xl leading-none text-page-text/40">“</span>
                    {faction.quote}
                  </p>
                </Frame>
              </div>

              {/* Sub-tabs */}
              <div className="flex shrink-0 gap-2">
                {TABS.map((tab) => {
                  const isActive = tab.id === activeTab;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={
                        'cursor-pointer rounded-lg border px-5 py-2 font-serif text-base font-bold transition-colors ' +
                        (isActive
                          ? 'border-button-text/70 bg-button-bg text-button-text'
                          : 'border-page-text/15 bg-page-bg/60 text-page-text/70 hover:text-page-text')
                      }
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab content */}
              <div className="min-h-0 flex-1">
                <ScrollArea>
                  <div className="pr-1">
                    {activeTab === 'buy' && (
                      <>
                        <SectionTitle>Товары фракции</SectionTitle>
                        <div className="grid grid-cols-4 gap-3">
                          {faction.goods.map((g) => (
                            <GoodCard key={g.itemId} good={g} action="Купить" />
                          ))}
                        </div>
                      </>
                    )}

                    {activeTab === 'sell' && (
                      <>
                        <SectionTitle>Фракция покупает</SectionTitle>
                        <div className="grid grid-cols-4 gap-3">
                          {faction.buying.map((g) => (
                            <GoodCard key={g.itemId} good={g} action="Продать" />
                          ))}
                        </div>
                      </>
                    )}

                    {activeTab === 'blueprints' && (
                      <>
                        <SectionTitle>Чертежи</SectionTitle>
                        <div className="grid grid-cols-4 gap-3">
                          {faction.blueprints.map((bp) => (
                            <Frame
                              key={bp.id}
                              className="flex flex-col items-center gap-1 border border-page-text/10 bg-page-text/10 p-3 text-center"
                            >
                              <div className="flex size-14 items-center justify-center rounded border border-page-text/10 bg-page-text/15 p-1">
                                <img src={bp.icon} alt={bp.name} className="size-full object-contain" />
                              </div>
                              <h4 className="mt-1 line-clamp-2 font-serif text-sm font-bold leading-tight">{bp.name}</h4>
                              <span className="text-[11px] text-page-text/60">Репутация: {bp.reputationRequired}</span>
                              <CoinValue value={bp.price} />
                              <button
                                type="button"
                                className="mt-1 w-full cursor-pointer rounded border border-button-text/40 bg-button-bg px-2 py-1 text-xs font-bold text-button-text transition-colors hover:bg-button-bg/80"
                              >
                                Изучить
                              </button>
                            </Frame>
                          ))}
                        </div>
                      </>
                    )}

                    {activeTab === 'quests' && (
                      <>
                        <SectionTitle>Задания фракции</SectionTitle>
                        <div className="grid grid-cols-2 gap-3">
                          {faction.quests.map((q) => (
                            <Frame
                              key={q.id}
                              className="flex flex-col gap-3 border border-page-text/10 bg-page-text/10 p-4"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex size-14 shrink-0 items-center justify-center rounded border border-page-text/10 bg-page-text/15 p-1">
                                  <img src={q.icon} alt={q.itemName} className="size-full object-contain" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-serif text-sm font-bold leading-tight">Доставьте: {q.itemName}</h4>
                                  <span className="font-mono text-base font-bold text-page-text/70">
                                    {q.delivered} / {q.required}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between gap-3 border-t border-page-text/10 pt-2">
                                <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-page-text/50">
                                  Награда
                                </span>
                                <RewardRow quest={q} />
                              </div>

                              <button
                                type="button"
                                className="w-full cursor-pointer rounded border border-button-text/40 bg-button-bg px-2 py-1.5 text-sm font-bold text-button-text transition-colors hover:bg-button-bg/80"
                              >
                                Принять задание
                              </button>
                            </Frame>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Reputation bar */}
              <Frame className="flex shrink-0 items-center gap-4 border border-page-text/10 bg-page-text/5 p-3">
                <div className="min-w-0">
                  <h3 className="font-serif text-lg font-bold leading-tight">Репутация</h3>
                  <p className="truncate text-xs opacity-70">{faction.blurb}</p>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="shrink-0 text-sm font-bold uppercase tracking-wide text-accent-cyan">
                    {faction.reputation.label}
                  </span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full border border-page-text/15 bg-page-text/10">
                    <div className="h-full rounded-full bg-accent-cyan" style={{ width: `${repPct}%` }} />
                  </div>
                  <span className="shrink-0 font-mono text-sm font-bold text-page-text/70">
                    {faction.reputation.current} / {faction.reputation.next}
                  </span>
                </div>
              </Frame>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
