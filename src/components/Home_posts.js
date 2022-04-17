import { useEffect, useState } from "react";

import { db } from '../firebase'


import './cssfiles/Home_posts.css'
import Posts from "../partials/Posts";
import Posts_Header from "../partials/Headers/Posts_Header";


const Home_posts = () => {
    const [ posts ,setPosts ]=useState([]);
    const [loading , setLoading ] = useState(false)

    useEffect(()=>{
        setLoading(true)
            db.collection('posts').onSnapshot(snapshot=>{
                setPosts(snapshot.docs.map(doc=> doc.data()))
        setLoading(false)
        })
        
    },[]);
    
    return ( 
        <>
         
         <div className="home_posts" >
         <Posts_Header style=' posts_style ' />

         {
             loading && <h1>loading...</h1>
         }
            {
                posts.map(post=>(
                    <Posts username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
                ))
            }
            
        </div>
        
        
        </>
     
        
     );
}
 
export default Home_posts ;