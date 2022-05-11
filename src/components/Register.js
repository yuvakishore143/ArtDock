import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import {  createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import './cssfiles/Register.css'
import { addDoc, collection, getDocs, onSnapshot, query, QuerySnapshot } from 'firebase/firestore';



const Register = () => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [username,setUsername]=useState('')
    const [loading,setLoading]=useState(false)
    const [ allusername , setAllusername ] = useState([]);
    const navigate  = useNavigate()
    const compRef = useRef(true)
    const [exists , setExits ] = useState(false)
    

    useEffect(()=>{
       
     if(compRef.current === true ){
       
      const collref = collection(db,'allusers')
      getDocs(collref)
      .then((snapshot)=>{
         setAllusername(snapshot.docs.map(doc =>(
           doc.data().username
          )))      
      })
     }
     return()=>{
         compRef.current = false;
     }
     });
    



     const register = async(e)=>{
          
          if(email.slice(0,4) == 1214 && exists == false ){
          e.preventDefault();
          setLoading(true)
               if(allusername.includes(username)){
                       alert('username already exists')  
                       setLoading(false)
               }else{

                    try{
                         const userCredential =  await createUserWithEmailAndPassword( auth,email,password,username ) //send what you declared in usestate above
                         await updateProfile(auth.currentUser,{displayName:username})
                         navigate('/Main');
                         addDoc(collection(db,'allusers'),{
                              username: username
                         })
                     
                    }catch(e){
                         alert(e.message)  
                    }
                    setLoading(false)
               }
         
          }else  {
                    alert('you are not authorized to access')
          }

     }
 
 
 
     


    return (
        <>
        <h1 className='register_title'> ART DOCK </h1>
       <form className='register_form'>
           <input
                value={username}
                className='register_username'
                type='text'
                placeholder='Type username'
                onChange={(e)=>{setUsername(e.target.value)}}
           >
           </input>
           <input
                value={email}
                className='register_email'
                type='email'
                placeholder='Type email'
                onChange={(e)=>{setEmail(e.target.value)}}
           >
           </input>
           <input
                value={password}
                className='register_password'
                type='password'
                placeholder='Type password'
                onChange={(e)=>{setPassword(e.target.value)}}
           >
           </input>
           <button disabled={loading} className='register_btn' onClick={register}>Register</button>
           <h3>Already have an account? <Link to='/' className='register_link'>Login</Link> </h3>
       </form>
        </>
        
     );
}
 
export default Register;