import MicState from '../enums/MicState';
import reducer, {
  setSpokenSentence,
  setMicState,
  setPrompt,
  saveAnswer,
  clearAnswers,
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

  test('saveAnswer', () => {
    const state = reducer({
      answers: [],
    }, saveAnswer({ prompt: '사과', sentence: '사과가 맛있다' }));

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
});
