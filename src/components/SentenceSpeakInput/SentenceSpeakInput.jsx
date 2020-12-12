import React, { useEffect } from 'react';

import _ from 'lodash';

import { MdMic } from 'react-icons/md';

import SpokenSentence from '../SpokenSentence';

import { useAudio } from '../../hooks/audio';

import {
  Container,
  SentenceBox,
  WarningMessage,
  MicBox,
  MeterBox,
} from './styled';

import IconButton from '../../styles/IconButton';

import VolumeMeter from '../VolumeMeter';

import MicState from '../../enums/MicState';

export default function SentenceSpeakInput({
  isCorrectSentence, prompt, spokenSentence, micState, onClick,
}) {
  const [, play] = useAudio('../../assets/sounds/CorrectAnswer.mp3');

  const isWarningHidden = isCorrectSentence || _.isNull(spokenSentence);
  const isMicNotOff = micState !== MicState.OFF;

  useEffect(() => {
    if (isCorrectSentence) {
      play();
    }
  }, [spokenSentence]);

  return (
    <Container>
      <SentenceBox>
        <WarningMessage isHidden={isWarningHidden}>
          제시어를 사용해서 문장을 말해보세요
        </WarningMessage>
        <SpokenSentence
          prompt={prompt}
          spokenSentence={spokenSentence}
          micState={micState}
        />
      </SentenceBox>
      <MicBox>
        <IconButton
          Icon={MdMic}
          iconTitle="mic"
          iconSize={55}
          onClick={onClick}
          disabled={isMicNotOff}
        />
        <MeterBox>
          {
            micState !== MicState.OFF
              ? <VolumeMeter />
              : ''
          }
        </MeterBox>
      </MicBox>
    </Container>
  );
}
