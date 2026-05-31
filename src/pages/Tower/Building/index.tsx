import { useRoomStates } from '@game/hooks/useRoomStates';
import { getProfessionId, type RoomId } from '@game/selectors/rooms';
import { factions } from '@game/factions';
import { useFactionVisit } from '@game/factions/useFactionVisit';
import { useNavigation } from '@navigation/useNavigation';
import type { CSSProperties } from 'react';

import { Blacksmith } from './rooms/Blacksmith';
import { Carpentry } from './rooms/Carpentry';
import { Kitchen } from './rooms/Kitchen';
import { Zeppelin } from './Zeppelin';
import { Flag } from './Flag';
import type { RoomCoordinate } from '../Room';
import towerSkeleton from './assets/tower.png';
import './index.css';

type BuildingStyle = {
  '--building-anchor-x'?: string;
  '--building-anchor-y'?: string;
  '--building-height'?: string;
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

export function Building({
  layers = [],
  roomCoordinates,
  anchorX,
  anchorY,
  height,
}: BuildingProps = {}) {
  const { navigate } = useNavigation();
  const roomStates = useRoomStates();
  const visit = useFactionVisit();
  const visitZeppelinId = factions[visit.factionId].zeppelinId;

  function handleRoomClick(roomId: RoomId) {
    navigate('craft', { professionId: getProfessionId(roomId) });
  }

  const coordinates: BuildingRoomCoordinates = {
    kitchen: roomCoordinates?.kitchen ?? { x: 50, y: 82 },
    carpentry: roomCoordinates?.carpentry ?? { x: 50, y: 58 },
    blacksmith: roomCoordinates?.blacksmith ?? { x: 50, y: 34 },
  };

  const style: BuildingStyle = {
    ...(anchorX !== undefined && { '--building-anchor-x': `${anchorX}%` }),
    ...(anchorY !== undefined && { '--building-anchor-y': `${anchorY}%` }),
    ...(height !== undefined && { '--building-height': height }),
  };

  return (
    <div className="building" style={style as CSSProperties}>
      <div className="stack">
        <Zeppelin className="zeppelin" zeppelinId={visitZeppelinId} phase={visit.phase} />
        <Kitchen
          state={roomStates.kitchen}
          coordinate={coordinates.kitchen}
          onClick={() => handleRoomClick('kitchen')}
        />
        <Carpentry
          state={roomStates.carpentry}
          coordinate={coordinates.carpentry}
          onClick={() => handleRoomClick('carpentry')}
        />
        <Blacksmith
          state={roomStates.blacksmith}
          coordinate={coordinates.blacksmith}
          onClick={() => handleRoomClick('blacksmith')}
        />
        <img
          className="skeleton"
          src={towerSkeleton}
          alt=""
          decoding="async"
        />
        <Flag className="flag" />
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
