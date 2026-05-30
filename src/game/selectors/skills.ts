import type { GameLibrary, LibrarySkill } from '@game/library/types';
import type { GameState, PlayerProfession, PlayerSkill, ProfessionId } from '@game/state/types';

export type ProfessionSkillEntry = {
  skill: LibrarySkill;
  playerSkill: PlayerSkill | undefined;
};

export interface WorkshopSkillState {
  isLearned: boolean;
  isFavorite: boolean;
  isQueuedOrCurrent: boolean;
  isCraft: boolean;
  currentQuantity: number;
  maxCraftableQuantity: number;
  canPlan: boolean;
}

const GATHERING_MAX_PLAN = 99;

function getSkillTier(skillId: string): number {
  const tier = skillId.split('_')[1];
  return tier !== undefined ? Number(tier) : 0;
}

function getSortGroup(entry: ProfessionSkillEntry): number {
  if (entry.playerSkill === undefined) {
    return 2;
  }

  if (entry.playerSkill.favorite) {
    return 0;
  }

  return 1;
}

function compareSkillEntries(a: ProfessionSkillEntry, b: ProfessionSkillEntry): number {
  const groupDiff = getSortGroup(a) - getSortGroup(b);
  if (groupDiff !== 0) {
    return groupDiff;
  }

  return getSkillTier(a.skill.id) - getSkillTier(b.skill.id);
}

export function getProfessionSkillEntries(
  professionId: ProfessionId,
  profession: PlayerProfession,
  library: GameLibrary,
): ProfessionSkillEntry[] {
  return Object.values(library.skills)
    .filter((skill) => skill.professionId === professionId)
    .map((skill) => ({
      skill,
      playerSkill: profession.skills[skill.id],
    }))
    .sort(compareSkillEntries);
}

export function getDefaultProfessionSkillId(
  professionId: ProfessionId,
  profession: PlayerProfession,
  library: GameLibrary,
): string {
  let defaultSkillId = '';
  let lowestTier = Number.POSITIVE_INFINITY;

  for (const skill of Object.values(library.skills)) {
    if (skill.professionId !== professionId) {
      continue;
    }

    if (profession.skills[skill.id] === undefined) {
      continue;
    }

    const tier = getSkillTier(skill.id);
    if (tier < lowestTier) {
      lowestTier = tier;
      defaultSkillId = skill.id;
    }
  }

  return defaultSkillId;
}

function getMaxCraftableQuantity(
  skill: LibrarySkill,
  inventory: Record<string, number>,
): number {
  if (skill.ingredients.length === 0) {
    return GATHERING_MAX_PLAN;
  }

  return skill.ingredients.reduce((available, ingredient) => {
    const stock = inventory[ingredient.itemId] ?? 0;
    return Math.min(available, Math.floor(stock / ingredient.quantity));
  }, Number.POSITIVE_INFINITY);
}

export function getWorkshopSkillState(
  state: GameState,
  skill: LibrarySkill,
  library: GameLibrary,
): WorkshopSkillState {
  const profession = state.professions[skill.professionId];
  const playerSkill = profession.skills[skill.id];
  const isLearned = playerSkill !== undefined;
  const isFavorite = playerSkill?.favorite ?? false;
  const isQueuedOrCurrent =
    profession.currentTask?.skillId === skill.id ||
    profession.taskQueue.some((task) => task.skillId === skill.id);
  const professionDef = library.professions[skill.professionId];
  const isCraft = professionDef.type === 'craft';
  const currentQuantity = state.inventory[skill.id] ?? 0;
  const craftable = getMaxCraftableQuantity(skill, state.inventory);
  const maxCraftableQuantity = isCraft ? craftable : GATHERING_MAX_PLAN;
  const canPlan = isLearned && (!isCraft || maxCraftableQuantity >= 1);

  return {
    isLearned,
    isFavorite,
    isQueuedOrCurrent,
    isCraft,
    currentQuantity,
    maxCraftableQuantity,
    canPlan,
  };
}
