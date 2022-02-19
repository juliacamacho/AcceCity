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
  const [locStr, setLocStr] = useState("")

  useEffect(()=>{
    Geocode.setApiKey(setup.GCP_MAPS_KEY);
    Geocode.setLocationType("ROOFTOP");
  }, [])
  
  const searchLoc = () => {
    // Get latitude & longitude from address.
    console.log("searchLoc")
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

      <div className="grid grid-cols-6">
        <div className='h-screen col-span-3 py-6 px-10'>

          <div className="grid-cols-3 pb-4">
            <form onSubmit={(e)=>{
              e.preventDefault();
              searchLoc()
            }}>
            <input 
              type="text"
              id="search"
              className="col-span-2 w-full shadow focus:ring-blue-500 border-gray-300 px-4 rounded-sm py-2" 
              placeholder="Search for a city, street, or address..."
              onChange={(e)=>setLocStr(e.target.value)}
              value={locStr}
              />
            </form >
          </div>
          <Map defaultCenter={defaultCenter} center={center} zoom={zoom}/>
        </div>
        <div className='h-screen col-span-2'>
          {/* Buttons */}
        </div>
        <div className='h-screen col-span-1'>
          {/* Score */}
        </div>
      </div>
    
    </div>
  );
}

export default App;
