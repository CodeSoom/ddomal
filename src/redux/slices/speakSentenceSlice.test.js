import MicState from '../../enums/MicState';

import reducer, {
  setSpokenSentence,
  setMicState,
  setPrompt,
} from './speakSentenceSlice';

jest.mock('../../services/speechRecognitionService');

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
});
