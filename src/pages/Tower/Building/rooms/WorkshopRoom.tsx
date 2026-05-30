import { roomAssetKey } from '@game/selectors/rooms';
import type { RoomVisualState } from '@game/selectors/rooms';

import { Room } from '../../Room';
import type { RoomCoordinate } from '../../Room';

export interface WorkshopRoomStateProps {
  state: RoomVisualState;
  coordinate: RoomCoordinate;
  onClick?: () => void;
}

export interface WorkshopRoomAssetFiles {
  empty: string;
  idle: string;
  busy: string;
}

export interface WorkshopRoomProps extends WorkshopRoomStateProps {
  files: WorkshopRoomAssetFiles;
}

export function WorkshopRoom({
  state,
  coordinate,
  onClick,
  files,
}: WorkshopRoomProps) {
  return (
    <Room
      coordinate={coordinate}
      file={files[roomAssetKey(state)]}
      {...(onClick !== undefined && { onClick })}
    />
  );
}
