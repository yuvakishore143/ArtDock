import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
    
    
    const [ usernameerror , setUsernameerror ] = useState(false)



    useLayoutEffect(() => {
     
     document.body.style.backgroundColor='rgb(229, 229, 229)'
    
    })

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
          
          e.preventDefault();
          setLoading(true)
               if(allusername.includes(username)){
                    setUsernameerror(true)
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
                    
                    }
                    setLoading(false)
               }
         
        

     }
 
 
 
     


    return (
        <>
                        <h1 className='register_caption'>EXPLORE THE ART</h1>
               <img className='paint_brush1' src='paint-brush-sketch-drawings-set-paintbrush-hand-drawn-vector-illustrations-part-of-set-2BWF529-removebg-preview.png' alt='paint brush'></img>
         <h1 className='register_title1'> ART <div className='register_title2'><span style={{color:'rgb(29, 138, 210)'}}>DO</span>CK</div> </h1>
       <form className='register_form'>
           <input
                value={username}
                className='register_username'
                type='text'
                placeholder='Type username'
                onChange={(e)=>{setUsername(e.target.value)}}
           >
           </input>
           {usernameerror &&  <p className='usernameerror'>*Username already exits </p>}
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
           <h3 className='register_text'>Already have an account? <Link to='/' className='register_link'>Login</Link> </h3>
       </form>
        </>
        
     );
}
 
export default Register;