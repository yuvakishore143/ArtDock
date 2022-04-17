

import { Link } from 'react-router-dom';
import '../HeadersCss/Blogs_Header.css';

const Blogs_Header = ({ style , names }) => {

    return ( 
      <>
      
      <div className='blog_header_container'>
              <Link  to='/Main' className='blog_tittle'>ART DOCK</Link>
              <div> 
              <Link to='/Home_blogs' className= 'blog_main_anchors '>Blogs</Link>
              <Link to='/Home_posts' className='blog_anchors'>Posts</Link>   
              <Link to='/Article' className='blog_anchors'>Article</Link>
              <Link to='/Profile' className='blog_anchors'>Profile</Link>
            
      </div>
      
        </div>
        
        </>
      
       
     );
}
 
export default Blogs_Header;