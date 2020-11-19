import { createSlice } from '@reduxjs/toolkit';

import { recognize } from '../services/speechRecognition';

const { reducer, actions } = createSlice({
  name: 'application',
  initialState: {
    prompt: '사과',
    speaking: false,
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
  },
});

export const {
  setSpokenSentence,
  setSpeaking,
  setPrompt,
} = actions;

export function recognizeVoice() {
  return async (dispatch) => {
    dispatch(setSpeaking(true));

    const sentence = await recognize();
    dispatch(setSpokenSentence(sentence));

    dispatch(setSpeaking(false));
  };
}

export function changePrompt(prompt) {
  return (dispatch) => {
    dispatch(setPrompt(prompt));
    dispatch(setSpokenSentence(null));
  };
}

export default reducer;
