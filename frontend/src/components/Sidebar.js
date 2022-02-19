import React from 'react';

function Sidebar(){

  return(
    <div>
        {/* Score */}

        { /* Overall Performance Box */}
        <div className="grid-cols-3 pb-4">
          <div className="bg-white rounded-sm border shadow p-5 max-w-lg">
            <div className="flex flex-col items-center space-y-2">
              <h1 className="font-bold text-4xl text-center">22</h1>
              <p className="text-sm text-center">Overall Performance</p>
            </div>
          </div>
        </div>

        <hr class="bg-gray-500 lg:w-full md:my-5 my-5" />

        { /* Concern Buttons */}
        <div className="grid-cols-3 pb-4">
        <div className="hover:bg-gray-600 hover:text-white bg-white rounded-sm border shadow p-2 max-w-lg">
            <div className="flex flex-col items-center space-y-1">
              <button className="text-m text-center">All Concerns</button>
            </div>
          </div>
        </div>

        <div className="grid-cols-3 pb-4">
        <div className="hover:bg-gray-600 hover:text-white bg-white rounded-sm border shadow p-2 max-w-lg">
            <div className="flex flex-col items-center space-y-1">
              <button className="text-m text-center">Traffic</button>
            </div>
          </div>
        </div>

        <div className="grid-cols-3 pb-4">
        <div className="hover:bg-gray-600 hover:text-white bg-white rounded-sm border shadow p-2 max-w-lg">
            <div className="flex flex-col items-center space-y-1">
              <button className="text-m text-center">Walkability</button>
            </div>
          </div>
        </div>

        <div className="grid-cols-3 pb-4">
        <div className="hover:bg-gray-600 hover:text-white bg-white rounded-sm border shadow p-2 max-w-lg">
            <div className="flex flex-col items-center space-y-1">
              <button className="text-m text-center">Accessibility</button>
            </div>
          </div>
        </div>

        <div className="grid-cols-3 pb-4">
        <div className="hover:bg-gray-600 hover:text-white bg-white rounded-sm border shadow p-2 max-w-lg">
            <div className="flex flex-col items-center space-y-1">
              <button className="text-m text-center">Parking</button>
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
            <h1 className="text-red-600 font-semibold">
              Traffic
            </h1>
            <span className="block text-xs text-red-600">Unsatisfactory</span>
          </div>
          <div className="w-1/3">
            <span className="float-right text-xs bg-red-600 rounded-2xl px-1 py-1 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> </svg>
            </span>
          </div>
        </div>
        <div className="flex">
          <span className="text-xs font-semibold py-1 ml-auto text-red-600">20%</span>
        </div>
        <div className="flex">
          <div className="w-2/12 h-2 rounded rounded-r-none bg-red-600" />
          <div className="w-10/12 h-2 rounded rounded-l-none bg-red-100" />
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
            <span className="block text-xs text-blue-600">Needs improvement</span>
          </div>
          <div className="w-1/3">
            <span className="float-right text-xs bg-blue-600 rounded-2xl px-1 py-1 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> </svg>
            </span>
          </div>
        </div>
        <div className="flex">
          <span className="text-xs font-semibold py-1 ml-auto text-blue-600">75%</span>
        </div>
        <div className="flex">
          <div className="w-3/4 h-2 rounded rounded-r-none bg-blue-600" />
          <div className="w-1/4 h-2 rounded rounded-l-none bg-blue-100" />
        </div>
      </div>
      </div>

      <div className="grid-cols-3 pb-4">
        <div className="bg-white rounded p-2 shadow pb-4">
        <div className="flex">
          <div className="w-2/3">
            <h1 className="text-green-600 font-semibold">
            Accessibility
            </h1>
            <span className="block text-xs text-green-600">Excellent</span>
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
          <span className="text-xs font-semibold py-1 ml-auto text-green-600">100%</span>
        </div>
        <div className="flex">
          <div className="w-3/4 h-2 rounded rounded-r-none bg-green-600" />
          <div className="w-1/4 h-2 rounded rounded-l-none bg-green-600" />
        </div>
      </div>
      </div>

      <div className="grid-cols-3 pb-4">
        <div className="bg-white rounded p-2 shadow pb-4">
        <div className="flex">
          <div className="w-2/3">
            <h1 className="text-purple-600 font-semibold">
            Parking
            </h1>
            <span className="block text-xs text-purple-600">Needs improvement</span>
          </div>
          <div className="w-1/3">
          <span className="float-right text-xs bg-purple-600 rounded-2xl px-1 py-1 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            </span>
          </div>
        </div>
        <div className="flex">
          <span className="text-xs font-semibold py-1 ml-auto text-purple-600">100%</span>
        </div>
        <div className="flex">
          <div className="w-3/4 h-2 rounded rounded-r-none bg-purple-600" />
          <div className="w-1/4 h-2 rounded rounded-l-none bg-purple-600" />
        </div>
      </div>
      </div>


    </div>
  )
}

export default Sidebar;
