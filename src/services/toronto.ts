/* eslint-disable @typescript-eslint/no-explicit-any */
// import { get } from "https";

import { DataStore, PackageShow } from "../interfaces/toronto";

// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "https://ckan0.cf.opendata.inter.prod-toronto.ca";
const apiPath = "/api/3/action";
const apiUrl = baseUrl + apiPath;

export const getDataStore = (id: string, page?: number): Promise<DataStore> =>
  request(
    page
      ? `/datastore_search?id=${id}&offset=${page}`
      : `/datastore_search?id=${id}`
  ).catch((err) => {
    console.log(err);
  });

export const getPackageShow = (id: string): Promise<PackageShow> =>
  request(`/package_show?id=${id}`).catch((err) => {
    console.log(err);
  });

const request = (path: string): Promise<any> =>
  fetch(apiUrl + path)
    .then((response) => response.json())
    .then((response) => toCamel(response.result));

function toCamel(object: { [key: string]: any } | Array<any>) {
  const newObject: { [key: string]: any } = {};
  let value;
  if (object instanceof Array) {
    return object.map(function (value) {
      if (typeof value === "object") {
        value = toCamel(value);
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
        value = object[key];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toCamel(value);
        }
        newObject[newKey] = value;
      }
    }
  }
  return newObject;
}

//
// const request1 = (path: string): Promise<any> =>
//   new Promise((resolve, reject) =>
//     get(apiUrl + path, (response) => {
//
//       const dataChunks: Array<any> = [];
//       response
//         .on("data", (chunk) => {
//           dataChunks.push(chunk);
//         })
//         .on("end", () => {
//           resolve(JSON.parse(Buffer.concat(dataChunks).toString()).result);
//         })
//         .on("error", (error) => {
//           reject(error);
//         });
//     })
//   );
