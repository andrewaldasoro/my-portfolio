import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { NavbarInputComponent } from "./navbar-input.component";

describe("NavbarInputComponent", () => {
  let component: NavbarInputComponent;
  let fixture: ComponentFixture<NavbarInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
