import { roomAssetKey } from '@game/selectors/rooms';
import type { RoomVisualState } from '@game/selectors/rooms';

import { Room } from '../../../Room';
import type { RoomCoordinate } from '../../../Room';
import busy from './assets/busy.png';
import empty from './assets/empty.png';
import idle from './assets/idle.png';

const files = {
  empty,
  idle,
  busy,
} as const;

export function Kitchen({
  state,
  coordinate,
  onClick,
}: {
  state: RoomVisualState;
  coordinate: RoomCoordinate;
  onClick?: () => void;
}) {
  return (
    <Room
      coordinate={coordinate}
      file={files[roomAssetKey(state)]}
      {...(onClick !== undefined && { onClick })}
    />
  );
}
