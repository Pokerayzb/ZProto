import type { LibraryProfession } from '@game/library/types';
import type { ProfessionId } from '@game/state/types';

export const libraryProfessions: Record<ProfessionId, LibraryProfession> = {
  blacksmithing: { id: 'blacksmithing', type: 'craft', title: 'Blacksmithing', workshop: { title: 'Blacksmith' } },
  cooking: { id: 'cooking', type: 'craft', title: 'Cooking', workshop: { title: 'Kitchen' } },
  carpentry: { id: 'carpentry', type: 'craft', title: 'Carpentry', workshop: { title: 'Carpentry' } },
  forest: { id: 'forest', type: 'gathering', title: 'Woodcutting', workshop: { title: 'Forest' } },
  mine: { id: 'mine', type: 'gathering', title: 'Mining', workshop: { title: 'Mine' } },
  river: { id: 'river', type: 'gathering', title: 'Fishing', workshop: { title: 'River' } },
};
