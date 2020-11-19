import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SpeakSentenceForm from './SpeakSentenceForm';

import { get } from './utils';

import { recognizeVoice } from './redux/slice';

export default function MakeSentenceContainer() {
  const spokenSentence = useSelector(get('spokenSentence'));
  const speaking = useSelector(get('speaking'));

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(recognizeVoice());
  };

  return (
    <div>
      <p>
        사과
      </p>
      <SpeakSentenceForm
        sentence={spokenSentence}
        speaking={speaking}
        onClick={handleClick}
      />
    </div>
  );
}
