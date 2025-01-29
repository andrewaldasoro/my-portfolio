import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.component.html'
})
export class HomeComponent {
  @HostBinding('attr.data-cursor') private cursor = 'text';
}
