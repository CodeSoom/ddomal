import React from 'react';

import styled from '@emotion/styled';
import { normalColor, primaryColor } from './styles/colors';
import { normalFont } from './styles/fonts';
import { flexBoxCenter } from './styles/common';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
});

const Title = styled.div({
  position: 'absolute',
  top: '20vh',
  backgroundImage: `url(${'/assets/images/title.png'})`,
  backgroundRepeat: 'no-repeat',
  height: '15.8rem',
  width: '19.5rem',
});

const Button = styled.div({
  ...flexBoxCenter,
  position: 'absolute',
  top: '73vh',
  width: '20rem',
  height: '3.25rem',
  backgroundColor: `${normalColor}`,
  color: `${primaryColor}`,
  fontFamily: `${normalFont}`,
  fontSize: '1.31rem',
  fontWeight: '700',
  borderRadius: '4px',
  cursor: 'pointer',
});

export default function MainPage() {
  return (
    <Container>
      <Title />
      <Button type="button">
        시작 하기
      </Button>
    </Container>
  );
}
