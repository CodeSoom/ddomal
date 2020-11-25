import React from 'react';

import { MdMic } from 'react-icons/md';

import styled from '@emotion/styled';

import { flexBoxCenter } from './styles/common';

const Container = styled.div({
  ...flexBoxCenter,
  flexDirection: 'column',
});

const SentenceBox = styled.div({
  padding: '12vh 0',
});

const Sentence = styled.p({
  fontSize: '2rem',
});

const StyledMic = styled(MdMic)`
  cursor: pointer;
`;

export default function SpeakSentenceForm({ spokenSentence, speakStatus, onClick }) {
  const sentence = spokenSentence ?? '생각한 문장을 소리내어 말해보세요';

  return (
    <Container>
      <SentenceBox>
        <Sentence>
          {speakStatus === 'MIC_ON' ? '...' : sentence}
        </Sentence>
      </SentenceBox>
      <StyledMic
        title="mic"
        type="button"
        onClick={onClick}
        size={70}
      />
    </Container>
  );
}
