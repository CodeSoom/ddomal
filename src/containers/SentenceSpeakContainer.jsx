import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import styled from '@emotion/styled';

import SentenceSpeakInput from '../components/SentenceSpeakInput';
import SentenceSubmitButton from '../components/SentenceSubmitButton';
import ProgressBar from '../components/ProgressBar';

import { flexBoxCenter } from '../styles/common';

import {
  saveAnswer,
} from '../redux/slice';

import { titleFont } from '../styles/fonts';
import { normalColor } from '../styles/colors';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const BarBox = styled.div({
  marginTop: '2.3vh',
});

const PromptBox = styled.div({
  fontFamily: titleFont,
  fontSize: '4.5rem',
  ...flexBoxCenter,
  marginTop: '10.6vh',
  color: normalColor,
});

const SubmitButtonBox = styled.div({
  marginTop: '10vh',
});

const MAX_ANSWERS = 5;

export default function SentenceSpeakContainer() {
  const {
    prompt, spokenSentence, micState, answers,
  } = useSelector((state) => state);

  const isAnsweringComplete = answers.length === MAX_ANSWERS - 1;

  const dispatch = useDispatch();

  const handleClickSpeak = () => {
    dispatch({ type: 'recognizeSpeech' });
  };

  const handleClickNext = () => {
    dispatch(saveAnswer({ prompt, spokenSentence }));
    dispatch({ type: 'getNextQuestion' });
  };

  const history = useHistory();

  const handleClickExit = () => {
    dispatch(saveAnswer({ prompt, spokenSentence }));
    history.push('/answers');
  };

  return (
    <Container>
      <BarBox>
        <ProgressBar
          maxNumber={MAX_ANSWERS}
          currentNumber={answers.length}
        />
      </BarBox>
      <PromptBox>
        {prompt}
      </PromptBox>
      <SentenceSpeakInput
        prompt={prompt}
        spokenSentence={spokenSentence}
        micState={micState}
        onClick={handleClickSpeak}
      />
      <SubmitButtonBox>
        <SentenceSubmitButton
          onClickNext={handleClickNext}
          onClickExit={handleClickExit}
          isComplete={isAnsweringComplete}
        />
      </SubmitButtonBox>
    </Container>
  );
}
