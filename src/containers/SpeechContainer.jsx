import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import { MdMic } from 'react-icons/md';

import SpeechInput from '../components/SpeechInput';

import MicState from '../enums/MicState';

import { get } from '../utils/utils';

import { flexBoxCenter } from '../styles/common';
import { titleFont } from '../styles/fonts';
import { normalColor } from '../styles/colors';
import IconButton from '../styles/IconButton';

import { recognizeSpeech } from '../redux/slices/speakSentenceSlice';

const Prompt = styled.div({
  fontFamily: titleFont,
  fontSize: '3.5rem',
  ...flexBoxCenter,
  // marginTop: '9.53vh',
  color: normalColor,
  height: '5.5rem',
});

const Mic = styled(IconButton)({
  marginTop: '10.78vh',
  zIndex: '100',
  // TODO: delete below
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%)',
});

export default function SpeechContainer() {
  const [speech, prompts] = ['speech', 'prompts']
    .map((key) => useSelector(get(key)));

  const dispatch = useDispatch();

  const handleClickMic = () => {
    dispatch(recognizeSpeech());
  };

  return (
    <div>
      <Prompt>
        {(prompts ?? ['사과', '수박']).join(' , ')}
      </Prompt>
      <SpeechInput
        speech={speech}
        micState={MicState.OFF}
      />
      <Mic
        Icon={MdMic}
        iconTitle="mic"
        iconSize={55}
        onClick={handleClickMic}
      />
    </div>
  );
}
