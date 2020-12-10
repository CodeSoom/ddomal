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
} from './styled';
import IconButton from '../../styles/IconButton';

export default function SentenceSpeakInput({
  isCorrectSentence, prompt, spokenSentence, micState, onClick,
}) {
  const [, play] = useAudio('../../assets/sounds/CorrectAnswer.mp3');

  useEffect(() => {
    if (isCorrectSentence) {
      play();
    }
  }, [spokenSentence]);

  return (
    <Container>
      <SentenceBox>
        {(isCorrectSentence || _.isNull(spokenSentence))
          ? <WarningMessage />
          : (
            <WarningMessage>
              제시어를 사용해서 문장을 말해보세요~
            </WarningMessage>
          )}
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
        />
      </MicBox>
    </Container>
  );
}
