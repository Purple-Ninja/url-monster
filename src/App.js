import React, { Component } from 'react';
import logo from './logo.svg';
import 'normalize.css';
import './App.css';

import UrlBox from './components/UrlBox';
import Messages from './components/Messages';
import CompareBox from './components/CompareBox';
import Footer from './components/Footer';

import url from 'url';

class App extends Component {
  state = {
    parsedUrls: [],
    filter: 'all' // diff|same|all
  };

  // handlers
  updateUrl(index, e) {
    const { parsedUrls } = this.state;

    this.setState({
      parsedUrls: [
        ...parsedUrls.slice(0, index),
        url.parse(e.target.value, true),
        ...parsedUrls.slice(index + 1)
      ]
    });
  }

  clearUrl(index, e) {
    e.preventDefault()
    this.updateUrl(index, {
      target: {
        value: ''
      }
    });
  }

  updateFilter(filter, e) {
    e.preventDefault();
    this.setState({
      filter
    });
  }

  // helpers
  compareUrls(parsedUrls) {
    return true;
  }

  // life cycle methods
  componentDidMount() {
    this.setState({
      parsedUrls: [
        url.parse('http://localhost:3000/tw-live/?lang=zh-Hant-TW&region=tw&_dangerouslyStopThrowingReuseError=1', true),
        url.parse('https://tw.yahoo.com/', true)
      ]
    });
  }

  render() {
    const { parsedUrls, filter } = this.state;
    const isSame = this.compareUrls(parsedUrls);

    const messageProps = {
      isSame,
      currentFilter: filter,
      updateFilter: this.updateFilter.bind(this)
    };

    return (
      <div className="App">
        <h1 id="mtitle">URL Monster</h1>

        {parsedUrls.map((parsedUrl, index) => {
          const urlBoxProps = {
            key: index,
            index,
            parsedUrl,
            updateUrl: this.updateUrl.bind(this, index),
            clearUrl: this.clearUrl.bind(this, index)
          };
          return <UrlBox {...urlBoxProps} />
        })}

        <Messages {...messageProps} />

        <div id="parsed">
          <CompareBox />
        </div>

        <div className="cboth" />
        <Footer />
      </div>
    );
  }
}

export default App;
