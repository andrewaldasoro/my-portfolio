import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { environment } from "../../environments/environment";
import { resizeRendererToElementSize } from "../../three.utils";

export interface BackgroundEffectOptions {
  opacity: { min: number; max: number; transitionSpeed: number };
  spacing: number;
}

export abstract class BackgroundEffect {
  renderer!: WebGLRenderer;
  scene!: Scene;
  camera!: PerspectiveCamera;
  opacitySwitchState?: Float32Array; // if true increase the value of the opacity, decrease otherwise
  totalParticles = 0;
  options: BackgroundEffectOptions;
  get minOpacity() {
    return this.options.opacity.min;
  }
  get maxOpacity() {
    return this.options.opacity.max;
  }
  get spacing() {
    return this.options.spacing;
  }

  private animationFrameId = 0;

  constructor() {
    this.options = environment.backgroundEffects;
  }

  init() {
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

    this.generateTextures();
    this.startRendering();
    this.listenToWindowResize();
  }

  private startRendering() {
    if (!this.renderer || !this.camera || !this.scene) return;

    this.updateParticles();
    resizeRendererToElementSize(this.renderer, this.camera);

    cancelAnimationFrame(this.animationFrameId);
    this.animate();
  }

  private animate() {
    if (!this.opacitySwitchState) throw "missing opacitySwitchState";

    this.animationFrameId = requestAnimationFrame(() => this.animate());

    for (let i = 0; i < this.totalParticles; i++) {
      let opacity = this.getOpacity(i);

      if (opacity < this.options.opacity.min) this.opacitySwitchState[i] = 1;
      if (opacity > this.options.opacity.max) this.opacitySwitchState[i] = 0;

      opacity += this.opacitySwitchState[i]
        ? this.options.opacity.transitionSpeed
        : -this.options.opacity.transitionSpeed;

      this.setOpacity(opacity, i);
    }

    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  private listenToWindowResize() {
    window.addEventListener("resize", () => this.startRendering());
  }

  abstract updateParticles(): void;
  abstract generateTextures(): void;
  abstract getOpacity(index: number): number;
  abstract setOpacity(opacity: number, index: number): void;
}
