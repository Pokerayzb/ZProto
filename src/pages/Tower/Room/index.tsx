import type { CSSProperties } from "react";

import "./index.css";

export type RoomCoordinate = {
  x: number;
  y: number;
};

export type RoomProps = {
  coordinate: RoomCoordinate;
  file: string;
  onClick?: () => void;
};

export type RoomState = "empty" | "idle" | "busy";

export function Room({ coordinate, file, onClick }: RoomProps) {
  const { x, y } = coordinate;

  return (
    <button
      type="button"
      className="room"
      onClick={onClick}
      style={
        {
          "--room-x": `${x}%`,
          "--room-y": `${y}%`,
        } as CSSProperties
      }
    >
      <img src={file} alt="" decoding="async" />
    </button>
  );
}
