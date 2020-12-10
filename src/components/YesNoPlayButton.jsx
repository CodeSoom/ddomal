import React from 'react';

import { MdPlayCircleOutline } from 'react-icons/md';

export default function YesNoPlayButton({ onClick, isPlaying }) {
  return (
    <button
      title="play"
      type="button"
      onClick={onClick}
      disabled={isPlaying}
    >
      <MdPlayCircleOutline />
    </button>
  );
}
