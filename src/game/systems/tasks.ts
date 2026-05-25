import { addSkillExperience } from '@game/systems/skills';
import type { GameLibrary } from '@game/library/types';
import type { GameState } from '@game/state/types';

export function startNextTask(state: GameState, now: number): GameState {
  if (state.currentTask !== null || state.taskQueue.length === 0) {
    return state;
  }

  const head = state.taskQueue[0];
  if (head === undefined) {
    return state;
  }

  return {
    ...state,
    currentTask: {
      skillId: head.skillId,
      startedAt: now,
    },
  };
}

export function completeCurrentTask(
  state: GameState,
  now: number,
  library: GameLibrary,
): GameState {
  if (state.currentTask === null) {
    return state;
  }

  const skillDef = library.skills[state.currentTask.skillId];
  if (skillDef === undefined) {
    return {
      ...state,
      currentTask: null,
      lastTickAt: now,
    };
  }

  let next = addSkillExperience(
    state,
    skillDef.id,
    skillDef.professionId,
    skillDef.experienceGained,
  );

  const head = next.taskQueue[0];
  if (head === undefined) {
    return {
      ...next,
      currentTask: null,
      lastTickAt: now,
    };
  }

  const newCount = head.count - 1;
  const taskQueue =
    newCount <= 0
      ? next.taskQueue.slice(1)
      : [{ ...head, count: newCount }, ...next.taskQueue.slice(1)];

  const nextHead = taskQueue[0];
  const currentTask =
    nextHead !== undefined
      ? { skillId: nextHead.skillId, startedAt: now }
      : null;

  return {
    ...next,
    taskQueue,
    currentTask,
    lastTickAt: now,
  };
}

export function isCurrentTaskComplete(
  state: GameState,
  now: number,
  library: GameLibrary,
): boolean {
  if (state.currentTask === null) {
    return false;
  }

  const skillDef = library.skills[state.currentTask.skillId];
  if (skillDef === undefined) {
    return false;
  }

  const elapsed = now - state.currentTask.startedAt;
  return elapsed >= skillDef.durationSeconds * 1000;
}

export function advanceTick(
  state: GameState,
  now: number,
  library: GameLibrary,
): GameState {
  let next: GameState = { ...state, lastTickAt: now };

  while (next.currentTask !== null && isCurrentTaskComplete(next, now, library)) {
    next = completeCurrentTask(next, now, library);
  }

  return next;
}
