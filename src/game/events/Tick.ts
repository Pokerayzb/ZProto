import { GameEvent } from '@game/events/GameEvent';

export class Tick extends GameEvent {
  readonly now: number;

  constructor(now: number) {
    super();
    this.now = now;
  }
}
