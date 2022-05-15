
import { addDoc, collection, doc,increment, onSnapshot, query, updateDoc } from "firebase/firestore";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import Header from "../partials/Headers/Header";



const Game = () => {
  
  const [played , setPlayed ]=useState(false)
  const [clicks , setClicks]=useState();
  const [user,setUser]=useState('')
 
  const compref = useRef(true)
 

  
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
      if(compref.current == true){
              
        onSnapshot(query(collection(db,'game')),(QuerySnapshot)=>{
          setClicks(QuerySnapshot.docs.map(doc => (
            doc.data().clicked
          )))
        })
      }
      return()=>{
        compref.current= false;
      }
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
                    boxshadow: '0 5px 5px -6px #333',
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
            }}>Total { clicks } users</h1>
           } 
             
        </div>
       
        
        </>
      
      
     );


  
}
 


export default Game;



