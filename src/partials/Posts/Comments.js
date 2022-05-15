import { Modal } from "@material-ui/core";
import { useLayoutEffect } from "react";

import './Comments.css'


const Comments = ({comments,opened,toggle}) => {
    useLayoutEffect(()=>{
        document.body.style.backgroundColor="white"
    })
    return ( 
        <Modal
        open={opened}
        onClose={()=>toggle()}
            >
                    <div className="comments_whole">
                        {        
                        comments.map(({data,key})=>{              
                            return (
                            <p key={key}><strong className="comment_name">{data.username} : </strong>{data.text}</p>)
                                } )         
                        }
            
                    </div>
        </Modal>
       
     );
}
 
export default Comments;