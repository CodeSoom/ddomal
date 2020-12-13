import { createAction, createSlice } from '@reduxjs/toolkit';

import MicState from '../enums/MicState';
import SoundState from '../enums/SoundState';

const initialState = {
  prompt: null,
  micState: MicState.OFF,
  answers: [],
  isGameEnd: false,
  soundState: SoundState.IDLE,
  numberOfQuestions: 3,
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
    setNumberOfQuestions(state, { payload: numberOfQuestions }) {
      return {
        ...state,
        numberOfQuestions,
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
  endPlaying,
  idlePlaying,
  setNumberOfQuestions,
  initializeState,
} = actions;

export const recognizeSpeech = createAction('recognizeSpeech');
export const getNextQuestion = createAction('getNextQuestion');
export const saveAnswer = createAction('saveAnswer');

export const getNextYesNoQuestion = createAction('getNextYesNoQuestion');
export const playYesNoQuestion = createAction('playYesNoQuestion');
export const stopYesNoQuestion = createAction('stopYesNoQuestion');

export default reducer;
