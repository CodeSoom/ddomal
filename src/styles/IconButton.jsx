import React from 'react';

import styled from '@emotion/styled';

import { flexBoxCenter } from './common';
import { normalColor, primaryColor } from './colors';

const IconBox = styled.button(({ disabled }) => ({
  backgroundColor: normalColor,
  ...flexBoxCenter,
  width: '4.6rem',
  height: '4.6rem',
  borderRadius: '6px',
  outline: 'unset',
  border: '0.3px solid lightgray',
  opacity: `${disabled ? '.5' : '1'}`,
}));

const getIcon = (Icon) => styled(Icon)`
  cursor: pointer;
  color: ${primaryColor};
`;

export default function IconButton({
  Icon, iconSize, iconTitle, onClick, disabled, className,
}) {
  const StyledIcon = getIcon(Icon);

  return (
    <IconBox
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      <StyledIcon
        title={iconTitle}
        size={iconSize}
      />
    </IconBox>
  );
}
