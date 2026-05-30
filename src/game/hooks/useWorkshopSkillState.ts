import { useGameState } from '@game/hooks/useGameState';
import { gameLibrary } from '@game/library/gameLibrary';
import type { LibrarySkill } from '@game/library/types';
import {
  getWorkshopSkillState,
  type WorkshopSkillState,
} from '@game/selectors/skills';

export function useWorkshopSkillState(skill: LibrarySkill): WorkshopSkillState {
  return useGameState((state) => getWorkshopSkillState(state, skill, gameLibrary));
}
