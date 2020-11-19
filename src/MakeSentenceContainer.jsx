import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SpeakSentenceForm from './SpeakSentenceForm';

import { get } from './utils';

import {
  recognizeVoice,
  changePrompt,
} from './redux/slice';

export default function MakeSentenceContainer() {
  const prompt = useSelector(get('prompt'));
  const spokenSentence = useSelector(get('spokenSentence'));
  const speaking = useSelector(get('speaking'));

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(recognizeVoice());
  };

  const handleClickChangePrompt = () => {
    dispatch(changePrompt('마늘'));
  };

  return (
    <div>
      <p>
        {prompt}
        <button type="button" onClick={handleClickChangePrompt}>
          change
        </button>
      </p>
      <SpeakSentenceForm
        sentence={spokenSentence}
        speaking={speaking}
        onClick={handleClick}
      />
    </div>
  );
}
