import logo from './logo.svg';
import './App.css';
import MapWrapped from './components/Map';
import Sidebar from './components/Sidebar'
import Cards from './components/Cards'
import Geocode from "react-geocode";
import { useState, useEffect } from 'react';
import setup from './setup.json'

import { db } from './config/firebase'
import { getDocs, onSnapshot, collection } from "firebase/firestore"; 


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
  const [isEditing, setIsEditing] = useState(true);
  const [selectedTags, setSelectedTags] = useState("allConcerns");
  const [selected, setSelected] = useState(null);
  /**
   * 
   * cityData in the form: 
  [
    {
      "lat": 42.36,
      "lng": -71.09,
      "score": 88,
      "title": "Great ramp up to various resources",
      "description": "The ramp leads to a sidewalk, a bus station, and to building access."
    },
    {
      "lat": 42.365,
      "lng": -71.093,
      "score": 21,
      "title": "No guard rails on ramp",
      "description": "The ramp into the building lacks guard rails. "
    }
  ]
   * 
   */
  const [cityData, setCityData] = useState([]);
  const [locStr, setLocStr] = useState("")

  useEffect(async () => {
    Geocode.setApiKey(setup.GCP_MAPS_KEY);
    Geocode.setLocationType("ROOFTOP");

    const stopListening = onSnapshot(collection(db, "scans"), (snapshot) => {

      Promise.all(snapshot.docs.map((doc) => {
        return (
          {
            "id": doc.id,
            "scanID": doc.data().scanID,
            "title": doc.data().title,
            "lat": doc.data().lat,
            "lng": doc.data().lng,
            "description": doc.data().description,
            "scores": doc.data().scores,
            "score": doc.data().score,
            "tags": doc.data().tags,
          }
        )
      })).then((result) => {
        // console.log("RESULT:", result)
        setCityData(result)
      })

    })

    return stopListening

  }, [db])
  
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

      <div className="bg-sky-500 text-2xl font-bold text-white py-2 px-10">
        AccCity
      </div>

      <div className="grid grid-cols-6">
        <div className='h-screen col-span-3 py-6 px-10'>
          <div className="pb-4">
            <form className="grid grid-cols-4" onSubmit={(e)=>{
              e.preventDefault();
              searchLoc()
            }}>
            <input 
                type="text"
                id="search"
                className="col-span-3 w-10/12 shadow focus:ring-blue-500 border-gray-300 px-4 rounded-sm py-2" 
                placeholder="Search for a city, street, or address..."
                onChange={(e)=>setLocStr(e.target.value)}
                value={locStr}
                />
              <select
                id="location"
                name="location"
                className="col-span-1 pl-3 pr-10 py-2 text-base bg-gray-100 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                defaultValue="Accessbility"
              >
                <option disabled selected>Filter By...</option>
                <option value="Accessbility">Accessbility</option>
                <option value="Walkability">Walkability</option>
                <option value="Mobility">Mobility</option>
                <option value="Parking">Parking</option>
              </select>
              
            </form >
          </div>
          
          <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
              setup.GCP_MAPS_KEY
            }`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            defaultCenter={defaultCenter} center={center} zoom={zoom}
            selected={selected} setSelected={setSelected}
            cityData={cityData}
          />
        </div>


        <div className='overflow-y-auto h-screen col-span-2 py-6'>
          <Cards 
            data={cityData} 
            selected={selected} 
            setSelected={setSelected}
            selectedTags={selectedTags} 
            setSelectedTags={setSelectedTags}
          />

        </div>
        <div className='overflow-y-auto h-screen col-span-1 py-6 px-10'>
            <Sidebar 
            selected={selectedTags} 
            setSelected={setSelectedTags}
            data={cityData} 
            />
        </div>    
      </div>
    </div>
  );
}

export default App;
