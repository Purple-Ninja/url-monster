import React, { Component } from 'react';
import URL from 'url';

import UrlBox from './components/UrlBox';
import Messages from './components/Messages';
import CompareBox from './components/CompareBox';
import Footer from './components/Footer';

import _pick from 'lodash/pick';
import _difference from 'lodash/difference';

import { connect } from 'react-redux'
import { updateFilter } from './ducks/filter';

import { compareUrls } from './lib/urlHelper';

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
    } = props;

    this.state = {
      urls,
      computed: compareUrls(urls)
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
      computed: compareUrls(newUrls)
    };

    if (this.paste || newState.computed.isSame) {
      this.props.updateFilter(newState.computed.isSame ? 'all' : 'diff'); // TODO: move this logic 
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
      computed: {
        isSame,
        diffFields = [],
        queryDiffFields = [],
        queryAllFields = []
      }
    } = this.state;

    const {
      filter,
      updateFilter
    } = this.props;

    const allFields = ['protocol', 'auth', 'hostname', 'port', 'pathname', 'hash'];
    
    const parsedUrls = urls.map(url => URL.parse(url, true));
    const diffing = (urls[1] !== '');

    const messageProps = {
      isSame,
      currentFilter: filter,
      updateFilter
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

const mapStateToProps = (state, ownProps) => {
  return {
    filter: state.filter
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateFilter: (newFilter) => {
      dispatch(updateFilter(newFilter));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
