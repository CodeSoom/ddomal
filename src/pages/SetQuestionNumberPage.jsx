import React from 'react';

import styled from '@emotion/styled';

import { useHistory, useLocation } from 'react-router-dom';

import SetQuestionNumberContainer from '../containers/SetQuestionNumberContainer';

import { normalColor } from '../styles/colors';
import Button from '../styles/CommonButtonActive';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const TitleBox = styled.div({
  marginTop: '22.19vh',
});

const Title = styled.h1({
  color: normalColor,
  fontSize: '1.5rem',
});

const ButtonBox = styled.div({
  marginTop: '12.18vh',
});

const ContainerBox = styled.div({
  marginTop: '8.125vh',
});

export default function SetQuestionNumberPage() {
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();

  const param = query.get('game');

  const gameToPath = {
    speak_sentence: '/sentence',
    yesno: '/yesno',
  };

  const handleClickStart = () => {
    history.push(gameToPath[param]);
  };

  return (
    <Container>
      <TitleBox>
        <Title>
          몇 문제를 풀어볼까요?
        </Title>
      </TitleBox>
      <ContainerBox>
        <SetQuestionNumberContainer />
      </ContainerBox>
      <ButtonBox>
        <Button type="button" onClick={handleClickStart}>
          시작하기
        </Button>
      </ButtonBox>
    </Container>
  );
}
