import { createSlice } from '@reduxjs/toolkit';

import { recognize } from '../services/speechRecognition';
import { getRandomPrompt } from '../services/prompt';

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

export function changePrompt() {
  return (dispatch) => {
    // random 하게 제시어 고르기
    const randomPrompt = getRandomPrompt();

    dispatch(setPrompt(randomPrompt));
    dispatch(setSpokenSentence(null));
  };
}

export default reducer;
