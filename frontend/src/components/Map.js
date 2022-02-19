import React from 'react';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
  } from "react-google-maps";
import MapStyles from './MapStyles';
import setup from '../setup.json'

function Map(props) {

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100vh' }}>
        <GoogleMap
            bootstrapURLKeys={{ key: setup.GCP_MAPS_KEY }}
            defaultCenter={props.center}
            center={props.center}
            defaultZoom={props.zoom}
            defaultOptions={{ styles: MapStyles }}
        />
        </div>
    )
}

const MapWrapped = withScriptjs(withGoogleMap(Map));
export default MapWrapped;