
import { useEffect, useRef, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, getDocs,addDoc, updateDoc, increment, doc, collectionGroup, onSnapshot, query, QuerySnapshot} from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';



const Likes =  ({postId,user}) => {
   
  
    // const [ localLiked , setLocalLiked ] = useState(false) // it is used to restrict the user to only click once and to show that the user liked without any delay or page refresh. this just used locally it was not stored in the database

    const [likeinfo , setLikeinfo] = useState([])
    const [liked ,setLiked] = useState(false)  //to check whether user liked a post  or not 
    // const [ localLiked , setLocalliked ]=useState(liked)
    const compRef = useRef(true)
    // const [ currentuser , setCurrentUser ] = useState()

    //all are used to add like functionality
    let liker = []
    const [ final , setFinal ] = useState(0)
    let sum = 0;
    let users = []
   
  
    useEffect(()=>{
        if(compRef.current){
         onSnapshot(query(collection(db,'posts',postId,'like')),(QuerySnapshot)=>{
            setLikeinfo(QuerySnapshot.docs.map(doc =>({
                key:doc.id,
                datas: doc.data(), 
            })))
         })
    }
    return ()=>{
        compRef.current = false
    }
     },[postId,likeinfo])
 


    const handleLike =  (e)=>{
        // setLocalLiked(true)        
     if(liked){}else{
      addDoc(collection(db,'posts',postId,'like'),{
            likes:increment(1),                                  
            liked:true,
            user:user
        }) 
    } 
   }

  useEffect(()=>{
       likeinfo.map(({key,datas})=>{
            liker.push(datas.likes)
            users.push(datas.user)
                 
        })
        for( let i = 0 ;i<liker.length ; i++){
           setFinal( sum += liker[i] )
           
          
          } 
          if(users.includes( user )) {
            setLiked(true)
   
        }else{
            setLiked(false)
        }
          
  })
  
    return (<>
     {
        liked == true  ?  <img  className='like_image' src='images-removebg-preview.png' alt='like image'></img> 
        : <img className='unlike_image' src='download-removebg-preview.png' alt='like image'  onClick={handleLike} ></img>
         }   

       
       
        
        

        <span style={{
            position:'relative',
            left:'0.4em',
            bottom:'0.15em'
            
        }} >{final}</span> 
    </>
     );
     
}
 
export default Likes;