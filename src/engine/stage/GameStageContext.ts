import { createContext } from 'react';
import type { Application, Container } from 'pixi.js';

/**
 * The shared Pixi world. `app` is the single Application that owns the one and
 * only WebGL/WebGPU context; `world` is the root container every game object is
 * added to (so it can be panned/zoomed as a whole later).
 */
export type GameStageValue = {
  app: Application;
  world: Container;
};

export const GameStageContext = createContext<GameStageValue | null>(null);
