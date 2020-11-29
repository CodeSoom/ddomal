import { combineEpics, ofType } from 'redux-observable';

import { merge, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import MicState from '../enums/MicState';

import { fetchNextPrompt } from '../services/promptService';

import {
  recognize,
  recognitionStart,
  recognitionEnd,
  soundStart,
  soundEnd,
} from '../services/speechRecognitionService';

import { setMicState, setPrompt, setSpokenSentence } from './slice';

export const getNextQuestionEpic = (action$) => action$.pipe(
  ofType('getNextQuestion'),
  mergeMap(() => {
    const nextPrompt = fetchNextPrompt();
    return of(
      setPrompt(nextPrompt),
      setSpokenSentence(null),
    );
  }),
);

export const recognizeSpeechEpic = (action$) => action$.pipe(
  ofType('recognizeSpeech'),
  mergeMap(() => {
    const sentence$ = recognize();
    return merge(
      of({ type: 'listenRecognitionEvents' }),
      sentence$.pipe(
        map((sentence) => setSpokenSentence(sentence)),
      ),
    );
  }),
);

export const listenRecognitionEvents = (action$) => action$.pipe(
  ofType('listenRecognitionEvents'),
  mergeMap(() => {
    const start$ = recognitionStart();
    const end$ = recognitionEnd();
    const soundStart$ = soundStart();
    const soundEnd$ = soundEnd();

    return merge(
      start$.pipe(map(() => setMicState(MicState.ON))),
      end$.pipe(map(() => setMicState(MicState.OFF))),
      soundStart$.pipe(map(() => setMicState(MicState.SPEAKING))),
      soundEnd$.pipe(map(() => setMicState(MicState.ON))),
    );
  }),
);

const rootEpic = combineEpics(
  getNextQuestionEpic,
  listenRecognitionEvents,
  recognizeSpeechEpic,
);

export default rootEpic;
