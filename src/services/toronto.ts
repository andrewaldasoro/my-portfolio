/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataStore, PackageShow } from "../interfaces/toronto";

const baseUrl = "https://ckan0.cf.opendata.inter.prod-toronto.ca";
const apiPath = "/api/3/action";
const apiUrl = baseUrl + apiPath;

export const getDataStore = (id: string, page?: number): Promise<DataStore> =>
  request(
    page
      ? `/datastore_search?id=${id}&offset=${page}`
      : `/datastore_search?id=${id}`
  );

export const getPackageShow = (id: string): Promise<PackageShow> =>
  request(`/package_show?id=${id}`);

const request = (path: string): Promise<any> =>
  fetch(apiUrl + path)
    .then((response) => response.json())
    .then((response) => toCamelCase(response.result));

function toCamelCase(object: any) {
  const newObject = new Object();
  let value;
  if (object instanceof Array) {
    return object.map(function (value) {
      if (typeof value === "object") {
        value = toCamelCase(value);
      }
      return value;
    });
  } else {
    for (const key in object) {
      let newKey;
      if (object.hasOwnProperty(key)) {
        newKey = key
          .split(/ |_/)
          .map((k) => k.charAt(0).toUpperCase() + k.slice(1).toLowerCase())
          .join("");
        newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
        value = (object as { [value: string]: any })[key];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toCamelCase(value);
        }
        (newObject as { [value: string]: any })[newKey] = value;
      }
    }
  }
  return newObject;
}
