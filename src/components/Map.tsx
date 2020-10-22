import React from "react";
import mapboxgl from "mapbox-gl";
import "./Map.scss";

interface State {
  lat: number;
  lng: number;
  zoom: number;
  error: Error | null;
  isLoaded: boolean;
}

class Map extends React.Component<unknown, State> {
  private mapContainer!: HTMLElement;

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

  componentDidMount(): void {
    fetch("/api/mapbox-token/create")
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
}

export default Map;
