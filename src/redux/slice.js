import { createSlice } from '@reduxjs/toolkit';

import { recognize } from '../services/speechRecognition';
import { getNextPrompt } from '../services/prompt';

const { reducer, actions } = createSlice({
  name: 'application',
  initialState: {
    prompt: null,
    speaking: false,
    answers: [],
  },
  reducers: {
    setSpokenSentence(state, { payload: spokenSentence }) {
      return {
        ...state,
        spokenSentence,
      };
    },
    setSpeaking(state, { payload: speaking }) {
      return {
        ...state,
        speaking,
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
  },
});

export const {
  setSpokenSentence,
  setSpeaking,
  setPrompt,
  saveAnswer,
} = actions;

export function recognizeVoice() {
  return async (dispatch) => {
    dispatch(setSpeaking(true));

    const sentence = await recognize();
    dispatch(setSpokenSentence(sentence));

    dispatch(setSpeaking(false));
  };
}

export function getNext() {
  return (dispatch) => {
    const nextPrompt = getNextPrompt();

    dispatch(setPrompt(nextPrompt));
    dispatch(setSpokenSentence(null));
  };
}

export default reducer;
