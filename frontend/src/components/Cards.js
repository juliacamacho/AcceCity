import React from 'react';

function Cards(props){
  return(

    <div className="space-y-4">
      {props.data.map(item => (
        <div className={`border border-gray-50 shadow hover:cursor-pointer rounded-lg px-6 py-4 ${(props.selected && (item.id === props.selected.id)) ? "bg-sky-50" : "bg-white"}`} onClick={() => {props.setSelected(item)}} key={item.id}>
          <div className="pb-2 text-sm font-medium text-indigo-500 uppercase tracking-wider">
            CATEGORY
          </div>
          <div className="pb-2 text-lg font-semibold">
            {item.title}
          </div>
          <div>
            ({item.lng}, {item.lat})
          </div>
          <div>
            {item.description}
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