import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class MainService {
	// biome-ignore lint/complexity/noBannedTypes: Angular 19 uses it like that
	constructor(@Inject(PLATFORM_ID) private platformId: Object) {
		if (isPlatformBrowser(this.platformId)) {
		}
	}
}
