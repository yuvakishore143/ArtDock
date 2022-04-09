import { useEffect, useState } from "react";

import { db } from '../firebase'
import Avatar from '@material-ui/core/Avatar'


const Home = () => {
    const [ posts ,setPosts ]=useState([
        {
            username:'yuva',
            caption:'i love nature',
            id:3
        }
    ])
    return ( 
        <>
        <h1>hwllo qoels</h1>
        <Avatar
          className="post_avatar"
          alt='yuva'
          src="/static/images/avatar/1.jpg"
        />
          
        </>
        
     );
}
 
export default Home;