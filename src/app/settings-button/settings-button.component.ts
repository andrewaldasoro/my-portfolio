import { Component, inject, viewChild } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { ChangeColorButtonComponent } from "../change-color-button/change-color-button.component";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
	selector: "app-settings",
	imports: [RouterModule, DialogComponent, ChangeColorButtonComponent],
	templateUrl: "./settings-button.component.html",
	styleUrl: "./settings-button.component.scss",
})
export class SettingsButtonComponent {
	readonly dialog = viewChild.required(DialogComponent);
	private route = inject(ActivatedRoute);
	private unsubscriber = new Subject<void>();

	constructor() {
		this.route.queryParams
			.pipe(takeUntil(this.unsubscriber))
			.subscribe((params) => {
				if (params.dialog === "settings") {
					this.dialog().show();
				}
			});
	}

	ngOnDestroy() {
		this.unsubscriber.next();
		this.unsubscriber.complete();
	}
}
