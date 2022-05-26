import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
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
 
 

    return ( 
        <div className="Article_whole">
          <div style={{color: article.titleColor }} className="title">{article.title}</div>
          <div className="writter">{article.writter}</div>
          <div className="content">{article.content}</div> 
        </div>
     );
}
 



export default SingleArticle;