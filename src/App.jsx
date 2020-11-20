import React from 'react';

import styled from '@emotion/styled';

import MakeSentencePage from './MakeSentencePage';

import { flexBoxCenter } from './styles/common';

const Container = styled.div({
  ...flexBoxCenter,
  height: '100vh',
  transform: 'translateY(-5%)',
});

export default function App() {
  return (
    <Container>
      <MakeSentencePage />
    </Container>
  );
}
