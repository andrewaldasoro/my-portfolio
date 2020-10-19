import React from 'react';
// import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './Map.scss';

interface Props { }

interface State {
  lat: number;
  lng: number;
  zoom: number;
  error: any;
  isLoaded: boolean;
}


class Map extends React.Component<Props, State> {
  private mapContainer: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,
      error: null,
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("/api/mapbox-token/create")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
          });
          mapboxgl.accessToken = result.token;

          const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
          });

          map.on('move', () => {
            this.setState({
              lng: parseInt(map.getCenter().lng.toFixed(4)),
              lat: parseInt(map.getCenter().lat.toFixed(4)),
              zoom: parseInt(map.getZoom().toFixed(2))
            });
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        })
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="Map">
          <div className='sidebarStyle'>
            <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
          </div>
          <div ref={el => this.mapContainer = el} className='mapContainer' />
        </div>
      )
    }
  }
}

export default Map;
