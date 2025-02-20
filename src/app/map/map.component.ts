import {
	type AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	type ElementRef,
	Inject,
	ViewChild,
	effect,
} from "@angular/core";
import { type Observable, Subject, takeUntil, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { MapService } from "./map.service";
import type { Neighbourhood } from "./map.types";
import { OpenDataService } from "./open-data/open-data.service";
import { TorontoNeighbourhoodsService } from "./toronto-neighbourhoods.service";

@Component({
	selector: "app-map",
	template: "<div #map></div>",
	styles: [
		`
		:host{
			display: block;
			height: 100%;
			width: 100%;
		}

		div {
			height: 100%;
			width: 100%;
		}
		`,
	],
	providers: [MapService, TorontoNeighbourhoodsService, OpenDataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
	@ViewChild("map", { static: true }) mapContainer!: ElementRef;

	private unsubscriber = new Subject<void>();

	constructor(
		@Inject(TorontoNeighbourhoodsService)
		private torontoNeighbourhoodsService: TorontoNeighbourhoodsService,
		private mapService: MapService,
	) {
		effect(() => {
			const created = this.mapService.mapCreated();

			if (created) {
				this.onMapCreated();
			}
		});
	}

	ngAfterViewInit(): void {
		const mapOptions: mapboxgl.MapOptions = {
			container: this.mapContainer.nativeElement,
			center: [-79.38, 43.72], // Centered on downtown Toronto
			zoom: 11,
		};

		if (!environment.production) {
			mapOptions.devtools = true;
		}

		this.mapService.initMap(mapOptions);
	}

	ngOnDestroy(): void {
		this.mapService.destoryMap();
	}

	private onMapCreated(): void {
		this.loadNeighbourhoods().subscribe();
	}

	private loadNeighbourhoods(): Observable<Neighbourhood[]> {
		return this.torontoNeighbourhoodsService.getTorontoNeighbourhoods().pipe(
			takeUntil(this.unsubscriber),
			tap((neighbourhoods) => {
				this.mapService.addNeighbourhoods(neighbourhoods);
			}),
		);
	}
}
