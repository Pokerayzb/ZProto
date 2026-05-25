import { initialLevelProgress } from '@game/progression';
import type { LearnSkill } from '@game/events/LearnSkill';
import type { GameLibrary } from '@game/library/types';
import type { GameState } from '@game/state/types';

export function handleLearnSkill(
  state: GameState,
  event: LearnSkill,
  library: GameLibrary,
): GameState {
  const skill = library.skills[event.skillId];
  if (skill === undefined) {
    return state;
  }

  const profession = state.professions[skill.professionId];
  if (profession.skills[event.skillId] !== undefined) {
    return state;
  }

  return {
    ...state,
    professions: {
      ...state.professions,
      [skill.professionId]: {
        skills: {
          ...profession.skills,
          [event.skillId]: initialLevelProgress,
        },
      },
    },
  };
}
