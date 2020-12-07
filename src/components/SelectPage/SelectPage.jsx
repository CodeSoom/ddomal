import React from 'react';

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { initializeState } from '../../redux/slice';

import Button from '../../styles/CommonButton';

import {
  Container,
  TitleBox,
  Title,
  ButtonBox,
} from './styled';

export default function SelectPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickStart = () => {
    history.push('/sentence');
    dispatch(initializeState());
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
