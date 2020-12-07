import { ofType } from 'redux-observable';

import { of, merge } from 'rxjs';
import {
  map,
  mergeMap,
} from 'rxjs/operators';

import { fetchNextYesNoQuestion, playQuestion } from '../../services/yesNoQuestionService';

import {
  setYesNoQuestion, startPlaying, stopPlaying,
} from '../slice';

export const getNextYesNoQuestionEpic = (action$) => action$.pipe(
  ofType('getNextYesNoQuestion'),
  map(fetchNextYesNoQuestion),
  map(setYesNoQuestion),
);

export const playYesNoQuestionEpic = (action$) => action$.pipe(
  ofType('playYesNoQuestion'),
  map(({ payload }) => playQuestion(payload)),
  mergeMap((end$) => merge(
    of(startPlaying()),
    end$.pipe(map(() => ({ type: 'listenYesNoEndEvent' }))),
  )),
);

export const listenYesNoEndEventEpic = (action$) => action$.pipe(
  ofType('listenYesNoEndEvent'),
  map(() => stopPlaying()),
);
