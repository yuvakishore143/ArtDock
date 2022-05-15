import { useEffect, useLayoutEffect, useState } from "react";
import styled from 'styled-components'
import { ChromePicker } from "react-color";
import '../Article/UploadArticle.css'
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { SketchFields } from "react-color/lib/components/sketch/SketchFields";



const UploadArticles = () => {
         
    const [title , setTitle ]=useState("")
    const [content, setContent] = useState('')
    const [ titlecolor , setTitleColor ] = useState('black')
    const [ openColorPicker , setOpenColorPicker] = useState(false)
    const [ username , setusername ] = useState('')
    const [ img , setImg ] = useState('')
    const [ loading ,setLoading ] =useState(false)

    const Navigate = useNavigate()

    useLayoutEffect(()=>{
        document.body.style.backgroundColor = 'white';
      
      })

     useEffect(()=>{
       auth.onAuthStateChanged(authuser=>{
         setusername(authuser.displayName)
       })
     })

          // const uploadfile = ()=>{
          //   const image = img
          //   handleSubmit(image)
          // }
     
     const handleSubmit =()=>{

          setLoading(true)
         
          if(img === null) {return}else{
        
         const imgRef =  ref(storage,`CoverPhotos/${img.name}`)
         const uploadTask = uploadBytesResumable(imgRef ,img)
          

               uploadTask.on('state_changed',()=>{
               getDownloadURL(uploadTask.snapshot.ref)
               .then(url =>{

                  addDoc(collection(db,'Article'),{
                    title:title,
                    content:content,
                    writter:username,
                    timeStamp: firebase .firestore.FieldValue.serverTimestamp(),
                    titleColor:titlecolor,
                    ImageUrl :url
                  })
                  setLoading(false)
                  setContent('')
                  setTitle('')
                  Navigate('/Article')

               })
          })
        } //else end 
     }
       

    return ( 
      <>
      
      
      <form>
          <input type="text" onChange={(e)=>setTitle(e.target.value)}  placeholder="type the title" className="titlebox" style={{
                                                                                                           
                                                                                                           }} />
          <img className="titleColorpickerimg"  onClick={(e)=>{ e.preventDefault()
                                                               setOpenColorPicker(!openColorPicker)}} src='chromatic-removebg-preview.png'></img>                                                                         
          { openColorPicker &&  <ChromePicker color={titlecolor} onChange={(updatedColor)=>setTitleColor(updatedColor.hex)} className="titlecolorpicker" ></ChromePicker> }
          <textarea className="contentbox" onChange={(e)=>setContent(e.target.value)} placeholder="content on the article" />
          <input type="file" onChange={(e)=>setImg(e.target.files[0])} />
      </form>
          <Div color={titlecolor}>{ title ? title :<strong> title</strong> }</Div>

          {
              loading && <h1 style={{color:'white',position:"absolute",top:"35%",left:"40%"}}><img style={{width:'300px'}} src="45124d126d0f0b6d8f5c4d635d4662-unscreen.gif"></img></h1>
         }
      <button type="submit" onClick={handleSubmit}>Post</button>
      </>
     );



    
}

const Div = styled.div`
color:${props => props.color}
`
export default UploadArticles;





