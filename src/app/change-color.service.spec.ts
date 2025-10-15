import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { ChangeColorService, invertColor } from "./change-color.service";

describe("ChangeColorService", () => {
  let service: ChangeColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeColorService],
    });
    service = TestBed.inject(ChangeColorService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should change the color randomly", () => {
    const theme = service.changeColor();
    expect(theme).toBeDefined();
    // check if the background color is a valid hex color
    expect(theme.backgroundColor).toMatch(/^#([0-9a-fA-F]{6})$/);
    // check if the color is a valid hex color
    expect(theme.color).toMatch(/^#([0-9a-fA-F]{6})$/);
    // check if the background color is different from the color
    expect(theme.backgroundColor).not.toBe(theme.color);
  });

  it("should change the color with custom colors", () => {
    const theme = service.changeColor("#000000", "#ffffff");
    expect(theme).toBeDefined();
    expect(theme.backgroundColor).toBe("#000000");
    expect(theme.color).toBe("#ffffff");
  });

  it("should change the color if the background color is the same as the color", () => {
    const theme = service.changeColor("#000000", "#000000");
    expect(theme).toBeDefined();
    expect(theme.color).toBe(invertColor(theme.backgroundColor));

    const themeShort = service.changeColor("#000000", "#000");
    expect(themeShort).toBeDefined();
    expect(themeShort.color).toBe(invertColor(themeShort.backgroundColor));
  });

  it("should accept short hex colors", () => {
    const theme = service.changeColor("#000", "#fff");
    expect(theme).toBeDefined();
    expect(theme.backgroundColor).toBe("#000000");
    expect(theme.color).toBe("#ffffff");
  });
});
