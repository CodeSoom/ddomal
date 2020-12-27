import React from 'react';

import * as R from 'ramda';

import styled from '@emotion/styled';

import { normalColor } from '../styles/colors';
import { flexBoxCenter } from '../styles/common';

const Container = styled.div(({ noQ }) => ({
  transform: `translateY(${4 * (noQ - 4)}rem)`,
  transition: 'all .3s',
}));

const Number = styled.div(({ diff }) => ({
  ...flexBoxCenter,
  color: normalColor,
  lineHeight: '1',
  height: '4rem',
  visibility: `${(diff === 0 || diff === 1) ? 'visible' : 'hidden'}`,
  opacity: `${(diff === 1) ? '0.5' : '1'}`,
  fontSize: `${(diff === 1) ? '1.5rem' : '3rem'}`,
}));

export default function QuestionNumbers({ numberOfQuestions, min, max }) {
  const calculateDiff = (first, second) => Math.abs(first - second);

  return (
    <Container noQ={numberOfQuestions}>
      {R.range(min, max + 1).reverse().map((number) => (
        <Number key={number} diff={calculateDiff(number, numberOfQuestions)}>
          {number}
        </Number>
      ))}
    </Container>
  );
}
