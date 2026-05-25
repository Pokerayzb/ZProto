import type { LibraryProfession } from '@game/library/types';
import type { ProfessionId } from '@game/state/types';

export const libraryProfessions: Record<ProfessionId, LibraryProfession> = {
  blacksmithing: { id: 'blacksmithing', type: 'craft' },
  cooking: { id: 'cooking', type: 'craft' },
  carpentry: { id: 'carpentry', type: 'craft' },
};
