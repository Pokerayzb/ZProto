import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Application, Container } from 'pixi.js';

import { GameStageContext, type GameStageValue } from './GameStageContext';

/**
 * Mounts the single, persistent Pixi Application that renders the whole game
 * world. The canvas is a fixed, full-viewport layer that sits *behind* the DOM
 * UI (book windows, navigation, HUD stay on React/DOM). Everything animated —
 * tower, zeppelin, items, characters, effects, Spine — lives in this one
 * context instead of one WebGL context per animation.
 */
export function GameStageProvider({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stage, setStage] = useState<GameStageValue | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let initialized = false;
    const app = new Application();

    void app
      .init({
        canvas,
        resizeTo: window,
        backgroundAlpha: 0,
        antialias: true,
        autoDensity: true,
        resolution: window.devicePixelRatio || 1,
      })
      .then(() => {
        // Unmounted before init finished (e.g. React StrictMode double-mount).
        if (disposed) {
          app.destroy(true, { children: true });
          return;
        }
        initialized = true;
        const world = new Container();
        world.sortableChildren = true;
        app.stage.addChild(world);
        setStage({ app, world });
      });

    return () => {
      disposed = true;
      setStage(null);
      if (initialized) {
        app.destroy(true, { children: true });
      }
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 size-full" />
      <GameStageContext.Provider value={stage}>{children}</GameStageContext.Provider>
    </>
  );
}
