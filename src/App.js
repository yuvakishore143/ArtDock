

import {BrowserRouter as  Router, Routes ,Route } from 'react-router-dom';
import './App.css';
import Home_posts from './components/Home_posts';
import Login from './components/Login';
import Main from './components/Main';
import Profile from './components/Profile'
import Home_blogs from './components/Home_blogs';
import Register from './components/Register';
import Article from './components/Article';

function App() {
  return (
    <div className="App">
    
       <Router>
         <Routes>
            <Route exact path='/' element={ <Login/>}></Route>
            <Route path='/Main'element={<Main/>}></Route>
            <Route path='/Home_posts' element={ <Home_posts/> }></Route>
            <Route path='/Home_blogs' element={ <Home_blogs/>}></Route>
            <Route path='/Profile' element={ <Profile/>}></Route>
            <Route path='/Register'element={<Register/>}></Route>
            <Route path='/Article'element={<Article/>}></Route>
            <Route exact path="*" element={<h1>page not found</h1>}>
            
              </Route>
         </Routes>
       </Router>
       
    </div>
  );
}

export default App;
