import React from 'react';
import { useSelector } from 'react-redux';

import { get } from './utils';

export default function MakeSentenceContainer() {
  const answers = useSelector(get('answers'));

  return (
    <>
      {answers.map(({ prompt, spokenSentence }, idx) => (
        <div id={`${idx}-${prompt}`}>
          <p>
            {prompt}
            :
            {spokenSentence}
          </p>
        </div>
      ))}
    </>
  );
}
