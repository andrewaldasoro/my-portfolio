import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import type configuration from "../assets/configuration.json";

export type Configuration = typeof configuration;

const DEFAULT_CONFIGURATION: Configuration = {
  mapboxAccessToken: "",
};

@Injectable({
  providedIn: "root",
})
export class ConfigurationService {
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);

  configuration = signal<Configuration>(DEFAULT_CONFIGURATION);
  isConfigLoaded = signal<boolean>(false);

  constructor() {
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
