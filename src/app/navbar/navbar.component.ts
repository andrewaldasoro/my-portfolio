import { Component, effect, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavbarInputComponent } from "../navbar-input/navbar-input.component";
import type { Route } from "../router";
import { RouterService } from "../router.service";

@Component({
	selector: "app-navbar",
	imports: [RouterModule, NavbarInputComponent],
	templateUrl: "./navbar.component.html",
	styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {
	private routerService = inject(RouterService);

	routes: Route[] = [];

	constructor() {
		effect(() => {
			this.routes = this.routerService.routes();
		});
	}
}
