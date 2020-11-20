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

const StyledRefresh = styled(MdRefresh)`
  cursor: pointer;
`;

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
        <Prompt>
          {prompt}
        </Prompt>
        <StyledRefresh
          title="change"
          type="button"
          size={26}
          onClick={handleClickChangePrompt}
        />
      </PromptBox>
      <SpeakSentenceForm
        spokenSentence={spokenSentence}
        speaking={speaking}
        onClick={handleClick}
      />
    </div>
  );
}
