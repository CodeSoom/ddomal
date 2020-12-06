import { ActionsObservable } from 'redux-observable';

import { of } from 'rxjs';
import { toArray } from 'rxjs/operators';

import {
  addAnswer,
  saveAnswer,
  setPrompt,
  setMicState,
  setSpokenSentence,
  setYesNoQuestion,
} from './slice';

import {
  getNextQuestionEpic,
  recognizeSpeechEpic,
  listenRecognitionEvents,
  getNextYesNoQuestionEpic,
  playNextYesNoQuestionEpic,
  saveAnswerEpic,
} from './epics';

import { fetchNextPrompt, getExamples } from '../services/promptService';
import { recognize } from '../services/speechRecognitionService';
import { fetchNextYesNoQuestion, playQuestion } from '../services/yesNoQuestionService';

import MicState from '../enums/MicState';

jest.mock('../services/speechRecognitionService.js');
jest.mock('../services/promptService.js');
jest.mock('../services/yesNoQuestionService.js');

describe('epics', () => {
  describe('getNextQuestionEpic', () => {
    const fakePrompt = '사과';

    beforeEach(() => {
      fetchNextPrompt.mockImplementation(() => fakePrompt);
    });

    it('conveys setPrompt and setSpokenSentence(to null) actions', (done) => {
      const action$ = ActionsObservable.of({
        type: 'getNextQuestion',
      });

      getNextQuestionEpic(action$)
        .pipe(toArray()).subscribe(([action1, action2]) => {
          expect(action1).toEqual(setPrompt(fakePrompt));
          expect(action2).toEqual(setSpokenSentence(null));
          done();
        });
    });
  });

  describe('recognizeSpeechEpic', () => {
    const fakeSentence = '사과는 맛있다';

    beforeEach(() => {
      recognize.mockImplementation(() => of(fakeSentence));
    });

    it('conveys setSpokenSentence action', (done) => {
      const action$ = ActionsObservable.of({
        type: 'recognizeSpeech',
      });

      recognizeSpeechEpic(action$)
        .pipe(toArray()).subscribe(([action1, action2]) => {
          expect(action1).toEqual({ type: 'listenRecognitionEvents' });
          expect(action2).toEqual(setSpokenSentence(fakeSentence));
          done();
        });
    });
  });

  describe('listenRecognitionEventsEpic', () => {
    it('conveys setSpokenSentence action', (done) => {
      const action$ = ActionsObservable.of({
        type: 'listenRecognitionEvents',
      });

      listenRecognitionEvents(action$)
        .pipe(toArray()).subscribe(([action1, action2, action3, action4]) => {
          expect(action1).toEqual(setMicState(MicState.ON));
          expect(action2).toEqual(setMicState(MicState.OFF));
          expect(action3).toEqual(setMicState(MicState.SPEAKING));
          expect(action4).toEqual(setMicState(MicState.ON));
          done();
        });
    });
  });

  describe('getNextYesNoQuestionEpic', () => {
    const fakeQuestion = {
      answer: '네',
      question: '지구는 네모난 모양인가요?',
    };

    beforeEach(() => {
      fetchNextYesNoQuestion.mockImplementation(() => fakeQuestion);
    });

    it('conveys setYesNoQuestion and playYesNoQuestion actions', (done) => {
      const action$ = ActionsObservable.of({
        type: 'getNextYesNoQuestion',
      });

      getNextYesNoQuestionEpic(action$)
        .pipe(toArray()).subscribe(([action1, action2]) => {
          expect(action1).toEqual(setYesNoQuestion(fakeQuestion));
          expect(action2).toEqual({
            type: 'playYesNoQuestion',
            payload: fakeQuestion.question,
          });
          done();
        });
    });
  });

  describe('playYesNoQuestionEpic', () => {
    const fakeQuestion = '안녕하세요';

    const playYesNoQuestion = playQuestion;

    beforeEach(() => {
      playQuestion.mockImplementation(async () => '');
    });

    it('plays yesNoQuestion', (done) => {
      const action$ = ActionsObservable.of({
        type: 'playYesNoQuestion',
        payload: fakeQuestion,
      });

      playNextYesNoQuestionEpic(action$).subscribe(() => {
        expect(playYesNoQuestion).toBeCalledWith(fakeQuestion);
        done();
      });
    });
  });

  describe('saveAnswerEpic', () => {
    const fakeExamples = [
      '자두는 맛이 없다',
      '자두는 맛이 있다',
    ];

    beforeEach(() => {
      getExamples.mockImplementation(() => fakeExamples);
    });

    it('returns add answer action with fake examples', (done) => {
      const action$ = ActionsObservable.of(saveAnswer({
        prompt: '자두',
        spokenSentence: '자두는',
      }));

      saveAnswerEpic(action$).subscribe((action) => {
        expect(action).toEqual(addAnswer({
          prompt: '자두',
          spokenSentence: '자두는',
          examples: fakeExamples,
        }));
        done();
      });
    });
  });
});
