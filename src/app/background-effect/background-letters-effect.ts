import { CanvasTexture, Sprite, SpriteMaterial } from "three";
import { BackgroundEffect } from "./background-effect";

const SPRITE_SCALE = 12; // Consistent scale for all sprites
const TEXTURE_SIZE = 24; // Texture size for characters
const CHARACTERS = "KEVANRWLDSORCHVI";

export class BackgroundLettersEffect extends BackgroundEffect {
  private sprites: Sprite[] = [];
  private characterTextures = new Map<string, CanvasTexture>(); // Cache textures

  updateParticles() {
    // Clear scene but do not recreate sprites array
    this.scene.clear();
    this.sprites.length = 0;

    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const xParticlesCount = Math.floor(width / this.spacing);
    const yParticlesCount = Math.floor(height / this.spacing);
    this.totalParticles = xParticlesCount * yParticlesCount;

    // Centering formula optimized
    const startingPoint = (count: number) => ((-count + 1) * this.spacing) / 2;
    const xStart = startingPoint(xParticlesCount);
    const yStart = startingPoint(yParticlesCount);

    this.opacitySwitchState = new Float32Array(this.totalParticles);
    for (let i = 0; i < this.totalParticles; i++) {
      const x = (i % xParticlesCount) * this.spacing;
      const y = Math.floor(i / xParticlesCount) * this.spacing;

      const character = this.getRandomCharacter();
      const sprite = this.createCharacterSprite(character);
      sprite.position.set(xStart + x, yStart + y, 0);
      sprite.scale.set(SPRITE_SCALE, SPRITE_SCALE, SPRITE_SCALE);

      const opacity =
        Math.random() * (this.maxOpacity - this.minOpacity) + this.minOpacity; // Random initial opacity
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

  generateTextures() {
    // Pre-generate textures for all characters
    for (const char of CHARACTERS) {
      this.createTextTexture(char);
    }
  }

  private getRandomCharacter(): string {
    return CHARACTERS[(Math.random() * CHARACTERS.length) | 0]; // Bitwise for faster floor()
  }

  getOpacity(i: number): number {
    return this.sprites[i].material.opacity;
  }

  setOpacity(opacity: number, i: number) {
    this.sprites[i].material.opacity = opacity;
  }
}
