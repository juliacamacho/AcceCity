import React from 'react';
import GoogleMapReact from 'google-map-react';
import setup from '../setup.json'

function Map(props) {

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: setup.GCP_MAPS_KEY }}
            defaultCenter={props.center}
            defaultZoom={props.zoom}
        />
        </div>
    )
}

export default Map;