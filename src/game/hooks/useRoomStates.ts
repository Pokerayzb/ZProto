import { gameLibrary } from '@game/library/gameLibrary';
import { useGameState } from '@game/hooks/useGameState';
import { getAllRoomStates } from '@game/selectors/rooms';
import type { RoomId, RoomVisualState } from '@game/selectors/rooms';

export function useRoomStates(): Record<RoomId, RoomVisualState> {
  return useGameState((state) => getAllRoomStates(state, gameLibrary));
}
