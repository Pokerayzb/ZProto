import type { LibrarySkill } from '@game/library/types';

export const librarySkills: Record<string, LibrarySkill> = {
  cook_stew: {
    id: 'cook_stew',
    professionId: 'cooking',
    ingredients: [{ itemId: 'meat', quantity: 1 }],
    products: [{ itemId: 'stew', quantity: 1, probability: 1 }],
    durationSeconds: 5,
    experienceGained: 10,
  },
  forge_nails: {
    id: 'forge_nails',
    professionId: 'blacksmithing',
    ingredients: [{ itemId: 'iron', quantity: 1 }],
    products: [{ itemId: 'nails', quantity: 2, probability: 1 }],
    durationSeconds: 8,
    experienceGained: 15,
  },
  saw_boards: {
    id: 'saw_boards',
    professionId: 'carpentry',
    ingredients: [{ itemId: 'log', quantity: 1 }],
    products: [{ itemId: 'board', quantity: 2, probability: 1 }],
    durationSeconds: 6,
    experienceGained: 12,
  },
};
