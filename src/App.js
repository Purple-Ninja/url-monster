import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 id="mtitle">URL Monster</h1>

        <div id="wrapper">
          <div>
            <div className="urlui" />
            <div className="box" />
            <input id="u1" type="text" className="url u1" placeholder="Input URL 1" />
          </div>
          <div className="actions" data-uid="1">
            <a className="cabs act-go-cr">Go (current)</a>
            <a className="cabs act-go-new">Go (new)</a>
            <a className="cabs act-clear">Clear</a>
          </div>
        </div>

        <div className="urlui">
          <div className="box">
            <input id="u2" type="text" className="url u2" placeholder="Input URL 2" />
          </div>
          <div className="actions" data-uid="2">
            <a className="cabs act-go-cr">Go (current)</a>
            <a className="cabs act-go-new">Go (new)</a>
            <a className="cabs act-clear">Clear</a>
          </div>
        </div>

        <div id="msgs">
          <div className="msg hidden cmp">
            <h3>Comparison Mode</h3>
            <div>
              The two URLs are 
              <span className="same hidden">THE SAME</span>
              <span className="diff">DIFFERENT</span>
              .
            </div>
            <div className="act">
              <a id="show-d" className="cab ckd">Show Differences</a>
              <a id="show-s" className="cab">Show Similarities</a>
              <a id="show-a" className="cab">Show All</a>
            </div>
          </div>
        </div>

        <div id="parsed" />
        <div className="cboth" />

        <div id="footer">
          URL Monster 1.0 &copy;  <a href="http://gadget.chienwen.net/">Handy Gadgets</a>
          | 
          <a href="http://medialize.github.io/URI.js/">URI.js</a> 
          |
          <a href="http://jquery.com/">jQuery</a>
        </div>
      </div>
    );
  }
}

export default App;
