// import { Geometry } from "geojson";

/*
 *
 * resources types
 */
export interface NeighbourhoodRecord {
  geometry: string;
  areaId: string;
  areaName: string;
  areaAttrId: number;
  parentAreaId: number;
  areaShortCode: string;
  areaLongCode: string;
  areaDesc: string;
  x: number;
  y: number;
  longitude: number;
  latitude: number;
  objectId: number;
  shapeArea: number;
  shapeLenght: number;
}

export interface CovidRecord {
  id: number;
  assignedId: number;
  outbreakAssociated: string;
  ageGroup: string;
  neighbourhoodName: string;
  FSA: string;
  sourceOfInfection: string;
  classification: string;
  episodeDate: string;
  reportedDate: string;
  clientGender: string;
  outcome: string;
  currentlyHospitalized: string;
  currentlyInICU: string;
  currentlyIntubated: string;
  everHospitalized: string;
  everInICU: string;
  everIntubated: string;
}

export interface Field {
  info?: {
    notes: string;
    typeOverride: string;
    label: string;
  };
  type: string;
  id: string;
}

export interface Links {
  prev?: string;
  start: string;
  next: string;
}

export interface DataStore {
  includeTotal: boolean;
  resourceId: string;
  fields: Array<Field>;
  recordsFormat: string;
  neighbourhoodsRecords?: Array<NeighbourhoodRecord>;
  covidRecords?: Array<CovidRecord>;
  records?: Array<NeighbourhoodRecord | CovidRecord>;
  links: Links;
  total: number;
}

/*
 *
 * meta data types
 */
export interface Resource {
  packageId: string;
  datastoreActive: boolean;
  id: string;
  format: string;
  state: string;
  hash: string;
  description: string;
  isPreview: boolean;
  lastModified: string;
  urlType: string;
  name: string;
  created: string | Date;
  url: string;
  position: number;
  revisionId: string;
  total?: number;
}

export interface Tag {
  state: string;
  displayName: string;
  id: string;
  name: string;
}

export interface Organization {
  description: string;
  created: string | Date;
  title: string;
  name: string;
  isOrganization: boolean;
  state: string;
  imageUrl: string;
  revisionId: string;
  type: string;
  id: string;
  approvalStatus: string;
}

export interface PackageShow {
  licenseTitle: string;
  ownerUnit: string;
  topics: string;
  ownerEmail: string;
  excerpt: string;
  private: boolean;
  ownerDivision: string;
  numTags: number;
  id: string;
  metadataCreated: string | Date;
  refreshRate: string;
  title: string;
  licenseUrl: string;
  state: string;
  informationUrl: string;
  licenseId: string;
  type: string;
  resources: Array<Resource>;
  limitations: string;
  numResources: number;
  tags: Array<Tag>;
  isRetired: boolean;
  creatorUserId: string;
  datasetCategory: string;
  name: string;
  metadataModified: string;
  isopen: boolean;
  notes: string;
  ownerOrg: string;
  lastRefreshed: string;
  formats: string;
  ownerSection: string;
  organization: Organization;
  revisionId: string;
}
