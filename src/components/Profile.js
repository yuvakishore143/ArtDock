import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Header from "../partials/Headers/Header";
import './cssfiles/Profile.css'
import UploadPosts from "./UploadPosts";

const Profile = () => {

  useLayoutEffect(() => {
    document.body.style.backgroundColor="white"
  
  })

  const [user,setUser]=useState('')
  const [open , setOpen ]=useState(false)

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
            setUser(authUser)
    })
  })

  const navigate = useNavigate()

  const handleUpload=()=>{
    setOpen(!open)
  }
  
  
    return (
      <div className="profile_containers">
         <Header profile_color='red'/>
       <div className="profile_container">
          
          
            <div className="img_name">
            
          
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

            
            
            <button className="upload_btn" onClick={ handleUpload } ><strong>Uploadposts </strong></button>
            <UploadPosts open ={ open } toggle = {handleUpload} />
            <button className="profile_btn"><strong>change profile </strong></button>
            
      </div>
      </div>
      
      );
}
 
export default Profile;