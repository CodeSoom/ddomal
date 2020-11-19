import React from 'react';

import { MdMic } from 'react-icons/md';

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
      <MdMic
        title="mic"
        type="button"
        onClick={onClick}
        size={70}
      />
    </Container>
  );
}
