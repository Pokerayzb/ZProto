import { reduce } from '@game/actions/reduce';
import { Tick } from '@game/events/Tick';
import type { GameEvent } from '@game/events/GameEvent';
import type { GameLibrary } from '@game/library/types';
import type { GameState } from '@game/state/types';

type Listener = () => void;

const DEFAULT_TICK_MS = 250;

export class GameEngine {
  private state: GameState;
  private readonly library: GameLibrary;
  private readonly listeners = new Set<Listener>();
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(state: GameState, library: GameLibrary) {
    this.state = state;
    this.library = library;
  }

  getState(): GameState {
    return this.state;
  }

  dispatch(event: GameEvent): void {
    this.state = reduce(this.state, event, this.library);
    this.notify();
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  start(tickMs = DEFAULT_TICK_MS): void {
    if (this.intervalId !== null) {
      return;
    }

    this.intervalId = setInterval(() => {
      this.dispatch(new Tick(Date.now()));
    }, tickMs);
  }

  stop(): void {
    if (this.intervalId === null) {
      return;
    }

    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }
}
