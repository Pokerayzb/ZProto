import type { ProfessionId } from '@game/state/types';

export const PROFESSION_IDS: ProfessionId[] = [
  'blacksmithing',
  'cooking',
  'carpentry',
  'forest',
  'mine',
  'river',
];

type GatheringProfessionId = 'forest' | 'mine' | 'river';

export const GATHERING_PROFESSION_IDS: GatheringProfessionId[] = [
  'forest',
  'mine',
  'river',
];

export const DEFAULT_GATHERING_SKILL_BY_PROFESSION: Record<GatheringProfessionId, string> = {
  forest: 'lumber_1',
  mine: 'mining_1',
  river: 'fishing_1',
};

export function getDefaultGatheringSkillId(
  professionId: ProfessionId,
): string | undefined {
  switch (professionId) {
    case 'forest':
      return DEFAULT_GATHERING_SKILL_BY_PROFESSION.forest;
    case 'mine':
      return DEFAULT_GATHERING_SKILL_BY_PROFESSION.mine;
    case 'river':
      return DEFAULT_GATHERING_SKILL_BY_PROFESSION.river;
    default:
      return undefined;
  }
}

const SKILL_PREFIX_TO_PROFESSION: Record<string, ProfessionId> = {
  fishing: 'river',
  lumber: 'forest',
  mining: 'mine',
  cooking: 'cooking',
  carpentry: 'carpentry',
  blacksmith: 'blacksmithing',
};

export function getProfessionIdFromSkillId(skillId: string): ProfessionId | undefined {
  const prefix = skillId.split('_')[0] ?? '';
  return SKILL_PREFIX_TO_PROFESSION[prefix];
}
