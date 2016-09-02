import React, { Component } from 'react';
import URL from 'url';

import UrlBox from './components/UrlBox';
import Messages from './components/Messages';
import CompareBox from './components/CompareBox';
import Footer from './components/Footer';

import _isEqual from 'lodash/isEqual';
import _pick from 'lodash/pick';
import _reduce from 'lodash/reduce';
import _union from 'lodash/union';

import 'normalize.css';
import './App.css';

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
        e.target.value,
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

  updateField(field, isQuery, index) {
    return (e) => {
      const { value } = e.target;
      const fields = ['protocol', 'auth', 'hostname', 'port', 'pathname', 'query', 'hash'];
      let parsedUrl = _pick(URL.parse(this.state.urls[index], true), fields);

      (isQuery ? parsedUrl.query : parsedUrl)[field] = value;

      this.updateUrl(index, {
        target: {
          value: URL.format(parsedUrl)
        }
      });
    };
  }

  // helpers
  compareUrls(urls) {
    const fields = ['protocol', 'auth', 'hostname', 'port', 'pathname', 'query', 'hash'];
    const processedUrls = urls.map(url => _pick(URL.parse(url, true), fields));

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
  componentDidMount() {
    this.setState({
      urls: [
        'https://tw.yahoo.com/asdff?a=a&b=b',
        'http://user:pass@host.com:8080/p/a/t/h?query=string'
      ]
    });
  }

  render() {
    const { urls, filter } = this.state;

    const {
      isSame,
      diffFields,
      queryDiffFields
    } = this.compareUrls(urls);

    const parsedUrls = urls.map(url => URL.parse(url, true));

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
            url,
            updateUrl: this.updateUrl.bind(this, index),
            clearUrl: this.clearUrl.bind(this, index)
          };
          return <UrlBox {...urlBoxProps} />
        })}

        <Messages {...messageProps} />

        <div id="parsed">
          {diffFields.filter(field => field !== 'query').map((field, index) => {
            const boxProps = {
              key: field + index,
              field,
              parsedUrls,
              updateField: this.updateField.bind(this, field)
            };
            return <CompareBox {...boxProps} />;
          })}
          {queryDiffFields.map((field, index) => {
            const boxProps = {
              key: field + index + 'q',
              isQuery: true,
              field,
              parsedUrls,
              updateField: this.updateField.bind(this, field)
            };
            return <CompareBox {...boxProps} />;
          })}
        </div>

        <div className="cboth" />
        <Footer />
      </div>
    );
  }
}

export default App;
