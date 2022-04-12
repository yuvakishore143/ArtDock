

import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return ( 
      <>
      
      <div className='header_container'>
              <Link  to='/' className='tittle'>ART DOCK</Link>
              <div> 
              <Link to='/Home_blogs' className='anchors'>Blogs</Link>
              <Link to='/Home_posts' className='anchors'>Posts</Link>   
              <Link to='/login' className='anchors'>Login</Link>
              <Link to='/Profile' className='anchors'>Profile</Link>
              </div>
        </div>
        
        </>
      
       
     );
}
 
export default Header;