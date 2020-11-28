import configureStore from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import {
  recognizeVoice,
  getNextQuestion,
} from './slice';

import MicState from '../enums/MicState';

jest.mock('../services/speechRecognitionService.js');
jest.mock('../services/promptService.js');

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
        type: 'application/setSpokenSentence',
        payload: '',
      },
      {
        type: 'application/setMicState',
        payload: MicState.SPEAKING,
      },
      {
        type: 'application/setMicState',
        payload: MicState.ON,
      },
      {
        type: 'application/setMicState',
        payload: MicState.ON,
      },
      {
        type: 'application/setMicState',
        payload: MicState.OFF,
      },
    ]);
  });

  test('getNextQuestion', async () => {
    await store.dispatch(getNextQuestion());

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
});
