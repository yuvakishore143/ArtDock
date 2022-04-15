import { useEffect, useState } from "react";

import { db } from '../firebase'


import './cssfiles/Home_posts.css'
import Posts from "../partials/Posts";
import Header from "../partials/Header";
import Profile from "./Profile";

const Home_posts = () => {
    const [ posts ,setPosts ]=useState([
      
    ]);

    useEffect(()=>{
        db.collection('posts').onSnapshot(snapshot=>{
            setPosts(snapshot.docs.map(doc=> doc.data()))
            
        })
        
    },[]);
    
    return ( 
        <>
        <Header/>
    {
        posts.map(post=>(
            <Posts username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
    }
    
        </>
        
     );
}
 
export default Home_posts ;