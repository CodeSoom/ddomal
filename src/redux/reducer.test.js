import MicState from '../enums/MicState';
import SoundState from '../enums/SoundState';

import reducer, {
  setSpokenSentence,
  setMicState,
  setPrompt,
  addAnswer,
  clearAnswers,
  setYesNoQuestion,
  startPlaying,
  endPlaying,
  idlePlaying,
  endGame,
  setNumberOfQuestions,
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
      soundState: SoundState.IDLE,
    }, startPlaying());

    expect(state.soundState).toBe(SoundState.PLAYING);
  });

  test('stopPlaying', () => {
    const state = reducer({
      soundState: SoundState.PLAYING,
    }, endPlaying());

    expect(state.soundState).toBe(SoundState.END);
  });

  test('idlePlaying', () => {
    const state = reducer({
      soundState: SoundState.PLAYING,
    }, idlePlaying());

    expect(state.soundState).toBe(SoundState.IDLE);
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
      prompt: null,
      micState: MicState.OFF,
      answers: [],
      isGameEnd: false,
      soundState: SoundState.IDLE,
      numberOfQuestions: 3,
    };

    const state = reducer({
      answers: [{ prompt: '사과', sentence: '사과가 맛있다' }],
    }, initializeState());

    expect(state).toEqual(initialState);
  });
});
