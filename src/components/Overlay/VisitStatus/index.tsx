import { factions } from '@game/factions';
import {
  formatVisitCountdown,
  useFactionVisit,
} from '@game/factions/useFactionVisit';
import { useNavigation } from '@navigation/useNavigation';

export function VisitStatus() {
  const visit = useFactionVisit();
  const { navigate } = useNavigation();
  const faction = factions[visit.factionId];
  const isDocked = visit.phase === 'docked';
  const countdown = formatVisitCountdown(visit.secondsLeft);

  return (
    <button
      type="button"
      onClick={() => navigate('zeppelins', { factionId: visit.factionId })}
      className="pointer-events-auto flex shrink-0 items-center gap-3 rounded-lg border border-button-text/40 bg-button-bg/90 px-3 py-2 text-left text-button-text transition-colors hover:bg-button-bg"
    >
      <img src={faction.crest} alt="" className="size-9 shrink-0 object-contain" />
      <span className="min-w-0 leading-tight">
        {isDocked ? (
          <>
            <span className="block whitespace-nowrap text-sm font-bold">
              Прибыли: {faction.name}!
            </span>
            <span className="block whitespace-nowrap text-xs opacity-80">
              Стоянка: {countdown}
            </span>
          </>
        ) : (
          <>
            <span className="block whitespace-nowrap text-sm font-bold">Дирижабль</span>
            <span className="block whitespace-nowrap text-xs opacity-80">
              прибудет через {countdown}
            </span>
          </>
        )}
      </span>
    </button>
  );
}
