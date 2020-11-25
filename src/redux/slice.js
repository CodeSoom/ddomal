import { createSlice } from '@reduxjs/toolkit';

import { recognize } from '../services/speechRecognition';
import { getNextPrompt } from '../services/prompt';

const { reducer, actions } = createSlice({
  name: 'application',
  initialState: {
    prompt: null,
    speakStatus: 'MIC_OFF',
    answers: [],
  },
  reducers: {
    setSpokenSentence(state, { payload: spokenSentence }) {
      return {
        ...state,
        spokenSentence,
      };
    },
    setSpeakStatus(state, { payload: speakStatus }) {
      return {
        ...state,
        speakStatus,
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
  },
});

export const {
  setSpokenSentence,
  setSpeakStatus,
  setPrompt,
  saveAnswer,
  clearAnswers,
} = actions;

export function recognizeVoice() {
  return async (dispatch) => {
    dispatch(setSpeakStatus('MIC_ON'));

    const sentence = await recognize();
    dispatch(setSpokenSentence(sentence));

    dispatch(setSpeakStatus('MIC_OFF'));
  };
}

export function getNext() {
  return (dispatch) => {
    const nextPrompt = getNextPrompt();

    dispatch(setPrompt(nextPrompt));
    dispatch(setSpokenSentence(null));
  };
}

export function initialize() {
  return (dispatch) => {
    dispatch(setPrompt(null));
    dispatch(setSpokenSentence(null));
    dispatch(clearAnswers());
    dispatch(setSpeakStatus('MIC_OFF'));
  };
}

export default reducer;
