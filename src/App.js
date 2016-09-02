import React, { Component } from 'react';
import logo from './logo.svg';
import 'normalize.css';
import './App.css';

import UrlBox from './components/UrlBox';
import Messages from './components/Messages';
import Footer from './components/Footer';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 id="mtitle">URL Monster</h1>

        <div id="wrapper">
          <div>
            <UrlBox />
            <UrlBox />
          </div>
          <Messages />
        </div>

        <div id="parsed" />
        <div className="cboth" />

        <Footer />
      </div>
    );
  }
}

export default App;
