import React from "react";
import mapboxgl, { GeoJSONSource, LngLatLike } from "mapbox-gl";
import {
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  Polygon,
} from "geojson";
import "./Map.scss";
import { getUrl } from "../services/api";
import Loader from "./Loader";
import { Alert, Button, Spinner } from "react-bootstrap";
import polylabel from "polylabel";

interface State {
  lat: number;
  lng: number;
  zoom: number;
  error: Error | null;
  isLoaded: boolean;
  isLoadingData: boolean;
}

class Map extends React.Component<unknown, State> {
  private covidChunckCount = 0;
  private map!: mapboxgl.Map;
  private mapContainer!: HTMLElement;
  private torontoNeighbourhoods: FeatureCollection<
    Geometry,
    GeoJsonProperties
  > = {
    type: "FeatureCollection",
    features: [],
  };
  private covidCasesCounter = 0;
  private reportedDate!: string;

  constructor(props: unknown) {
    super(props);
    this.state = {
      lng: -79.404,
      lat: 43.698,
      zoom: 10,
      error: null,
      isLoaded: false,
      isLoadingData: true,
    };
  }

  async componentDidMount(): Promise<void> {
    try {
      mapboxgl.accessToken = await fetch(getUrl("/mapbox-token/create"))
        .then((result) => result.json())
        .then((result) => {
          this.setState({
            isLoaded: true,
          });
          return result.token as string;
        });
    } catch (error) {
      this.setState({
        error,
      });
    }

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      pitch: 40,
      bearing: 20,
      antialias: true,
    });

    this.map.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      "bottom-right"
    );

    this.map.on("move", () => {
      this.setState({
        lng: parseFloat(this.map.getCenter().lng.toFixed(3)),
        lat: parseFloat(this.map.getCenter().lat.toFixed(3)),
        zoom: parseFloat(this.map.getZoom().toFixed(2)),
      });
    });

    this.map.on("load", async () => {
      this.map.addSource("toronto-neighbourhoods", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      this.map.addLayer({
        id: "toronto-neighbourhoods",
        type: "fill-extrusion",
        source: "toronto-neighbourhoods",
        paint: {
          "fill-extrusion-color": ["get", "color"],
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-base": ["get", "base_height"],
          "fill-extrusion-opacity": 0.5,
        },
        filter: ["==", "$type", "Polygon"],
      });

      this.map.addLayer({
        id: "neighbourhood-labels",
        type: "symbol",
        source: "toronto-neighbourhoods",
        layout: {
          "text-field": ["get", "name"],
          "text-variable-anchor": ["top", "bottom", "left", "right"],
          "text-radial-offset": 0.5,
          "text-justify": "center",
          "text-size": ["interpolate", ["linear"], ["zoom"], 10, 10, 15, 16],
        },
        paint: {
          "text-color": "#111111",
          "text-halo-width": 0.2,
          "text-halo-color": "#ffffff",
          "text-halo-blur": 2,
        },
      });

      await this.recursiveFetchForTorontoNeighbourhoods(
        "/toronto/neighbourhoods"
      );

      this.recursiveFetchForTorontoCovidCases("/toronto/covid-cases").finally(
        () => {
          this.setState({
            isLoadingData: false,
          });
        }
      );
    });

    this.map.on("click", "toronto-neighbourhoods", (e) => {
      const coordinates = e.features
        ? (polylabel((e.features[0].geometry as Polygon).coordinates).slice(
            0,
            2
          ) as LngLatLike)
        : (e.lngLat.toArray() as LngLatLike);

      console.log(
        JSON.parse(e.features ? e.features[0].properties?.covid : [])
      );

      const descriptionElements: Array<any> = JSON.parse(
        e.features ? e.features[0].properties?.covid : []
      );

      const description = `<p>Neighbourhood: ${
        e.features ? e.features[0].properties?.name : "No Name"
      }</p>
      <p>Total Cases: ${descriptionElements.length}</p>
      <p>Active Cases: ${
        descriptionElements.filter((e) => e["Outcome"] === "ACTIVE").length
      }</p>
      <p>Hospitalized: ${
        descriptionElements.filter((e) => e["Currently Hospitalized"] === "Yes")
          .length
      }</p>`;

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(this.map);
    });

    this.map.on("error", (e) => {
      console.log(e);
    });
  }

  componentWillUnmount(): void {
    this.map.remove();
  }

  render(): JSX.Element {
    const { error, isLoaded, isLoadingData } = this.state;
    if (error) {
      return <Alert variant="error">Error: {error.message}</Alert>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className="Map">
          <div className="leftSidebar">
            <div>
              Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
              {this.state.zoom}
            </div>
            <div>Last Modified: {this.reportedDate}</div>
          </div>
          {isLoadingData ? (
            <div className="rightSidebar">
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
              </Button>
            </div>
          ) : null}
          <div
            ref={(el) => (this.mapContainer = el as HTMLElement)}
            className="mapContainer"
          />
        </div>
      );
    }
  }

  private getHeatmapColor(neighbourhood: string): string {
    // TODO with active covid cases length and max

    // const h = (1.0 - covidCasesByNeighbouhood.length) * 240;
    const h = Math.random() * 60;
    return "hsl(" + h + ", 100%, 50%)";
  }

  /**
   *
   * @param url path to the api
   * @type string
   */
  private recursiveFetchForTorontoNeighbourhoods = (url: string) => {
    return new Promise((resolve, reject) => {
      fetch(getUrl(url))
        .then((result) => result.json())
        .then((result) => {
          for (const record of result.records) {
            this.torontoNeighbourhoods["features"].push({
              type: "Feature",
              geometry: JSON.parse(record.geometry) as Geometry,
              properties: {
                id: record.AREA_ID,
                name: record.AREA_NAME.split(/ \((\d+)\)/)[0],
                color: this.getHeatmapColor(
                  record.AREA_NAME.split(/ \((\d+)\)/)[0]
                ),
                height: 0,
                base_height: 0,
                covid: [],
              },
            });
          }
          (this.map.getSource(
            "toronto-neighbourhoods"
          ) as GeoJSONSource).setData(this.torontoNeighbourhoods);
          if (result.total > this.torontoNeighbourhoods.features.length) {
            resolve(
              this.recursiveFetchForTorontoNeighbourhoods(
                "/toronto/request?path=" +
                  this.encodeRFC5987ValueChars(result._links.next)
              )
            );
          } else {
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /**
   *
   * @param url path to the api
   * @type string
   */
  private recursiveFetchForTorontoCovidCases = (url: string) => {
    return new Promise((resolve, reject) => {
      fetch(getUrl(url))
        .then((result) => result.json())
        .then((result) => {
          if (result.last_modified) {
            this.reportedDate = result.last_modified;
          }
          for (const record of result.records) {
            this.torontoNeighbourhoods.features
              .find(
                (el) => el.properties?.name === record["Neighbourhood Name"]
              )
              ?.properties?.covid.push(record);

            this.incrementKeyNumber(
              this.torontoNeighbourhoods.features.find(
                (el) => el.properties?.name === record["Neighbourhood Name"]
              )?.properties,
              "height"
            );

            this.covidCasesCounter++;
          }
          if (this.covidChunckCount === 20) {
            (this.map.getSource(
              "toronto-neighbourhoods"
            ) as GeoJSONSource).setData(this.torontoNeighbourhoods);
            this.covidChunckCount = 0;
          }
          if (result.total > this.covidCasesCounter) {
            this.covidChunckCount++;
            resolve(
              this.recursiveFetchForTorontoCovidCases(
                "/toronto/request?path=" +
                  this.encodeRFC5987ValueChars(result._links.next)
              )
            );
          } else {
            (this.map.getSource(
              "toronto-neighbourhoods"
            ) as GeoJSONSource).setData(this.torontoNeighbourhoods);
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  private encodeRFC5987ValueChars(str: string) {
    return (
      encodeURIComponent(str)
        // Note that although RFC3986 reserves "!", RFC5987 does not,
        // so we do not need to escape it
        .replace(/['()]/g, escape) // i.e., %27 %28 %29
        .replace(/\*/g, "%2A")
        // The following are not required for percent-encoding per RFC5987,
        //  so we can allow for a little better readability over the wire: |`^
        .replace(/%(?:7C|60|5E)/g, unescape)
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private incrementKeyNumber(obj: any, key: string): any {
    if (obj) {
      if (obj["Outcome"] !== "ACTIVE") {
        obj[key]++;
      }
    }
  }
}

export default Map;
