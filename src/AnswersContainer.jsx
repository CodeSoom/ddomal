import React from 'react';

import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { initialize } from './redux/slice';

import { get } from './utils';

import { flexBoxCenter } from './styles/common';
import Button from './styles/Button';

const ButtonBox = styled.div({
  ...flexBoxCenter,
  marginTop: '2rem',
});

const AnswersBox = styled.div({
  width: '25rem',
  border: '#DDD 1px solid',
  borderRadius: '3px',
  padding: '1rem 2rem',
});

const AnswerBox = styled.div({
  marginTop: '.5rem',
});

const Answer = styled.p({
  fontSize: '1.4rem',
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
      <AnswersBox>
        {answers.map(({ prompt, spokenSentence }) => (
          <AnswerBox key={prompt}>
            <Answer>
              {prompt}
              :
              {spokenSentence}
            </Answer>
          </AnswerBox>
        ))}
      </AnswersBox>
      <ButtonBox>
        <Button type="button" onClick={handleClick}>
          처음으로
        </Button>
      </ButtonBox>
    </>
  );
}
