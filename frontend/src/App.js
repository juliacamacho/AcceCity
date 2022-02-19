import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import Geocode from "react-geocode";
import { useState, useEffect } from 'react';
import setup from './setup.json'


function App() {
  const defaultCenter = {
    lat: 42.36,
    lng: -71.093889,
  }
  const [center, setCenter] = useState({
    lat: 42.36,
    lng: -71.093889,
  })
  const [zoom, setZoom] = useState(15)
  const [locStr, setLocStr] = useState("Austin")

  useEffect(()=>{
    console.log("runnign")
    Geocode.setApiKey(setup.GCP_MAPS_KEY);
    Geocode.setLocationType("ROOFTOP");
  }, [])
  
  const searchLoc = () => {
    // Get latitude & longitude from address.
    Geocode.fromAddress(locStr).then(
      (response) => {
        const newCenter = response.results[0].geometry.location;

        setCenter(newCenter)
        console.log(newCenter.lat, newCenter.lng);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (
    <div className='max-h-full'>

      <div className="bg-blue-500 text-2xl font-bold text-white py-2 px-10">
        AccCity
      </div>

      <div className="text-2xl">
        <div className='h-screen w-3/6'>
          <Map defaultCenter={defaultCenter} center={center} zoom={zoom}/>
        </div>
        <div className='h-screen w-2/6'>
          {/* Buttons */}
          <button onClick={() => searchLoc()} className="w-full h-screen bg-blue-100" />
        </div>
        <div className='h-screen w-1/6'>
          {/* Score */}
        </div>
      </div>
    
    </div>
  );
}

export default App;
