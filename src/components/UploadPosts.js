import { useEffect, useState } from "react";
import Header from "../partials/Header";
import './cssfiles/UploadPosts.css';
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";

const UploadPosts = () => {

  const [image,setImage]=useState('')
  const [caption ,setCaption]=useState('')
  const [progress,setProgress]=useState("")
  const [user,setUser]=useState('')

  useEffect (()=>{
    auth.onAuthStateChanged((authUser)=>{
            setUser(authUser)
    })
  })
    

  const handleChange=(e)=>{
      if(e.target.files[0]){
          setImage(e.target.files[0])
      }
  }

  const handleUpload=()=>{

    
        addDoc(collection(db , 'posts'),{
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()  ,
            caption : caption,
            username: user.displayName
            
            

        })
        alert('uploaded')
  }

    return ( 

        <div className="upladposts_whole">
            
            <input type='file' onChange={handleChange} ></input>
            <input type='text' placeholder="Type the caption..." onChange={(e)=>setCaption(e.target.value)} ></input>
            <button onClick={handleUpload} >Upload</button>
        </div>
        

     );
}
 
export default UploadPosts;