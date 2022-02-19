import React from 'react';

function Cards(props){
  return(

    <div className="space-y-4">
      {props.data.map(item => (
        <div className="shadow rounded-sm px-6 py-4" key="item.title">
        <div>
          ID: {item.scanID}
        </div>
        <div>
          (longitude, latitude): ({item.lng}, {item.lat})
        </div>
        <div>
          Score: {item.score}
        </div>
      </div>
      ))}
    </div>

  )

}

export default Cards