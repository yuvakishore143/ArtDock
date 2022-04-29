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
         })
        
        setLoading(false)
        
        }
        return()=>{
            compRef.current = false;
        }
        });




    return ( 
        <>
         
         <div className="home_posts" >
         <Posts_Header style='posts_style' />

         {
             loading && <h1>loading...please wait</h1>
         }
            {
                posts.map(({id,post})=>(
                    <Posts key={id} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
                ))
            }
            
        </div>
        
        
        </>
     
        
     );
}
 
export default Home_posts ;