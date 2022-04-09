

import {BrowserRouter as  Router,Switch,Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Main from './components/Main';
import Header from "./partials/Header"


function App() {
  return (
    <div className="App">
     < Header/>
       <Router>
         <Switch>
            <Route exact path='/'><Main/></Route>
            <Route path='/Login'><Login/></Route>
            <Route path='/Home'><Home/></Route>
         </Switch>
          
        
       </Router>
       
    </div>
  );
}

export default App;
