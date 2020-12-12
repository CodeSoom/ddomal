import styled from '@emotion/styled';

import { flexBoxCenter } from '../../styles/common';

export const Container = styled.div({
  ...flexBoxCenter,
  flexDirection: 'column',
});

export const SentenceBox = styled.div({
  marginTop: '12.3vh',
});

export const WarningMessage = styled.div({
  fontSize: '.9rem',
  fontWeight: '600',
  marginBottom: 0,
  // height: '.9rem',
  color: '#5555DD',
});

export const MicBox = styled.div({
  marginTop: '10vh',
  position: 'relative',
  zIndex: '100',
});

export const MeterBox = styled.div({
  position: 'absolute',
  top: '-100%',
  left: '-100%',
  zIndex: '-500',
});
