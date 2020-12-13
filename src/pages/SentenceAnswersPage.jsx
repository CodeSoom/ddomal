import React from 'react';

import styled from '@emotion/styled';

import SentenceAnswersContainer from '../containers/SentenceAnswersContainer';

import { flexBoxCenter } from '../styles/common';

import { normalColor } from '../styles/colors';

const Title = styled.h2({
  marginTop: '5vh',
  color: normalColor,
});

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
      <Title>
        오늘 말해본 문장
      </Title>
      <Box>
        <SentenceAnswersContainer />
      </Box>
    </Container>
  );
}
