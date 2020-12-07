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

  const handleClickSpeakSentence = () => {
    history.push('/sentence');
    dispatch(initializeState());
  };

  const handleClickYesno = () => {
    history.push('/yesno');
  };

  return (
    <Container>
      <TitleBox>
        <Title>
          무엇을 연습해 볼까요?
        </Title>
      </TitleBox>
      <ButtonBox>
        <Button type="button" onClick={handleClickSpeakSentence}>
          문장 만들기
        </Button>
        <Button type="button" onClick={handleClickYesno}>
          듣고 이해하기
        </Button>
      </ButtonBox>
    </Container>
  );
}
