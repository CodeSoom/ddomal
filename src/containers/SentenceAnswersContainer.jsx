import React from 'react';

import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { playYesNoQuestion } from '../redux/slices/yesNoSlice';
import { endGame, initializeState } from '../redux/slices/applicationSlice';

import { get } from '../utils/utils';

import SentenceAnswers from '../components/SentenceAnswers';

import { flexBoxCenter } from '../styles/common';
import ActiveButton from '../styles/CommonButtonActive';
import InactiveButton from '../styles/CommonButtonInactive';

const ButtonBox = styled.div({
  ...flexBoxCenter,
  marginTop: '2rem',
});

export default function SentenceAnswersContainer() {
  const { answers, isGameEnd } = useSelector(get('application'));

  const dispatch = useDispatch();
  const history = useHistory();

  const Button = isGameEnd ? ActiveButton : InactiveButton;

  const handleClickRestart = () => {
    dispatch(initializeState());
    history.push('/');
  };

  const handleClickReplay = (example) => {
    dispatch(playYesNoQuestion(example));
  };

  const handleClickLastSlide = () => {
    if (!isGameEnd) {
      dispatch(endGame());
    }
  };

  return (
    <>
      <SentenceAnswers
        answers={answers}
        onClickReplay={handleClickReplay}
        onClickLastSlide={handleClickLastSlide}
      />
      <ButtonBox>
        <Button type="button" onClick={handleClickRestart}>
          처음으로
        </Button>
      </ButtonBox>
    </>
  );
}
