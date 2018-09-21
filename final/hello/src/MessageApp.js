import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginApp from './LoginApp';
import MessageApp from './MessageApp'

import {BrowserRouter as Router, Switch, Link,Route} from 'react-router-dom';
export default class Message extends Component {
  render() {
    return (
        <div>This is the message thing</div>
    );
  }
}

