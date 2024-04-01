import { Component, effect } from '@angular/core';
import { ChangeColorService } from '../change-color.service';
import { RouterService } from '../router.service';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  url: string = '';

  constructor(
    private routerService: RouterService,
    private changeColorService: ChangeColorService,
  ) {
    effect(() => {
      this.url = this.routerService.url();
    });

    this.changeColorService.changeColor('#ff6347', '#000000');
  }
}
