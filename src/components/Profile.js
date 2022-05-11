import { addDoc, collection, getDoc } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import Header from "../partials/Headers/Header";
import './cssfiles/Profile.css'
import UploadPosts from "./UploadPosts";
import UploadProfile from "./UploadProfile";

const Profile = () => {




  useLayoutEffect(() => {
    document.body.style.backgroundColor="white"
  
  })

  const [user,setUser]=useState('')
  const [open , setOpen ]=useState(false)
  const [ profileOpen , setProfileOpen ] = useState(false)
  const [usernamed,setUsernamed ]=useState('')


  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
            setUser(authUser)
    })
   setUsernamed(user.displayName)
  })

  const navigate = useNavigate()


  const handleUploadPost=()=>{
    setOpen(!open)
  }
  
 
   const handleUploadProfile =()=>{
    setProfileOpen(!profileOpen)
   }
  
   useEffect(()=>{
     
      if(!usernamed == undefined ){
        addDoc(collection(db,'allusers'),{
          username:usernamed
        })
       }
   })



    return (
      <div className="profile_containers">
         <Header profile_color='red' name = {user.displayName}/>
       <div className="profile_container">
          
          
          <div className="img_name">
            
            <img src="" alt="profile picture"></img>
            <nav className="profile_details">
               <div> <strong> {user.displayName}</strong></div>
               <div><strong> {user.email} </strong></div>
            </nav>
            
        </div>
           
          <button className="btn" onClick={()=>{ 
            try{
              auth.signOut()
              navigate('/')
            }catch(e){
               alert(e.message)
            }
                     
            }} ><strong>logout</strong></button>
            <button className="upload_btn" onClick={ handleUploadPost } ><strong>Uploadposts </strong></button>
            <UploadPosts open ={ open } toggle = { handleUploadPost } />
            <button className="profile_btn"  onClick={ handleUploadProfile }><strong>change profile </strong></button>
            <UploadProfile  open = { profileOpen } toggle = { handleUploadProfile } />
            
            
      </div>
      </div>
      
      );
}
 
export default Profile;