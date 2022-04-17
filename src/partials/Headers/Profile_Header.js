import { Link } from 'react-router-dom';
import '../HeadersCss/Profile_Header.css';

const Profile_Header = ({ style , names }) => {

    return ( 
      <>
      
      <div className='profile_header_container'>
              <Link  to='/Main' className='profile_tittle'>ART DOCK</Link>
              <div> 
              <Link to='/Home_blogs' className= 'profile_anchors '>Blogs</Link>
              <Link to='/Home_posts' className='profile_anchors'>Posts</Link>   
              <Link to='/Article' className='profile_anchors'>Article</Link>
              <Link to='/Profile' className='profile_main_anchors'>Profile</Link>
            
      </div>
      
        </div>
        
        </>
      
       
     );
}
 
export default Profile_Header;