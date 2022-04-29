
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

import './cssfiles/Login.css'



const Login = () => {
 
     const [email,setEmail]=useState('')
     const [password,setPassword]=useState('')
     // const [username,setUsername]=useState('')
     const [loading,setLoading]=useState(false)
     const [user,setUser]=useState('')

   const navigate  = useNavigate();

   useEffect(()=>{
        const unsubscribe =  auth.onAuthStateChanged((authUser)=>{
             if(authUser){
                 setUser(authUser);
                
             }else{
                 setUser(null)
             }
           
        })
        return ()=>{
                  unsubscribe(); 
         }
   },[user])


   const login=async(e)=>{
        e.preventDefault();
        setLoading(true)
        try{
          const man = await signInWithEmailAndPassword(auth,email,password) 
          navigate('/Main')
          console.log(man);

        }catch(e){
            alert(e.message)
        }
        setLoading(false)
   }


    return (
        <>
        <h1 className='login_title'> ART DOCK </h1>
       <form className='login_form'>
           
           
           <input
                value={email}
                className='login_email'
                type='email'
                placeholder='Type email'
                onChange={(e)=>setEmail( e.target.value )}
           >
           </input>
           <input
                value={password}
                className='login_password'
                type='password'
                placeholder='Type password'
                onChange={(e)=>setPassword( e.target.value )}
           >
           </input>
           {user ? (
                <>
                  <button  className='login_btn' onClick={()=>auth.signOut()}>logout </button>
                  <span>{user.displayName}</span>
                </>
            
           ):(
               <button disabled={loading} className='login_btn' onClick={login}>Login</button>
           )

           

           }
          
           <h3>New to website? <Link to='/Register' className='login_link'>Register</Link> </h3>
       </form>
        </>
        
     );
}
 
export default Login;