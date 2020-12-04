import React from 'react';

import styled from '@emotion/styled';

import { useHistory } from 'react-router-dom';

import { flexBoxCenter } from './styles/common';
import Button from './styles/Button';

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
        문장 만들기
      </h1>
      <ButtonBox>
        <Button type="button" onClick={handleClickStart}>
          시작하기
        </Button>
      </ButtonBox>
    </Container>
  );
}
