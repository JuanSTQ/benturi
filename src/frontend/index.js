import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import App from './routes/App';
import thunk from 'redux-thunk';
import { Router, Switch} from 'react-router'
import {createBrowserHistory } from 'history'
const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = window.__PRELOADED_STATE__;

const store = createStore(reducer, initialState, composeEnhacers(applyMiddleware(thunk)));
delete window.__PRELOADED_STATE__
const history = createBrowserHistory();
ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
