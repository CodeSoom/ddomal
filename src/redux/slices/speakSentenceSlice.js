import { createAction, createSlice } from '@reduxjs/toolkit';

import MicState from '../../enums/MicState';

const initialState = {
  prompt: null,
  micState: MicState.OFF,
};

const { reducer, actions } = createSlice({
  name: 'speakSentence',
  initialState,
  reducers: {
    setSpokenSentence(state, { payload: spokenSentence }) {
      return {
        ...state,
        spokenSentence,
      };
    },
    setPrompt(state, { payload: prompt }) {
      return {
        ...state,
        prompt,
      };
    },
    setMicState(state, { payload: micState }) {
      return {
        ...state,
        micState,
      };
    },
  },
});

export const {
  setSpokenSentence,
  setMicState,
  setPrompt,
} = actions;

export const recognizeSpeech = createAction('speakSentence/recognizeSpeech');
export const getNextQuestion = createAction('speakSentence/getNextQuestion');
export const saveAnswer = createAction('speakSentence/saveAnswer');

export default reducer;
