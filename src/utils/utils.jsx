import React from 'react';

import { emphasisColor } from '../styles/colors';

export function get(key) {
  return (obj) => obj[key];
}

const highligtWord = (key, word) => (
  <b key={key} style={{ color: emphasisColor }}>
    {word}
  </b>
);

export function highlight({ sentence, word }) {
  const splitted = (sentence ?? '').split(word);

  if (splitted.length <= 1) {
    return splitted;
  }

  return splitted
    .flatMap((part, index) => [part, highligtWord(`${index + part}`, word)])
    .slice(0, -1);
}
