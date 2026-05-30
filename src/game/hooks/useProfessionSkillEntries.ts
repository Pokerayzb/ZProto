import { gameLibrary } from '@game/library/gameLibrary';
import { useGameState } from '@game/hooks/useGameState';
import { getProfessionSkillEntries, type ProfessionSkillEntry } from '@game/selectors/skills';
import type { ProfessionId } from '@game/state/types';

export function useProfessionSkillEntries(professionId: ProfessionId): ProfessionSkillEntry[] {
  return useGameState((state) =>
    getProfessionSkillEntries(professionId, state.professions[professionId], gameLibrary),
  );
}
