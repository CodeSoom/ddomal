import { ActionsObservable } from 'redux-observable';

import { toArray } from 'rxjs/operators';

import { of } from 'rxjs';

import {
  setYesNoQuestion, startPlaying, stopPlaying,
} from '../slice';

import {
  getNextYesNoQuestionEpic,
  listenYesNoEndEventEpic,
  playNextYesNoQuestionEpic,
} from './YesNoEpics';

import { fetchNextYesNoQuestion, playQuestion } from '../../services/yesNoQuestionService';

jest.mock('../../services/speechRecognitionService.js');
jest.mock('../../services/promptService.js');
jest.mock('../../services/yesNoQuestionService.js');

describe('epics', () => {
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
      playQuestion.mockImplementation(() => of(''));
    });

    it('plays yesNoQuestion', (done) => {
      const action$ = ActionsObservable.of({
        type: 'playYesNoQuestion',
        payload: fakeQuestion,
      });

      playNextYesNoQuestionEpic(action$)
        .pipe(toArray()).subscribe(([action1, action2]) => {
          expect(playYesNoQuestion).toBeCalledWith(fakeQuestion);
          expect(action1).toEqual(startPlaying());
          expect(action2).toEqual({ type: 'listenYesNoEndEvent' });
          done();
        });
    });
  });

  describe('listenYesNoEndEventEpic', () => {
    it('stops playing yes no question', (done) => {
      const action$ = ActionsObservable.of({
        type: 'listenYesNoEndEvent',
      });

      listenYesNoEndEventEpic(action$).subscribe((action) => {
        expect(action).toEqual(stopPlaying());
        done();
      });
    });
  });
});
