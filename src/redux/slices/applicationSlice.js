import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answers: [],
  isGameEnd: false,
  numberOfQuestions: 3,
};

const { reducer, actions } = createSlice({
  name: 'application',
  initialState,
  reducers: {
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
    endGame(state) {
      return {
        ...state,
        isGameEnd: true,
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
  addAnswer,
  clearAnswers,
  startGame,
  endGame,
  setNumberOfQuestions,
  initializeState,
} = actions;

export default reducer;
