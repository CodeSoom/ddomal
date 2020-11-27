import React from 'react';

import styled from '@emotion/styled';

import MicState from './enums/MicState';

const Container = styled.p({
  fontSize: '2rem',
});

export default function SpokenSentence({ prompt, spokenSentence, micState }) {
  const defaultMessage = '문장을 소리내어 말해보세요';
  const waiting = '...';

  const isInputting = micState !== MicState.OFF;

  const sentence = spokenSentence ?? defaultMessage;

  const highligtedSentence = sentence.split(prompt)
    .reduce((previous, current, i) => (
      i === 0
        ? [current]
        : previous.concat(<b style={{ color: 'blue' }}>{prompt}</b>, current)
    ), []);

  return (
    <Container>
      {isInputting ? waiting : highligtedSentence}
    </Container>
  );
}
