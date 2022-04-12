

import './Header.css';

const Header = () => {
    return ( 
      <>
      
      <div className='header_container'>
              <a  href='/' className='tittle'>ART DOCK</a>
              <div> 
              <a href='/Home_blogs' className='anchors'>Blogs</a>
              <a href='/Home_posts' className='anchors'>Posts</a>   
              <a href='/login' className='anchors'>Login</a>
              <a href='/Profile' className='anchors'>Profile</a>
              </div>
        </div>
        
        </>
      
       
     );
}
 
export default Header;