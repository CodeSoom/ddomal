import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import { MdRefresh } from 'react-icons/md';

import SpeakSentenceForm from './SpeakSentenceForm';

import { flexBoxCenter } from './styles/common';

import { get } from './utils';

import {
  recognizeVoice,
  changePrompt,
} from './redux/slice';

const PromptBox = styled.div({
  ...flexBoxCenter,
  marginTop: '.5rem',
  padding: '2rem 0',
  backgroundColor: 'grey',
});

export default function MakeSentenceContainer() {
  const prompt = useSelector(get('prompt'));
  const spokenSentence = useSelector(get('spokenSentence'));
  const speaking = useSelector(get('speaking'));

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(recognizeVoice());
  };

  const handleClickChangePrompt = () => {
    dispatch(changePrompt());
  };

  return (
    <div>
      <PromptBox>
        <p>
          {prompt}
          <MdRefresh
            title="change"
            type="button"
            onClick={handleClickChangePrompt}
          />
        </p>
      </PromptBox>
      <SpeakSentenceForm
        spokenSentence={spokenSentence}
        speaking={speaking}
        onClick={handleClick}
      />
    </div>
  );
}
