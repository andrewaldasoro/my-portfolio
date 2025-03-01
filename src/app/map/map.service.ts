import { Injectable, NgZone, inject, signal } from "@angular/core";
import mapboxgl from "mapbox-gl";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { ConfigurationService } from "../configuration.service";
import type { Neighbourhood } from "./map.types";

@Injectable()
export class MapService {
	private zone = inject(NgZone);
	protected configurationService = inject(ConfigurationService);

	mapCreated = signal(false);
	mapInstance?: mapboxgl.Map;

	private subscription = new Subscription();

	constructor() {
		if (!environment.mapboxAccessToken) {
			throw new Error("'mapboxAccessToken' not found in configuration");
		}

		mapboxgl.accessToken = environment.mapboxAccessToken;
	}

	initMap(options: mapboxgl.MapOptions) {
		this.zone.onStable.pipe(first()).subscribe(() => {
			NgZone.assertNotInAngularZone();
			this.mapInstance = new mapboxgl.Map(options);
			this.mapInstance.on("load", () => {
				this.mapCreated.set(true);
			});
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

	addNeighbourhoods(neighbourhoods: Neighbourhood[]) {
		this.zone.runOutsideAngular(() => {
			if (!this.mapInstance) throw "map not found";

			const sourceId = "neighbourhoods";
			const features: GeoJSON.Feature[] = [];
			for (const neighbourhood of neighbourhoods) {
				const { geometry, ...properties } = neighbourhood;

				const feature: GeoJSON.Feature = {
					type: "Feature",
					properties,
					geometry,
				};
				features.push(feature);
			}

			this.mapInstance.addSource(sourceId, {
				type: "geojson",
				data: {
					type: "FeatureCollection",
					features,
				},
			});

			this.mapInstance.addLayer({
				id: sourceId,
				type: "fill",
				source: sourceId,
				layout: {},
				paint: {
					"fill-color": "#0080ff",
					"fill-opacity": 0.5,
				},
			});

			this.mapInstance.addLayer({
				id: "outline",
				type: "line",
				source: sourceId,
				layout: {},
				paint: {
					"line-color": "#0090ff",
					"line-width": 1,
				},
			});
		});
	}
}
