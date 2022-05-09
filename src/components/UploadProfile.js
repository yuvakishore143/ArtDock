
import { Modal } from "@material-ui/core";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import './cssfiles/UploadProfile.css'



const UploadProfile = ({ open , toggle }) => {


    // const profileUploadHandler = (e)=>{
    //     e.preventDefault();
    //     const file = e.target[0].files[0];
    //     handleUploadProfile(file)
    // }

    // const handleUploadProfile=(file)=>{
            

    //          if(!file) return;

    //     const storageRef = ref(storage,`/profiles/${file.name}`)

    //     const uploadTask= uploadBytesResumable(storageRef,file);
    //     uploadTask.on(
    //          (error)=>alert(error.message),
    //          ()=>{
    //              getDownloadURL(uploadTask.snapshot.ref )
    //              .then((url)=> 
    //               addDoc(collection(db , 'profiles'),{
    //               imageUrl: url, 
    //           },
            
    //           ))
    //          }
    //     )    

    // }

    return ( 
      <Modal
        open={ open }
        onClose = { toggle }
        >
       <div className="upload_whole">
       <input className="upload_file" type='file'/>
       <button className="uploadProfile_btn">Upload</button>
       </div>
    
      
      </Modal>
     );
}
 
export default UploadProfile;