import reducer, {
  setSpokenSentence,
  setSpeaking,
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
});
