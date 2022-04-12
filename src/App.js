

import {BrowserRouter as  Router,Switch,Route } from 'react-router-dom';
import './App.css';
import Home_posts from './components/Home_posts';
import Login from './components/Login';
import Main from './components/Main';
import Profile from './components/Profile'
import Home_blogs from './components/Home_blogs';

function App() {
  return (
    <div className="App">
    
       <Router>
         <Switch>
            <Route exact path='/'><Main/></Route>
            <Route path='/Login'><Login/></Route>
            <Route path='/Home_posts'><Home_posts/></Route>
            <Route path='/Home_blogs'><Home_blogs/></Route>
            <Route path='/Profile'><Profile/></Route>
            {/* <Route exact path='*'>
              <h1 >page not found</h1>
              {
                <>
                 { alert('page not found')}
                </>
              }

            </Route> */}
         </Switch>
          
        
       </Router>
       
    </div>
  );
}

export default App;
