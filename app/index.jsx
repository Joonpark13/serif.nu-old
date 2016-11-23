import 'babel-polyfill'; // http://redux.js.org/docs/advanced/AsyncActions.html#note-on-fetch

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './components/App.jsx';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
