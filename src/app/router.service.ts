import { Inject, Injectable, signal } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs";
import type { Route } from "./router";

@Injectable({
	providedIn: "root",
})
export class RouterService {
	routes = signal<Route[]>([]);
	url = signal<string>("");

	constructor(@Inject(Router) private router: Router) {
		// initial page load
		let url = this.router.url;
		this.updateRoutes(url);

		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				map((event) => event as NavigationEnd),
			)
			.subscribe((event) => {
				url = event.url;

				this.updateRoutes(url);
			});
	}

	private updateRoutes(url: string) {
		let _url = url;
		const queryIndex = _url.indexOf("?");
		if (queryIndex !== -1) _url = _url.slice(0, _url.indexOf("?")); // remove query params
		const paths = _url.split("/").filter((route) => route !== "");

		const routes = paths.map((path, i) => ({
			path: `/${paths.slice(0, i + 1).join("/")}`,
			route: path,
		}));

		this.url.set(_url);
		this.routes.set(routes);
	}
}
