import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import styled from '@emotion/styled';

import SpeakSentenceForm from './SpeakSentenceForm';

import { flexBoxCenter } from './styles/common';

import { get } from './utils';

import {
  recognizeVoice,
  saveAnswer,
  getNext,
} from './redux/slice';

const PromptBox = styled.div({
  ...flexBoxCenter,
  flexDirection: 'column',
  marginTop: '.5rem',
  padding: '2rem 0',
  backgroundColor: '#DDD',
  width: '18rem',
  borderRadius: '6px',
});

const Prompt = styled.p({
  fontSize: '1.7rem',
});

export default function MakeSentenceContainer() {
  const MAX_ANSWERS = 5;

  const prompt = useSelector(get('prompt'));
  const spokenSentence = useSelector(get('spokenSentence'));
  const speaking = useSelector(get('speaking'));
  const answers = useSelector(get('answers'));

  const isAnsweringComplete = answers.length === MAX_ANSWERS;

  const history = useHistory();

  const dispatch = useDispatch();

  const handleClickSpeak = () => {
    dispatch(recognizeVoice());
  };

  const handleClickNext = () => {
    dispatch(saveAnswer({ prompt, spokenSentence }));
    dispatch(getNext());
  };

  const handleClickExit = () => {
    history.push('/answers');
  };

  return (
    <div>
      <PromptBox>
        <Prompt>
          {prompt}
        </Prompt>
      </PromptBox>
      <SpeakSentenceForm
        spokenSentence={spokenSentence}
        speaking={speaking}
        onClick={handleClickSpeak}
      />
      {
        isAnsweringComplete
          ? (
            <button type="button" onClick={handleClickExit}>
              종료
            </button>
          )
          : (
            <button type="button" onClick={handleClickNext}>
              다음 문제
            </button>
          )
      }
    </div>
  );
}
