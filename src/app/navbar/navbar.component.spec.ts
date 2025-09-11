import { type ComponentFixture, TestBed } from "@angular/core/testing";

import { provideRouter, RouterOutlet } from "@angular/router";
import { beforeEach, describe, expect, it } from "vitest";
import { routes } from "../app.routes";
import { NavbarComponent } from "./navbar.component";

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterOutlet, NavbarComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
