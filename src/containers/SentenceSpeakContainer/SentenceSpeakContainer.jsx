import React from 'react';

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
  saveAnswer,
} from '../../redux/slice';

const MAX_ANSWERS = 5;

export default function SentenceSpeakContainer() {
  const {
    prompt, spokenSentence, micState, answers,
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();

  const isAnsweringComplete = answers.length === MAX_ANSWERS - 1;
  const isCorrectSentence = _.isString(spokenSentence) && spokenSentence.includes(prompt);

  const handleClickSpeak = () => {
    dispatch({ type: 'recognizeSpeech' });
  };

  const handleClickNext = () => {
    dispatch(saveAnswer({ prompt, spokenSentence }));
    dispatch({ type: 'getNextQuestion' });
  };

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
