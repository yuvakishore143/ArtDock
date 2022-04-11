

import './Header.css';

const Header = () => {
    return ( 
      <>
      
      <div className='header_container'>
              <a  href='/' className='tittle'>ART DOCK</a>
              <div> 
              <a href='/Home' className='anchors'>Home</a>   
              <a href='/login' className='anchors'>Login</a>
              <a href='/Profile' className='anchors'>Profile</a>
              </div>
        </div>
        
        </>
      
       
     );
}
 
export default Header;