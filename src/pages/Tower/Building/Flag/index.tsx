import { useEffect, useRef } from 'react';
import spine from '@/vendor/spine-webgl/spine-webgl.js';

import flagAtlas from '../assets/flag/flag.atlas?raw';
import flagJson from '../assets/flag/flag.json';
import flagPng from '../assets/flag/flag.png';

// World region the camera frames. Sized a little larger than the skeleton
// (139×41, origin near 0,0) so the waving flag never clips at the edges.
const VIEW_CENTER_X = 66;
const VIEW_CENTER_Y = 0;
const VIEW_WIDTH = 220;
const VIEW_HEIGHT = 220;

export interface FlagProps {
  className?: string;
  /** Visual scale of the flag within its canvas. */
  scale?: number;
}

export function Flag({ className, scale = 1 }: FlagProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false }) ||
      canvas.getContext('experimental-webgl', { alpha: true })) as WebGLRenderingContext | null;
    if (!gl) return;

    let disposed = false;
    let raf = 0;

    const renderer = new spine.webgl.SceneRenderer(canvas, gl);
    let entry: { skeleton: any; state: any } | null = null;

    const image = new Image();
    image.onload = () => {
      if (disposed) return;
      const texture = new spine.webgl.GLTexture(gl, image);
      const atlas = new spine.TextureAtlas(flagAtlas, () => texture);
      const atlasLoader = new spine.AtlasAttachmentLoader(atlas);
      const skeletonData = new spine.SkeletonJson(atlasLoader).readSkeletonData(flagJson);
      const skeleton = new spine.Skeleton(skeletonData);
      const state = new spine.AnimationState(new spine.AnimationStateData(skeletonData));
      state.setAnimation(0, 'idle', true);
      entry = { skeleton, state };
    };
    image.src = flagPng;

    let last = performance.now();
    const render = () => {
      if (disposed) return;
      const now = performance.now();
      const delta = (now - last) / 1000;
      last = now;

      const { width, height } = canvas;
      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (entry) {
        entry.state.update(delta);
        entry.state.apply(entry.skeleton);
        entry.skeleton.updateWorldTransform();

        const camera = renderer.camera;
        camera.position.x = VIEW_CENTER_X;
        camera.position.y = VIEW_CENTER_Y;
        camera.viewportWidth = VIEW_WIDTH / scale;
        camera.viewportHeight = VIEW_HEIGHT / scale;
        camera.update();

        renderer.begin();
        renderer.drawSkeleton(entry.skeleton, false);
        renderer.end();
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
    };
  }, [scale]);

  return <canvas ref={canvasRef} width={VIEW_WIDTH} height={VIEW_HEIGHT} className={className} />;
}
