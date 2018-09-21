import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginApp from './LoginApp';
import MessageApp from './MessageApp'

import {BrowserRouter as Router, Switch, Link,Route} from 'react-router-dom';
export default class Login extends Component {

    constructor() {
        super();
        this.hi = this.hi.bind(this);
    }
    hi() {
        alert('hello there');
    }
  render() {
    return (
        <div>This is the login thing<br/>
        <form>
            Name:<input type = "text"/><br/>
            Password:<input type = "text"/><br/>
            <input value = "Submit" type = "button" onClick = {this.hi}/>
        </form>
        </div>
    );
  }
}

