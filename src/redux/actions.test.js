import configureStore from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { changePrompt, recognizeVoice } from './slice';

jest.mock('../services/speechRecognition.js');

const middleWares = getDefaultMiddleware();
const mockStore = configureStore(middleWares);

describe('actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('recognizeVoice', async () => {
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

  test('change prompt', async () => {
    await store.dispatch(changePrompt('마늘'));

    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: 'application/setPrompt',
        payload: '마늘',
      },
      {
        type: 'application/setSpokenSentence',
        payload: null,
      },
    ]);
  });
});
