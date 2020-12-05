import React, { useEffect } from 'react';

import _ from 'lodash';

import SpokenSentence from '../SpokenSentence';

import MicState from '../../enums/MicState';

import { useAudio } from '../../hooks/audio';

import {
  Container,
  SentenceBox,
  WarningMessage,
  MicBox,
  StyledMic,
} from './styled';

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
        <StyledMic
          title="mic"
          testid="mic"
          type="button"
          onClick={onClick}
          size={55}
          speaking={micState === MicState.SPEAKING ? 1 : 0}
        />
      </MicBox>
    </Container>
  );
}
