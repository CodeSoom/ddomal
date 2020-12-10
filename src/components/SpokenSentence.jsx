import React from 'react';

import MicState from '../enums/MicState';

import { emphasisColor } from '../styles/colors';
import Message from '../styles/Message';

const waiting = '...';
const placeholder = '문장을 소리내어 말해보세요';

export default function SpokenSentence({ micState, prompt, spokenSentence }) {
  const isInputting = micState !== MicState.OFF;

  const highligtPrompt = (key) => (
    <b key={key} style={{ color: emphasisColor }}>
      {prompt}
    </b>
  );

  const sentence = spokenSentence ?? placeholder;

  const highlightSentence = () => {
    const splitted = sentence.split(prompt);

    if (splitted.length <= 1) {
      return splitted;
    }

    return splitted
      .flatMap((part, index) => [part, highligtPrompt(`${index + part}`)])
      .slice(0, -1);
  };

  return (
    <Message>
      {isInputting ? waiting : highlightSentence()}
    </Message>
  );
}
