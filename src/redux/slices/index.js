import { combineReducers } from '@reduxjs/toolkit';

import applicationReducer from './applicationSlice';
import speakSentenceReducer from './speakSentenceSlice';
import yesnoReducer from './yesNoSlice';

const rootReducer = combineReducers({
  application: applicationReducer,
  speakSentence: speakSentenceReducer,
  yesno: yesnoReducer,
});

export default rootReducer;
