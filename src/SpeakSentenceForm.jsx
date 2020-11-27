import React from 'react';

import { MdMic } from 'react-icons/md';

import styled from '@emotion/styled';

import { flexBoxCenter } from './styles/common';
import SpokenSentence from './SpokenSentence';

const Container = styled.div({
  ...flexBoxCenter,
  flexDirection: 'column',
});

const SentenceBox = styled.div({
  padding: '12vh 0',
});

const StyledMic = styled(MdMic)`
  cursor: pointer;
  color: ${({ speaking }) => (speaking ? 'green' : 'black')};
`;

export default function SpeakSentenceForm({
  prompt, spokenSentence, speakStatus, onClick,
}) {
  return (
    <Container>
      <SentenceBox>
        <SpokenSentence
          prompt={prompt}
          spokenSentence={spokenSentence}
          speakStatus={speakStatus}
        />
      </SentenceBox>
      <StyledMic
        title="mic"
        type="button"
        onClick={onClick}
        size={70}
        speaking={speakStatus === 'SPEAKING' ? 1 : 0}
      />
    </Container>
  );
}
