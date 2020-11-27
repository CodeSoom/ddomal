import React from 'react';

import styled from '@emotion/styled';

const Container = styled.p({
  fontSize: '2rem',
});

export default function SpokenSentence({ spokenSentence, speakStatus }) {
  const defaultMessage = '문장을 소리내어 말해보세요';
  const loadingSign = '...';

  const isInputting = speakStatus === 'SPEAKING' || speakStatus === 'MIC_ON';

  const sentence = spokenSentence ?? defaultMessage;

  return (
    <Container>
      {isInputting ? loadingSign : sentence}
    </Container>
  );
}
