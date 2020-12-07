import { combineEpics } from 'redux-observable';

import {
  saveAnswerEpic,
  getNextQuestionEpic,
  listenRecognitionEvents,
  recognizeSpeechEpic,
} from './SpeakSentenceEpics';

import {
  getNextYesNoQuestionEpic,
  playNextYesNoQuestionEpic,
  listenYesNoEndEventEpic,
} from './YesNoEpics';

const rootEpic = combineEpics(
  saveAnswerEpic,
  getNextQuestionEpic,
  listenRecognitionEvents,
  recognizeSpeechEpic,
  getNextYesNoQuestionEpic,
  playNextYesNoQuestionEpic,
  listenYesNoEndEventEpic,
);

export default rootEpic;
