import busy from './assets/busy.png';
import empty from './assets/empty.png';
import idle from './assets/idle.png';
import {
  WorkshopRoom,
  type WorkshopRoomAssetFiles,
  type WorkshopRoomStateProps,
} from '../WorkshopRoom';

const files: WorkshopRoomAssetFiles = {
  empty,
  idle,
  busy,
};

export function Blacksmith({ state, coordinate, onClick }: WorkshopRoomStateProps) {
  return (
    <WorkshopRoom
      files={files}
      coordinate={coordinate}
      state={state}
      {...(onClick !== undefined ? { onClick } : {})}
    />
  );
}
