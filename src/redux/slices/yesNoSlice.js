import { createAction, createSlice } from '@reduxjs/toolkit';

import SoundState from '../../enums/SoundState';

const initialState = {
  soundState: SoundState.IDLE,
};

const { reducer, actions } = createSlice({
  name: 'yesno',
  initialState,
  reducers: {
    setYesNoQuestion(state, { payload: yesNoQuestion }) {
      return {
        ...state,
        yesNoQuestion,
      };
    },
    startPlaying(state) {
      return {
        ...state,
        soundState: SoundState.PLAYING,
      };
    },
    endPlaying(state) {
      return {
        ...state,
        soundState: SoundState.END,
      };
    },
    idlePlaying(state) {
      return {
        ...state,
        soundState: SoundState.IDLE,
      };
    },
  },
});

export const {
  setYesNoQuestion,
  startPlaying,
  endPlaying,
  idlePlaying,
} = actions;

export const getNextYesNoQuestion = createAction('yesno/getNextYesNoQuestion');
export const playYesNoQuestion = createAction('yesno/playYesNoQuestion');
export const stopYesNoQuestion = createAction('yesno/stopYesNoQuestion');

export default reducer;
