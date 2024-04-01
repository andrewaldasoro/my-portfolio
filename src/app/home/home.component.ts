import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ChangeColorService } from '../change-color.service';
import { BACKGROUND_COLOR, COLOR } from '../constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeColorService: ChangeColorService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const backgroundColor = localStorage.getItem(BACKGROUND_COLOR);
      const color = localStorage.getItem(COLOR);

      if (backgroundColor && color) {
        this.changeColorService.changeColor(backgroundColor, color);
      } else {
        this.changeColorService.changeColor('#f5ce4d', '#000000');
      }
    }
  }
}
