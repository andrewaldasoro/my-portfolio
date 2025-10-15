export interface Neighbourhood {
  id: number;
  areaId: number;
  // areaAttrId: number;
  parentAreaId: number | null;
  areaShortCode: string;
  areaLongCode: string;
  areaName: string;
  // areaDescription: string;
  // classsification: string;
  // classificationCode: string;
  // objectId: number;
  geometry: GeoJSON.Geometry;
}
