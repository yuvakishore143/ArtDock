
import { useEffect, useLayoutEffect, useState } from "react";
import Header from "../partials/Headers/Header";
import './cssfiles/Article.css'
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';


const Article = () => {
   
    const [ data , setData ] = useState([])

   const navigate = useNavigate()
      
    useLayoutEffect(()=>{
        document.body.style.backgroundColor = 'rgb(250, 250, 250)';
      
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
      <div>
        <Header article_color='red'/>
         <button onClick={()=>navigate('/UploadArticle')} className="UPLOAD_btn">Upload Artilce</button>
        <div className="article_whole" >
            {
            data.map(({key , data }) =>(
              <div key ={key} className="singlearticle" onClick={()=>navigate(`/Article/${key}`)}>
               <div  className='Arttitle' style={{color: data.titleColor }} >{data.title}</div>
               <div className="Artwritter">{data.writter}</div>
               <img src={data.ImageUrl} alt="Artcover photo" className="converphoto"></img>
              </div>
            ))
            }
            
         </div>
      </div>
     );
}


 
export default Article;