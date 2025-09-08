import { formatColor } from "./change-color.service";
import { BACKGROUND_COLOR, COLOR } from "./constants";

export class Theme {
  backgroundColor: string;
  color: string;

  constructor(backgroundColor: string, color: string) {
    this.backgroundColor = formatColor(backgroundColor);
    this.color = formatColor(color);
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
