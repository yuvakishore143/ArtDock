
import './Posts.css'
import Avatar from '@material-ui/core/Avatar';

const Posts = ({ username,caption,imageUrl }) => {
    return ( 
        <div className='post_container'>
                <div className="post_header">
                    <Avatar
                        className="post_avatar"
                        alt={username}
                        src="/static/images/avatar/1.jpg"
                    />
                   <h1 className='post_username'>{ username }</h1>
                </div>
                    <img className="post_img" src={ imageUrl }/>
                    <div className='post_caption'><strong>caption: </strong>{ caption }</div>
                    
        </div>
     );
}
 
export default Posts;