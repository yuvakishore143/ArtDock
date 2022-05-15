import { collection, doc, getDoc, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import './SingleArticle.css'

const SingleArticle = () => {

    const [ article , setArticle ] = useState([])
    const { Id } = useParams();


   useEffect(()=>{
       getDoc(doc(db,'Article',Id))
       .then((doc)=>{
           setArticle(doc.data())
       })
   })
 
 

    useLayoutEffect(()=>{
        document.body.style.backgroundColor = 'white'
    })
         
    return ( 
        <div className="Article_whole">
          <div style={{color: article.titleColor }} className="title">{article.title}</div>
          <div className="writter">{article.writter}</div>
          <div className="content">{article.content}</div>
          
        </div>
     );
}
 



export default SingleArticle;