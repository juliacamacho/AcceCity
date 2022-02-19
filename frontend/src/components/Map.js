import React, { useEffect, useState } from 'react';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
  } from "react-google-maps";
import MapStylesRetro from './MapStylesRetro';
import setup from '../setup.json'

function Map(props) {


    useEffect(() => {
        const listener = e => {
          if (e.key === "Escape") {
            props.setSelected(null);
          }
        };
        window.addEventListener("keydown", listener);
    
        return () => {
          window.removeEventListener("keydown", listener);
        };
      }, []);

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100vh' }}>
        <GoogleMap
            bootstrapURLKeys={{ key: setup.GCP_MAPS_KEY }}
            defaultCenter={props.center}
            center={props.center}
            defaultZoom={props.zoom}
            defaultOptions={{ styles: MapStylesRetro }}
        >
            {props.cityData.map(point => (
                <Marker
                key={1}
                position={{
                    lat: point.lat,
                    lng: point.lng
                }}
                onClick={() => {
                    props.setSelected(point);
                }}
                icon={{
                    url: `/accessibility.svg`,
                    scaledSize: new window.google.maps.Size(25, 25)
                }}
                />
            ))}

            {props.selected && (console.log(props.selected))}

            {props.selected && (
                <InfoWindow
                onCloseClick={() => {
                    props.setSelected(null);
                }}
                position={{
                    lat: props.selected.lat+0.0005,
                    lng: props.selected.lng
                }}
                >
                <div>
                    <p className='text-xl pb-1'>{props.selected.title}</p>
                    <p>{props.selected.description}</p>
                </div>
                </InfoWindow>
            )} 

            </GoogleMap>
        </div>
    )
}

const MapWrapped = withScriptjs(withGoogleMap(Map));
export default MapWrapped;