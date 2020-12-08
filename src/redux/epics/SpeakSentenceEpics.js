import { ofType } from 'redux-observable';

import { merge, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import MicState from '../../enums/MicState';

import { fetchNextPrompt, getExamples } from '../../services/dataService';

import {
  recognize,
  recognitionStart,
  recognitionEnd,
  soundStart,
  soundEnd,
} from '../../services/speechRecognitionService';

import {
  addAnswer,
  setMicState,
  setPrompt,
  setSpokenSentence,
} from '../slice';

export const getNextQuestionEpic = (action$) => action$.pipe(
  ofType('getNextQuestion'),
  map(fetchNextPrompt),
  mergeMap((nextPrompt) => of(
    setPrompt(nextPrompt),
    setSpokenSentence(null),
  )),
);

export const recognizeSpeechEpic = (action$) => action$.pipe(
  ofType('recognizeSpeech'),
  map(recognize),
  mergeMap((sentence$) => merge(
    of({ type: 'listenRecognitionEvents' }),
    sentence$.pipe(
      map((sentence) => setSpokenSentence(sentence)),
    ),
  )),
);

export const listenRecognitionEvents = (action$) => action$.pipe(
  ofType('listenRecognitionEvents'),
  map(() => [
    recognitionStart(),
    recognitionEnd(),
    soundStart(),
    soundEnd(),
  ]),
  mergeMap(([
    start$, end$, soundStart$, soundEnd$,
  ]) => merge(
    start$.pipe(map(() => setMicState(MicState.ON))),
    end$.pipe(map(() => setMicState(MicState.OFF))),
    soundStart$.pipe(map(() => setMicState(MicState.SPEAKING))),
    soundEnd$.pipe(map(() => setMicState(MicState.ON))),
  )),
);

export const saveAnswerEpic = (action$) => action$.pipe(
  ofType('saveAnswer'),
  map(({ payload }) => (
    addAnswer({
      ...payload,
      examples: getExamples(payload.prompt),
    })
  )),
);
