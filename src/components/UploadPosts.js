import { useEffect, useState } from "react";
import Header from "../partials/Header";
import './cssfiles/UploadPosts.css';
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import { getStorage,ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import {storage} from '../firebase'

const UploadPosts = () => {

  const [image,setImage]=useState('')
  const [caption ,setCaption]=useState('')
  const [progress,setProgress]=useState(0)
  const [user,setUser]=useState('')
  const [imageUrl , setImageUrl]= useState('')

  useEffect (()=>{
    auth.onAuthStateChanged((authUser)=>{
            setUser(authUser)
    })
  })
    
  
  const handleChange=(e)=>{
      e.preventDefault();
      
          const file = e.target.files[0];
          handleUpload(file)
      
  }

  const handleUpload = (file)=>{

    if(!file)return;
    const storageRef = ref(storage, `/images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef,file);
      

      uploadTask.on(
          'state_changed',
           (snapshot)=>{
            const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes ) * 100
          )
          setProgress(prog)
           },
           (error)=>alert(error.message),
           ()=>{
               getDownloadURL(uploadTask.snapshot.ref )
               .then((url)=> 
                addDoc(collection(db , 'posts'),{
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption : caption,
                username: user.displayName,
                imageUrl: url
            },
            console.log(url)
            ))
           }
      )    
  }

    return ( 

        <div className="upladposts_whole">
            
            <input type='file' onChange={handleChange} ></input>
            <input type='text' placeholder="Type the caption..." onChange={(e)=>setCaption(e.target.value)} ></input>
            <button >Upload</button>
            <h3>uploaded { progress }% </h3>
        </div>
        

     );
}
 
export default UploadPosts;

















      // const storage = getStorage();
        // const storageRef = ref(storage, `images/${image.name}`)
        // const uploadTask = uploadBytesResumable(storageRef,image,'data_url')

        
        // uploadTask.on(
        //     "state_changed",
        //     (snapshot) => {
        //       const progress =
        //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             
        //     },
        //     (error) => {
              
        //       throw error;
        //     },
        //     () => {
              
        //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //         const body = {
        //           image: downloadURL,
        //         };
        //     })
        //     }
        // )