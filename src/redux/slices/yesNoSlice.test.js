import SoundState from '../../enums/SoundState';

import reducer, {
  setYesNoQuestion,
  startPlaying,
  endPlaying,
  idlePlaying,
} from './yesNoSlice';

jest.mock('../../services/speechRecognitionService');

describe('reducer', () => {
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
});
