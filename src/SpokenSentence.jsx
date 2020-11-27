import React from 'react';

import styled from '@emotion/styled';

import MicState from './enums/MicState';

const Container = styled.p({
  fontSize: '2rem',
});

export default function SpokenSentence({ prompt, spokenSentence, micState }) {
  const waiting = '...';
  const defaultMessage = '문장을 소리내어 말해보세요';

  const sentence = spokenSentence ?? defaultMessage;

  const isInputting = micState !== MicState.OFF;

  const highligtedPrompt = (
    <b style={{ color: 'blue' }}>
      {prompt}
    </b>
  );

  const [leftPart, rightPart] = sentence.split(prompt);
  const highligtedSentence = [leftPart, highligtedPrompt, rightPart];

  return (
    <Container>
      {isInputting ? waiting : highligtedSentence}
    </Container>
  );
}
