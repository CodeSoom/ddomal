import reducer, {
  addAnswer,
  clearAnswers,
  endGame,
  setNumberOfQuestions,
  initializeState,
} from './applicationSlice';

jest.mock('../../services/speechRecognitionService');

describe('reducer', () => {
  test('addAnswer', () => {
    const state = reducer({
      answers: [],
    }, addAnswer({ prompt: '사과', sentence: '사과가 맛있다' }));

    expect(state.answers).toEqual([
      { prompt: '사과', sentence: '사과가 맛있다' },
    ]);
  });

  test('clearAnswers', () => {
    const state = reducer({
      answers: [{ prompt: '사과', sentence: '사과가 맛있다' }],
    }, clearAnswers());

    expect(state.answers).toEqual([]);
  });

  test('endGame', () => {
    const state = reducer({
      isGameEnd: false,
    }, endGame());

    expect(state.isGameEnd).toBe(true);
  });

  test('setNumberOfQuestions', () => {
    const state = reducer({
      numberOfQuestions: 2,
    }, setNumberOfQuestions(3));

    expect(state.numberOfQuestions).toBe(3);
  });

  test('initializeState', () => {
    const initialState = {
      answers: [],
      isGameEnd: false,
      numberOfQuestions: 3,
    };

    const state = reducer({
      answers: [{ prompt: '사과', sentence: '사과가 맛있다' }],
    }, initializeState());

    expect(state).toEqual(initialState);
  });
});
