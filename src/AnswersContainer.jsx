import React from 'react';

import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { initialize } from './redux/slice';

import { get } from './utils';
import { flexBoxCenter } from './styles/common';

const ButtonBox = styled.div({
  ...flexBoxCenter,
  marginTop: '2rem',
});

const AnswerBox = styled.div({
  marginTop: '.5rem',
});

export default function MakeSentenceContainer() {
  const answers = useSelector(get('answers'));

  const dispatch = useDispatch();

  const history = useHistory();

  const handleClick = () => {
    dispatch(initialize());
    history.push('/');
  };

  return (
    <>
      {answers.map(({ prompt, spokenSentence }) => (
        <AnswerBox key={prompt}>
          <p>
            {prompt}
            :
            {spokenSentence}
          </p>
        </AnswerBox>
      ))}
      <ButtonBox>
        <button type="button" onClick={handleClick}>
          처음으로
        </button>
      </ButtonBox>
    </>
  );
}
