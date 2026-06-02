import { useEffect, useRef } from 'react';
import { Assets, Sprite, Texture } from 'pixi.js';

import { useGameStage } from '@engine/stage/useGameStage';
import { useRoomStates } from '@game/hooks/useRoomStates';
import { factions } from '@game/factions';
import { useFactionVisit } from '@game/factions/useFactionVisit';
import { useNavigation } from '@navigation/useNavigation';
import {
  getProfessionId,
  roomAssetKey,
  type RoomId,
  type RoomVisualState,
} from '@game/selectors/rooms';

import { Zeppelin } from '../Building/Zeppelin';
import { Flag } from '../Building/Flag';

import skyUrl from '../assets/background.png';
import towerUrl from '../Building/assets/tower.png';

import kitchenEmpty from '../Building/rooms/Kitchen/assets/empty.png';
import kitchenIdle from '../Building/rooms/Kitchen/assets/idle.png';
import kitchenBusy from '../Building/rooms/Kitchen/assets/busy.png';
import carpentryEmpty from '../Building/rooms/Carpentry/assets/empty.png';
import carpentryIdle from '../Building/rooms/Carpentry/assets/idle.png';
import carpentryBusy from '../Building/rooms/Carpentry/assets/busy.png';
import blacksmithEmpty from '../Building/rooms/Blacksmith/assets/empty.png';
import blacksmithIdle from '../Building/rooms/Blacksmith/assets/idle.png';
import blacksmithBusy from '../Building/rooms/Blacksmith/assets/busy.png';

type RoomCoordinate = { x: number; y: number };

const ROOMS = {
  kitchen: {
    coordinate: { x: 35, y: 80 },
    assets: { empty: kitchenEmpty, idle: kitchenIdle, busy: kitchenBusy },
  },
  carpentry: {
    coordinate: { x: 35, y: 61 },
    assets: { empty: carpentryEmpty, idle: carpentryIdle, busy: carpentryBusy },
  },
  blacksmith: {
    coordinate: { x: 35, y: 42 },
    assets: { empty: blacksmithEmpty, idle: blacksmithIdle, busy: blacksmithBusy },
  },
} satisfies Record<
  Extract<RoomId, 'kitchen' | 'carpentry' | 'blacksmith'>,
  { coordinate: RoomCoordinate; assets: Record<'empty' | 'idle' | 'busy', string> }
>;

type RoomKey = keyof typeof ROOMS;

/** Layout fractions matching the old DOM tower. */
const ANCHOR_X = 0.5;
const ANCHOR_Y = 0.52;
const TOWER_HEIGHT_FRAC = 0.72;
const ROOM_WIDTH_FRAC = 0.5;

/** World z-order. Sky at the back; the zeppelin floats between sky and tower. */
const SKY_Z = -100;
export const ZEPPELIN_Z = -50;
const TOWER_Z = 10;
export const FLAG_Z = 20;
const ROOM_Z = 5;

type RoomSprite = { sprite: Sprite; key: RoomKey; coordinate: RoomCoordinate };
const ROOM_KEYS = Object.keys(ROOMS) as RoomKey[];
const ROOM_TEXTURE_URLS = ROOM_KEYS.flatMap((key) => Object.values(ROOMS[key].assets));

function applyRoomTextures(
  rooms: RoomSprite[],
  states: Record<RoomId, RoomVisualState>,
) {
  for (const room of rooms) {
    const state = states[room.key];
    const url = ROOMS[room.key].assets[roomAssetKey(state)];
    room.sprite.texture = Assets.get<Texture>(url) ?? Texture.EMPTY;
  }
}

/**
 * The whole Tower scene rendered into the shared Pixi world: sky, zeppelin,
 * tower, flag and the three clickable workshop rooms. Replaces the old DOM
 * `Building` so everything shares one render layer and z-order (zeppelin behind
 * the tower, flag in front).
 */
