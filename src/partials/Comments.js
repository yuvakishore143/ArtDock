import { useLocation, useParams } from "react-router-dom";
import '../partials/Comments.css'








const Comments = () => {


    const location = useLocation();
    const comments = location.state;
   
    return ( 
      
       
        <div className="comments_whole">
        {
                   
                        comments.map(({data,key})=>{
                            
                                  return (
                                  <p key={key}><strong className="comment_name">{data.username} : </strong>{data.text}</p>)
                                 
                              
                           

                        } )

         
        }
                           
             
        
            
          
           
        </div>

       

       
     );
}
 
export default Comments;