import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter, RouterOutlet } from "@angular/router";
import { beforeEach, describe, expect, it } from "vitest";
import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { BackgroundEffectService } from "./background-effect/background-effect.service";
import { ChangeColorService } from "./change-color.service";
import { ConfigurationService } from "./configuration.service";
import { NavbarComponent } from "./navbar/navbar.component";
import { SettingsButtonComponent } from "./settings-button/settings-button.component";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterOutlet, NavbarComponent, SettingsButtonComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        ChangeColorService,
        BackgroundEffectService,
        ConfigurationService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });
});
