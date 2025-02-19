import {
	type AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	type ElementRef,
	ViewChild,
} from "@angular/core";
import { MapService } from "../map.service";

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
	providers: [MapService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
	@ViewChild("map", { static: true }) mapContainer!: ElementRef;

	constructor(private mapService: MapService) {}

	ngAfterViewInit() {
		const mapOptions: mapboxgl.MapOptions = {
			container: this.mapContainer.nativeElement,
			center: [-79.38, 43.72], // Centered on downtown Toronto
			zoom: 11,
		};
		this.mapService.initMap(mapOptions);
	}
}
