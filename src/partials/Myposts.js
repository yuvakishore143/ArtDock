import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { db } from '../firebase'
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Posts from "../partials/Posts";
import { useLocation } from "react-router-dom";



const Myposts = () => {
    const [ allposts ,setAllPosts ]=useState([]);
    const [loading , setLoading ] = useState(false)
    const compRef = useRef(true)

    const location = useLocation();
    const username = location.state.username;

useLayoutEffect(()=>{
    document.body.style.backgroundColor = 'white'
  })

    useEffect( ()=>{
       
        if(compRef.current === true ){
            setLoading(true) 
         const collref = query(collection(db,'posts'),orderBy('timeStamp','desc'))
         getDocs(collref)
         .then((snapshot)=>{
             setAllPosts(snapshot.docs.map(doc =>({
                 id:doc.id,
                 post:doc.data()
             }))) 
             setLoading(false)
         })
        }
        return()=>{
            compRef.current = false;
        }
        },[allposts]);
   
          
    return ( 
        
         <div >
              {
              loading && <h1 style={{color:'white',position:"absolute",top:"35%",left:"40%"}}><img style={{width:'300px'}} src="45124d126d0f0b6d8f5c4d635d466246.gif"></img></h1>
              }
         <div className="home_posts" >
        <div className="posts_container">
           <div className="posts">
             {
                allposts.filter(({id,post})=>post.username == username).map(({id,post})=>(   
                    <Posts key={id} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} discription={post.discription} />       
                ))
                }
            </div>
         </div> 
        
     </div>
    
         
         </div>
     
        
        
        
     
        
     );
}
 
export default Myposts ;