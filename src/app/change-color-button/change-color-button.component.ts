import { Component, Inject } from "@angular/core";
import { ChangeColorService } from "../change-color.service";

@Component({
	selector: "app-change-color-button",
	templateUrl: "./change-color-button.component.html",
	styleUrl: "./change-color-button.component.scss",
	providers: [ChangeColorService],
})
export class ChangeColorButtonComponent {
	constructor(
		@Inject(ChangeColorService) private changeColorService: ChangeColorService,
	) {}

	changeColor() {
		this.changeColorService.changeColor().save();
	}
}
