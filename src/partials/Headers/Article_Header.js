



import { Link } from 'react-router-dom';
import '../HeadersCss/Article_Header.css';

const Article_Header = ({ style , names }) => {

    return ( 
      <>
      
      <div className='article_header_container'>
              <Link  to='/Main' className='article_tittle'>ART DOCK</Link>
              <div> 
              <Link to='/Home_blogs' className= 'article_anchors '>Blogs</Link>
              <Link to='/Home_posts' className='article_anchors'>Posts</Link>   
              <Link to='/Article' className='article_main_anchors'>Article</Link>
              <Link to='/Profile' className='article_anchors'>Profile</Link>
            
      </div>
      
        </div>
        
        </>
      
       
     );
}
 
export default Article_Header;