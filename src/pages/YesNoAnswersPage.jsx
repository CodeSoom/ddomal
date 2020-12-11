import React from 'react';

import styled from '@emotion/styled';

import YesNoAnswersContainer from '../containers/YesNoAnswersContainer';
import { normalColor } from '../styles/colors';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const TitleBox = styled.div({
  marginTop: '7.5vh',
});

const Title = styled.h1({
  fontSize: '1.5rem',
  fontWeight: '700',
  color: normalColor,
});

export default function YesNoPage() {
  return (
    <Container>
      <TitleBox>
        <Title>정답 확인</Title>
      </TitleBox>
      <YesNoAnswersContainer />
    </Container>
  );
}
