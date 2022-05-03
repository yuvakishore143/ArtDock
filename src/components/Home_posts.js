import { useEffect, useRef, useState } from "react";

import { db } from '../firebase'


import './cssfiles/Home_posts.css'
import Posts from "../partials/Posts";
import Posts_Header from "../partials/Headers/Posts_Header";
import { collection, getDocs } from "firebase/firestore";
import { compose } from "@mui/system";


const Home_posts = () => {
    const [ posts ,setPosts ]=useState([]);
    const [loading , setLoading ] = useState(false)
    const compRef = useRef(true)
 

//compref is used to make sure that the process is stopped once we moved to another page

       
    useEffect(()=>{
       
        if(compRef.current === true ){
            setLoading(true) 
         const collref = collection(db,'posts')
         getDocs(collref)
         .then((snapshot)=>{
             setPosts(snapshot.docs.map(doc =>({
                 id:doc.id,
                 post:doc.data()
             }))) 
             setLoading(false)
         })
        }
        
        return()=>{
            compRef.current = false;
        }
        });

        


    return ( 
        
         
     <div className="home_posts" >
      {!loading && <Posts_Header  /> }   
         {
              loading && <h1 style={{color:'white',position:"absolute",top:"40%",left:"40%"}}><img style={{width:'300px'}} src="b6e0b072897469.5bf6e79950d23.gif"></img></h1>
         }
        <div className="posts_container">
           <div className="posts">
             {
                posts.map(({id,post})=>(
                    <Posts key={id} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} discription={post.discription} likess={post.like} />
                ))
                }
            </div>
         </div> 
     </div>
        
        
        
     
        
     );
}
 
export default Home_posts ;