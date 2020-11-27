import { createSlice } from '@reduxjs/toolkit';

import MicState from '../enums/MicState';

import { getNextPrompt } from '../services/promptService';
import {
  recognize,
  soundStart,
  soundEnd,
  start,
  end,
} from '../services/speechRecognitionService';

const { reducer, actions } = createSlice({
  name: 'application',
  initialState: {
    prompt: null,
    micState: MicState.OFF,
    answers: [],
  },
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
  },
});

export const {
  setSpokenSentence,
  setMicState,
  setPrompt,
  saveAnswer,
  clearAnswers,
} = actions;

function changeSpeaking() {
  return (dispatch) => {
    const soundStarts$ = soundStart();

    soundStarts$.subscribe(() => {
      dispatch(setMicState(MicState.SPEAKING));
    });
  };
}

function changeNotSpeaking() {
  return (dispatch) => {
    const soundEnds$ = soundEnd();

    soundEnds$.subscribe(() => {
      dispatch(setMicState(MicState.ON));
    });
  };
}

function changeMicOn() {
  return (dispatch) => {
    const starts$ = start();

    starts$.subscribe(() => {
      dispatch(setMicState(MicState.ON));
    });
  };
}

function changeMicOff() {
  return (dispatch) => {
    const ends$ = end();

    ends$.subscribe(() => {
      dispatch(setMicState(MicState.OFF));
    });
  };
}

export function recognizeVoice() {
  return async (dispatch) => {
    const sentences$ = recognize();

    sentences$.subscribe((sentence) => {
      dispatch(setSpokenSentence(sentence));
    });

    dispatch(changeSpeaking());
    dispatch(changeNotSpeaking());
    dispatch(changeMicOn());
    dispatch(changeMicOff());
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
    dispatch(setMicState(MicState.OFF));
  };
}

export default reducer;
