import { Room } from "../../../Room";
import type { RoomCoordinate, RoomState } from "../../../Room";
import busy from "./assets/busy.png";
import empty from "./assets/empty.png";
import idle from "./assets/idle.png";

const files = {
  empty,
  idle,
  busy,
} as const;

export function Carpentry({
  state,
  coordinate,
  onClick,
}: {
  state: RoomState;
  coordinate: RoomCoordinate;
  onClick?: () => void;
}) {
  return (
    <Room
      coordinate={coordinate}
      file={files[state]}
      {...(onClick !== undefined && { onClick })}
    />
  );
}
