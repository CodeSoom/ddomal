import styled from '@emotion/styled';

import { flexBoxCenter } from '../../styles/common';

import { titleFont } from '../../styles/fonts';
import { normalColor } from '../../styles/colors';

export const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const BarBox = styled.div({
  marginTop: '3.28vh',
});

export const PromptBox = styled.div({
  fontFamily: titleFont,
  fontSize: '4.5rem',
  ...flexBoxCenter,
  marginTop: '9.53vh',
  color: normalColor,
  height: '5.5rem',
});

export const SubmitButtonBox = styled.div({
  marginTop: '9.38vh',
});
