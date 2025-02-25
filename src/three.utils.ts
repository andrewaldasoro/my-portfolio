import type * as THREE from "three";

export function resizeRendererToElementSize(
	renderer: THREE.WebGLRenderer,
	camera: THREE.PerspectiveCamera,
) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;

	if (needResize) {
		renderer.setSize(width, height, false);
		const aspect = width / height;

		// Calculate FOV dynamically to fit the scene
		const fov =
			2 * Math.atan(height / (2 * camera.position.z)) * (180 / Math.PI);
		camera.fov = fov;
		camera.aspect = aspect;
		camera.updateProjectionMatrix();
	}
	return needResize;
}
