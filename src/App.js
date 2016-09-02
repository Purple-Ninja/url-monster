import React, { Component } from 'react';
import logo from './logo.svg';
import 'normalize.css';
import './App.css';

import UrlBox from './components/UrlBox';
import Messages from './components/Messages';
import CompareBox from './components/CompareBox';
import Footer from './components/Footer';

import _isEqual from 'lodash/isEqual';
import _pick from 'lodash/pick';
import _reduce from 'lodash/reduce';
import _union from 'lodash/union';

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
    const fields = ['protocol', 'auth', 'hostname', 'port', 'pathname', 'query', 'hash'];
    const processedUrls = parsedUrls.map(url => _pick(url, fields));

    const diffFields = this.getDiffFields(...processedUrls, true);
    const queryDiffFields = this.getDiffFields(...processedUrls.map(url => url.query), true);

    return {
      isSame: _isEqual(...processedUrls),
      diffFields,
      queryDiffFields
    };
  }

  getDiffFields(a, b, twoSides) {
    if (!!twoSides) {
      return _union(this.getDiffFields(a, b), this.getDiffFields(b, a));
    }

    return _reduce(a, (result, value, key) => {
      return _isEqual(value, b[key]) ? result : result.concat(key);
    }, []);
  }

  // life cycle methods
  componentDidUpdate(prevProps, prevState) {
    const { parsedUrls, filter } = this.state;

    if (parsedUrls !== prevState.parsedUrls) {
      this.setState(this.compareUrls(parsedUrls));
    }
  }

  componentDidMount() {
    this.setState({
      parsedUrls: [
        url.parse('https://tw.yahoo.com/asdff?a=a&b=b', true),
        url.parse('https://foo:bar@tw.yahoo.com:300/asdff?b=b&a=a', true)
      ]
    });
  }

  render() {
    const { parsedUrls, filter, isSame } = this.state;

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
