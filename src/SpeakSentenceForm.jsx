import React from 'react';

import styled from '@emotion/styled';

import { flexBoxCenter } from './styles/common';

const Container = styled.div({
  ...flexBoxCenter,
  flexDirection: 'column',
});

const SentenceBox = styled.div({
  padding: '14vh 0',
});

export default function SpeakSentenceForm({ spokenSentence, speaking, onClick }) {
  const sentence = spokenSentence ?? '문장을 입력해주세요';

  return (
    <Container>
      <SentenceBox>
        <p>
          {speaking ? '...' : sentence}
        </p>
      </SentenceBox>
      <button type="button" onClick={onClick}>
        Mic
      </button>
    </Container>
  );
}
