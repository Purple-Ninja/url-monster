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
import _difference from 'lodash/difference';

import 'normalize.css';
import './App.css';

class App extends Component {
  static defaultProps = {
    urls: ['', ''],
    filter: '',
    computed: {}
  };

  constructor(props) {
    super(props);
    const {
      urls,
      filter
    } = props;

    this.state = {
      urls,
      filter,
      computed: this.compareUrls(urls)
    };
  }

  // handlers
  updateUrl(index, e) {
    const { urls } = this.state;
    const newUrls = [
      ...urls.slice(0, index),
      e.target.value,
      ...urls.slice(index + 1)
    ];

    let newState = {
      urls: newUrls,
      computed: this.compareUrls(newUrls)
    };

    if (this.paste || newState.computed.isSame) {
      newState.filter = newState.computed.isSame ? 'all' : 'diff'
      delete this.paste;
    }

    this.setState(newState);
  }

  handleUrlPaste() {
    this.paste = true;
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

      // clean field if value is empty
      if (value === '') {
        delete (isQuery ? parsedUrl.query : parsedUrl)[field];
      } else {
        (isQuery ? parsedUrl.query : parsedUrl)[field] = value;
      }

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
      queryDiffFields,
      queryAllFields: _union(Object.keys(processedUrls[0].query || {}), Object.keys(processedUrls[1].query || {}))
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
    this.updateUrl(0, {
      target: {
        value: decodeURIComponent(location.hash.substr(4))
      }
    });
  }

  render() {
    const {
      urls,
      filter,
      computed: {
        isSame,
        diffFields = [],
        queryDiffFields = [],
        queryAllFields = []
      }
    } = this.state;

    const allFields = ['protocol', 'auth', 'hostname', 'port', 'pathname', 'hash'];
    
    const parsedUrls = urls.map(url => URL.parse(url, true));
    const diffing = (urls[1] !== '');

    const messageProps = {
      isSame,
      currentFilter: filter,
      updateFilter: this.updateFilter.bind(this)
    };

    let fields;
    let queryFields;

    if (filter === 'diff') {
      fields = diffFields;
      queryFields = queryDiffFields;
    } else if (filter === 'same') {
      fields = _difference(allFields, diffFields);
      queryFields = _difference(queryAllFields, queryDiffFields);
    } else {
      fields = allFields;
      queryFields = queryAllFields;
    }

    return (
      <div className="App">
        <h1 id="mtitle">URL Monster</h1>

        {urls.map((url, index) => {
          const urlBoxProps = {
            key: index,
            index,
            url,
            updateUrl: this.updateUrl.bind(this, index),
            clearUrl: this.clearUrl.bind(this, index),
            handleUrlPaste: this.handleUrlPaste.bind(this)
          };
          return <UrlBox {...urlBoxProps} />
        })}

        {diffing ? <Messages {...messageProps} /> : null}

        <div id="parsed">
          {fields.filter(field => field !== 'query').map((field, index) => {
            const boxProps = {
              key: field + index,
              field,
              parsedUrls,
              diffing,
              updateField: this.updateField.bind(this, field)
            };
            return <CompareBox {...boxProps} />;
          })}
          {queryFields.map((field, index) => {
            const boxProps = {
              key: field + index + 'q',
              isQuery: true,
              field,
              parsedUrls,
              diffing,
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
