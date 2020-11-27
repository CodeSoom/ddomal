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
  position: 'relative',
  minWidth: '23rem',
  border: '#DDD 1px solid',
  borderTop: '#555 4px solid',
  borderBottom: '#444 4px solid',
  borderRadius: '3px',
  padding: '1rem 2rem',
});

const AnswerBox = styled.div({
  marginTop: '.5rem',
});

const Answer = styled.p({
  fontSize: '1.4rem',
});

const Prompt = styled.span({
  width: '5rem',
  display: 'inline-block',
  textAlign: 'center',
  borderBottom: '1px solid #EEE',
  padding: '0 .5rem',
  marginRight: '.5rem',
});

const Sentence = styled.span({
  display: 'inline-block',
  marginLeft: '1rem',
});

export default function SentenceAnswersContainer() {
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
              <Prompt>
                {prompt}
              </Prompt>
              :
              <Sentence>
                {spokenSentence}
              </Sentence>
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
