import { Injectable } from "@angular/core";
import {
	CanvasTexture,
	PerspectiveCamera,
	Scene,
	Sprite,
	SpriteMaterial,
	WebGLRenderer,
} from "three";
import { resizeRendererToElementSize } from "../three.utils";

// Opacity values
const MAX_OPACITY = 0.25;
const MIN_OPACITY = 0.1;
const OPACITY_TRANSITION_SPEED = 0.005;
const SPACING = 30; // Adjust spacing for better visibility
const SPRITE_SCALE = 12; // Consistent scale for all sprites
const TEXTURE_SIZE = 24; // Texture size for characters
const CHARACTERS = "KEVANRWLDSORCHVI";

@Injectable()
export class BackgroundLettersEffectsService {
	private renderer!: WebGLRenderer;
	private scene!: Scene;
	private camera!: PerspectiveCamera;
	private sprites: Sprite[] = [];
	private opacitySwitchState?: Float32Array;
	private totalParticles = 0;
	private animationFrameId = 0;
	private characterTextures = new Map<string, CanvasTexture>(); // Cache textures

	init() {
		this.addBackgroundTextMesh();
	}

	private addBackgroundTextMesh() {
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

		this.generateCharacterTextures(); // Pre-generate textures
		this.render();
		this.listenToWindowResize();
	}

	private render() {
		if (!this.renderer || !this.camera || !this.scene) return;

		this.updateParticles();
		resizeRendererToElementSize(this.renderer, this.camera);

		cancelAnimationFrame(this.animationFrameId);
		this.animate();
	}

	private updateParticles() {
		// Clear scene but do not recreate sprites array
		this.scene.clear();
		this.sprites.length = 0;

		const canvas = this.renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const xParticlesCount = Math.floor(width / SPACING);
		const yParticlesCount = Math.floor(height / SPACING);
		this.totalParticles = xParticlesCount * yParticlesCount;

		// Centering formula optimized
		const startingPoint = (count: number) => ((-count + 1) * SPACING) / 2;
		const xStart = startingPoint(xParticlesCount);
		const yStart = startingPoint(yParticlesCount);

		this.opacitySwitchState = new Float32Array(this.totalParticles);
		for (let i = 0; i < this.totalParticles; i++) {
			const x = (i % xParticlesCount) * SPACING;
			const y = Math.floor(i / xParticlesCount) * SPACING;

			const character = this.getRandomCharacter();
			const sprite = this.createCharacterSprite(character);
			sprite.position.set(xStart + x, yStart + y, 0);
			sprite.scale.set(SPRITE_SCALE, SPRITE_SCALE, SPRITE_SCALE);

			const opacity = Math.random() * (MAX_OPACITY - MIN_OPACITY) + MIN_OPACITY; // Random initial opacity
			sprite.material.opacity = opacity;
			this.opacitySwitchState[i] = Math.random() < 0.5 ? 1 : 0; // Store state as 1 or 0

			this.sprites.push(sprite);
			this.scene.add(sprite);
		}
	}

	private createCharacterSprite(character: string): Sprite {
		const texture =
			this.characterTextures.get(character) ??
			this.createTextTexture(character);
		const material = new SpriteMaterial({ map: texture });
		return new Sprite(material);
	}

	private createTextTexture(character: string): CanvasTexture {
		const charTexture = this.characterTextures.get(character);
		if (charTexture) return charTexture;

		const canvas = document.createElement("canvas");
		canvas.width = TEXTURE_SIZE;
		canvas.height = TEXTURE_SIZE;
		const ctx = canvas.getContext("2d");
		if (ctx) {
			ctx.fillStyle = "white";
			ctx.font = `${TEXTURE_SIZE}px Arial`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(character, TEXTURE_SIZE / 2, TEXTURE_SIZE / 2);
		}

		const texture = new CanvasTexture(canvas);
		this.characterTextures.set(character, texture); // Cache texture
		return texture;
	}

	private generateCharacterTextures() {
		// Pre-generate textures for all characters
		for (const char of CHARACTERS) {
			this.createTextTexture(char);
		}
	}

	private getRandomCharacter(): string {
		return CHARACTERS[(Math.random() * CHARACTERS.length) | 0]; // Bitwise for faster floor()
	}

	private animate() {
		if (!this.opacitySwitchState) return;

		this.animationFrameId = requestAnimationFrame(() => this.animate());

		// Animate opacity smoothly
		for (let i = 0; i < this.totalParticles; i++) {
			const material = this.sprites[i].material;
			const opacity = material.opacity;

			if (opacity > MAX_OPACITY) this.opacitySwitchState[i] = 0;
			if (opacity < MIN_OPACITY) this.opacitySwitchState[i] = 1;

			material.opacity += this.opacitySwitchState[i]
				? OPACITY_TRANSITION_SPEED
				: -OPACITY_TRANSITION_SPEED;
		}

		this.renderer.render(this.scene, this.camera);
	}

	private listenToWindowResize() {
		window.addEventListener("resize", () => this.render());
	}
}
