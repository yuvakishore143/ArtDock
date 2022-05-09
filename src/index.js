import React, { StrictMode } from 'react';
import './index.css';
import  ReactDOM  from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';



ReactDOM.render(
  <StrictMode>

<BrowserRouter>
  <App/>
</BrowserRouter>

  </StrictMode>,
 
  document.getElementById('root')
);


reportWebVitals();


// 3bb71318b723476c8a62782662bd9d38