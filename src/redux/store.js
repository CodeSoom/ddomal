import { configureStore } from '@reduxjs/toolkit';

import { createEpicMiddleware } from 'redux-observable';

import rootEpic from './epics/index';

import reducer from './slice';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer,
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);

export default store;
