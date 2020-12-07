import { combineEpics } from 'redux-observable';

import {
  saveAnswerEpic,
  getNextQuestionEpic,
  listenRecognitionEvents,
  recognizeSpeechEpic,
} from './SpeakSentenceEpics';

import {
  getNextYesNoQuestionEpic,
  playYesNoQuestionEpic,
  listenYesNoEndEventEpic,
} from './YesNoEpics';

const rootEpic = combineEpics(
  saveAnswerEpic,
  getNextQuestionEpic,
  listenRecognitionEvents,
  recognizeSpeechEpic,
  getNextYesNoQuestionEpic,
  playYesNoQuestionEpic,
  listenYesNoEndEventEpic,
);

export default rootEpic;
