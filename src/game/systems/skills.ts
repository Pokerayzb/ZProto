import type { GameState, ProfessionId } from '@game/state/types';

const XP_PER_LEVEL = 100;

export function addSkillExperience(
  state: GameState,
  skillId: string,
  professionId: ProfessionId,
  experienceGained: number,
): GameState {
  const profession = state.professions[professionId];
  const existing = profession.skills[skillId];

  if (existing === undefined) {
    return state;
  }

  let level = existing.level;
  let levelProgress = existing.levelProgress + experienceGained;

  while (levelProgress >= XP_PER_LEVEL) {
    levelProgress -= XP_PER_LEVEL;
    level += 1;
  }

  return {
    ...state,
    professions: {
      ...state.professions,
      [professionId]: {
        skills: {
          ...profession.skills,
          [skillId]: { level, levelProgress },
        },
      },
    },
  };
}
