import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase';

 const SinglePost= ( ) => {

    const { Id } = useParams()
    const [ posts , setPosts ] = useState([])

    useEffect(()=>{
        getDoc(doc(db,'posts', Id ))
        .then((doc)=>{
            setPosts(doc.data())
        })
        },[posts]); 


     
  return (
    <div>
    <div className="post_discription">
                   { posts.discription ? <p>{posts.discription}</p> : <p>Nothing in the discription</p> }
                
               </div>
               </div>
  )
}


export default SinglePost