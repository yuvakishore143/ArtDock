
import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs,addDoc, updateDoc, increment, doc, collectionGroup} from 'firebase/firestore';



const Likes = ({postId}) => {
   
  

    const [likeinfo , setLikeinfo] = useState('')
    const [numberoflikes , setnumberoflikes]=useState(0)
    
    const [liked ,setLiked] = useState(false)  //to check whether user liked a post  or not 
    const compRef = useRef(true)

   
       

    useEffect(()=>{
        if(compRef.current){
        getDocs(collection(db,'posts',postId,'like'))
        .then(snapshot=>{
            setLikeinfo(snapshot.docs.map(doc =>({
                key:doc.id,
                datas: doc.data(), 
            })))
        })
    }
    return ()=>{
        compRef.current = false
    }
     },[postId,likeinfo])
 



    const handleLike=  (e)=>{
        e.preventDefault();


      setLiked(!liked)
      setnumberoflikes(numberoflikes + 1)
      
     if(liked){}else{
      addDoc(collection(db,'posts',postId,'like'),{
            likes:increment(1),                                  
            liked:true
        })
        
     }
     
}

    return (<>
     {
        liked == true ?  <img  className='like_image' src='images-removebg-preview.png' alt='like image'></img> 
        : <img className='unlike_image' src='download-removebg-preview.png' alt='like image'  onClick={handleLike} ></img>
         }   
    </>
     );
     
}
 
export default Likes;