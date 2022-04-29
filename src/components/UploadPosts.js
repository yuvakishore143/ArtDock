import { useEffect, useState } from "react";
import './cssfiles/UploadPosts.css';
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import { ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import {storage} from '../firebase'
import { Modal } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const UploadPosts = ({ open , toggle } ) => {

  
  const [caption ,setCaption]=useState('')
  const [progress,setProgress]=useState(0)
  const [user,setUser]=useState('')
  
 const navigator = useNavigate()

  useEffect (()=>{
 const unSubscribe=   auth.onAuthStateChanged((authUser)=>{
            setUser(authUser)
    })

    return ()=>{
         unSubscribe()
    }
  })
    
  
    const formHandler = (e) =>{
        e.preventDefault();
          const file = e.target[0].files[0];
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
            navigator('/Home_posts')
            ))
           }
      )    
  }
    return ( 


     
         <Modal
         open={open}
         onClose={()=>toggle()}
         >
               <form onSubmit={formHandler}  className="upladposts_whole">
                  <input type='file' className="input_file" ></input>
                  <input type='text' placeholder="Type the caption..." onChange={(e)=>setCaption(e.target.value)} className="input_caption" ></input>
                  <button type="submit" className="uploadposts_btn" ><strong>Upload</strong></button>
                  {/* <h3 className="progress">uploaded { progress }% </h3> */}
                  <progress value={progress} className="progress"></progress>
                </form>
              
         </Modal>
        
            
           
      
        

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