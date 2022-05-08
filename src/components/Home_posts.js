import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { db } from '../firebase'


import './cssfiles/Home_posts.css'
import Posts from "../partials/Posts";
import { collection, getDocs } from "firebase/firestore";
import Header from "../partials/Headers/Header";



const Home_posts = () => {
    const [ posts ,setPosts ]=useState([]);
    const [loading , setLoading ] = useState(false)
    const compRef = useRef(true)
    const [color, setcolor] = useState()

//compref is used to make sure that the process is stopped once we moved to another page


    // to set background color to each page individually we use  useLayoutEffect
useLayoutEffect(()=>{
    document.body.style.backgroundColor = 'white'
  })
       
    useEffect(()=>{
       
        if(compRef.current === true ){
            setcolor("black")
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
        
         <div >
         <div className="home_posts" >
      {!loading && <Header post_color='red' /> }   
         {
              loading && <h1 style={{color:'white',position:"absolute",top:"40%",left:"40%"}}><img style={{width:'300px'}} src="45124d126d0f0b6d8f5c4d635d466246.gif"></img></h1>
         }
        <div className="posts_container">
           <div className="posts">
             {
                posts.map(({id,post})=>(
                    <Posts key={id} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} discription={post.discription} />
                ))
                }
            </div>
         </div> 
        
     </div>
     <button onClick={()=>console.log(posts)}>hellosdf world</button>
         
         </div>
     
        
        
        
     
        
     );
}
 
export default Home_posts ;