export function TowerScene() {
  const stage = useGameStage();
  const { navigate } = useNavigation();
  const roomStates = useRoomStates();
  const visit = useFactionVisit();
  const visitZeppelinId = factions[visit.factionId].zeppelinId;

  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;
  const roomStatesRef = useRef(roomStates);
  roomStatesRef.current = roomStates;

  const roomsRef = useRef<RoomSprite[]>([]);
  const layoutRef = useRef<(() => void) | null>(null);

  // Build the static scene (sky + tower + rooms) once the stage is ready.
  useEffect(() => {
    if (!stage) return;
    const { app, world } = stage;

    let disposed = false;
    // Add sky/tower/rooms directly to the shared world (not a sub-container) so
    // their world zIndices interleave with the zeppelin and flag: sky behind
    // everything, the zeppelin floating between sky and tower, then tower, flag
    // and the clickable rooms in front.
    const sky = new Sprite();
    sky.anchor.set(0.5);
    sky.zIndex = SKY_Z;
    world.addChild(sky);

    const tower = new Sprite();
    tower.anchor.set(0.5);
    tower.zIndex = TOWER_Z;
    world.addChild(tower);

    const rooms: RoomSprite[] = ROOM_KEYS.map((key) => {
      const sprite = new Sprite();
      sprite.anchor.set(0.5);
      sprite.zIndex = ROOM_Z;
      sprite.eventMode = 'static';
      sprite.cursor = 'pointer';
      sprite.on('pointertap', () => {
        navigateRef.current('craft', getProfessionId(key));
      });
      world.addChild(sprite);
      return { sprite, key, coordinate: ROOMS[key].coordinate };
    });
    roomsRef.current = rooms;

    const layout = () => {
      const { width, height } = app.screen;
      const cx = width * ANCHOR_X;
      const cy = height * ANCHOR_Y;

      if (sky.texture && sky.texture.height > 0) {
        const fitH = height;
        const fitW = fitH * (sky.texture.width / sky.texture.height);
        const w = Math.max(fitW, width);
        sky.width = w;
        sky.height = w * (sky.texture.height / sky.texture.width);
        sky.position.set(width / 2, height / 2);
      }

      if (!tower.texture || tower.texture.height === 0) return;
      const towerHeight = height * TOWER_HEIGHT_FRAC;
      const towerWidth = towerHeight * (tower.texture.width / tower.texture.height);
      tower.width = towerWidth;
      tower.height = towerHeight;
      tower.position.set(cx, cy);

      const left = cx - towerWidth / 2;
      const top = cy - towerHeight / 2;
      const roomWidth = towerWidth * ROOM_WIDTH_FRAC;
      for (const room of rooms) {
        const tex = room.sprite.texture;
        const ratio = tex && tex.width > 0 ? tex.height / tex.width : 1;
        room.sprite.width = roomWidth;
        room.sprite.height = roomWidth * ratio;
        room.sprite.position.set(
          left + (room.coordinate.x / 100) * towerWidth,
          top + (room.coordinate.y / 100) * towerHeight,
        );
      }
    };
    layoutRef.current = layout;

    // Load all textures, then lay everything out.
    void Promise.all([
      Assets.load<Texture>(skyUrl),
      Assets.load<Texture>(towerUrl),
      ...ROOM_TEXTURE_URLS.map((url) => Assets.load<Texture>(url)),
    ]).then(([skyTex, towerTex]) => {
      if (disposed) return;
      sky.texture = skyTex;
      tower.texture = towerTex;
      // Ensure first layout uses real room texture ratios, not Texture.EMPTY.
      applyRoomTextures(rooms, roomStatesRef.current);
      layout();
    }).catch((err) => console.error('[TowerScene] texture load failed', err));

    const onResize = () => layout();
    app.renderer.on('resize', onResize);

    return () => {
      disposed = true;
      app.renderer.off('resize', onResize);
      roomsRef.current = [];
      layoutRef.current = null;
      sky.destroy();
      tower.destroy();
      for (const room of rooms) room.sprite.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // Swap room textures whenever the room states change.
  useEffect(() => {
    applyRoomTextures(roomsRef.current, roomStates);
    layoutRef.current?.();
  }, [roomStates]);

  return (
    <>
      <Zeppelin
        zeppelinId={visitZeppelinId}
        phase={visit.phase}
        zIndex={ZEPPELIN_Z}
        anchorY={0.3}
      />
      <Flag zIndex={FLAG_Z} anchorY={0.18} offsetX={-75} />
    </>
  );
}
