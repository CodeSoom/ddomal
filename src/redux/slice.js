import { createSlice } from '@reduxjs/toolkit';

import MicState from '../enums/MicState';

const initialState = {
  prompt: null,
  micState: MicState.OFF,
  answers: [],
};

const { reducer, actions } = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setSpokenSentence(state, { payload: spokenSentence }) {
      return {
        ...state,
        spokenSentence,
      };
    },
    setMicState(state, { payload: micState }) {
      return {
        ...state,
        micState,
      };
    },
    setPrompt(state, { payload: prompt }) {
      return {
        ...state,
        prompt,
      };
    },
    saveAnswer(state, { payload: answer }) {
      const { answers } = state;

      return {
        ...state,
        answers: [
          ...answers,
          answer,
        ],
      };
    },
    clearAnswers(state) {
      return {
        ...state,
        answers: [],
      };
    },
    initializeState() {
      return initialState;
    },
  },
});

export const {
  setSpokenSentence,
  setMicState,
  setPrompt,
  saveAnswer,
  clearAnswers,
  initializeState,
} = actions;

export default reducer;
