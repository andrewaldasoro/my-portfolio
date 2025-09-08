import { Injectable } from "@angular/core";
import { padZero } from "../utils";
import { Theme } from "./theme";

@Injectable()
export class ChangeColorService {
  changeColor(backgroundColor?: string, color?: string): Theme {
    let _backgroundColor = backgroundColor
      ? formatColor(backgroundColor)
      : undefined;
    let _color = color ? formatColor(color) : undefined;
    
    if (!_backgroundColor) _backgroundColor = randomColor(); // TODO: try with 128 when creating the background effects
    if (!_color || _color === _backgroundColor)
      _color = invertColor(_backgroundColor);

    const theme = new Theme(_backgroundColor, _color);

    theme.apply();

    return theme;
  }
}

export function formatColor(color: string): string {
  // check if colors are valid hex colors or short hex colors
  if (
    color &&
    !color.match(/^#([0-9a-fA-F]{6})$/) &&
    !color.match(/^#([0-9a-fA-F]{3})$/)
  ) {
    throw new Error(`Invalid color: ${color}`);
  }

  // convert short hex colors to long hex colors
  if (color?.match(/^#([0-9a-fA-F]{3})$/)) {
    color = color.replace(/^#([0-9a-fA-F]{3})$/, "#$1$1");
  }

  // convert to lowercase
  return color.toLowerCase();
}

export function randomColor(brightness = 256): string {
  const randHex = (max = 256): string => {
    return padZero(Math.floor(Math.random() * max).toString(16));
  };
  const r = randHex(brightness); // Keep RGB values low for dark colors
  const g = randHex(brightness);
  const b = randHex(brightness);
  // let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
  // if (randomHex.length !== 6) randomHex = randomHex.padStart(6, "0");

  return `#${r}${g}${b}`;
}

export function invertColor(hex: string): string {
  const _hex = hex.slice(1); // remove the hash (#)
  const invertHexByte = (hexByte: string): string => {
    return padZero((255 - Number.parseInt(hexByte, 16)).toString(16));
  };

  const r = invertHexByte(_hex.slice(0, 2));
  const g = invertHexByte(_hex.slice(2, 4));
  const b = invertHexByte(_hex.slice(4, 6));

  return `#${r}${g}${b}`;
}
