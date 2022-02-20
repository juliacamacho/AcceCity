import { isValidTimestamp } from '@firebase/util';
import { arrayRemove } from 'firebase/firestore';
import React from 'react';

function Cards(props){

  return(
    <div className="space-y-4">
      {props.data.map((item) => {

          if ((props.selectedTags !== null) && (props.selectedTags !== "allConcerns")) {
            if (item.tags.includes(props.selectedTags))
            {
              return(
                <div className={`border border-gray-50 shadow hover:cursor-pointer rounded-lg px-6 py-4 ${(props.selected && (item.id === props.selected.id)) ? "bg-sky-50" : "bg-white"}`} onClick={() => {props.setSelected(item)}} key={item.id}>
                  <div className="pb-2 text-sm font-medium text-indigo-500 uppercase tracking-wider">
                    {item.tags.map((tag) => `${tag} • `)}
                  </div>
                  <div className="pb-2 text-lg font-semibold">
                    {item.title}
                  </div>
                  <div className="text-xs mb-2">
                    Coordinates: ({Math.round(item.lng)}, {Math.round(item.lat)})
                  </div>
                  <div className="mb-2">
                    {item.description}
                  </div>
                  <div>
                  <span className="font-semibold">Category scores:</span> {item.scores.map((score) => {
                      if (score === 0){
                        return(" Bad •")
                      }
                      else if (score === 0.5){
                        return(" Average •")
                      }
                      else {
                        return(" Good •")
                      }

                      })}
                  </div>
                </div>
              )
            } 
            else 
            { 
              return (null)
            }
          }
          else {
            return (
              <div className={`border border-gray-50 shadow hover:cursor-pointer rounded-lg px-6 py-4 ${(props.selected && (item.id === props.selected.id)) ? "bg-sky-50" : "bg-white"}`} onClick={() => {props.setSelected(item)}} key={item.id}>
                  <div className="pb-2 text-sm font-medium text-indigo-500 uppercase tracking-wider">
                    {item.tags.map((tag) => `${tag} • `)}
                  </div>
                  <div className="pb-2 text-lg font-semibold">
                    {item.title}
                  </div>
                  <div className="text-xs mb-2">
                    Coordinates: ({Math.round(item.lng)}, {Math.round(item.lat)})
                  </div>
                  <div className="mb-2">
                    {item.description}
                  </div>
                  <div>
                  <span className="font-semibold">Category scores:</span> {item.scores.map((score) => {
                      if (score === 0){
                        return(" Bad •")
                      }
                      else if (score === 0.5){
                        return(" Average •")
                      }
                      else {
                        return(" Good •")
                      }

                      })}
                  </div>
                </div>
              )
            }
          
          })}

    </div>

  )

}

export default Cards