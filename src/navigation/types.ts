import type { ProfessionId } from '@game/state/types';
import type { FactionId } from '@game/factions';

export type { PageDefinition, PageId } from '@pages/types';

export type NavigateOptions = {
  professionId?: ProfessionId;
  factionId?: FactionId;
};
