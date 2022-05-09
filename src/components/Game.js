
import { addDoc, collection, doc, getDoc, getDocs, increment, loadBundle, updateDoc } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { auth, db } from "../firebase";
import Header from "../partials/Headers/Header";
import './cssfiles/Game.css';
import { useNavigate } from "react-router-dom";


const Game = () => {
  
  const [played , setPlayed ]=useState(false)
  const [clicks , setClicks]=useState();
  const [user,setUser]=useState('')
 

 

  
  useEffect (()=>{
    const unSubscribe=   auth.onAuthStateChanged((authUser)=>{
               setUser(authUser)
       })
   
       return ()=>{
            unSubscribe()
       }
     })



    useLayoutEffect(()=>{
      document.body.style.backgroundColor = 'white'
    })
    
   useEffect(()=>{
      
    getDocs(collection(db,'game'))
    .then((snapshot)=>{
        setClicks(snapshot.docs.map(doc =>(
        doc.data().clicked
           )))
           
    })
  })
    


  const handleClick =async(e)=>{
      setPlayed(true)
      localStorage.setItem('clicked',true )
      updateDoc(doc(db,'game','cqEGHJWKd0LpA5g58X1i'),{
          clicked : increment(1)
      })
   }


  useEffect(()=>{
   let data= localStorage.getItem('clicked');
    if(data){
      setPlayed(data)
    }
  },[played])

 

    return ( 
        <>
          <div className="blogs_whole">
         <Header game_color= 'red'/>
         
           {
              
              played == false &&  <button style={{
                    position:'absolute',
                    top:'50%',
                    left:"45%",
                    width:'200px',
                    height:"100px",
                    borderRadius:'30%',
                    fontSize:'40px',
                    fontStyle:'italic',
                    backgroundColor:'skyblue',
                    border:'none',
                    boxShadow:"5px 10px orange",
                    color:'white'
        
                }} onClick={handleClick}  > click </button>
              
            }
            {
              played == false &&   <h1
                                    style={{
                                      color:'#0965a8',
                                      position:'absolute',
                                      left:"30%",
                                      top:'30%'
                                    }}> Click to check total number of users on this website</h1>
            }
           {
              played  &&  <h1 style={{
              position:'absolute',
              top:'50%',
              left:'45%',
              fontFamily:'Courgette, cursive',
              color:'skyblue'
            }}>Total { clicks } user</h1>
           } 
             
        </div>
       
        
        </>
      
      
     );


  
}
 


export default Game;



