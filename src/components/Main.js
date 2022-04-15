import React from 'react';
import "./cssfiles/Main.css"
import { Link } from 'react-router-dom';

const Main = ({  backgroundColor , ui , syntax }) => {

    return (
      <>
   
            <div className="main_title">
               <h1 className='main_title1'>ART </h1>
               <h1 className='main_title2'>DOCK</h1>
            </div>
            <img className='main_image' src='photo-1511548774318-563182fe8d03.jpg'></img>
        
        <div className='main_combo'>
        <Link to="/Home_posts"  className='main_art'>Browse for the Art</Link>
        <Link to='/Home_blogs'  className="main_blog">Blogs</Link>
        </div>
       
        {/* <div className='main_line'></div> */}

        <div className='main_blog_info'>
         <div className='main_info_title'><strong>BLOG</strong></div> 
            you can share all the events happening in the college with the students.
            stay up to date with college events.
        </div>

        <div className='main_sb_info'>
          <div className='main_info_title'><strong>SELL AND BUY</strong></div>
          Buy the art from your favourite artist or make your own and sell.
          
       </div>
       
       <div className='main_posts_info'>
          <div className='main_info_title'><strong>POSTS</strong></div>
          Post what ever you want to show to the people without any problem. 
       </div>
       
       <div className='main_security_info'>
          <div className='main_info_title'><strong>SECURITY</strong></div>
          You dont have to worry about security because all the payment transcations are made with paytm and by
          other trusted companies.
       </div>
      </> 
      );

   
}





export default Main;


//color:rgb(110, 186, 240);