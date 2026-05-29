import type { GameLibrary } from '@game/library/types';
import type { GameState, ProfessionId } from '@game/state/types';

export type RoomId = 'blacksmith' | 'kitchen' | 'carpentry' | 'forest' | 'mine' | 'river';

export type RoomVisualState = 'empty' | 'full' | 'busy';

export type RoomAssetKey = 'empty' | 'idle' | 'busy';

const PROFESSION_TO_ROOM: Record<ProfessionId, RoomId> = {
  blacksmithing: 'blacksmith',
  cooking: 'kitchen',
  carpentry: 'carpentry',
  forest: 'forest',
  mine: 'mine',
  river: 'river',
};

const ROOM_IDS: RoomId[] = ['blacksmith', 'kitchen', 'carpentry', 'forest', 'mine', 'river'];

function hasLearnedSkill(state: GameState, professionId: ProfessionId): boolean {
  return Object.keys(state.professions[professionId].skills).length > 0;
}

export function getRoomId(professionId: ProfessionId): RoomId {
  return PROFESSION_TO_ROOM[professionId];
}

export function getProfessionId(roomId: RoomId): ProfessionId {
  const entry = Object.entries(PROFESSION_TO_ROOM).find(([, id]) => id === roomId);
  if (entry === undefined) {
    throw new Error(`Unknown room id: ${roomId}`);
  }
  return entry[0] as ProfessionId;
}

export function getRoomState(
  professionId: ProfessionId,
  state: GameState,
  library: GameLibrary,
): RoomVisualState {
  if (!hasLearnedSkill(state, professionId)) {
    return 'empty';
  }

  if (state.currentTask !== null) {
    const skill = library.skills[state.currentTask.skillId];
    if (skill !== undefined && skill.professionId === professionId) {
      return 'busy';
    }
  }

  return 'full';
}

export function getAllRoomStates(
  state: GameState,
  library: GameLibrary,
): Record<RoomId, RoomVisualState> {
  const result = {} as Record<RoomId, RoomVisualState>;

  for (const roomId of ROOM_IDS) {
    const professionId = getProfessionId(roomId);
    result[roomId] = getRoomState(professionId, state, library);
  }

  return result;
}

export function roomAssetKey(state: RoomVisualState): RoomAssetKey {
  if (state === 'full') {
    return 'idle';
  }

  return state;
}
