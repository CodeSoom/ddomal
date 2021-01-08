import React from 'react';
import MicState from '../enums/MicState';

import Message from '../styles/Message';

import { highlight } from '../utils/utils';

export default function SpeechInput({ prompt, speech, micState }) {
  const highligtedSpeech = highlight({
    sentence: speech ?? '버튼을 누르고 문장을 말해보세요',
    word: prompt,
  });

  return (
    <Message>
      {micState === MicState.OFF
        ? highligtedSpeech
        : '...'}
    </Message>
  );
}
