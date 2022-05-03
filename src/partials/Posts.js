
import './Posts.css'
import Avatar from '@material-ui/core/Avatar';
import { useEffect, useRef, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs,addDoc, updateDoc, increment, doc} from 'firebase/firestore';
import firebase from "firebase/compat/app";
import Comments from "./Comments";




const Posts = ({ postId, username,caption,imageUrl,discription,likess}) => {



    const [comment, setComment] = useState([])
    const [comments, setComments] = useState([])
    const [user,setUser]=useState('')
    const [liked ,setLiked] = useState('')
    const [open,setOpen]=useState(false)
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

      const handleClick=()=>{
          setOpen(!open)
      }

    const handleLike=(e)=>{
            e.preventDefault();
        
         setLiked(!liked)
         
         if(liked){
           
             updateDoc(doc(db,'posts',postId),{
                    like:increment(-1)
                })
                
         }else{
            updateDoc(doc(db,'posts',postId),{
                like:increment(1)
            })
         }
         
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
                        {
                            liked == true  ?  <img  className='like_image' src='images-removebg-preview.png' alt='like image' onClick={handleLike} disabled={onclick}></img> 
                            : <img className='like_image' src='download-removebg-preview.png' alt='like image' onClick={handleLike}></img>
                        }   
                            <span>{likess}</span>
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