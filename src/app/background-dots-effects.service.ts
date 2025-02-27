import { Injectable } from "@angular/core";
import {
	BufferAttribute,
	BufferGeometry,
	PerspectiveCamera,
	Points,
	Scene,
	ShaderMaterial,
	WebGLRenderer,
} from "three";
import { resizeRendererToElementSize } from "../three.utils";

// values from 0 - 1
const MAX_OPACITY = 0.25;
const MIN_OPACITY = 0.1;
const OPACITY_TRANSITION_SPEED = 0.005;
const SPACING = 30; // Adjust spacing for better visibility

@Injectable()
export class BackgroundDotsEffectsService {
	private renderer!: WebGLRenderer;
	private scene!: Scene;
	private camera!: PerspectiveCamera;
	private geometry!: BufferGeometry;
	private material!: ShaderMaterial;
	private points?: Points;
	private positions?: Float32Array;
	private opacities?: Float32Array;
	private opacitySwitchState?: Float32Array; // if true increase the value of the opacity, decrease otherwise
	private totalParticles = 0;
	private animationFrameId = 0;

	init() {
		this.addBackgroundDotsMesh();
	}

	private addBackgroundDotsMesh() {
		const canvas = document.createElement("canvas") as HTMLCanvasElement;
		canvas.className = "absolute w-full h-full";
		document.body.prepend(canvas);

		this.renderer = new WebGLRenderer({ canvas, alpha: true });

		this.scene = new Scene();
		this.camera = new PerspectiveCamera(
			50,
			canvas.clientWidth / canvas.clientHeight,
			0.1,
			2000,
		);
		this.camera.position.z = 1000;

		// Create geometry and material once
		this.geometry = new BufferGeometry();
		this.material = new ShaderMaterial({
			transparent: true,
			vertexShader: `
                attribute float opacity;
                varying float vOpacity;
                void main() {
                    vOpacity = opacity;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = 3.0; // Particle size
                }
            `,
			fragmentShader: `
                varying float vOpacity;
                void main() {
                    gl_FragColor = vec4(1.0, 1.0, 1.0, vOpacity);
                }
            `,
		});

		this.points = new Points(this.geometry, this.material);
		this.scene.add(this.points);

		this.render();
		this.listenToWindowResize();
	}

	private render() {
		if (!this.renderer || !this.camera || !this.scene || !this.geometry) return;

		this.updateParticles();
		resizeRendererToElementSize(this.renderer, this.camera);

		cancelAnimationFrame(this.animationFrameId);
		this.animate();
	}

	private updateParticles() {
		const canvas = this.renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const xParticlesCount = Math.floor(width / SPACING);
		const yParticlesCount = Math.floor(height / SPACING);
		this.totalParticles = xParticlesCount * yParticlesCount;

		/**
		 * this formula is to center the particles in the element*
		 * 0 is the element's center so we need negative values of the staring points
		 * l = element's length = -particlesCount * SPACING
		 * start = left or bottom side of the screen = l / 2
		 *
		 * if we leave the x and y starting coordinates as w / 2 and h / 2 respectively
		 * the fist particle will be painted without a margin in the left/bottom sides
		 * so to adjust them we need to add half of the SPACING.
		 *
		 * startWithMargin = start + SPACING / 2
		 *
		 * the decomposed formula is ((-particlesCount * SPACING) / 2) + (SPACING / 2)
		 * and can be factored to (-particlesCount + 1) * (SPACING / 2)
		 *
		 * *element == canvas in this example
		 */
		const startingPoint = (particlesCount: number) => {
			return ((-particlesCount + 1) * SPACING) / 2;
		};
		const xStart = startingPoint(xParticlesCount);
		const yStart = startingPoint(yParticlesCount);

		this.positions = new Float32Array(this.totalParticles * 3); // x, y, z
		this.opacities = new Float32Array(this.totalParticles); // Opacity attribute
		this.opacitySwitchState = new Float32Array(this.totalParticles);

		for (let i = 0; i < this.totalParticles; i++) {
			const x = (i % xParticlesCount) * SPACING;
			const y = Math.floor(i / xParticlesCount) * SPACING;

			const index = i * 3;
			this.positions[index] = xStart + x;
			this.positions[index + 1] = yStart + y;
			this.positions[index + 2] = 0;

			this.opacities[i] =
				Math.random() * (MAX_OPACITY - MIN_OPACITY) + MIN_OPACITY; // Random initial opacity
			this.opacitySwitchState[i] = Math.random() < 0.5 ? 1 : 0; // Store state as 1 or 0
		}

		this.geometry.setAttribute(
			"position",
			new BufferAttribute(this.positions, 3),
		);
		this.geometry.setAttribute(
			"opacity",
			new BufferAttribute(this.opacities, 1),
		);
	}

	private animate() {
		if (!this.opacities || !this.opacitySwitchState || !this.positions) return;

		this.animationFrameId = requestAnimationFrame(() => this.animate());

		// Update opacity attribute to create animation
		for (let i = 0; i < this.totalParticles; i++) {
			let opacity = this.opacities[i];

			if (opacity > MAX_OPACITY) this.opacitySwitchState[i] = 0;
			if (opacity < MIN_OPACITY) this.opacitySwitchState[i] = 1;

			opacity += this.opacitySwitchState[i]
				? OPACITY_TRANSITION_SPEED
				: -OPACITY_TRANSITION_SPEED;

			this.opacities[i] = opacity;
		}
		this.geometry.attributes.opacity.needsUpdate = true;

		this.renderer.render(this.scene, this.camera);
	}

	private listenToWindowResize() {
		window.addEventListener("resize", () => {
			this.render();
		});
	}
}
