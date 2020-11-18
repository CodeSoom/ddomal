import { createSlice } from '@reduxjs/toolkit';

import { recognize } from '../services/speechRecognition';

const { reducer, actions } = createSlice({
  name: 'application',
  initialState: {
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
  },
});

export const {
  setSpokenSentence,
  setSpeaking,
} = actions;

export function recognizeVoice() {
  return async (dispatch) => {
    dispatch(setSpeaking(true));

    const sentence = await recognize();
    dispatch(setSpokenSentence(sentence));

    dispatch(setSpeaking(false));
  };
}

export default reducer;
