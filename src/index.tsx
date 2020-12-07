import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "./i18n";
import Main from "./components/Main";
import * as serviceWorker from "./serviceWorker";

import mapboxgl from "mapbox-gl";
import { getUrl } from "./services/api";

interface MapboxToken {
  token: string;
}

(async () => {
  const fetchMapboxToken: Promise<string> = fetch(
    getUrl("/mapbox-token/create")
  )
    .then((result) => result.json() as Promise<MapboxToken>)
    .then(({ token }) => token)
    .catch((err) => {
      console.error(err);
      if (err.status === 401) {
        return fetchMapboxToken;
      } else {
        return "";
      }
    });
  mapboxgl.accessToken = await fetchMapboxToken;

  ReactDOM.render(<Main />, document.getElementById("root"));
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
