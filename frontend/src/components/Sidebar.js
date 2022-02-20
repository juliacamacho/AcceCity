import React from 'react';
import { useState, useEffect } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

// function roundScore(score){

//   let new_score

//   if ((0 < score) && (score <= 0.33)) {
//     new_score = 0
//   }
//   else if ((0.33 < score) && (score <= 0.66)){
//     new_score = 0.5
//   }
//   else {
//     new_score = 1
//   }

//   return new_score

// }

function Sidebar(props){

  const [selectedtags, setSelectedtags] = useState(null);

  // let scoreDict = {
  //   "bad": 0,

  // }

  const [accessibilityScore, setAccessibilityScore] = useState()
  const [walkabilityScore, setWalkabilityScore] = useState()
  const [mobilityScore, setMobilityScore] = useState()
  const [trafficScore, setTrafficScore] = useState()
  const [overallScore, setOverallScore] = useState()

  // const [analyzed, setAnalyzed] = useState([])

  useEffect(async ()=> {

    // let tempAnalyzed = []

    let accessibilitySum = 0
    let accessibilityCount = 0
    let walkabilitySum = 0
    let walkabilityCount = 0
    let mobilitySum = 0
    let mobilityCount = 0
    let trafficSum = 0
    let trafficCount = 0

    for(let i=0; i<props.data.length; i++){
      for(let j=0; j<props.data[i].tags.length; j++){
        console.log("id:", props.data[i].id)
        console.log("TAG:", props.data[i].tags[j])
        if (props.data[i].tags[j] === ("Accessibility")){
          accessibilitySum += props.data[i].scores[j]
          accessibilityCount += 1
        }
        else if (props.data[i].tags[j] === ("Walkability")){
          walkabilitySum += props.data[i].scores[j]
          walkabilityCount += 1
        }
        else if (props.data[i].tags[j] === ("Mobility")){
          mobilitySum += props.data[i].scores[j]
          mobilityCount += 1
        }
        else if (props.data[i].tags[j] === ("Traffic")){
          trafficSum += props.data[i].scores[j]
          trafficCount += 1
        }
      }
    }

    console.log("ACC SUM:", accessibilitySum)
    console.log("ACC COUNT:", accessibilityCount)
    console.log("ACC:", (accessibilitySum / accessibilityCount))

    setAccessibilityScore((accessibilityCount !== 0) ? (accessibilitySum / accessibilityCount) : 1)
    setWalkabilityScore((walkabilityCount !== 0) ? (walkabilitySum / walkabilityCount) : 1)
    setMobilityScore((mobilityCount !== 0) ? (mobilitySum / mobilityCount) : 1)
    setTrafficScore((trafficCount !== 0) ? (trafficSum / trafficCount) : 1)

    let overallScore_qual = accessibilityScore + walkabilityScore + mobilityScore + trafficScore

    if (overallScore_qual < (4/3)){
      setOverallScore("Bad")
    }
    else if (overallScore_qual < (8/3)) {
      setOverallScore("Average")
    }
    else if (overallScore_qual <= 4) {
      setOverallScore("Good")
    }


  }, [props.data])

  return(
    <div>
        {/* Score */}

        { /* Overall Performance Box */}
        <div className="grid-cols-3 pb-4">
          <div className="bg-white rounded-sm border shadow p-5 max-w-lg">
            <div className="flex flex-col items-center space-y-2">
              <h1 className="font-bold text-4xl text-center">{overallScore}</h1>
              <p className="text-sm text-center">Overall Performance</p>
            </div>
          </div>
        </div>

        <hr class="bg-gray-500 lg:w-full md:my-5 my-5" />

        { /* Concern Buttons */}

        <div className="grid-cols-3 pb-4">
          
          <div className={`rounded-sm border shadow p-2 max-w-lg ${(props.selected === "allConcerns") ? "bg-gray-700 text-white"  : "bg-white text-black"}`} onClick={() => {props.setSelected("allConcerns")}}>
            <div className="flex flex-col items-center space-y-1">
              <button className="text-m text-center">All Concerns</button>
            </div>
          </div>

        </div>

        <div className="grid-cols-3 pb-4">
        <div className={`rounded-sm border shadow p-2 max-w-lg ${(props.selected === "accessibility") ? "bg-red-700 text-white"  : "bg-white text-black"}`} onClick={() => {props.setSelected("accessibility")}}>
            <div className="flex flex-col items-center space-y-1">
              <button className="text-m text-center">Accessibility</button>
            </div>
          </div>
        </div>

        <div className="grid-cols-3 pb-4">
        <div className={`rounded-sm border shadow p-2 max-w-lg ${(props.selected === "walkability") ? "bg-blue-700 text-white"  : "bg-white text-black"}`} onClick={() => {props.setSelected("walkability")}}>
            <div className="flex flex-col items-center space-y-1">
              <button className="text-m text-center">Walkability</button>
            </div>
          </div>
        </div>

        <div className="grid-cols-3 pb-4">
        <div className={`rounded-sm border shadow p-2 max-w-lg ${(props.selected === "mobility") ? "bg-green-700 text-white"  : "bg-white text-black"}`} onClick={() => {props.setSelected("mobility")}}>
            <div className="flex flex-col items-center space-y-1">
              <button className="text-m text-center">Mobility</button>
            </div>
          </div>
        </div>

        <div className="grid-cols-3 pb-4">
        <div className={`rounded-sm border shadow p-2 max-w-lg ${(props.selected === "traffic") ? "bg-purple-700 text-white"  : "bg-white text-black"}`} onClick={() => {props.setSelected("traffic")}}>
            <div className="flex flex-col items-center space-y-1">
              <button className="text-m text-center">Traffic</button>
            </div>
          </div>
        </div>

        <div className="grid-cols-3 pb-4">
          <form onSubmit={(e)=>{
            e.preventDefault();
          }}>
          <input 
            type="text"
            id="search"
            className="col-span-2 text-xs w-full shadow focus:ring-blue-500 border-gray-300 px-4 rounded-sm py-2" 
            placeholder="Search for Concern..."
            />
          </form >
        </div>

        <hr class="bg-gray-500 lg:w-full md:my-5 my-5" />

      {/*Individual Scores bars*/}
      <div className="grid-cols-3 pb-4">
      <div className="bg-white rounded p-2 shadow pb-4">
        <div className="flex">
          <div className="w-2/3">
            <h1 className="text-purple-600 font-semibold">
              Accessibility
            </h1>
            <span className="block text-xs text-purple-600">{accessibilityScore === 1 ? "Excellent" : "Needs improvement"}</span>
          </div>
          <div className="w-1/3">
            <span className="float-right text-xs bg-purple-600 rounded-2xl px-1 py-1 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> </svg>
            </span>
          </div>
        </div>
        <div className="flex">
          <span className="text-xs font-semibold py-1 ml-auto text-purple-600">{Math.round(100*accessibilityScore)}%</span>
        </div>
        <div className="">
          {/* <div className={`w-1/12 h-2 rounded rounded-r-none bg-red-600`} />
          <div className="w-11/12 h-2 rounded rounded-l-none bg-red-100" /> */}
          <ProgressBar completed={100*accessibilityScore} customLabel=" " bgColor="#9333ea" height="15px" />
        </div>
      </div>
      </div>

      <div className="grid-cols-3 pb-4">
        <div className="bg-white rounded p-2 shadow pb-4">
        <div className="flex">
          <div className="w-2/3">
            <h1 className="text-blue-600 font-semibold">
            Walkability
            </h1>
            <span className="block text-xs text-blue-600">{walkabilityScore === 1 ? "Excellent" : "Needs improvement"}</span>
          </div>
          <div className="w-1/3">
            <span className="float-right text-xs bg-blue-600 rounded-2xl px-1 py-1 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> </svg>
            </span>
          </div>
        </div>
        <div className="flex">
          <span className="text-xs font-semibold py-1 ml-auto text-blue-600">{Math.round(100*walkabilityScore)}%</span>
        </div>
        <div className="">
          {/* <div className="w-3/4 h-2 rounded rounded-r-none bg-blue-600" />
          <div className="w-1/4 h-2 rounded rounded-l-none bg-blue-100" /> */}
          <ProgressBar completed={100*walkabilityScore} customLabel=" " bgColor="#2563eb" height="15px" />
        </div>
      </div>
      </div>

      <div className="grid-cols-3 pb-4">
        <div className="bg-white rounded p-2 shadow pb-4">
        <div className="flex">
          <div className="w-2/3">
            <h1 className="text-green-600 font-semibold">
            Mobility
            </h1>
            <span className="block text-xs text-green-600">{mobilityScore === 1 ? "Excellent" : "Needs improvement"}</span>
          </div>
          <div className="w-1/3">
            <span className="float-right text-xs bg-green-600 rounded-2xl px-1 py-1 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            </span>
          </div>
        </div>
        <div className="flex">
          <span className="text-xs font-semibold py-1 ml-auto text-green-600">{Math.round(100*mobilityScore)}%</span>
        </div>
        <div className="">
          {/* <div className="w-3/4 h-2 rounded rounded-r-none bg-green-600" />
          <div className="w-1/4 h-2 rounded rounded-l-none bg-green-600" /> */}
          <ProgressBar completed={100*mobilityScore} customLabel=" " bgColor="#16a34a" height="15px" />
        </div>
      </div>
      </div>

      <div className="grid-cols-3 pb-4">
        <div className="bg-white rounded p-2 shadow pb-4">
        <div className="flex">
          <div className="w-2/3">
            <h1 className="text-orange-600 font-semibold">
            Traffic
            </h1>
            <span className="block text-xs text-orange-600">{trafficScore === 1 ? "Excellent" : "Needs improvement"}</span>
          </div>
          <div className="w-1/3">
          <span className="float-right text-xs bg-orange-600 rounded-2xl px-1 py-1 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            </span>
          </div>
        </div>
        <div className="flex">
          <span className="text-xs font-semibold py-1 ml-auto text-orange-600">{100*trafficScore}%</span>
        </div>
        <div className="">
          {/* <div className="w-3/4 h-2 rounded rounded-r-none bg-purple-600" />
          <div className="w-1/4 h-2 rounded rounded-l-none bg-purple-600" /> */}
          <ProgressBar completed={100*trafficScore} customLabel=" " bgColor="#ea580c" height="15px" />
        </div>
      </div>
      </div>


    </div>
  )
}

export default Sidebar;
