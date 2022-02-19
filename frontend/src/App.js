import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import Geocode from "react-geocode";
import { useState } from 'react';
import setup from './setup.json'

function App() {
  const [center, setCenter] = useState({
    lat: 42.36,
    lng: -71.093889
  })
  const [zoom, setZoom] = useState(15)
  const [locStr, setLocStr] = useState("")

  useEffect(() => {
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
    <div className="text-2xl">
      <div className='h-screen w-3/6'>
        <Map center={center} zoom={zoom}/>
      </div>
      <div className='h-screen w-2/6'>
        {/* Buttons */}
      </div>
      <div className='h-screen w-1/6'>
        {/* Score */}
      </div>
    </div>
  );
}

export default App;
