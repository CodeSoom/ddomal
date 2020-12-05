import styled from '@emotion/styled';
import React from 'react';
import { normalColor, tertiaryColor } from '../styles/colors';

const Container = styled.div({
  transform: 'translateX(.5rem)',
});

const MaxBar = styled.div({
  display: 'inline-block',
  width: '17.8rem',
  backgroundColor: tertiaryColor,
  height: '.88rem',
  borderRadius: '10px',
});

const CurrentBar = styled.div(({ current, max }) => ({
  backgroundColor: 'white',
  height: '.88rem',
  width: `calc(100%*${current}/${max})`,
  borderRadius: '10px',
}));

const Count = styled.span({
  marginLeft: '.5rem',
  color: normalColor,
});

export default function ProgressBar({ currentNumber, maxNumber }) {
  return (
    <Container>
      <MaxBar>
        <CurrentBar current={currentNumber} max={maxNumber} />
      </MaxBar>
      <Count>
        {currentNumber}
        /
        {maxNumber}
      </Count>
    </Container>
  );
}
