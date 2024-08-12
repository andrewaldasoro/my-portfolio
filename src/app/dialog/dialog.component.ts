import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  @HostBinding('style.display') private display = 'none';

  constructor() {}

  onBackdropClick() {
    this.close();
  }

  show() {
    this.display = 'grid';
  }

  close() {
    this.display = 'none';
  }
}
