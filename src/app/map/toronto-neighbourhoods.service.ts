import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { type Observable, map, of, switchMap, tap } from "rxjs";
import type { Neighbourhood } from "./map.types";
import { OpenDataService } from "./open-data/open-data.service";
import type {
	DataStore,
	NeighborhoodResponse,
	Response,
} from "./open-data/open-data.types";
import { getTorontoDataStoreByResourceIdUrl } from "./open-data/open-data.utils";

@Injectable()
export class TorontoNeighbourhoodsService {
	private neighbourhoods: Neighbourhood[] = [];

	constructor(
		@Inject(HttpClient) private http: HttpClient,
		@Inject(OpenDataService) private openDataService: OpenDataService,
	) {}

	getTorontoNeighbourhoods(): Observable<Neighbourhood[]> {
		// return cached the neighborhoods
		if (this.neighbourhoods.length > 0) {
			return of(this.neighbourhoods);
		}

		return this.openDataService
			.getTorontoOpenDataPackage("neighbourhoods")
			.pipe(
				map(({ resources }) =>
					resources.filter((resource) => resource.datastore_active),
				),
				switchMap((resources) =>
					this.getTorontoNeighbourhoodsByResourceId(resources[0].id),
				),
				tap((neighbourhoods) => {
					// TODO store in local storage
					this.neighbourhoods = neighbourhoods;
				}),
			);
	}

	private getTorontoNeighbourhoodsByResourceId(
		resourceId: string,
	): Observable<Neighbourhood[]> {
		return this.getTorontoNeighbourhoodDataStoreRecursive(resourceId).pipe(
			map(({ records }) =>
				records.map((record, i) => {
					let geometry: GeoJSON.Geometry;
					try {
						geometry = JSON.parse(record.geometry);
					} catch (error) {
						throw `record[${i}].geometry cannot be parsed ${error}`;
					}

					const neighbourhood: Neighbourhood = {
						id: record._id,
						areaId: record.AREA_ID,
						parentAreaId: record.PARENT_AREA_ID,
						areaShortCode: record.AREA_SHORT_CODE,
						areaLongCode: record.AREA_LONG_CODE,
						areaName: record.AREA_NAME,
						geometry,
					};

					return neighbourhood;
				}),
			),
		);
	}

	private getTorontoNeighbourhoodDataStoreRecursive(
		resourceId: string,
		offset = 0,
	): Observable<DataStore<NeighborhoodResponse>> {
		const request = this.getTorontoNeighbourhoodDataStore(resourceId, 0);

		return request.pipe(
			switchMap((result) => {
				const nextUrl = result._links.next;
				const limit = result.limit;
				if (nextUrl) {
					const _offset = limit + offset;
					return this.getTorontoNeighbourhoodDataStoreRecursive(
						resourceId,
						_offset,
					).pipe(
						map((_result) => {
							_result.records = result.records.concat(_result.records);

							return _result;
						}),
					);
				}

				return of(result);
			}),
		);
	}

	private getTorontoNeighbourhoodDataStore(
		resourceId: string,
		offset = 0,
	): Observable<DataStore<NeighborhoodResponse>> {
		const request = this.http.get<Response<DataStore<NeighborhoodResponse>>>(
			getTorontoDataStoreByResourceIdUrl(resourceId, offset),
		);

		return request.pipe(map(({ result }) => result));
	}
}
