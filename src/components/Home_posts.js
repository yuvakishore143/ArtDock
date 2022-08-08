import { useEffect, useRef, useState } from "react";
import { db } from '../firebase'
import './cssfiles/Home_posts.css'
import Posts from "../partials/Posts/Posts";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Header from "../partials/Headers/Header";



const Home_posts = () => {
    const [ posts ,setPosts ]=useState([]);
    const [loading , setLoading ] = useState(false)
    const compRef = useRef(true)

//compref is used to make sure that the process is stopped once we moved to another page
 
// to set background color to each page individually we use  useLayoutEffect

    useEffect(()=>{
       
        if(compRef.current === true ){
            setLoading(true) 
         const collref = query(collection(db,'posts'),orderBy('timeStamp','desc'))
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
        },[posts]);

         const tothetop =()=>{
             document.body.scrollTop = 0;
             document.documentElement.scrollTop = 0;
         }

    return ( 
            <div>
                {!loading && <Header post_color='red'  /> }   
                <div className="home_posts" >
                    
                    {
                        loading && <h1 style={{color:'white',position:"absolute",top:"35%",left:"40%"}}><img style={{width:'300px'}} src="45124d126d0f0b6d8f5c4d635d466246.gif" alt="loading img"></img></h1>
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
                <button className="top_btn" onClick={tothetop}>top</button>
             </div> 
     );
}
export default Home_posts ;