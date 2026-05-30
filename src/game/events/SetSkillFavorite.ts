import { GameEvent } from '@game/events/GameEvent';

export class SetSkillFavorite extends GameEvent {
  readonly skillId: string;
  readonly favorite: boolean;

  constructor(skillId: string, favorite: boolean) {
    super();
    this.skillId = skillId;
    this.favorite = favorite;
  }
}
