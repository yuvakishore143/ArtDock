import { Modal } from "@material-ui/core";

import '../partials/Comments.css'


const Comments = ({comments,opened,toggle}) => {

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