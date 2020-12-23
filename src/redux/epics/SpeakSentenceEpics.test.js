import { TestScheduler } from 'rxjs/testing';

import { of } from 'rxjs';

import {
  addAnswer,
  setPrompt,
  setMicState,
  setSpokenSentence,
} from '../slice';

import {
  getNextQuestionEpic,
  recognizeSpeechEpic,
  listenRecognitionEvents,
  saveAnswerEpic,
} from './SpeakSentenceEpics';

import { fetchNextPrompt, getExamples } from '../../services/dataService';
import { abortRecognition, recognize } from '../../services/speechRecognitionService';

import MicState from '../../enums/MicState';

jest.mock('../../services/speechRecognitionService.js');
jest.mock('../../services/dataService.js');

describe('epics', () => {
  let testScheduler;

  const fakePrompt = '사과';
  const fakeSentence = '사과는 맛있다';
  const fakeExamples = [
    '자두는 맛이 없다',
    '자두는 맛이 있다',
  ];

  beforeEach(() => {
    fetchNextPrompt.mockImplementation(() => fakePrompt);
    recognize.mockImplementation(() => of(fakeSentence));
    getExamples.mockImplementation(() => fakeExamples);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test('getNextQuestionEpic', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', {
        a: { type: 'getNextQuestion' },
      });

      const output$ = getNextQuestionEpic(action$);

      expectObservable(output$).toBe('-(ab)', {
        a: setPrompt(fakePrompt),
        b: setSpokenSentence(null),
      });
    });

    expect(abortRecognition).toBeCalled();
  });

  test('recognizeSpeechEpic', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', {
        a: { type: 'recognizeSpeech' },
      });

      const output$ = recognizeSpeechEpic(action$);

      expectObservable(output$).toBe('-(ab)', {
        a: { type: 'listenRecognitionEvents' },
        b: setSpokenSentence(fakeSentence),
      });
    });
  });

  test('listenRecognitionEventsEpic', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', {
        a: { type: 'listenRecognitionEvents' },
      });

      const output$ = listenRecognitionEvents(action$);

      expectObservable(output$).toBe('-(abcd)', {
        a: setMicState(MicState.ON),
        b: setMicState(MicState.OFF),
        c: setMicState(MicState.SPEAKING),
        d: setMicState(MicState.ON),
      });
    });
  });

  test('saveAnswerEpic', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', {
        a: {
          type: 'saveAnswer',
          payload: {
            prompt: '자두',
            spokenSentence: '자두는',
          },
        },
      });

      const output$ = saveAnswerEpic(action$);

      expectObservable(output$).toBe('-a', {
        a: addAnswer({
          prompt: '자두',
          spokenSentence: '자두는',
          examples: fakeExamples,
        }),
      });
    });
  });
});
