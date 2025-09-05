import type { PerspectiveCamera, WebGLRenderer } from "three";

export function resizeRendererToElementSize(
  renderer: WebGLRenderer,
  camera: PerspectiveCamera,
): boolean {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;

  if (needResize) {
    renderer.setSize(width, height, false);
    const aspect = width / height;

    // Calculate FOV dynamically to fit the scene
    camera.fov = getFovToFitTheScene(height, camera.position.z);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }
  return needResize;
}

function getFovToFitTheScene(height: number, cameraZPos: number): number {
  return 2 * Math.atan(height / (2 * cameraZPos)) * (180 / Math.PI);
}
