import configureStore from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { getNext, initialize, recognizeVoice } from './slice';

jest.mock('../services/speechRecognition.js');
jest.mock('../services/prompt.js');

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

  test('getNext', async () => {
    await store.dispatch(getNext());

    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: 'application/setPrompt',
        payload: '',
      },
      {
        type: 'application/setSpokenSentence',
        payload: null,
      },
    ]);
  });

  test('initialize', async () => {
    await store.dispatch(initialize());

    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: 'application/setPrompt',
        payload: null,
      },
      {
        type: 'application/setSpokenSentence',
        payload: null,
      },
      {
        type: 'application/clearAnswers',
      },
      {
        type: 'application/setSpeaking',
        payload: false,
      },
    ]);
  });
});
