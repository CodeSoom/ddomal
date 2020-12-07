import { ofType } from 'redux-observable';

import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { fetchNextYesNoQuestion, playQuestion } from '../../services/yesNoQuestionService';

import {
  setYesNoQuestion,
} from '../slice';

export const getNextYesNoQuestionEpic = (action$) => action$.pipe(
  ofType('getNextYesNoQuestion'),
  mergeMap(() => {
    const question = fetchNextYesNoQuestion();

    return of(
      setYesNoQuestion(question),
      { type: 'playYesNoQuestion', payload: question.question },
    );
  }),
);

export const playNextYesNoQuestionEpic = (action$) => action$.pipe(
  ofType('playYesNoQuestion'),
  map(({ payload }) => {
    playQuestion(payload);
    return { type: '' };
  }),
);
