import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import App from './routes/App';
import thunk from 'redux-thunk';
const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = window.__PRELOADED_STATE__;
const store = createStore(reducer, initialState, composeEnhacers(applyMiddleware(thunk)));
delete window.__PRELOADED_STATE__

ReactDOM.hydrate(
  <Provider store={store}>
    
    <App />
  </Provider>,
  document.getElementById('app')
);
