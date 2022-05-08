import { useEffect, useLayoutEffect, useState } from "react";
import Header from "../partials/Headers/Header";
import './cssfiles/Article.css'

const Article = () => {


  

    // to set background color to each page individually we use  useLayoutEffect
    useLayoutEffect(()=>{
        document.body.style.backgroundColor = 'white'
      })

     


    return ( 
        
        <div className="article_whole">
            <Header article_color='red'/>
           <h1>article page</h1> 
         </div>
     );
}
 
export default Article;