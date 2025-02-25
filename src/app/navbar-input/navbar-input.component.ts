import { Component, Inject, effect } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import type { Route } from "../router";
import { RouterService } from "../router.service";

// const routes = ["skills", "experience", "education", "format-text", "map"];
const routes = ["format-text"];

@Component({
	selector: "app-navbar-input",
	imports: [FormsModule],
	templateUrl: "./navbar-input.component.html",
	styleUrl: "./navbar-input.component.scss",
})
export class NavbarInputComponent {
	value = "";
	hint = "";
	routes: Route[] = [];

	get actualPath() {
		const routesLength = this.routes.length;
		if (routesLength === 0) return "";

		return this.routes[routesLength - 1].path;
	}

	private trailingSlashes = new RegExp(/^(\/){1,}|(\/){1,}$/);
	private twoOrMoreSlashes = new RegExp(/(\/){2,}/);

	constructor(
		@Inject(Router) private router: Router,
		@Inject(RouterService) private routerService: RouterService,
	) {
		effect(() => {
			this.routes = this.routerService.routes();
		});
	}

	onKeyDown(event: KeyboardEvent): void {
		const key = event.key;

		switch (key) {
			case "Tab":
				event.preventDefault();
				this.autocomplete();
				break;

			case "Enter":
				try {
					this.onRedirect();
				} catch (error) {
					// change to notification
					console.error(error);
				}
				break;

			case "Backspace":
			case "Escape":
				this.clearHint();
				break;
		}
	}

	onModelChange(value: string): void {
		this.loadHint();
	}

	private loadHint(): void {
		if (!this.value) return;
		// let actualPath = location.hash.substring(1);
		// console.log(actualPath);

		// if (!actualPath.endsWith('/')) {
		//   actualPath += '/';
		// }

		// const filteredRoutes = routes.filter((r) => r.startsWith(actualPath));

		this.hint = routes.find((route) => route.startsWith(this.value)) || "";
	}

	private onRedirect(): void {
		if (!this.value) return;

		const pathErrors = this.getPathErrors(this.value);
		if (pathErrors.length > 0) {
			throw pathErrors;
		}

		const nextPath = this.value;
		let actualPath = this.actualPath;

		if (nextPath === "..") {
			actualPath = this.handleGoOneLevelAbove(actualPath);
			this.redirect(actualPath);
			return;
		}

		if (nextPath.includes("/")) {
			actualPath = this.handleMultiplePaths(actualPath, nextPath);
			this.redirect(actualPath);
			return;
		}

		actualPath += this.addFirstSlash(nextPath);
		this.redirect(actualPath);
		return;
	}

	private redirect(path: string): void {
		this.router.navigate([path]);
		this.clearValue();
	}

	private handleGoOneLevelAbove(actualPath: string): string {
		if (actualPath === "/") return actualPath;

		const oneLevelAbovePath = actualPath
			.slice(1)
			.split("/")
			.slice(0, -1)
			.join("/");

		return this.addFirstSlash(oneLevelAbovePath);
	}

	private handleMultiplePaths(actualPath: string, nextPath: string): string {
		let _actualPath = actualPath;
		const paths = nextPath.split("/");
		for (const path of paths) {
			if (path === "..") {
				_actualPath = this.handleGoOneLevelAbove(actualPath);
			} else {
				_actualPath += this.addFirstSlash(path);
			}
		}

		return _actualPath;
	}

	private autocomplete(): void {
		if (this.hint) {
			this.value = this.hint;
		}

		this.clearHint();
	}

	private clearValue() {
		this.clearHint();
		this.value = "";
	}

	private clearHint() {
		this.hint = "";
	}

	private addFirstSlash(path: string): string {
		return `/${path}`;
	}

	private getPathErrors(path: string): Error[] {
		const errors: Error[] = [];

		if (this.hasTrailingSlashes(path)) {
			const error = new Error("the path can't contain trailing slashes");
			errors.push(error);
		}

		if (this.hasTwoOrMoreSlashes(path)) {
			const error = new Error("the path can't contain repeated slashes");
			errors.push(error);
		}

		return errors;
	}

	private hasTrailingSlashes(s: string): boolean {
		return this.trailingSlashes.test(s);
	}

	private hasTwoOrMoreSlashes(s: string): boolean {
		return this.twoOrMoreSlashes.test(s);
	}
}
