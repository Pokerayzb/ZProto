import { GameEvent } from '@game/events/GameEvent';

export class LearnSkill extends GameEvent {
  readonly skillId: string;

  constructor(skillId: string) {
    super();
    this.skillId = skillId;
  }
}
