import reducer, {
  setSpokenSentence,
  setSpeaking,
  setPrompt,
  saveAnswer,
} from './slice';

jest.mock('../services/speechRecognition');

describe('reducer', () => {
  describe('setSpokenSentence', () => {
    it('changes spoken sentence', () => {
      const state = reducer({
        spokenSentence: '',
      }, setSpokenSentence('spoken'));

      expect(state.spokenSentence).toBe('spoken');
    });
  });

  describe('setSpeaking', () => {
    it('changes speaking', () => {
      const state = reducer({
        speaking: false,
      }, setSpeaking(true));

      expect(state.speaking).toBe(true);
    });
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
});
