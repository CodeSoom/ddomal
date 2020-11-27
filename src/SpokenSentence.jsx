import React from 'react';

import styled from '@emotion/styled';

import _ from 'lodash';

import MicState from './enums/MicState';

const Container = styled.p({
  fontSize: '2rem',
});

const waiting = '...';
const placeholder = '문장을 소리내어 말해보세요';

export default function SpokenSentence({ micState, prompt, spokenSentence }) {
  const isInputting = micState !== MicState.OFF;

  const highligtedPrompt = (
    <b style={{ color: 'blue' }}>
      {prompt}
    </b>
  );

  const sentence = spokenSentence ?? placeholder;

  const highlightSentence = () => {
    const [leftPart, rightPart] = sentence.split(prompt);

    return _.isString(rightPart)
      ? [leftPart, highligtedPrompt, rightPart]
      : [leftPart];
  };

  return (
    <Container>
      {isInputting ? waiting : highlightSentence()}
    </Container>
  );
}
