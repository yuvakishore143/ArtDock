

import '../Headers/Header.css'
import { Link } from 'react-router-dom';

const Header = ({ game_color,article_color,post_color,profile_color }) => {

    return ( 
     
      
      <div className='header_container'>

      <div style={{display:'flex' , flexDirection:'row'  , alignItems:"center"}}>
           <img className='paintbrush' src='paint-brush-sketch-drawings-set-paintbrush-hand-drawn-vector-illustrations-part-of-set-2BWF529-removebg-preview.png' alt='paint brush'></img>
           <Link  to='/Main' className='tittle'><span style={{color:'#f5a742'}}> ART</span> <span style={{color:"rgb(9, 101, 168)"}}>DO<span style={{color:"rgb(29, 138, 210)"}}>CK</span></span> </Link>
      </div>
           
           <div> 
           <Link to='/Game' className= 'anchors ' style={{color:game_color}}>Game</Link>
           <Link to='/Home_posts' className='anchors'  style={{color:post_color}}>Posts</Link>   
           <Link to='/Article' className='anchors' style={{color:article_color}}>Article</Link>
           <Link to='/Profile' className='anchors'  style={{color:profile_color}}>Profile</Link>
         
   </div>
   
     </div>
     
       
     );
}
 
export default Header;