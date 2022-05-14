import { useEffect, useLayoutEffect, useState } from "react";
import styled from 'styled-components'
import { ChromePicker } from "react-color";
import '../partials/UploadArticle.css'
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";


const UploadArticles = () => {
         
    const [title , setTitle ]=useState("")
    const [content, setContent] = useState('')
    const [ titlecolor , setTitleColor ] = useState()
    const [ openColorPicker , setOpenColorPicker] = useState(false)
    const [ username , setusername ] = useState('')

    const Navigate = useNavigate()

    useLayoutEffect(()=>{
        document.body.style.backgroundColor = 'white';
      
      })

     useEffect(()=>{
       auth.onAuthStateChanged(authuser=>{
         setusername(authuser.displayName)
       })
     })

     
     const handleSubmit =()=>{
       addDoc(collection(db,'Article'),{
         title:title,
         content:content,
         writter:username,
         timeStamp: firebase .firestore.FieldValue.serverTimestamp()
       })
       setContent('')
       setTitle('')
       Navigate('/Article')
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
          <input type="file" />
      </form>
          <Div color={titlecolor}>{ title ? title :<strong> title</strong> }</Div>
          <div>{content ? content : 'type the article'}</div>


      <button type="submit" onClick={handleSubmit}>Post</button>
      </>
     );



    
}

const Div = styled.div`
color:${props => props.color}
`
export default UploadArticles;