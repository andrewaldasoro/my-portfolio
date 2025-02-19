import { Inject, Injectable, NgZone } from "@angular/core";
import mapboxgl from "mapbox-gl";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { environment } from "../environments/environment";
import { ConfigurationService } from "./configuration.service";

@Injectable()
export class MapService {
	mapInstance?: mapboxgl.Map;

	private subscription = new Subscription();

	constructor(
		private zone: NgZone,
		@Inject(ConfigurationService)
		protected configurationService: ConfigurationService,
	) {
		if (!environment.mapboxAccessToken) {
			throw new Error("'mapboxAccessToken' not found in configuration");
		}

		mapboxgl.accessToken = environment.mapboxAccessToken;
	}

	initMap(options: mapboxgl.MapOptions) {
		this.zone.onStable.pipe(first()).subscribe(() => {
			NgZone.assertNotInAngularZone();
			this.mapInstance = new mapboxgl.Map(options);
		});

		this.subscription.add(
			this.zone.onMicrotaskEmpty.subscribe(() => this.applyChanges()),
		);
	}

	destoryMap() {
		if (this.mapInstance) {
			this.subscription.unsubscribe();
			this.mapInstance.remove();
		}
	}

	applyChanges() {
		this.zone.runOutsideAngular(() => {
			// this.removeMarkers();
			// this.removePopups();
			// this.removeImages();
		});
	}
}
