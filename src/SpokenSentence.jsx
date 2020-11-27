import React from 'react';

import styled from '@emotion/styled';

const Container = styled.p({
  fontSize: '2rem',
});

export default function SpokenSentence({ prompt, spokenSentence, speakStatus }) {
  const defaultMessage = '문장을 소리내어 말해보세요';
  const loadingSign = '...';

  const isInputting = speakStatus === 'SPEAKING' || speakStatus === 'MIC_ON';

  const sentence = spokenSentence ?? defaultMessage;

  const highlightPrompt = () => sentence.split(prompt)
    .reduce((previous, current, i) => (
      i === 0
        ? [current]
        : previous.concat(<b style={{ color: 'blue' }}>{prompt}</b>, current)
    ), []);

  return (
    <Container>
      {isInputting ? loadingSign : highlightPrompt()}
    </Container>
  );
}
