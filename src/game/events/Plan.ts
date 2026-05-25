import { GameEvent } from '@game/events/GameEvent';

export class Plan extends GameEvent {
  readonly skillId: string;
  readonly count: number;

  constructor(skillId: string, count: number) {
    super();
    this.skillId = skillId;
    this.count = count;
  }
}
