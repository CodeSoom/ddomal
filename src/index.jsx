import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { HashRouter } from 'react-router-dom';

import store from './redux/store';

import App from './App';

console.log('test');

ReactDOM.render(
  <Provider store={store}>
    <HashRouter basename="/">
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('app'),
);
