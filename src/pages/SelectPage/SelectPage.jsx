import React from 'react';

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { initializeState } from '../../redux/slices/applicationSlice';

import Button from '../../styles/CommonButtonActive';

import {
  Container,
  TitleBox,
  Title,
  ButtonBox,
} from './styled';

import context from '../../services/instances/audioContext.instance';

export default function SelectPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickSpeakSentence = () => {
    history.push({
      pathname: '/setnumber',
      search: '?game=speak_sentence',
    });
    dispatch(initializeState());
    context.resume();
  };

  const handleClickYesno = () => {
    history.push({
      pathname: '/setnumber',
      search: '?game=yesno',
    });
    dispatch(initializeState());
    context.resume();
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
