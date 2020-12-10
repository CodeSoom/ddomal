import React from 'react';

import { MdPlayCircleOutline } from 'react-icons/md';

export default function YesNoPlayButton({ onClick }) {
  return (
    <button type="button" onClick={onClick}>
      <MdPlayCircleOutline title="play" />
    </button>
  );
}
