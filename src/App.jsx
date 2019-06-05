import React from 'react';
import logo from './logo.svg';
import './App.css';

import Shop from './Shop';
import Cart from './Cart';
import Navigation from './Navigation';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  return (
   
    <BrowserRouter>
      <div className="mainbody">
       <Navigation/>
        <Switch>
         <Route path = "/products" component = {Shop}/>
         <Route path = "/cart" component = {Cart}/>
        </Switch> 
      </div>
    </BrowserRouter>
    
  );
}

export default App;
