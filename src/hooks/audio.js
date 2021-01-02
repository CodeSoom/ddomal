import { useState } from 'react';

export const useAudio = (url) => {
  const [audio] = useState(new Audio(url));

  const play = () => audio.play();

  return play;
};

// TODO: delete this
export const xx = () => {};
