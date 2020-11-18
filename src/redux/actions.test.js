import configureStore from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { recognizeVoice } from './slice';

jest.mock('../services/speechRecognition.js');

const mockStore = configureStore(getDefaultMiddleware());

test('recognizeVoice', async () => {
  const store = mockStore({});

  await store.dispatch(recognizeVoice());

  const actions = store.getActions();

  expect(actions).toEqual([
    {
      type: 'application/setSpeaking',
      payload: true,
    },
    {
      type: 'application/setSpokenSentence',
      payload: '',
    },
    {
      type: 'application/setSpeaking',
      payload: false,
    },
  ]);
});
