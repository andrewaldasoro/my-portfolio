import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import type configuration from "../assets/configuration.json";

export type Configuration = typeof configuration;

const DEFAULT_CONFIGURATION: Configuration = {
	mapboxAccessToken: "",
};

@Injectable({
	providedIn: "root",
})
export class ConfigurationService {
	configuration = signal<Configuration>(DEFAULT_CONFIGURATION);
	isConfigLoaded = signal<boolean>(false);

	constructor(
		// biome-ignore lint/complexity/noBannedTypes: <explanation>
		@Inject(PLATFORM_ID) private platformId: Object,
		@Inject(HttpClient) private http: HttpClient,
	) {
		if (isPlatformBrowser(this.platformId)) {
			this.http
				.get<Configuration>("/assets/configuration.json")
				.subscribe((configuration) => {
					this.configuration.set(configuration);
					this.isConfigLoaded.set(true);
				});
		}
	}
}
