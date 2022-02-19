import React, { useEffect, useState } from 'react';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow,
    Rectangle
  } from "react-google-maps";
import MapStylesRetro from './MapStylesRetro';
import setup from '../setup.json'

function Map(props) {

    const [bounds, setBounds] = useState(null)

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

      useEffect(()=> {
        console.log("setting new bounds")
        setBounds(new window.google.maps.LatLngBounds(
            {
                lat: props.center.lat - 0.005,
                lng: props.center.lng - 0.005
            },
            {
                lat: props.center.lat + 0.005,
                lng: props.center.lng + 0.005
            },
        ))
      }, [props.center])

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100vh' }}>
        <GoogleMap
            bootstrapURLKeys={{ key: setup.GCP_MAPS_KEY }}
            defaultCenter={props.defualtCenter}
            center={props.center}
            defaultZoom={props.zoom}
            defaultOptions={{ styles: MapStylesRetro }}
        >
            {(bounds && props.isEditing) && (
            <Rectangle 
                bounds={bounds}
                editable={true}
                draggable={true}
            />
            )}
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
                    url: `${point.score < 50 ? "/badaccess.svg" : "/accessibility.svg"}`,
                    scaledSize: new window.google.maps.Size(25, 25)
                }}
                />
            ))}

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