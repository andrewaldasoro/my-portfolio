import { Component, effect, inject } from "@angular/core";
import { ChangeColorService } from "../change-color.service";
import { RouterService } from "../router.service";

@Component({
	templateUrl: "./page-not-found.component.html",
	styleUrl: "./page-not-found.component.scss",
	providers: [ChangeColorService],
})
export class PageNotFoundComponent {
	private routerService = inject(RouterService);
	private changeColorService = inject(ChangeColorService);

	url = "";

	constructor() {
		effect(() => {
			this.url = this.routerService.url();
		});

		this.changeColorService.changeColor("#ff6347", "#000000");
	}
}
