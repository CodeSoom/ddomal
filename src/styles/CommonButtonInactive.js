import styled from '@emotion/styled';

import { normalColor, inactiveColor } from './colors';

import { normalFont } from './fonts';

import { flexBoxCenter } from './common';

const Button = styled.button({
  ...flexBoxCenter,
  width: '20rem',
  height: '3.25rem',
  backgroundColor: 'transparent',
  color: `${inactiveColor}`,
  fontFamily: `${normalFont}`,
  fontSize: '1.31rem',
  fontWeight: '400',
  borderRadius: '4px',
  cursor: 'pointer',
  border: `2px solid ${normalColor}`,
  outline: 'none',
});

export default Button;
