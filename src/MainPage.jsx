import React from 'react';

import styled from '@emotion/styled';

import { useHistory } from 'react-router-dom';
import { flexBoxCenter } from './styles/common';

const Container = styled.div({
  ...flexBoxCenter,
  flexDirection: 'column',
});

const ButtonBox = styled.div({
  marginTop: '5rem',
});

export default function MainPage() {
  const history = useHistory();

  const handleClickStart = () => {
    history.push('/sentence');
  };

  return (
    <Container>
      <h1>
        문장 만들기
      </h1>
      <ButtonBox>
        <button type="button" onClick={handleClickStart}>
          시작하기
        </button>
      </ButtonBox>
    </Container>
  );
}
