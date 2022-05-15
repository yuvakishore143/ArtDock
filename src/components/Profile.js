import { Avatar, Modal } from "@material-ui/core";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import Header from "../partials/Headers/Header";
import './cssfiles/Profile.css'
import UploadPosts from "./UploadPosts";


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

   useEffect(()=>{
     
      if(!usernamed == undefined ){
        addDoc(collection(db,'allusers'),{
          username:usernamed
        })
       }
   })

    return (
      <div className="profile_containers">
         <Header profile_color='red' />
       <div className="profile_container">   
       <div className="wrapper1">
                <ul >
                  <li style={{left:'200px',position:'relative',fontSize:'20px',fontFamily:"revert",listStyle:'none',marginBottom:'10px',color:'rgb(9, 99, 165)'}}>NOTE</li>
                  <li>WHILE UPLOADING THE POST ON PHONE TAKE PHOTO IN LANDSCAPE MODE FOR BETTER VIEW</li>
                  <li> DONT POST ANYTHING UNRELATED TO ART</li>
                  <li> DONT BAD COMMENT ANY ONE ON THIS WEBSITE </li>
                  <li> USE THIS SITE TO SHOWCASE YOUR ART TO THE CAMPUS </li>
                  <li> BE CAREFUL WHILE UPLOADING, YOU CANNOT DELETE ONCE UPLOADED </li>
                </ul>
          </div>
          <div className="wrapper2">
                <nav className="profile_details">
                <Avatar
                            style={{ height: '90px', width: '90px' ,fontSize:'70px' }}
                            className="profile_avatar"
                            alt={user.displayName}
                            src="/static/images/avatar/1.jpg"
                        />
                    <div className="profileuserdetails">
                        <div style={{marginBottom:'2px'}}> <strong>USERNAME<span></span>:</strong> {user.displayName}</div>
                        <div><strong>EMAIL<span></span> :</strong> {user.email}</div>
                    </div>

                </nav>         
            <button className="btn" onClick={()=>{ 
                try{
                  auth.signOut()
                  navigate('/')
                }catch(e){
                  alert(e.message)
                }       
             }} ><strong>logout</strong></button>
             <div className="line"></div>
             <button className="upload_btn" onClick={ handleUploadPost } ><strong>Uploadposts </strong></button>
             <UploadPosts open ={ open } toggle = { handleUploadPost } />
             <Link to ='/Myposts' className="profile_myposts" state={{username:user.displayName}}>Myposts</Link>
       </div>
           </div>
      </div>
      );
}
 
export default Profile;