import { createDefaultPlayerSkill } from '@game/state/initialState';
import type { SetSkillFavorite } from '@game/events/SetSkillFavorite';
import type { GameLibrary } from '@game/library/types';
import type { GameState } from '@game/state/types';

export function handleSetSkillFavorite(
  state: GameState,
  event: SetSkillFavorite,
  library: GameLibrary,
): GameState {
  const skill = library.skills[event.skillId];
  if (skill === undefined) {
    return state;
  }

  const profession = state.professions[skill.professionId];
  const existing = profession.skills[event.skillId];

  return {
    ...state,
    professions: {
      ...state.professions,
      [skill.professionId]: {
        ...profession,
        skills: {
          ...profession.skills,
          [event.skillId]: {
            applications: existing?.applications ?? createDefaultPlayerSkill().applications,
            favorite: event.favorite,
          },
        },
      },
    },
  };
}
