import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import * as reducers from './ducks/index';
import App from './App';
import './index.css';

const initialState = {
  urls: ['https://tw.yahoo.com', ''],
  filter: 'diff'
};

const rootReducer = combineReducers(reducers);

let store = createStore(rootReducer,
  initialState,
  window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
