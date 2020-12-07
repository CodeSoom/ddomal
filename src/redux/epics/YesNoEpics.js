import { ofType } from 'redux-observable';

import { of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { fetchNextYesNoQuestion, playQuestion } from '../../services/yesNoQuestionService';

import {
  setYesNoQuestion, startPlaying,
} from '../slice';

export const getNextYesNoQuestionEpic = (action$) => action$.pipe(
  ofType('getNextYesNoQuestion'),
  map(fetchNextYesNoQuestion),
  mergeMap((question) => of(
    setYesNoQuestion(question),
    { type: 'playYesNoQuestion', payload: question.question },
  )),
);

export const playNextYesNoQuestionEpic = (action$) => action$.pipe(
  ofType('playYesNoQuestion'),
  tap(({ payload }) => playQuestion(payload)),
  map(() => startPlaying()),
);
