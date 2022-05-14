import styled from 'styled-components'
import { useEffect, useLayoutEffect, useState } from "react";
import Header from "../partials/Headers/Header";
import './cssfiles/Article.css'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import { db } from '../firebase';


const Article = () => {
   
    const [ data , setData ] = useState([])

   const navigate = useNavigate()
      
    useLayoutEffect(()=>{
        document.body.style.backgroundColor = 'white';
      
      })

      useEffect(()=>{
         
      onSnapshot(query(collection(db,'Article'),orderBy('timeStamp','desc')),(QuerySnapshot)=>{
        setData(QuerySnapshot.docs.map((doc)=>({
          data:doc.data(),
          key:doc.id
        })))
      })  
     
      })

      
    return ( 
        
        <div className="article_whole">
            <Header article_color='red'/>
            <button onClick={()=>navigate('/UploadArticle')}>Upload Artilce</button>
            {
            data.map(({key , data }) =>(
              <div key ={key}>
               <div onClick={()=>navigate(`/Article/${key}`)} >{data.title} written by {data.writter}</div>
              </div>
            ))
            }
            
         </div>
     );
}


 
export default Article;