import React from 'react';

function Cards(props){
  return(

    <div className="space-y-4">
      {props.data.map(item => (
        <div className={`shadow hover:cursor-pointer rounded-lg px-6 py-4 ${(props.selected && (item.id === props.selected.id)) ? "bg-sky-50" : "bg-white"}`} onClick={() => {props.setSelected(item)}} key={item.id}>
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