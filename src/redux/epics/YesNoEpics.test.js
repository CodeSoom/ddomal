import { ActionsObservable } from 'redux-observable';

import { toArray } from 'rxjs/operators';

import {
  setYesNoQuestion,
} from '../slice';

import {
  getNextYesNoQuestionEpic,
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
});
