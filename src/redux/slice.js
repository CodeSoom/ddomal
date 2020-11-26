import { createSlice } from '@reduxjs/toolkit';

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

function changeSpeaking() {
  return (dispatch) => {
    const soundStarts$ = soundStart();

    soundStarts$.subscribe(() => {
      dispatch(setSpeakStatus('SPEAKING'));
    });
  };
}

function changeNotSpeaking() {
  return (dispatch) => {
    const soundEnds$ = soundEnd();

    soundEnds$.subscribe(() => {
      dispatch(setSpeakStatus('MIC_ON'));
    });
  };
}

function changeMicOn() {
  return (dispatch) => {
    const starts$ = start();

    starts$.subscribe(() => {
      dispatch(setSpeakStatus('MIC_ON'));
    });
  };
}

function changeMicOff() {
  return (dispatch) => {
    const ends$ = end();

    ends$.subscribe(() => {
      dispatch(setSpeakStatus('MIC_OFF'));
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
    dispatch(setSpeakStatus('MIC_OFF'));
  };
}

export default reducer;
