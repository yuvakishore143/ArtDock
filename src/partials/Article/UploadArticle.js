import { useEffect, useState } from "react";
import styled from 'styled-components'
import { ChromePicker } from "react-color";
import '../Article/UploadArticle.css'
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";




const UploadArticles = () => {
         
    const [title , setTitle ]=useState("")
    const [content, setContent] = useState('')
    const [ titlecolor , setTitleColor ] = useState('black')
    const [ openColorPicker , setOpenColorPicker] = useState(false)
    const [ username , setusername ] = useState('')
    const [ img , setImg ] = useState('')
    const [ loading ,setLoading ] =useState(false)
    



    const Navigate = useNavigate()



     useEffect(()=>{
       auth.onAuthStateChanged(authuser=>{
         setusername(authuser.displayName)
       })
     })

     const handleSubmit =()=>{

          
          if( title === '' ){
            alert('title is missing')
                  }else{
                    if(content === ''){
                      alert('content  is missing')
                          }else{
                            if(img === ''){
                              alert('cover photo  is missing')
                                    }else{
                                      setLoading(true)
                                            if(img === null) {return} else{
                                          
                                          const imgRef =  ref(storage,`CoverPhotos/${img.name}`)
                                          const uploadTask = uploadBytesResumable(imgRef ,img)
                                            
                                  
                                                uploadTask.on('state_changed',()=>{
                                                getDownloadURL(uploadTask.snapshot.ref)
                                                .then(url =>{
                                  
                                                    addDoc(collection(db,'Article'),{
                                                      title:title,
                                                      content:content,
                                                      writter:username,
                                                      timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
                                                      titleColor:titlecolor,
                                                      ImageUrl :url
                                                    })
                                                    setLoading(false)
                                                    setContent('')
                                                    setTitle('')
                                                    Navigate('/Article')
                                  
                                                })
                                            })
                                          } 
                                  }
                      }
                    }
           
     }
       

    return ( 
      <>

      <form>
          <input type="text" onChange={(e)=>setTitle(e.target.value)}  placeholder="type the title" className="titlebox"  />
                                                                                                      
                                                                                                           
          <img className="titleColorpickerimg"  onClick={(e)=>{ e.preventDefault()
                                                               setOpenColorPicker(!openColorPicker)}} src='chromatic-removebg-preview.png' alt="colorpicker"></img>                                                                         
          { openColorPicker &&  <ChromePicker color={titlecolor} onChange={(updatedColor)=>setTitleColor(updatedColor.hex)} className="titlecolorpicker" ></ChromePicker> }
          <textarea className="contentbox" onChange={(e)=>setContent(e.target.value)} placeholder="content on the article" />
          <div className="selcoverphoto">Select Cover photo:</div>
          <input type="file" onChange={(e)=>{
                                                  setImg(e.target.files[0])
                                                  
                                            }} className="coverimg" />
      </form>
         
          <Div color={titlecolor} className='titlepreview'>{ title ? title :<strong> title</strong> }</Div>

          {
              loading && <h1 style={{color:'white',position:"absolute",top:"35%",left:"40%"}}><img style={{width:'300px'}} src="45124d126d0f0b6d8f5c4d635d4662-unscreen.gif" alt="loading.."></img></h1>
         }

      <button type="submit" onClick={handleSubmit} className="postBtn">Post</button>
      </>
     );



    
}

const Div = styled.div`
color:${props => props.color}
`
export default UploadArticles;





