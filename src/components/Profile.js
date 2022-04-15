import Header from "../partials/Header";
import './cssfiles/Profile.css'

const Profile = () => {
    return (
      <div className="profile_containers">
      <Header/>
      <div className="profile_container">
          
          
            <div className="img_name">
            
            <img className="img_img" src="data:image/jpeg;base64,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"></img>
            <div className="name" ><strong> Name: </strong>yuva </div>

            </div>
            <div className="liked_posts">
              <div className="liked">liked posts</div>
              <div className="posts">posts</div>
            </div>
          <button className="btn"><strong>logout</strong></button>
      </div>
      </div>
      
      );
}
 
export default Profile;