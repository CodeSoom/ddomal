import styled from '@emotion/styled';

import { primaryColor, normalColor } from './colors';

import { normalFont } from './fonts';

import { flexBoxCenter } from './common';

const Button = styled.button({
  ...flexBoxCenter,
  width: '20rem',
  height: '3.25rem',
  backgroundColor: `${normalColor}`,
  color: `${primaryColor}`,
  fontFamily: `${normalFont}`,
  fontSize: '1.31rem',
  fontWeight: '700',
  borderRadius: '4px',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
});

export default Button;
