import React from 'react';

import styled from '@emotion/styled';

import { useHistory } from 'react-router-dom';

import { flexBoxCenter } from './styles/common';
import Button from './styles/CommonButton';

const Container = styled.div({
  ...flexBoxCenter,
  flexDirection: 'column',
});

const ButtonBox = styled.div({
  marginTop: '5rem',
});

export default function SelectPage() {
  const history = useHistory();

  const handleClickStart = () => {
    history.push('/sentence');
  };

  return (
    <Container>
      <h1>
        무엇을 연습해 볼까요?
      </h1>
      <ButtonBox>
        <Button type="button" onClick={handleClickStart}>
          문장 만들기
        </Button>
        <Button type="button" onClick={handleClickStart}>
          듣고 이해하기
        </Button>
      </ButtonBox>
    </Container>
  );
}
