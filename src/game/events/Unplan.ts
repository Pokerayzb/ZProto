import { GameEvent } from '@game/events/GameEvent';

export class Unplan extends GameEvent {
  readonly queueId: number;

  constructor(queueId: number) {
    super();
    this.queueId = queueId;
  }
}
