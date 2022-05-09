
import './Posts.css'
import Avatar from '@material-ui/core/Avatar';
import { useEffect, useRef, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs,addDoc, updateDoc, increment, doc, onSnapshot, QuerySnapshot, query} from 'firebase/firestore';
import firebase from "firebase/compat/app";
import Comments from "./Comments";
import Likes from './Likes';





const Posts = ({ postId, username,caption,imageUrl,discription}) => {

                       
    const [comment, setComment] = useState([])
    const [comments, setComments] = useState([])

    const [user,setUser]=useState('')
    const [open,setOpen]=useState(false)
    const compRef = useRef(true)
    


    useEffect( () => {
          if(compRef.current){
   
         onSnapshot(query(collection(db,'posts',postId,'comments')),(QuerySnapshot)=>{
            setComments(QuerySnapshot.docs.map(doc=>({
                key:doc.id,
                data:  doc.data(),
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            })  
              ))
         })
    }
      return () => {
          compRef.current = false;
      }
        
       
    },[comments,postId])

  

// to add comments to firebase

    const handleComment=(e)=>{
        e.preventDefault()
        
        addDoc(collection(db,'posts',postId,'comments'),{
            text: comment,
            username: user.displayName,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()
            
        })
            setComment('')
    }

    
    //  to get the name of current user logged in

    useEffect(()=>{
        auth.onAuthStateChanged((authUser)=>{
                setUser(authUser)
        })
      })

      // to open comment modal 
      const handleClick=()=>{
          setOpen(!open)
      }

      
   
       
    
    return ( 
        <div className='post_container'>
             <div className="post_info">
                <div className="post_header">  
                        <Avatar
                            className="post_avatar"
                            alt={username}
                            src="/static/images/avatar/1.jpg"
                        />
                         <p className='post_username'>{ username }</p>
                </div>

                <div className="post_body">
                    <img className="post_img" src={ imageUrl }/>
                    
                            <div className='post_caption'><strong>caption: </strong>{ caption } </div>

                        <div style={{display:'flex',alignItems:'center', marginTop:'10px'  }}>
                       
                            <Likes postId={postId} user={user.displayName}  />
                             <Comments opened = {open} comments={comments} toggle={handleClick} />
                             <button className='comments_btn' onClick={handleClick}> Comments</button>
                          </div>
                                        
                        <form className='post_commentbox'>
                            <input
                            className='post_comment'
                            value={comment}
                            placeholder="Add a comment..."
                            onChange={(e)=>setComment(e.target.value)}
                            ></input>
                            <button className='post_button' disabled={!comment} onClick={handleComment}>post</button>
                        </form>
                </div>
                       
             </div>
                   
              <div className="post_discription">
                  { discription ? <p>{discription}</p> : <p>Nothing in the discription</p>}
               
              </div>
              
        </div>
     );
}
 
export default Posts;