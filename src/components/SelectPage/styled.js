import styled from '@emotion/styled';

import { normalColor } from '../../styles/colors';
import { flexBoxCenter } from '../../styles/common';

export const Container = styled.div({
  ...flexBoxCenter,
  flexDirection: 'column',
});

export const TitleBox = styled.div({
  marginTop: '34.8vh',
});

export const Title = styled.div({
  fontSize: '1.5rem',
  color: normalColor,
});

export const ButtonBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '7.5rem',
  justifyContent: 'space-between',
  marginTop: '2.38rem',
});
