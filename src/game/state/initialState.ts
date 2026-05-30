import { initialLevelProgress } from '@game/progression';
import {
  getDefaultGatheringSkillId,
} from '@game/domain/professions';
import type { FactionId, GameState, PlayerProfession, PlayerSkill, ProfessionId } from '@game/state/types';

export function createDefaultPlayerSkill(): PlayerSkill {
  return {
    applications: 0,
    favorite: false,
  };
}

export function createEmptyProfession(): PlayerProfession {
  return {
    level: initialLevelProgress,
    skillPoints: 0,
    skills: {},
    taskQueue: [],
    currentTask: null,
  };
}

function createInitialProfession(professionId: ProfessionId): PlayerProfession {
  const profession = createEmptyProfession();

  const skillId = getDefaultGatheringSkillId(professionId);
  if (skillId !== undefined) {
    profession.skills[skillId] = createDefaultPlayerSkill();
  }

  return profession;
}

export function createInitialState(): GameState {
  return {
    player: {
      name: 'Richard Bower',
      status: 'Newcomer',
      level: initialLevelProgress,
      gold: 0,
      reputation: {
        traders: 0,
        aristocrats: 0,
        mystics: 0,
        artisans: 0,
      } satisfies Record<FactionId, number>,
    },
    inventory: {},
    professions: {
      blacksmithing: createInitialProfession('blacksmithing'),
      cooking: createInitialProfession('cooking'),
      carpentry: createInitialProfession('carpentry'),
      forest: createInitialProfession('forest'),
      mine: createInitialProfession('mine'),
      river: createInitialProfession('river'),
    },
    nextQueueId: 1,
    lastTickAt: 0,
  };
}
