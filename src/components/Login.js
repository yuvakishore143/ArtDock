
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';


import './cssfiles/Login.css'



const Login = () => {
 
     const [email,setEmail]=useState('')
     const [password,setPassword]=useState('')
     const [loading,setLoading]=useState(false)
     const [user,setUser]=useState('')


     const [emptyemail , setEmptyemail ]=useState(false)
     const [emptypass , setEmptypass ]=useState(false)
     const [ errormessage , setErrormessage ]=useState('')
     const [emailerror  ,setEmailerror ]  = useState(false)
   const navigate  = useNavigate();


   useLayoutEffect(()=>{

        document.body.style.backgroundColor='rgb(229, 229, 229)'
   })
  


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
          if(email == '' ){
               setEmptyemail(true)
          }
          if(password == '' ){
               setEmptypass(true)
          }
            if( !email == '' ){
               setErrormessage(e.message.slice(22,35))
               setEmailerror(true)
            }
        }
        setLoading(false)
   }


    return (
        <span className='login_whole1' >
               <h1 className='login_title1'> ART <div className='login_title2'><span style={{color:'rgb(29, 138, 210)'}}>DO</span>CK</div> </h1>
               <h1 className='login_caption'>EXPLORE THE ART</h1>
               <img className='paint_brush1' src='paint-brush-sketch-drawings-set-paintbrush-hand-drawn-vector-illustrations-part-of-set-2BWF529-removebg-preview.png' alt='paint brush'></img>

               <form className='login_form'>
                    
                    
                    <input
                         value={email}
                         className='login_email'
                         type='email'
                         placeholder='Type email'
                         onChange={(e)=>setEmail( e.target.value )}
                    >
                    </input>
                    {emptyemail && <p className='emailerror'> *Email is required</p> }
                     { emailerror && <p className='emailerror' > *{ errormessage }</p>   }                
                    <input
                         value={password}
                         className='login_password'
                         type='password'
                         placeholder='Type password'
                         onChange={(e)=>setPassword( e.target.value )}
                    >
                    </input>
                    {emptypass && <p className='passworderror'> *password is required</p> }
                    {user ? (
                         <>
                         <button  className='login_btn' onClick={()=>auth.signOut()}>logout </button>
                         <span>{user.displayName}</span>
                         </>
                    ):(
                         <button disabled={loading} className='login_btn' onClick={login}>Login</button>
                    )

                    

                    }
                    
                    <h3 className='login_text'>New to website? <Link to='/Register' className='login_link'>Register</Link> </h3>
               </form>
        </span>
        
     );
}
 
export default Login;