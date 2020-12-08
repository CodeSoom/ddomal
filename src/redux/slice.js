import { createAction, createSlice } from '@reduxjs/toolkit';

import MicState from '../enums/MicState';
import SoundState from '../enums/SoundState';

const initialState = {
  prompt: null,
  micState: MicState.OFF,
  answers: [],
  isGameEnd: false,
  soundState: SoundState.IDLE,
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
    endGame(state) {
      return {
        ...state,
        isGameEnd: true,
      };
    },
    startPlaying(state) {
      return {
        ...state,
        soundState: SoundState.PLAYING,
      };
    },
    stopPlaying(state) {
      return {
        ...state,
        soundState: SoundState.STOP,
      };
    },
    idlePlaying(state) {
      return {
        ...state,
        soundState: SoundState.IDLE,
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
  startGame,
  endGame,
  startPlaying,
  stopPlaying,
  idlePlaying,
  initializeState,
} = actions;

export const recognizeSpeech = createAction('recognizeSpeech');
export const getNextQuestion = createAction('getNextQuestion');
export const saveAnswer = createAction('saveAnswer');

export const getNextYesNoQuestion = createAction('getNextYesNoQuestion');
export const playYesNoQuestion = createAction('playYesNoQuestion');

export default reducer;
