import { Injectable } from "@angular/core";
import { BackgroundDotsEffect } from "./background-dots-effect";
import type { BackgroundEffect } from "./background-effect";
import { BackgroundLettersEffect } from "./background-letters-effect";

@Injectable()
export class BackgroundEffectService {
  init(type: "dots" | "chars") {
    let backgroundEffect: BackgroundEffect;
    switch (type) {
      case "dots":
        backgroundEffect = new BackgroundDotsEffect();
        break;
      case "chars":
        backgroundEffect = new BackgroundLettersEffect();
        break;
    }

    backgroundEffect.init();
  }
}
