import styled from '@emotion/styled';
import { emphasisColor } from '../../styles/colors';

import { flexBoxCenter } from '../../styles/common';

export const Container = styled.div({
  ...flexBoxCenter,
  flexDirection: 'column',
});

export const SentenceBox = styled.div({
  marginTop: '9.06vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const WarningMessage = styled.div(({ isHidden }) => ({
  fontSize: '1rem',
  fontWeight: '600',
  marginBottom: '0.3rem',
  color: emphasisColor,
  visibility: `${isHidden ? 'hidden' : 'visible'}`,
}));

export const MicBox = styled.div({
  marginTop: '10.78vh',
  position: 'relative',
  zIndex: '100',
});

export const MeterBox = styled.div({
  position: 'absolute',
  top: '-100%',
  left: '-100%',
  zIndex: '-500',
});
