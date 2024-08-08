import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeColorButtonComponent } from './change-color-button.component';

describe('ChangeColorButtonComponent', () => {
  let component: ChangeColorButtonComponent;
  let fixture: ComponentFixture<ChangeColorButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeColorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeColorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
