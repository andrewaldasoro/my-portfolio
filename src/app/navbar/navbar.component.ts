import { Component, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarInputComponent } from '../navbar-input/navbar-input.component';
import { Route } from '../router';
import { RouterService } from '../router.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NavbarInputComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  routes: Route[] = [];

  constructor(private routerService: RouterService) {
    effect(() => {
      this.routes = this.routerService.routes();
    });
  }
}
