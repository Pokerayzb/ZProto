import { GameEvent } from '@game/events/GameEvent';
import type { ProfessionId } from '@game/state/types';

export class StartQueue extends GameEvent {
  readonly professionId: ProfessionId;

  constructor(professionId: ProfessionId) {
    super();
    this.professionId = professionId;
  }
}
