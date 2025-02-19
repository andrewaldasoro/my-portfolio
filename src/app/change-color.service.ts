import { Injectable } from "@angular/core";
import { padZero } from "../utils";
import { BACKGROUND_COLOR, COLOR } from "./constants";

@Injectable()
export class ChangeColorService {
	changeColor(backgroundColor?: string, color?: string): Theme {
		let _backgroundColor = backgroundColor;
		let _color = color;
		if (!_backgroundColor) _backgroundColor = this.randomColor();
		if (!_color) _color = this.invertColor(_backgroundColor);

		const theme = new Theme(_backgroundColor, _color);

		theme.apply();

		return theme;
	}

	private randomColor(): string {
		let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
		if (randomHex.length !== 6) randomHex = randomHex.padStart(6, "0");

		return `#${randomHex}`;
	}

	private invertColor(hex: string): string {
		const _hex = hex.slice(1); // remove the hash (#)

		const r = (255 - Number.parseInt(_hex.slice(0, 2), 16)).toString(16);
		const g = (255 - Number.parseInt(_hex.slice(2, 4), 16)).toString(16);
		const b = (255 - Number.parseInt(_hex.slice(4, 6), 16)).toString(16);

		return `#${padZero(r)}${padZero(g)}${padZero(b)}`;
	}
}

export class Theme {
	backgroundColor: string;
	color: string;

	constructor(backgroundColor: string, color: string) {
		this.backgroundColor = backgroundColor;
		this.color = color;
	}

	apply() {
		document.body.style.backgroundColor = this.backgroundColor;
		document.body.style.color = this.color;
		document.body.style.setProperty("--background-color", this.backgroundColor);
		document.body.style.setProperty("--color", this.color);

		// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
		document
			.querySelector("meta[name='theme-color']")
			?.setAttribute("content", this.backgroundColor);

		document.querySelector("link[rel~='icon']")?.setAttribute(
			"href",
			`data:image/svg+xml,
      <svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22>
        <rect width=%2250%22 height=%2250%22 rx=%2230%22 fill=%22%23${this.backgroundColor.slice(
					1,
				)}%22 />
      </svg>`,
		);
	}

	save() {
		localStorage.setItem(BACKGROUND_COLOR, this.backgroundColor);
		localStorage.setItem(COLOR, this.color);
	}
}
