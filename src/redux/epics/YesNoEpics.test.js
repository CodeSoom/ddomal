import { TestScheduler } from 'rxjs/testing';

import { of } from 'rxjs';

import {
  setYesNoQuestion,
  startPlaying,
  idlePlaying,
  endPlaying,
  getNextYesNoQuestion,
  playYesNoQuestion,
  stopYesNoQuestion,
} from '../slices/yesNoSlice';

import {
  getNextYesNoQuestionEpic,
  listenYesNoEndEventEpic,
  playYesNoQuestionEpic,
  stopYesNoQuestionEpic,
} from './YesNoEpics';

import { fetchNextYesNoQuestion } from '../../services/dataService';
import { play, stop } from '../../services/speechSynthesisService';
import SoundState from '../../enums/SoundState';

jest.mock('../../services/speechRecognitionService.js');
jest.mock('../../services/speechSynthesisService.js');
jest.mock('../../services/dataService.js');

describe('epics', () => {
  let testScheduler;

  const yesNoQuestion = '안녕하세요';
  const fakeQuestion = {
    answer: '네',
    question: '지구는 네모난 모양인가요?',
  };

  beforeEach(() => {
    fetchNextYesNoQuestion.mockImplementation(() => fakeQuestion);
    play.mockImplementation(() => of(''));

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test('getNextYesNoQuestionEpic', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', {
        a: getNextYesNoQuestion,
      });

      const output$ = getNextYesNoQuestionEpic(action$);

      expectObservable(output$).toBe('-a', {
        a: setYesNoQuestion(fakeQuestion),
      });
    });
  });

  test('playYesNoQuestionEpic', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', {
        a: playYesNoQuestion(yesNoQuestion),
      });

      const output$ = playYesNoQuestionEpic(action$);

      expectObservable(output$).toBe('-(ab)', {
        a: startPlaying(),
        b: { type: 'listenYesNoEndEvent' },
      });
    });
    expect(play).toBeCalledWith(yesNoQuestion);
  });

  test('stopYesNoQuestionEpic', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', {
        a: stopYesNoQuestion(),
      });

      const output$ = stopYesNoQuestionEpic(action$);

      expectObservable(output$).toBe('-a', {
        a: idlePlaying(),
      });
    });

    expect(stop).toBeCalled();
  });

  test('listenYesNoEndEventEpic', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', {
        a: { type: 'listenYesNoEndEvent' },
      });

      const state$ = {
        value: {
          soundState: SoundState.PLAYING,
        },
      };

      const output$ = listenYesNoEndEventEpic(action$, state$);

      expectObservable(output$).toBe('-a', {
        a: endPlaying(),
      });
    });
  });
});
