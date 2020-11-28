import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import styled from '@emotion/styled';

import SentenceSpeakInput from './SentenceSpeakInput';
import SentenceSubmitButton from './SentenceSubmitButton';

import { flexBoxCenter } from './styles/common';

import {
  recognizeVoice,
  saveAnswer,
  getNext,
} from './redux/slice';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const PromptBox = styled.div({
  fontSize: '1.7rem',
  ...flexBoxCenter,
  width: '18rem',
  padding: '3.7rem 0',
  marginTop: '.5rem',
  borderRadius: '6px',
  backgroundColor: '#DDD',
});

const SubmitButtonBox = styled.div({
  marginTop: '2rem',
});

const MAX_ANSWERS = 5;

export default function SentenceSpeakContainer() {
  const {
    prompt, spokenSentence, micState, answers,
  } = useSelector((state) => state);

  const isAnsweringComplete = answers.length === MAX_ANSWERS - 1;

  const dispatch = useDispatch();

  const handleClickSpeak = () => {
    dispatch(recognizeVoice());
  };

  const handleClickNext = () => {
    dispatch(saveAnswer({ prompt, spokenSentence }));
    dispatch(getNext());
  };

  const history = useHistory();

  const handleClickExit = () => {
    dispatch(saveAnswer({ prompt, spokenSentence }));
    history.push('/answers');
  };

  return (
    <Container>
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
