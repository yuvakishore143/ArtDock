

import { Routes ,Route, useNavigate } from 'react-router-dom';
import Home_posts from './components/Home_posts';
import Login from './components/Login';
import Main from './components/Main';
import Profile from './components/Profile'
import Game from './components/Game';
import Register from './components/Register';
import Article from './components/Article';
import UploadPosts from './components/UploadPosts';
import Comments from './partials/Posts/Comments';
import { auth } from './firebase';
import { useEffect, useState } from 'react';
import NotLoginErrorPage from './components/NotLoginErrorPage';
import Myposts from './partials/Posts/Myposts';
import UploadArticles from './partials/Article/UploadArticle';
import SingleArticle from './partials/Article/SingleArticle';
import SinglePost from './partials/Posts/SinglePost'


function App() {

  const [ loading , setLoading ]= useState(false)
  const [user,setUser]=useState('')
  
  useEffect(()=>{
      setLoading(true)
      auth.onAuthStateChanged((authUser)=>{
            setUser(authUser)
            setLoading(false)
    })
  },[])
  
  const navigator = useNavigate()

 return(
   <>


   {}
   {
    
       user ?   
       <>
       
       {loading && <img src='45124d126d0f0b6d8f5c4d635d466246.gif'></img>}
               <Routes>
                    {/* <Route exact path='/' element={<h1>HELLO WORLD</h1> }></Route>
                    <Route path='/Register'element={<h1 style={{color:'red'}}>you are already logged in </h1>}></Route> */}
                  <Route path='/'element={<Main/>}></Route>
                  <Route path='/Main'element={<Main/>}></Route>
                  <Route path='/Home_posts/' element={ <Home_posts/> }></Route>
                  <Route path='/Game' element={ <Game/>}></Route>
                  <Route path='/Profile' element={ <Profile/>}></Route>
                  <Route path='/Article'element={<Article/>}></Route>
                  <Route path='/UploadPosts'element={<UploadPosts/>}></Route>
                  <Route path='/Comments'element={<Comments/>}></Route>
                  <Route exact path="*" element={<h1>page not found</h1>}></Route>
                  <Route exact path="/Myposts" element={<Myposts/>}></Route>
                  <Route exact path="/UploadArticle" element={<UploadArticles/>}></Route>
                  <Route exact path="/Article/:Id" element={<SingleArticle/>}></Route>
                  <Route exact path="/posts/:Id" element={<SinglePost />}></Route>
               </Routes></>      
      
      :
           <>
               <Routes>
                    <Route exact path='/' element={ <Login/>}></Route>
                    <Route path='/Register'element={<Register/>}></Route>
                    <Route exact path="*" element={<h1>page not found</h1>}></Route>
                    <Route path='/Main'element={<NotLoginErrorPage />}></Route>
                    <Route path='/Home_posts' element={ <NotLoginErrorPage />}></Route>
                    <Route path='/Game' element={ <NotLoginErrorPage />  }></Route>
                    <Route path='/Profile' element={ <NotLoginErrorPage />}></Route>
                    <Route path='/Article'element={<NotLoginErrorPage /> }></Route>
                    <Route path='/UploadPosts'element={<NotLoginErrorPage />}></Route>
                    <Route path='/Comments'element={<NotLoginErrorPage />}></Route>
                    <Route path='/Myposts'element={<NotLoginErrorPage />}></Route>
                    <Route exact path="/UploadArticle" element={<NotLoginErrorPage/>}></Route>
                    <Route exact path="/SingleArticle" element={<NotLoginErrorPage/>}></Route>
               </Routes>
           </>
      }
   </>

 )
}

export default App;
