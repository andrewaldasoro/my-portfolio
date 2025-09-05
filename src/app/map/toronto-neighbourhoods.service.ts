import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, of, switchMap, tap, type Observable } from "rxjs";
import type { Neighbourhood } from "./map.types";
import { OpenDataService } from "./open-data/open-data.service";
import type {
  DataStore,
  NeighbourhoodResponse,
  Response,
} from "./open-data/open-data.types";
import { getTorontoDataStoreByResourceIdUrl } from "./open-data/open-data.utils";

@Injectable()
export class TorontoNeighbourhoodsService {
  private http = inject(HttpClient);
  private openDataService = inject(OpenDataService);

  private neighbourhoods: Neighbourhood[] = [];

  constructor() {
    const neighbourhoodsString = localStorage.getItem("neighbourhoods");
    if (neighbourhoodsString) {
      const neighbourhoods = JSON.parse(neighbourhoodsString);
      this.neighbourhoods = neighbourhoods;
    }
  }

  getTorontoNeighbourhoods(): Observable<Neighbourhood[]> {
    // return cached the neighbourhoods
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
          this.neighbourhoods = neighbourhoods;

          // store in local storage
          const neighbourhoodsString = JSON.stringify(neighbourhoods);
          localStorage.setItem("neighbourhoods", neighbourhoodsString);
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
  ): Observable<DataStore<NeighbourhoodResponse>> {
    const request = this.getTorontoNeighbourhoodDataStore(resourceId, offset);

    return request.pipe(
      switchMap((result) => {
        const limit = result.limit;
        const nextOffset = limit + offset;

        if (nextOffset < result.total) {
          return this.getTorontoNeighbourhoodDataStoreRecursive(
            resourceId,
            nextOffset,
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
  ): Observable<DataStore<NeighbourhoodResponse>> {
    const request = this.http.get<Response<DataStore<NeighbourhoodResponse>>>(
      getTorontoDataStoreByResourceIdUrl(resourceId, offset),
    );

    return request.pipe(map(({ result }) => result));
  }
}
