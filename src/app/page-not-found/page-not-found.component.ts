import { Component, Inject, effect } from "@angular/core";
import { ChangeColorService } from "../change-color.service";
import { RouterService } from "../router.service";

@Component({
	templateUrl: "./page-not-found.component.html",
	styleUrl: "./page-not-found.component.scss",
	providers: [ChangeColorService],
})
export class PageNotFoundComponent {
	url = "";

	constructor(
		@Inject(RouterService) private routerService: RouterService,
		@Inject(ChangeColorService) private changeColorService: ChangeColorService,
	) {
		effect(() => {
			this.url = this.routerService.url();
		});

		this.changeColorService.changeColor("#ff6347", "#000000");
	}
}
