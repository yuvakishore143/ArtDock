

import '../Headers/Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useLayoutEffect, useState } from 'react';
import { auth } from '../../firebase';

const Header = ({ game_color,article_color,post_color,profile_color }) => {

     useLayoutEffect(()=>{
          document.body.style.backgroundColor = 'white'
         })

  const [user,setUser]=useState('')

     useEffect(()=>{
          auth.onAuthStateChanged((authUser)=>{
                  setUser(authUser)
          })
        })

    const navigator = useNavigate()

    const handleClick=()=>{
         navigator('/Profile')
    }

          return ( 
          
          <div className='header_container'>
         
          <div style={{display:'flex' , flexDirection:'row'  , alignItems:"center"}}>
               <img className='paintbrush' src='paint-brush-sketch-drawings-set-paintbrush-hand-drawn-vector-illustrations-part-of-set-2BWF529-removebg-preview.png' alt='paint brush'></img>
               <Link  to='/Main' className='tittle'><span style={{color:'#f5a742'}}> Art</span> <span style={{color:"rgb(9, 101, 168)"}}>Do<span style={{color:"rgb(29, 138, 210)"}}>ck</span></span> </Link>
          </div>
               
               <div style={{display:'flex', flexDirection:'row', alignItems:"center"}}> 
                    <Link to='/Game' className= 'anchors ' style={{color:game_color}}>Users count</Link>
                    <Link to='/Home_posts' className='anchors'  style={{color:post_color}}>Posts</Link>   
                    <Link to='/Article' className='anchors' style={{color:article_color}}>Articles</Link>
                    <Link to='/Profile' className='anchors'  style={{color:profile_color}}><img src='account.png' className='user_img'></img>Profile</Link>
              </div>
         </div>
              );

     
   

}
 
export default Header;