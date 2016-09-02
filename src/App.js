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
    urls: [],
    filter: 'all' // diff|same|all
  };

  // handlers
  updateUrl(index, e) {
    const { urls } = this.state;

    this.setState({
      urls: [
        ...urls.slice(0, index),
        {
          raw: e.target.value,
          parsed: url.parse(e.target.value, true)
        },
        ...urls.slice(index + 1)
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
  compareUrls(urls) {
    const fields = ['protocol', 'auth', 'hostname', 'port', 'pathname', 'query', 'hash'];
    const processedUrls = urls.map(url => _pick(url.parsed, fields));

    const diffFields = this.getDiffFields(...processedUrls, true);
    const queryDiffFields = this.getDiffFields(...processedUrls.map(url => url.query), true);

    console.log(...processedUrls);

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
    const { urls, filter } = this.state;

    if (urls !== prevState.urls) {
      this.setState(this.compareUrls(urls));
    }
  }

  componentDidMount() {
    const a = 'https://tw.yahoo.com/asdff?a=a&b=b';
    const b = 'https://tw.yahoo.com/asdff?b=b&a=a';

    this.setState({
      urls: [
        {
          raw: a,
          parsed: url.parse(a, true)
        },
        {
          raw: b,
          parsed: url.parse(b, true)
        }
      ]
    });
  }

  render() {
    const { urls, filter, isSame } = this.state;

    const messageProps = {
      isSame,
      currentFilter: filter,
      updateFilter: this.updateFilter.bind(this)
    };

    return (
      <div className="App">
        <h1 id="mtitle">URL Monster</h1>

        {urls.map((url, index) => {
          const urlBoxProps = {
            key: index,
            index,
            href: url.raw,
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
