import { type ComponentFixture, TestBed } from "@angular/core/testing";

import { provideRouter, RouterOutlet } from "@angular/router";
import { beforeEach, describe, expect, it } from "vitest";
import { routes } from "../app.routes";
import { SettingsButtonComponent } from "./settings-button.component";

describe("SettingButtonComponent", () => {
  let component: SettingsButtonComponent;
  let fixture: ComponentFixture<SettingsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterOutlet, SettingsButtonComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
