import React, { createRef, useEffect, useState } from 'react';
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
import Modal from './Modal';
import ModalOk from './ModalOk';

function Map(props) {
    const [showModal, setShowModal] = useState(false);
    const [showModalOk, setShowModalOk] = useState(false);
    const [bounds, setBounds] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    const rect = createRef()

    const handleClick = () => {
        setShowModal(true)
    }

    function checkOk(resp) {
        if (resp === "ok") {
            showModalOk(true)
        }
    }
    function httpGetAsync(theUrl, callback)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }

    const handleSubmit = (name) => {
        setIsEditing(false)
        setShowModal(false)
        let b = rect.current.getBounds()
        let params = {
            "name": name,
            "southWestLat": b.getSouthWest().lat(),
            "southWestLng": b.getSouthWest().lng(),
            "northEastLat": b.getNorthEast().lat(),
            "northEastLng": b.getNorthEast().lng()
        }
        var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        var url = "http://127.0.0.1:5000/scan?" + queryString
        console.log("calling backend with ", url)
        httpGetAsync(url, console.log)
    }

    useEffect(() => {
        const listener = e => {
          if (e.key === "Escape") {
            props.setSelected(null);
            setIsEditing(false)
          }
          else if (e.key === "e") {
            setIsEditing(true);
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
            <ModalOk showModalOk={showModalOk} setShowModalOk={setShowModalOk} />
            <Modal showModal={showModal} setShowModal={setShowModal} handleSubmit={handleSubmit}/>
        <GoogleMap
            bootstrapURLKeys={{ key: setup.GCP_MAPS_KEY }}
            defaultCenter={props.defualtCenter}
            center={props.center}
            defaultZoom={props.zoom}
            defaultOptions={{ styles: MapStylesRetro }}
        >
            {(bounds && isEditing) && (
            <Rectangle 
                bounds={bounds}
                editable={true}
                ref={rect}
                draggable={true}
                onClick={()=>handleClick()}
                // onBoundsChanged={(e)=>{
                //     console.log(rect.current.getBounds())
                //     setBounds(rect.current.getBounds())
                // }}
            />
            )}
            {props.cityData.map(point => (
                <Marker
                key={point.scanID + point.id}
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
                    {props.selected.score < 50 ? 
                        <p className='text-xl pb-1 text-red-600'>{props.selected.title}</p>
                        :
                        <p className='text-xl pb-1 text-green-600'>{props.selected.title}</p>
                        }

                    {props.selected.img ? <img src={props.selected.img}/> :
                        <p>{props.selected.description}</p>
                    }
                </div>
                </InfoWindow>
            )}

            </GoogleMap>
        </div>
    )
}

const MapWrapped = withScriptjs(withGoogleMap(Map));
export default MapWrapped;