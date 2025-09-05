import { BufferAttribute, BufferGeometry, Points, ShaderMaterial } from "three";
import { BackgroundEffect } from "./background-effect";

export class BackgroundDotsEffect extends BackgroundEffect {
  private geometry!: BufferGeometry;
  private material!: ShaderMaterial;
  private points?: Points;
  private positions?: Float32Array;
  private opacities!: Float32Array;

  generateTextures() {
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
  }

  updateParticles() {
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const xParticlesCount = Math.floor(width / this.spacing);
    const yParticlesCount = Math.floor(height / this.spacing);
    this.totalParticles = xParticlesCount * yParticlesCount;

    /**
     * this formula is to center the particles in the element*
     * 0 is the element's center so we need negative values of the staring points
     * l = element's length = -particlesCount * spacing
     * start = left or bottom side of the screen = l / 2
     *
     * if we leave the x and y starting coordinates as w / 2 and h / 2 respectively
     * the fist particle will be painted without a margin in the left/bottom sides
     * so to adjust them we need to add half of the spacing.
     *
     * startWithMargin = start + spacing / 2
     *
     * the decomposed formula is ((-particlesCount * spacing) / 2) + (spacing / 2)
     * and can be factored to (-particlesCount + 1) * (spacing / 2)
     *
     * *element == canvas in this example
     */
    const startingPoint = (particlesCount: number) => {
      return ((-particlesCount + 1) * this.spacing) / 2;
    };
    const xStart = startingPoint(xParticlesCount);
    const yStart = startingPoint(yParticlesCount);

    this.positions = new Float32Array(this.totalParticles * 3); // x, y, z
    this.opacities = new Float32Array(this.totalParticles); // Opacity attribute
    this.opacitySwitchState = new Float32Array(this.totalParticles);

    for (let i = 0; i < this.totalParticles; i++) {
      const x = (i % xParticlesCount) * this.spacing;
      const y = Math.floor(i / xParticlesCount) * this.spacing;

      const index = i * 3;
      this.positions[index] = xStart + x;
      this.positions[index + 1] = yStart + y;
      this.positions[index + 2] = 0;

      this.opacities[i] =
        Math.random() * (this.maxOpacity - this.minOpacity) + this.minOpacity; // Random initial opacity
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

  getOpacity(i: number): number {
    return this.opacities[i];
  }

  setOpacity(opacity: number, i: number) {
    this.opacities[i] = opacity;
  }

  override render(): void {
    this.geometry.attributes.opacity.needsUpdate = true;

    super.render();
  }
}
