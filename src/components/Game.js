
import { addDoc, collection, doc, getDoc, getDocs, increment, updateDoc } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { db } from "../firebase";
import Header from "../partials/Headers/Header";
import './cssfiles/Home_blogs.css'

const Game = () => {
  
    const [clicks , setClicks]=useState();
    const [ color , setColor ]=useState();

    useLayoutEffect(()=>{
      document.body.style.backgroundColor = 'white'
    })
    
   useEffect(()=>{
      
    getDoc(doc(db,'game','cqEGHJWKd0LpA5g58X1i'))
    .then((snapshot)=>{
        setClicks(snapshot.docs.map(doc =>(
        doc.data()
           )))
           return(clicks)
    })
     
  })
    


  const handleClick =()=>{
     console.log(clicks);
      updateDoc(doc(db,'game','cqEGHJWKd0LpA5g58X1i'),{
          clicked : increment(1)
      })
  }




 

    return ( 
        <>
          <div className="blogs_whole">
         <Header game_color= 'red'/>
         
           {
              
                <button style={{
                    position:'absolute',
                    top:'45%',
                    left:"45%",
                    width:'200px',
                    height:"200px",
                    borderRadius:'50%',
                    fontSize:'40px',
                    fontStyle:'italic',
                    backgroundColor:'skyblue',
                    border:'10px solid red',
                    color:'white'
        
                }} onClick={handleClick}></button>
               }
           
              
             
      
        </div>
       
        
        </>
      
      
     );
}
 


export default Game;