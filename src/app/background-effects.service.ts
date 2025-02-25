import { Injectable } from "@angular/core";
import * as THREE from "three";
import { resizeRendererToElementSize } from "../three.utils";

@Injectable()
export class BackgroundEffectsService {
	private renderer!: THREE.WebGLRenderer;
	private scene!: THREE.Scene;
	private camera!: THREE.PerspectiveCamera;
	private geometry!: THREE.BufferGeometry;

	init() {
		this.addBackgroundDotsMesh();
	}

	private addBackgroundDotsMesh() {
		const canvas = document.createElement("canvas") as HTMLCanvasElement;
		canvas.className = "absolute w-full h-full";
		document.body.prepend(canvas);

		this.renderer = new THREE.WebGLRenderer({ canvas });
		this.renderer.setClearAlpha(0); // Transparent background

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(
			50,
			canvas.clientWidth / canvas.clientHeight,
			0.1,
			2000,
		);
		this.camera.position.z = 1000;

		// Create geometry and material once
		this.geometry = new THREE.BufferGeometry();
		const material = new THREE.PointsMaterial({
			color: 0xffffff,
			size: 1,
			transparent: true,
			opacity: 0.3,
		});
		const points = new THREE.Points(this.geometry, material);
		this.scene.add(points);

		this.render();
	}

	render() {
		if (!this.renderer || !this.camera || !this.geometry || !this.scene) {
			return;
		}

		resizeRendererToElementSize(this.renderer, this.camera);

		this.geometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(
				this.getParticlesPos(this.renderer.domElement),
				3,
			),
		);

		this.renderer.render(this.scene, this.camera);
	}

	private getParticlesPos(canvas: HTMLCanvasElement) {
		// 1 particle per 15px, TODO move to config
		const spacing = 15;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const xParticlesCount = Math.floor(width / spacing);
		const yParticlesCount = Math.floor(height / spacing);
		const totalParticles = xParticlesCount * yParticlesCount;

		const vertices = new Float32Array(totalParticles * 3); // Each particle has x, y, z
		const xStart = (-xParticlesCount * spacing) / 2;
		const yStart = (-yParticlesCount * spacing) / 2;

		let index = 0;
		for (let i = 0; i < totalParticles; i++) {
			const x = i % xParticlesCount;
			const y = Math.floor(i / xParticlesCount);

			vertices[index++] = xStart + x * spacing; // X position
			vertices[index++] = yStart + y * spacing; // Y position
			vertices[index++] = 0; // Z position (always 0)
		}

		return vertices;
	}
}
