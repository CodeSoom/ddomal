import { MdMic } from 'react-icons/md';

import styled from '@emotion/styled';

import { flexBoxCenter } from '../../styles/common';

import { normalColor, primaryColor } from '../../styles/colors';

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
  backgroundColor: normalColor,
  ...flexBoxCenter,
  marginTop: '10vh',
  width: '4.6rem',
  height: '4.6rem',
  borderRadius: '6px',
});

export const StyledMic = styled(MdMic)`
  cursor: pointer;
  color: ${primaryColor};
`;
