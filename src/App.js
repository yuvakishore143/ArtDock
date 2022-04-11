

import {BrowserRouter as  Router,Switch,Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Main from './components/Main';
import Header from "./partials/Header"
import Profile from './components/Profile'

function App() {
  return (
    <div className="App">
    
       <Router>
         <Switch>
            <Route exact path='/'><Main/></Route>
            <Route path='/Login'><Login/></Route>
            <Route path='/Home'><Home/></Route>
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
