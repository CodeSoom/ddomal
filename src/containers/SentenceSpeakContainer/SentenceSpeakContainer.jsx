import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import _ from 'lodash';

import SentenceSpeakInput from '../../components/SentenceSpeakInput';
import SentenceSubmitButton from '../../components/SentenceSubmitButton';
import ProgressBar from '../../components/ProgressBar';

import {
  Container,
  BarBox,
  PromptBox,
  SubmitButtonBox,
} from './styled';

import {
  recognizeSpeech,
  getNextQuestion,
  saveAnswer,
} from '../../redux/slices/speakSentenceSlice';

import { get } from '../../utils/utils';

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
      <BarBox>
        <ProgressBar
          maxNumber={numberOfQuestions}
          currentNumber={answers.length}
        />
      </BarBox>
      <PromptBox>
        {prompt}
      </PromptBox>
      <SentenceSpeakInput
        prompt={prompt}
        isCorrectSentence={isCorrectSentence}
        spokenSentence={spokenSentence}
        micState={micState}
        onClick={handleClickSpeak}
      />
      <SubmitButtonBox>
        <SentenceSubmitButton
          onClickNext={handleClickNext}
          onClickExit={handleClickExit}
          isComplete={isAnsweringComplete}
          isCorrectSentence={isCorrectSentence}
        />
      </SubmitButtonBox>
    </Container>
  );
}
