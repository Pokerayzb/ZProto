import { Award } from '@game/events/Award';
import { CancelTask } from '@game/events/CancelTask';
import { LearnSkill } from '@game/events/LearnSkill';
import { Plan } from '@game/events/Plan';
import { StartQueue } from '@game/events/StartQueue';
import { Tick } from '@game/events/Tick';
import { Unplan } from '@game/events/Unplan';
import type { GameEvent } from '@game/events/GameEvent';
import type { GameLibrary } from '@game/library/types';
import { handleAward } from '@game/actions/handlers/handleAward';
import { handleCancelTask } from '@game/actions/handlers/handleCancelTask';
import { handleLearnSkill } from '@game/actions/handlers/handleLearnSkill';
import { handlePlan } from '@game/actions/handlers/handlePlan';
import { handleStartQueue } from '@game/actions/handlers/handleStartQueue';
import { handleTick } from '@game/actions/handlers/handleTick';
import { handleUnplan } from '@game/actions/handlers/handleUnplan';
import type { GameState } from '@game/state/types';

export function reduce(
  state: GameState,
  event: GameEvent,
  library: GameLibrary,
): GameState {
  if (event instanceof Award) {
    return handleAward(state, event, library);
  }

  if (event instanceof Plan) {
    return handlePlan(state, event, library);
  }

  if (event instanceof Unplan) {
    return handleUnplan(state, event);
  }

  if (event instanceof StartQueue) {
    return handleStartQueue(state);
  }

  if (event instanceof CancelTask) {
    return handleCancelTask(state);
  }

  if (event instanceof LearnSkill) {
    return handleLearnSkill(state, event, library);
  }

  if (event instanceof Tick) {
    return handleTick(state, event, library);
  }

  return state;
}
