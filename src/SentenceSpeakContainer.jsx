import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import styled from '@emotion/styled';

import SentenceSpeakInput from './SentenceSpeakInput';

import { flexBoxCenter } from './styles/common';

import {
  recognizeVoice,
  saveAnswer,
  getNext,
} from './redux/slice';

import SentenceSubmitButton from './SentenceSubmitButton';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const PromptBox = styled.div({
  ...flexBoxCenter,
  marginTop: '.5rem',
  padding: '2rem 0',
  backgroundColor: '#DDD',
  width: '18rem',
  borderRadius: '6px',
});

const Prompt = styled.p({
  fontSize: '1.7rem',
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
        <Prompt>
          {prompt}
        </Prompt>
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
