import { PROFESSION_IDS } from '@game/domain/professions';
import type { Unplan } from '@game/events/Unplan';
import type { GameState } from '@game/state/types';

export function handleUnplan(state: GameState, event: Unplan): GameState {
  for (const professionId of PROFESSION_IDS) {
    const profession = state.professions[professionId];
    const removedTask = profession.taskQueue.find((task) => task.id === event.queueId);

    if (removedTask === undefined) {
      continue;
    }

    const taskQueue = profession.taskQueue.filter((task) => task.id !== event.queueId);
    const wasHead = profession.taskQueue[0]?.id === event.queueId;
    const clearsCurrent =
      wasHead &&
      profession.currentTask !== null &&
      profession.currentTask.skillId === removedTask.skillId;

    return {
      ...state,
      professions: {
        ...state.professions,
        [professionId]: {
          ...profession,
          taskQueue,
          currentTask: clearsCurrent ? null : profession.currentTask,
        },
      },
    };
  }

  return state;
}
