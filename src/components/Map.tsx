import React from "react";
import mapboxgl from "mapbox-gl";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import "./Map.scss";
import { getUrl } from "../services/api";

interface State {
  lat: number;
  lng: number;
  zoom: number;
  error: Error | null;
  isLoaded: boolean;
}

class Map extends React.Component<unknown, State> {
  private mapContainer!: HTMLElement;
  private covidCases!: Array<any>;
  private covidCasesActive!: Array<any>;

  constructor(props: unknown) {
    super(props);
    this.state = {
      lng: -79,
      lat: 44,
      zoom: 5,
      error: null,
      isLoaded: false,
    };
    console.log(window.navigator.language); // TODO Map the location of the language
  }

  async componentDidMount(): Promise<void> {
    this.covidCases = await this.getCovidCases();
    this.covidCasesActive = this.covidCases.filter(
      (covidCase) => covidCase["Outcome"] === "ACTIVE"
    );

    fetch(getUrl("/mapbox-token/create"))
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
          });
          mapboxgl.accessToken = result.token;

          const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: "mapbox://styles/mapbox/dark-v10",
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
          });

          map.on("load", () => {
            fetch(getUrl("/toronto/neighbourhoods"))
              .then((res) => res.json())
              .then((result) => {
                map.addSource("toronto-neighbourhoods", {
                  type: "geojson",
                  data: {
                    type: "FeatureCollection",
                    features: this.mapFeatures(result),
                  },
                });

                map.addLayer({
                  id: "toronto-neigh",
                  type: "fill",
                  source: "toronto-neighbourhoods",
                  paint: {
                    "fill-color": ["get", "color"],
                    "fill-opacity": 0.4,
                  },
                  filter: ["==", "$type", "Polygon"],
                });
              });

            // console.log(map.getSource("toronto-neighbourhoods"));
          });

          map.on("move", () => {
            this.setState({
              lng: parseInt(map.getCenter().lng.toFixed(4)),
              lat: parseInt(map.getCenter().lat.toFixed(4)),
              zoom: parseInt(map.getZoom().toFixed(2)),
            });
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render(): JSX.Element {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="Map">
          <div className="sidebarStyle">
            <div>
              Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
              {this.state.zoom}
            </div>
          </div>
          <div
            ref={(el) => (this.mapContainer = el as HTMLElement)}
            className="mapContainer"
          />
        </div>
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapFeatures(features: any): Feature<Geometry, GeoJsonProperties>[] {
    const mappedFeatures: Feature<Geometry, GeoJsonProperties>[] = [];
    console.log(features.length);

    for (const feature of features) {
      mappedFeatures.push({
        type: "Feature",
        geometry: JSON.parse(feature.geometry) as Geometry,
        properties: {
          id: feature.AREA_ID,
          name: feature.AREA_NAME.split(/ \((\d+)\)/)[0],
          color: this.getHeatmapColor(feature.AREA_NAME.split(/ \((\d+)\)/)[0]),
        },
      });
    }

    return mappedFeatures;
  }

  private getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private getHeatmapColor(neighbourhood: string): string {
    // console.log("========" + neighbourhood + "===========");
    const covidCasesByNeighbouhood = this.covidCasesActive.filter(
      (covidCase: any) => {
        // console.log(covidCase["Neighbourhood Name"]);
        return covidCase["Neighbourhood Name"] === neighbourhood;
      }
    );

    console.log(covidCasesByNeighbouhood.length + " cases in " + neighbourhood);

    const h = (1.0 - covidCasesByNeighbouhood.length) * 240;
    console.log(h);
    return "hsl(" + h + ", 100%, 50%)";
  }

  private async getCovidCases(): Promise<any> {
    return await (await fetch(getUrl("/toronto/covid-cases"))).json();
  }
}

export default Map;
