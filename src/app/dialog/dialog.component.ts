import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-dialog',
    imports: [],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @HostBinding('style.display') private display = 'none';

  constructor(private router: Router, private route: ActivatedRoute) {}

  onBackdropClick() {
    this.close();
  }

  show() {
    this.display = 'grid';
  }

  close() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { dialog: null },
      queryParamsHandling: 'merge',
    });

    this.display = 'none';
  }
}
