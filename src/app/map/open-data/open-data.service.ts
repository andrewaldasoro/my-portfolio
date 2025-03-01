import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { type Observable, map } from "rxjs";
import type { Package, Response } from "./open-data.types";
import { getTorontoPackageByIdUrl } from "./open-data.utils";

@Injectable()
export class OpenDataService {
	private http = inject(HttpClient);

	getTorontoOpenDataPackage(packageId: string): Observable<Package> {
		const request = this.http.get<Response<Package>>(
			getTorontoPackageByIdUrl(packageId),
		);

		return request.pipe(map(({ result }) => result));
	}
}
