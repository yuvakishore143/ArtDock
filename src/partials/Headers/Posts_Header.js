

import { Link } from 'react-router-dom';
import '../HeadersCss/Posts_Header.css';

const Post_Header = ({ style , names }) => {

    return ( 
      <>
      
      <div className='post_header_container'>
              <Link  to='/Main' className='post_tittle'>ART DOCK</Link>
              <div> 
              <Link to='/Home_blogs' className= 'post_anchors '>Blogs</Link>
              <Link to='/Home_posts' className='post_main_anchors'>Posts</Link>   
              <Link to='/Article' className='post_anchors'>Article</Link>
              <Link to='/Profile' className='post_anchors'>Profile</Link>
            
      </div>
      
        </div>
        
        </>
      
       
     );
}
 
export default Post_Header;