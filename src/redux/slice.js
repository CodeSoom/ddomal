import { createSlice } from '@reduxjs/toolkit';

import MicState from '../enums/MicState';

import { fetchNextPrompt } from '../services/promptService';

import {
  recognize,
  soundStart,
  soundEnd,
  recognitionStart,
  recognitionEnd,
} from '../services/speechRecognitionService';

const initialState = {
  prompt: null,
  micState: MicState.OFF,
  answers: [],
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
    initializeState() {
      return initialState;
    },
  },
});

export const {
  setSpokenSentence,
  setMicState,
  setPrompt,
  saveAnswer,
  clearAnswers,
  initializeState,
} = actions;

function listenSoundStart() {
  return (dispatch) => {
    const events$ = soundStart();

    events$.subscribe(() => {
      dispatch(setMicState(MicState.SPEAKING));
    });
  };
}

function listenSoundEnd() {
  return (dispatch) => {
    const events$ = soundEnd();

    events$.subscribe(() => {
      dispatch(setMicState(MicState.ON));
    });
  };
}

function listenRecognitionStart() {
  return (dispatch) => {
    const events$ = recognitionStart();

    events$.subscribe(() => {
      dispatch(setMicState(MicState.ON));
    });
  };
}

function listenRecognitionEnd() {
  return (dispatch) => {
    const events$ = recognitionEnd();

    events$.subscribe(() => {
      dispatch(setMicState(MicState.OFF));
    });
  };
}

function listenRecognitionEvents() {
  return (dispatch) => {
    dispatch(listenSoundStart());
    dispatch(listenSoundEnd());
    dispatch(listenRecognitionStart());
    dispatch(listenRecognitionEnd());
  };
}

export function recognizeVoice() {
  return async (dispatch) => {
    const sentences$ = recognize();

    sentences$.subscribe((sentence) => {
      dispatch(setSpokenSentence(sentence));
    });

    dispatch(listenRecognitionEvents());
  };
}

export function getNextQuestion() {
  return (dispatch) => {
    const nextPrompt = fetchNextPrompt();

    dispatch(setPrompt(nextPrompt));
    dispatch(setSpokenSentence(null));
  };
}

export default reducer;
