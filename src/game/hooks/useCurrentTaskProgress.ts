import { gameLibrary } from '@game/library/gameLibrary';
import { useGameState } from '@game/hooks/useGameState';
import { getCurrentTaskProgress } from '@game/selectors/tasks';

export function useCurrentTaskProgress(): number {
  return useGameState((state) =>
    getCurrentTaskProgress(state, gameLibrary, Date.now()),
  );
}
