import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { factionOrder, type FactionId } from './index';

/** Seconds the player waits for the next zeppelin to arrive. */
const ARRIVAL_SECONDS = 60;
/** Seconds the zeppelin stays docked before leaving. */
const DOCK_SECONDS = 30;

export type VisitPhase = 'incoming' | 'docked';

export type FactionVisitState = {
  /** The faction that is currently arriving (incoming) or docked. */
  factionId: FactionId;
  phase: VisitPhase;
  /** Whole seconds remaining in the current phase. */
  secondsLeft: number;
};

const FactionVisitContext = createContext<FactionVisitState | null>(null);

function randomFaction(exclude?: FactionId): FactionId {
  const pool = exclude
    ? factionOrder.filter((id) => id !== exclude)
    : factionOrder;
  return pool[Math.floor(Math.random() * pool.length)] ?? 'workers';
}

export function FactionVisitProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FactionVisitState>(() => ({
    factionId: randomFaction(),
    phase: 'incoming',
    secondsLeft: ARRIVAL_SECONDS,
  }));

  // Keep latest faction in a ref so the tick can pick a different one next time.
  const lastFactionRef = useRef<FactionId>(state.factionId);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setState((prev) => {
        if (prev.secondsLeft > 1) {
          return { ...prev, secondsLeft: prev.secondsLeft - 1 };
        }

        // Phase boundary reached.
        if (prev.phase === 'incoming') {
          // Zeppelin has arrived — start the docking countdown.
          return { ...prev, phase: 'docked', secondsLeft: DOCK_SECONDS };
        }

        // Docked zeppelin leaves — schedule the next arrival (new faction).
        const next = randomFaction(lastFactionRef.current);
        lastFactionRef.current = next;
        return { factionId: next, phase: 'incoming', secondsLeft: ARRIVAL_SECONDS };
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <FactionVisitContext.Provider value={state}>
      {children}
    </FactionVisitContext.Provider>
  );
}

export function useFactionVisit(): FactionVisitState {
  const ctx = useContext(FactionVisitContext);
  if (ctx === null) {
    throw new Error('useFactionVisit must be used within FactionVisitProvider');
  }
  return ctx;
}

/** Format whole seconds as M:SS. */
export function formatVisitCountdown(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
