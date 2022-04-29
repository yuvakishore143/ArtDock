
import './Posts.css'
import Avatar from '@material-ui/core/Avatar';
import { useEffect, useRef, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs,addDoc} from 'firebase/firestore';
import firebase from "firebase/compat/app";

import { Link, Route, Routes } from 'react-router-dom';
import Comments from './Comments';

const Posts = ({ postId, username,caption,imageUrl }) => {

   
    const [comment, setComment] = useState([])
    const [comments, setComments] = useState([])
    const [user,setUser]=useState('')
    const compRef = useRef(true)


//  to get comments from firebase

    useEffect( () => {
          if(compRef.current){
        const colref =collection(db,'posts',postId,'comments')
   
         getDocs(colref)
        .then (snapshot=>{
            setComments(snapshot.docs.map(doc=>({
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

    return ( 
        <div className='post_container'>
                <div className="post_header">
                    <Avatar
                        className="post_avatar"
                        alt={username}
                        src="/static/images/avatar/1.jpg"
                    />
                   <h1 className='post_username'>{ username }</h1>
                </div>
                    <img className="post_img" src={ imageUrl }/>
                    <div className='post_caption'><strong>caption: </strong>{ caption }</div>

              
                       
                
        
                        {!comments == '' && <Link className='comments_link' to='/Comments' state={comments}>Comments</Link> }    
                          
        
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
     );
}
 
export default Posts;