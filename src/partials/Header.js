

import './Header.css';

const Header = () => {
    return ( 
      <>
      
      <div className='anchor'>
              <a  href='/' className='tittle'>BitArt</a>
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