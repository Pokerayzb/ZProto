import type { ProfessionId } from '@game/state/types';

export type ProfessionType = 'gathering' | 'craft';

export type LibraryProfession = {
  id: ProfessionId;
  type: ProfessionType;
};

export type Ingredient = {
  itemId: string;
  quantity: number;
};

export type Product = {
  itemId: string;
  quantity: number;
  probability: number;
};

export type LibrarySkill = {
  id: string;
  professionId: ProfessionId;
  ingredients: Ingredient[];
  products: Product[];
  durationSeconds: number;
  experienceGained: number;
};

export type LibraryItem = {
  id: string;
  name: string;
};

export type GameLibrary = {
  professions: Record<ProfessionId, LibraryProfession>;
  skills: Record<string, LibrarySkill>;
  items: Record<string, LibraryItem>;
};
