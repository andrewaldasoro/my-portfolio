import { type ComponentFixture, TestBed } from "@angular/core/testing";

import { ActivatedRoute, Router } from "@angular/router";
import { DialogComponent } from "./dialog.component";

describe("DialogComponent", () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    const mockActivatedRouteValue = {
      snapshot: { data: {} },
    } as ActivatedRoute;

    await TestBed.configureTestingModule({
      imports: [DialogComponent],
      providers: [
        Router,
        { provide: ActivatedRoute, useValue: mockActivatedRouteValue },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
