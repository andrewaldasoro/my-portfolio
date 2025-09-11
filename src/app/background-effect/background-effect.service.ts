import { Injectable } from "@angular/core";
import type { BackgroundEffect } from "./background-effect";

@Injectable()
export class BackgroundEffectService {
  init(backgroundEffect: BackgroundEffect) {
    backgroundEffect.init();
  }
}
