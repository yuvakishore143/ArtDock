
import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs,addDoc, updateDoc, increment, doc, collectionGroup} from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';



const Likes = ({postId}) => {
   
  

    const [likeinfo , setLikeinfo] = useState([])
    const [ like , setLike ] = useState([])
    const [liked ,setLiked] = useState(false)  //to check whether user liked a post  or not 
    const compRef = useRef(true)

    //all are used to add like functionality
    let liker = []
    const [ final , setFinal ] = useState(0)
    let sum = 0;

      

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
       
      setLiked(!liked)
      
     if(liked){}else{
      addDoc(collection(db,'posts',postId,'like'),{
            likes:increment(1),                                  
            liked:true
        })
        
     }
     
   }

  useEffect(()=>{
    likeinfo.map(({key,datas})=>{
            liker.push(datas.likes)
                 
        })
        for( let i = 0 ;i<liker.length ; i++){
           setFinal( sum += liker[i] )
          }
          
  })

    
   
     
  
    return (<>
     {
        liked == true ?  <img  className='like_image' src='images-removebg-preview.png' alt='like image'></img> 
        : <img className='unlike_image' src='download-removebg-preview.png' alt='like image'  onClick={handleLike} ></img>
         }   

         {
            final
         }
         {like}
    </>
     );
     
}
 
export default Likes;