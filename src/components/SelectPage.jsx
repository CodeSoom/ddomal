import React from 'react';

import styled from '@emotion/styled';

import { useHistory } from 'react-router-dom';

import { flexBoxCenter } from '../styles/common';
import Button from '../styles/CommonButton';
import { normalColor } from '../styles/colors';

const Container = styled.div({
  ...flexBoxCenter,
  flexDirection: 'column',
});

const TitleBox = styled.div({
  marginTop: '34.8vh',
});

const Title = styled.div({
  fontSize: '1.5rem',
  color: normalColor,
});

const ButtonBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '7.5rem',
  justifyContent: 'space-between',
  marginTop: '2.38rem',
});

export default function SelectPage() {
  const history = useHistory();

  const handleClickStart = () => {
    history.push('/sentence');
  };

  return (
    <Container>
      <TitleBox>
        <Title>
          무엇을 연습해 볼까요?
        </Title>
      </TitleBox>
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
