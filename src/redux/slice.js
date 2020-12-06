import { createAction, createSlice } from '@reduxjs/toolkit';

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
    addAnswer(state, { payload: answer }) {
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
    setYesNoQuestion(state, { payload: yesNoQuestion }) {
      return {
        ...state,
        yesNoQuestion,
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
  addAnswer,
  clearAnswers,
  setYesNoQuestion,
  initializeState,
} = actions;

export const recognizeSpeech = createAction('recognizeSpeech');
export const getNextQuestion = createAction('getNextQuestion');
export const saveAnswer = createAction('saveAnswer');

export default reducer;
