import { useState } from "react";
import type { CSSProperties } from "react";

import { Blacksmith } from "./rooms/Blacksmith";
import { Carpentry } from "./rooms/Carpentry";
import { Kitchen } from "./rooms/Kitchen";
import type { RoomCoordinate, RoomState } from "../Room";
import towerSkeleton from "./assets/tower.png";
import "./index.css";

type BuildingStyle = {
  "--building-anchor-x"?: string;
  "--building-anchor-y"?: string;
  "--building-height"?: string;
};

export type BuildingLayer = {
  id: string;
  src: string;
};

export type BuildingRoomCoordinates = {
  kitchen: RoomCoordinate;
  carpentry: RoomCoordinate;
  blacksmith: RoomCoordinate;
};

export type BuildingProps = {
  layers?: BuildingLayer[];
  roomCoordinates?: Partial<BuildingRoomCoordinates>;
  anchorX?: number;
  anchorY?: number;
  height?: string;
};

type BuildingRoomStates = {
  kitchen: RoomState;
  carpentry: RoomState;
  blacksmith: RoomState;
};

export function Building({
  layers = [],
  roomCoordinates,
  anchorX,
  anchorY,
  height,
}: BuildingProps = {}) {
  const [states, setStates] = useState<BuildingRoomStates>({
    kitchen: "empty",
    carpentry: "empty",
    blacksmith: "empty",
  });

  const coordinates: BuildingRoomCoordinates = {
    kitchen: roomCoordinates?.kitchen ?? { x: 50, y: 82 },
    carpentry: roomCoordinates?.carpentry ?? { x: 50, y: 58 },
    blacksmith: roomCoordinates?.blacksmith ?? { x: 50, y: 34 },
  };

  function getNextState(state: RoomState): RoomState {
    if (state === "empty") return "idle";
    if (state === "idle") return "busy";
    return "empty";
  }

  function cycleRoomState(room: keyof BuildingRoomStates) {
    setStates((current) => ({
      ...current,
      [room]: getNextState(current[room]),
    }));
  }

  const style: BuildingStyle = {
    ...(anchorX !== undefined && { "--building-anchor-x": `${anchorX}%` }),
    ...(anchorY !== undefined && { "--building-anchor-y": `${anchorY}%` }),
    ...(height !== undefined && { "--building-height": height }),
  };

  return (
    <div className="building" style={style as CSSProperties}>
      <div className="stack">
        <Kitchen
          state={states.kitchen}
          coordinate={coordinates.kitchen}
          onClick={() => cycleRoomState("kitchen")}
        />
        <Carpentry
          state={states.carpentry}
          coordinate={coordinates.carpentry}
          onClick={() => cycleRoomState("carpentry")}
        />
        <Blacksmith
          state={states.blacksmith}
          coordinate={coordinates.blacksmith}
          onClick={() => cycleRoomState("blacksmith")}
        />
        <img
          className="skeleton"
          src={towerSkeleton}
          alt=""
          decoding="async"
        />
        {layers.map((layer, index) => (
          <BuildingLayerImage key={layer.id} layer={layer} zIndex={index + 1} />
        ))}
      </div>
    </div>
  );
}

function BuildingLayerImage({
  layer,
  zIndex,
}: {
  layer: BuildingLayer;
  zIndex: number;
}) {
  return (
    <img
      className="layer"
      src={layer.src}
      alt=""
      decoding="async"
      style={{ zIndex }}
    />
  );
}
