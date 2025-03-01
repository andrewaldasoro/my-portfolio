import { Component, inject } from "@angular/core";
import { ChangeColorService } from "../change-color.service";

@Component({
	selector: "app-change-color-button",
	templateUrl: "./change-color-button.component.html",
	styleUrl: "./change-color-button.component.scss",
	providers: [ChangeColorService],
})
export class ChangeColorButtonComponent {
	private changeColorService = inject(ChangeColorService);

	changeColor() {
		this.changeColorService.changeColor().save();
	}
}
