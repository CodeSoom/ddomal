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
  stopYesNoQuestionEpic,
  saveAndGoToNextYesNoQuestionEpic,
} from './YesNoEpics';

const rootEpic = combineEpics(
  saveAnswerEpic,
  getNextQuestionEpic,
  listenRecognitionEvents,
  recognizeSpeechEpic,
  getNextYesNoQuestionEpic,
  playYesNoQuestionEpic,
  listenYesNoEndEventEpic,
  stopYesNoQuestionEpic,
  saveAndGoToNextYesNoQuestionEpic,
);

export default rootEpic;
