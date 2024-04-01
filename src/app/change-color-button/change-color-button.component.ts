import { Component } from '@angular/core';
import { ChangeColorService } from '../change-color.service';

@Component({
  selector: 'app-change-color-button',
  standalone: true,
  imports: [],
  templateUrl: './change-color-button.component.html',
  styleUrl: './change-color-button.component.scss',
})
export class ChangeColorButtonComponent {
  constructor(private changeColorService: ChangeColorService) {}

  changeColor() {
    this.changeColorService.changeColor();
  }
}
