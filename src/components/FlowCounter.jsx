import React from 'react';

import * as R from 'ramda';

import styled from '@emotion/styled';

import { normalColor } from '../styles/colors';
import { flexBoxCenter } from '../styles/common';

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const NumberContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '12rem',
  overflow: 'hidden',
});

const NumberBox = styled.div(({ index }) => ({
  transform: `translateY(${4 - index * 4}rem)`,
  transition: 'all .3s',
}));

const Number = styled.div(({ curr, index }) => ({
  ...flexBoxCenter,
  color: normalColor,
  lineHeight: '1',
  height: '4rem',
  visibility: `${(curr === index || curr === index + 1 || curr === index - 1) ? 'visible' : 'hidden'}`,
  opacity: `${(curr === index + 1 || curr === index - 1) ? '0.5' : '1'}`,
  fontSize: `${(curr === index + 1 || curr === index - 1) ? '1.5rem' : '3rem'}`,
}));

const ButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginRight: '2rem',
  height: '6rem',
});

const Text = styled.p({
  fontSize: '1.5rem',
  color: normalColor,
  paddingLeft: '1.5rem',
});

const ArrowUp = styled.button({
  backgroundImage: 'url("/assets/images/arrowup.png")',
  border: 'none',
  width: '1.3rem',
  height: '1.3rem',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  outline: 'unset',
});

const ArrowDown = styled.button({
  backgroundImage: 'url("/assets/images/arrowdown.png")',
  border: 'none',
  width: '1.3rem',
  height: '1.3rem',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  outline: 'unset',
});

const MAX_QUESTIONS = 5;
const MIN_QUESTIONS = 1;

export default function FlowCounter({ numberOfQuestions, onClickIncrease, onClickDecrease }) {
  const index = numberOfQuestions - 1;

  const isOverMax = numberOfQuestions >= MAX_QUESTIONS;
  const isBelowMin = numberOfQuestions <= MIN_QUESTIONS;

  return (
    <Container>
      <ButtonContainer>
        <ArrowUp type="button" title="arrowup" onClick={onClickIncrease} disabled={isOverMax} />
        <ArrowDown type="button" title="arrowdown" onClick={onClickDecrease} disabled={isBelowMin} />
      </ButtonContainer>
      <NumberContainer>
        <NumberBox index={index}>
          {R.range(MIN_QUESTIONS, MAX_QUESTIONS + 1).map((number, curr) => (
            <Number curr={curr} index={index}>
              {number}
            </Number>
          ))}
        </NumberBox>
      </NumberContainer>
      <Text>
        문제
      </Text>
    </Container>
  );
}
