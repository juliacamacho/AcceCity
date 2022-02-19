import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../config/firebase'
import { getDocs, collection } from "firebase/firestore"; 

function Cards(){

  const [cardsList, setCardsList] = useState([]);

  useEffect(async () => {
 
    getDocs(collection(db, "scans")).then((snapshot) => {

      Promise.all(snapshot.docs.map((doc) => {
        return (
          <div className="shadow rounded-sm px-6 py-4">
            <div>
              ID: {doc.data().scanID}
            </div>
            <div>
              (Row, Col): ({doc.data().row}, {doc.data().col})
            </div>
            <div>
              Score: {doc.data().score}
            </div>
          </div>
        )
      })).then((result) => {
        setCardsList(result)
      })

    })


  }, [])

  return(

    <div className="space-y-4">
      {cardsList}
    </div>

  )

}

export default Cards