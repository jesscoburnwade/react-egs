import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginApp from './LoginApp';
import MessageApp from './MessageApp'
import {BrowserRouter as Router, Switch, Link,Route} from 'react-router-dom';
var url = require('url');


export default class Message extends Component {
    constructor(props) {
        super(props);

        this.timesTag = this.timesTag.bind(this);
    }

    times() {
        
    }
    
  render() {
    var timesTag = [];

    for (let i = 1; i<100; i++) {
        timesTag.push(<a href = {`http://localhost:3000/times/range?T=${i}`}>{i}</a>)
    }
    return (
        <Router>
            <div>
                {timesTag}
            </div>
            <Switch>
                <Route exact path = '/times/range?T=' render = {
                    function() {
                        let urlParams = new URLSearchParams(window.location.search);
                        let T = urlParams.get('T');
                        //let T = url.parse(req.url, true).query.T;

                        var rangeTag = [];

                        for(let i = 1; i<100; i++) {
                            rangeTag.push(<a href = {`http://localhost:3000/times/range?T=${T}&S=${i}`}>{i}</a>)
                        }
                        return rangeTag;
                    }
                }>
                    
                </Route>
            </Switch>
        </Router>
    );
  }
}

