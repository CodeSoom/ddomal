import { ActionsObservable } from 'redux-observable';

import { toArray } from 'rxjs/operators';

import { of } from 'rxjs';

import {
  setYesNoQuestion, startPlaying, endPlaying,
} from '../slice';

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

      getNextYesNoQuestionEpic(action$).subscribe((action) => {
        expect(action).toEqual(setYesNoQuestion(fakeQuestion));
        done();
      });
    });
  });

  describe('playYesNoQuestionEpic', () => {
    const fakeQuestion = '안녕하세요';

    const playYesNoQuestion = play;

    beforeEach(() => {
      play.mockImplementation(() => of(''));
    });

    it('plays yesNoQuestion', (done) => {
      const action$ = ActionsObservable.of({
        type: 'playYesNoQuestion',
        payload: fakeQuestion,
      });

      playYesNoQuestionEpic(action$)
        .pipe(toArray()).subscribe(([action1, action2]) => {
          expect(playYesNoQuestion).toBeCalledWith(fakeQuestion);
          expect(action1).toEqual(startPlaying());
          expect(action2).toEqual({ type: 'listenYesNoEndEvent' });
          done();
        });
    });
  });

  describe('listenYesNoEndEventEpic', () => {
    it('ends playing yes no question', (done) => {
      const action$ = ActionsObservable.of({
        type: 'listenYesNoEndEvent',
      });

      const state$ = {
        value: {
          soundState: SoundState.PLAYING, 
        },
      };

      listenYesNoEndEventEpic(action$, state$).subscribe((action) => {
        expect(action).toEqual(endPlaying());
        done();
      });
    });
  });

  describe('stopPlayingYesNoQuestionEpic', () => {
    beforeEach(() => {
      stop.mockClear();
    });

    it('stops playing yes no question', (done) => {
      const action$ = ActionsObservable.of({
        type: 'stopYesNoQuestion',
      });

      stopYesNoQuestionEpic(action$).subscribe(() => {
        expect(stop).toBeCalled();
        done();
      });
    });
  });
});
