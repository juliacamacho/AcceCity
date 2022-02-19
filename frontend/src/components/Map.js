import React from 'react';
import GoogleMapReact from 'google-map-react';
import setup from '../setup.json'

function Map() {
  let defaultProps = {
    center: {
      lat: 42.36,
      lng: -71.093889
    },
    zoom: 15
  };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: setup.GCP_MAPS_KEY }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        />
        </div>
    )
}

export default Map;