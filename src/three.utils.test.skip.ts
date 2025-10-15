/**
 * @jest-environment jsdom
 */

import { PerspectiveCamera, WebGLRenderer } from "three";
import { resizeRendererToElementSize } from "./three.utils";

interface TestCase {
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  want: boolean;
}

const testCases: TestCase[] = [
  {
    ...createRendererAndCamera([100, 100], [100, 100]),
    want: false,
  },
  {
    ...createRendererAndCamera([100, 100], [150, 150]),
    want: true,
  },
];

function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function createRenderer(
  width: number,
  height: number,
  canvas: HTMLCanvasElement,
): WebGLRenderer {
  const renderer = new WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(width, height);

  return renderer;
}

function createCamera(
  fov: number,
  aspect: number,
  near: number,
  far: number,
): PerspectiveCamera {
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  return camera;
}

function createRendererAndCamera(
  canvasSize: [number, number],
  rendererSize: [number, number],
): { renderer: WebGLRenderer; camera: PerspectiveCamera } {
  const [canvasWidth, canvasHeight] = canvasSize;
  const [rendererWidth, rendererHeight] = rendererSize;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const renderer = createRenderer(rendererWidth, rendererHeight, canvas);
  const camera = createCamera(
    50,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    2000,
  );
  return { renderer, camera };
}

testCases.forEach(({ renderer, camera, want }) => {
  test.skip(`resizeRendererToElementSize(${renderer}, ${camera}) = ${want}`, () => {
    // complex test case, continue after. https://stackoverflow.com/questions/58431117/mocking-webglrenderer-and-other-three-js-libraries-to-test-using-jest
    expect(resizeRendererToElementSize(renderer, camera)).toBe(want);
  });
});
