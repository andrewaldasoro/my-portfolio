export default function changeColor(
  backgroundColor?: string,
  color?: string
): void {
  if (!backgroundColor) backgroundColor = randomColor();
  if (!color) color = invertColor(backgroundColor);
  localStorage.setItem("backgroundColor", backgroundColor);
  localStorage.setItem("color", color);
  document.body.style.backgroundColor = backgroundColor;
  document.body.style.color = color;
  document.body.style.setProperty("--background-color", backgroundColor);
  document.body.style.setProperty("--color", color);
  // eslint-disable-next-line prettier/prettier
  document
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", "#123456");

  document.querySelector("link[rel~='icon']")?.setAttribute(
    "href",
    `data:image/svg+xml,
    <svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22>
      <rect width=%2250%22 height=%2250%22 rx=%2230%22 fill=%22%23${backgroundColor.slice(
        1
      )}%22 />
    </svg>`
  );

  function invertColor(hex: string) {
    hex = hex.slice(1);

    // Invert color components
    const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);

    return "#" + padZero(r) + padZero(g) + padZero(b);

    function padZero(c: string) {
      if (c.length !== 2) {
        return c.padStart(2, "0");
      }
      return c;
    }
  }
}

export function randomColor(): string {
  let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
  if (randomHex.length !== 6) randomHex = randomHex.padStart(6, "0");

  return "#" + randomHex;
}
