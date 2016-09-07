import React, { Component } from 'react';
import URL from 'url';

import UrlBox from './components/UrlBox';
import Messages from './components/Messages';
import CompareBox from './components/CompareBox';
import Footer from './components/Footer';

import _pick from 'lodash/pick';
import _difference from 'lodash/difference';

import { connect } from 'react-redux'
import { updateUrl } from './ducks/urls';
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

  updateUrl(index, url) {
    this.modifingField = false;
    this.props.updateUrl(index, url);
  }

  updateField(field, isQuery, index) {
    return (e) => {
      e.preventDefault();
      const { value } = e.target;
      const { updateUrl, computed } = this.props;
      let parsedUrl = computed.parsedUrls[index];

      this.modifingField = true;
      
      // clean field if value is empty
      if (value === '') {
        delete (isQuery ? parsedUrl.query : parsedUrl)[field];
      } else {
        (isQuery ? parsedUrl.query : parsedUrl)[field] = value;
      }

      updateUrl(index, URL.format(parsedUrl));
    };
  }

  // life cycle methods
  componentWillReceiveProps(nextProps) {
    const {
      urls,
      updateFilter
    } = this.props;

    if (urls !== nextProps.urls) {
      if (!this.modifingField) {
        updateFilter(nextProps.computed.isSame ? 'all' : 'diff');
      } else if (nextProps.computed.isSame) {
        updateFilter('all');
      }
    }
  }

  componentDidMount() {
    this.props.updateUrl(0, decodeURIComponent(location.hash.substr(4)));
  }

  render() {
    const {
      urls,
      filter,
      computed: {
        isSame,
        parsedUrls,
        diffing,
        fields,
        queryFields
      },
      updateFilter,
    } = this.props;
    
    const messageProps = {
      isSame,
      currentFilter: filter,
      updateFilter
    };

    return (
      <div className="App">
        <h1 id="mtitle">URL Monster</h1>

        {urls.map((url, index) => {
          const urlBoxProps = {
            key: index,
            index,
            url,
            updateUrl: this.updateUrl.bind(this)
          };
          return <UrlBox {...urlBoxProps} />
        })}

        {diffing ? <Messages {...messageProps} /> : null}

        <div id="parsed">
          {fields.filter(field => field !== 'query').map((field, index) => {
            const boxProps = {
              key: field,
              field,
              parsedUrls,
              diffing,
              updateField: this.updateField.bind(this, field)
            };
            return <CompareBox {...boxProps} />;
          })}
          {queryFields.map((field, index) => {
            const boxProps = {
              key: `query.${field}`,
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
  const { urls, filter } = state;
  const compareResult = compareUrls(urls);
  const { diffFields, queryDiffFields, queryAllFields } = compareResult;
  const allFields = ['protocol', 'auth', 'hostname', 'port', 'pathname', 'query', 'hash'];
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

  return {
    urls,
    filter,
    computed: {
      ...compareResult,
      parsedUrls: urls.map(url => _pick(URL.parse(url, true), allFields)),
      diffing: (urls[1] !== ''),
      fields,
      queryFields
    }
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateUrl: (index, url) => {
      dispatch(updateUrl(index, url))
    },
    updateFilter: (newFilter) => {
      dispatch(updateFilter(newFilter));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
