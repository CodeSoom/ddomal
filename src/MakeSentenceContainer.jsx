import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

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
  const prompt = useSelector(get('prompt'));
  const spokenSentence = useSelector(get('spokenSentence'));
  const speaking = useSelector(get('speaking'));

  const dispatch = useDispatch();

  const handleClickSpeak = () => {
    dispatch(recognizeVoice());
  };

  const handleClickNext = () => {
    dispatch(saveAnswer({ prompt, spokenSentence }));
    dispatch(getNext());
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
      <button type="button" onClick={handleClickNext}>
        다음 문제
      </button>
    </div>
  );
}
