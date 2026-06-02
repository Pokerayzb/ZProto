import { Panel } from '@components/Panel';
import { factions } from '@game/factions';
import {
  formatVisitCountdown,
  useFactionVisit,
} from '@game/factions/useFactionVisit';
import { useNavigation } from '@navigation/useNavigation';

/** Incoming subtitle width: "arrives in " + M:SS (4ch). */
/** Visit countdown is always formatted as M:SS (e.g. "1:00", "0:59"). */

export function VisitStatus() {
  const visit = useFactionVisit();
  const { navigate } = useNavigation();
  const faction = factions[visit.factionId];
  const isDocked = visit.phase === 'docked';
  const countdown = formatVisitCountdown(visit.secondsLeft);

  return (
    <div className="pointer-events-auto flex shrink-0 items-center gap-2">
      <Panel layout="horizontal" className="shrink-0 [--frame-scale:0.45]">
        <button
          type="button"
          onClick={() => navigate('zeppelins', visit.factionId)}
          className="m-0 flex shrink-0 cursor-pointer appearance-none items-center gap-4 border-0 bg-transparent px-4 py-2 text-left text-button-text"
        >
          <img src={faction.crest} alt="" className="size-12 shrink-0 object-contain" />
          <span
            className={
              'inline-grid shrink-0 leading-tight' + (isDocked ? '' : ' w-[18ch]')
            }
          >
            {isDocked ? (
              <>
                <h3 className="m-0 whitespace-nowrap font-bold">
                  Arrived: {faction.name}!
                </h3>
                <h4 className="m-0 whitespace-nowrap opacity-80">
                  Docked: {countdown}
                </h4>
              </>
            ) : (
              <>
                <h3 className="m-0 font-bold">Zeppelin</h3>
                <h4 className="m-0 whitespace-nowrap opacity-80">
                  arrives in{' '}
                  <time className="inline-block w-[4ch] text-right tabular-nums">
                    {countdown}
                  </time>
                </h4>
              </>
            )}
          </span>
        </button>
      </Panel>
      {import.meta.env.DEV && !isDocked && (
        <Panel layout="horizontal" className="shrink-0 [--frame-scale:0.45]">
          <button
            type="button"
            onClick={visit.hurryArrival}
            title="DEV: zeppelin arrives in 5 seconds"
            className="m-0 cursor-pointer appearance-none border-0 bg-transparent px-4 py-2 font-bold text-button-text"
          >
            ⏩ 5s
          </button>
        </Panel>
      )}
    </div>
  );
}
