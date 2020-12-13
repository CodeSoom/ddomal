import React from 'react';

import MicState from '../enums/MicState';

import Message from '../styles/Message';

import { highlight } from '../utils/utils';

export default function SpokenSentence({ micState, prompt, spokenSentence }) {
  const waiting = '...';
  const placeholder = '문장을 소리내어 말해보세요';

  const isInputting = micState !== MicState.OFF;

  const sentence = spokenSentence ?? placeholder;

  return (
    <Message>
      {isInputting ? waiting : highlight({ sentence, word: prompt })}
    </Message>
  );
}
