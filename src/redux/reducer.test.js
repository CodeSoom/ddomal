import MicState from '../enums/MicState';

import reducer, {
  setSpokenSentence,
  setMicState,
  setPrompt,
  addAnswer,
  clearAnswers,
  setYesNoQuestion,
  startPlaying,
  stopPlaying,
  endGame,
  initializeState,
} from './slice';

jest.mock('../services/speechRecognitionService');

describe('reducer', () => {
  describe('setSpokenSentence', () => {
    it('changes spoken sentence', () => {
      const state = reducer({
        spokenSentence: '',
      }, setSpokenSentence('spoken'));

      expect(state.spokenSentence).toBe('spoken');
    });
  });

  test('setMicState', () => {
    const state = reducer({
      micState: MicState.OFF,
    }, setMicState(MicState.ON));

    expect(state.micState).toBe(MicState.ON);
  });

  test('setPrompt', () => {
    const state = reducer({
      prompt: '',
    }, setPrompt('마늘'));

    expect(state.prompt).toBe('마늘');
  });

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

  test('setYesNoQuestion', () => {
    const state = reducer({
      yesNoQuestion: null,
    }, setYesNoQuestion({
      question: '지구는 둥급니까?',
      answer: '네',
    }));

    expect(state.yesNoQuestion.question).toBe('지구는 둥급니까?');
  });

  test('startPlaying', () => {
    const state = reducer({
      isPlaying: false,
    }, startPlaying());

    expect(state.isPlaying).toBe(true);
  });

  test('stopPlaying', () => {
    const state = reducer({
      isPlaying: true,
    }, stopPlaying());

    expect(state.isPlaying).toBe(false);
  });

  test('endGame', () => {
    const state = reducer({
      isGameEnd: false,
    }, endGame());

    expect(state.isGameEnd).toBe(true);
  });

  test('initializeState', () => {
    const initialState = {
      prompt: null,
      micState: MicState.OFF,
      answers: [],
      isGameEnd: false,
      isPlaying: false,
    };

    const state = reducer({
      answers: [{ prompt: '사과', sentence: '사과가 맛있다' }],
    }, initializeState());

    expect(state).toEqual(initialState);
  });
});
