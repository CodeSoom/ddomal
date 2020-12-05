import React from 'react';

import styled from '@emotion/styled';

import MicState from '../enums/MicState';

import { normalColor } from '../styles/colors';

const Container = styled.p({
  fontSize: '1.5rem',
  color: normalColor,
});

const waiting = '...';
const placeholder = '문장을 소리내어 말해보세요';

export default function SpokenSentence({ micState, prompt, spokenSentence }) {
  const isInputting = micState !== MicState.OFF;

  const highligtPrompt = (key) => (
    <b key={key} style={{ color: 'blue' }}>
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
    <Container>
      {isInputting ? waiting : highlightSentence()}
    </Container>
  );
}
