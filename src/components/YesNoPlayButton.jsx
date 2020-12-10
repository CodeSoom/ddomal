import React from 'react';

import { MdPlayCircleOutline } from 'react-icons/md';
import IconButton from '../styles/IconButton';

export default function YesNoPlayButton({ onClick, isPlaying }) {
  return (
    <IconButton
      Icon={MdPlayCircleOutline}
      iconTitle="play"
      iconSize="68"
      onClick={onClick}
      disabled={isPlaying}
    />
  );
}
