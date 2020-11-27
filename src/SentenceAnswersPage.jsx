import React from 'react';

import styled from '@emotion/styled';

import SentenceAnswersContainer from './SentenceAnswersContainer';

import { flexBoxCenter } from './styles/common';

const Container = styled.div({
  ...flexBoxCenter,
  flexDirection: 'column',
});

const Box = styled.div({
  marginTop: '1rem',
});

export default function SentenceAnswersPage() {
  return (
    <Container>
      <h1>
        결과 확인
      </h1>
      <Box>
        <SentenceAnswersContainer />
      </Box>
    </Container>
  );
}
