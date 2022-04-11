import { useEffect, useState } from "react";

import { db } from '../firebase'


import './cssfiles/Home.css'
import Posts from "../partials/Posts";
import Header from "../partials/Header";

const Home = () => {
    const [ posts ,setPosts ]=useState([
       
    ]);

    useEffect(()=>{
        db.collection('posts').onSnapshot(snapshot=>{
            setPosts(snapshot.docs.map(doc=> doc.data()))
        })
    },[])
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
 
export default Home;