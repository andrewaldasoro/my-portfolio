// OD == open data

export interface Response<T> {
	result: T;
}

export interface DataStore<T> {
	limit: number;
	records: T[];
	_links: {
		start: string;
		next?: string;
	};
	total: number;
}

export interface Package {
	resources: { id: string; datastore_active: boolean }[];
}

export type NeighbourhoodResponse = Omit<Neighbourhood, "geometry"> & {
	geometry: string;
};

interface Neighbourhood {
	_id: number;
	AREA_ID: number;
	AREA_ATTR_ID: number;
	PARENT_AREA_ID: number | null;
	AREA_SHORT_CODE: string;
	AREA_LONG_CODE: string;
	AREA_NAME: string;
	AREA_DESC: string;
	CLASSIFICATION: string;
	CLASSIFICATION_CODE: string;
	OBJECTID: number;
	geometry: GeoJSON.Geometry;
}
