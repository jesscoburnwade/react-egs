import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginApp from './LoginApp';
import MessageApp from './MessageApp'

import {BrowserRouter as Router, Switch, Link,Route} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      /// <Rounter> the component we have imported on line 4
      <Router>
      <div>
        <h2> Shafeeq:</h2>
        <ul>
          // link is the component we have import ted on line 4
          // to is the property of the link element
          <li> <Link to={'/abc'}> Home </Link> </li>
          <li> <Link to={'/login'}> Login </Link> </li>
          <li> <Link to={'/login/'}> Login2 </Link> </li>
          <li> <Link to={'/times'}> Timestables </Link> </li>
        </ul>

        <Switch>
          // we imported the Switch component on line 4
          // we have imported the Route component in line 4
          // path and component are the properties of Route component
          <Route exact path='/abc' render={
            function(){
              return (<h1> hello </h1>)
            }
          } />
          // if we donot use exact "/" it will will be called for all 
          // ... /login and /login/ as exact
          // .... use strict to differenenciate 
          <Route  strict exact path='/login' component={LoginApp} />
          <Route  strict exact path='/login/' render={
            function(){
              return (<h1> Login 2 </h1>)
            }
          } />       
        </Switch> 

      </div>
      </Router>
    );
  }
}

export default App;
