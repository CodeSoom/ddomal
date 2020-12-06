import { combineEpics, ofType } from 'redux-observable';

import { merge, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import MicState from '../enums/MicState';

import { fetchNextPrompt, getExamples } from '../services/promptService';

import {
  recognize,
  recognitionStart,
  recognitionEnd,
  soundStart,
  soundEnd,
} from '../services/speechRecognitionService';

import { fetchNextYesNoQuestion, playQuestion } from '../services/yesNoQuestionService';

import {
  addAnswer,
  setMicState,
  setPrompt,
  setSpokenSentence,
  setYesNoQuestion,
} from './slice';

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

export const saveAnswerEpic = (action$) => action$.pipe(
  ofType('saveAnswer'),
  map(({ payload }) => (
    addAnswer({
      ...payload,
      examples: getExamples(prompt),
    })
  )),
);

const rootEpic = combineEpics(
  saveAnswerEpic,
  getNextQuestionEpic,
  listenRecognitionEvents,
  recognizeSpeechEpic,
  getNextYesNoQuestionEpic,
  playNextYesNoQuestionEpic,
);

export default rootEpic;
