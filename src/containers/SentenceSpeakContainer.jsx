import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import styled from '@emotion/styled';

import _ from 'lodash';

import SentenceSpeakInput from '../components/SentenceSpeakInput';
import SentenceSubmitButton from '../components/SentenceSubmitButton';
import ProgressBar from '../components/ProgressBar';

import { flexBoxCenter } from '../styles/common';

import { titleFont } from '../styles/fonts';
import { normalColor } from '../styles/colors';

import {
  recognizeSpeech,
  getNextQuestion,
  saveAnswer,
} from '../redux/slices/speakSentenceSlice';

import { get } from '../utils/utils';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const QuestionProgress = styled(ProgressBar)({
  marginTop: '3.28vh',
});

const Prompt = styled.div({
  fontFamily: titleFont,
  fontSize: '4.5rem',
  ...flexBoxCenter,
  marginTop: '9.53vh',
  color: normalColor,
  height: '5.5rem',
});

export const SubmitButton = styled(SentenceSubmitButton)({
  marginTop: '9.38vh',
});

export default function SentenceSpeakContainer() {
  const { prompt, spokenSentence, micState } = useSelector(get('speakSentence'));
  const { answers, numberOfQuestions } = useSelector((get('application')));

  const dispatch = useDispatch();
  const history = useHistory();

  const isAnsweringComplete = answers.length === numberOfQuestions - 1;
  const isCorrectSentence = _.isString(spokenSentence) && spokenSentence.includes(prompt);

  const handleClickSpeak = useCallback(() => {
    dispatch(recognizeSpeech());
  }, [dispatch]);

  const handleClickNext = useCallback(() => {
    dispatch(saveAnswer({ prompt, spokenSentence }));
    dispatch(getNextQuestion());
  }, [dispatch, prompt, spokenSentence]);

  const handleClickExit = useCallback(() => {
    dispatch(saveAnswer({ prompt, spokenSentence }));
    history.push('/answers');
  }, [dispatch, prompt, spokenSentence, history]);

  return (
    <Container>
      <QuestionProgress
        maxNumber={numberOfQuestions}
        currentNumber={answers.length}
      />
      <Prompt>
        {prompt}
      </Prompt>
      <SentenceSpeakInput
        prompt={prompt}
        isCorrectSentence={isCorrectSentence}
        spokenSentence={spokenSentence}
        micState={micState}
        onClick={handleClickSpeak}
      />
      <SubmitButton
        onClickNext={handleClickNext}
        onClickExit={handleClickExit}
        isComplete={isAnsweringComplete}
        isCorrectSentence={isCorrectSentence}
      />
    </Container>
  );
}
