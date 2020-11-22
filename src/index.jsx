import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import store from './redux/store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
