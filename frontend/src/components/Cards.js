import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../config/firebase'
import { getDocs, collection } from "firebase/firestore"; 

function Cards(props){

  const [cardsList, setCardsList] = useState([]);

  useEffect(async () => {

    // console.log("DATA:", props.data)
 
    Promise.all(props.data.map((item) => {
        return (
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
        )
      })).then((result) => {
        setCardsList(result)
      })

  }, [])

  return(

    <div className="space-y-4">
      {cardsList}
    </div>

  )

}

export default Cards