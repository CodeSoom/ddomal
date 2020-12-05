import React, { useEffect } from 'react';

import { MdMic } from 'react-icons/md';

import _ from 'lodash';

import styled from '@emotion/styled';

import correctSound from '../../assets/sounds/CorrectAnswer.mp3';

import { flexBoxCenter } from '../styles/common';

import SpokenSentence from './SpokenSentence';

import MicState from '../enums/MicState';

import { normalColor, primaryColor } from '../styles/colors';

const Container = styled.div({
  ...flexBoxCenter,
  flexDirection: 'column',
});

const SentenceBox = styled.div({
  marginTop: '12.3vh',
});

const WarningMessage = styled.div({
  fontSize: '.9rem',
  fontWeight: '600',
  marginBottom: 0,
  // height: '.9rem',
  color: '#5555DD',
});

const MicBox = styled.div({
  backgroundColor: normalColor,
  ...flexBoxCenter,
  marginTop: '10vh',
  width: '4.6rem',
  height: '4.6rem',
  borderRadius: '6px',
});

const StyledMic = styled(MdMic)`
  cursor: pointer;
  color: ${primaryColor};
`;

const sound = new Audio(correctSound);

export default function SentenceSpeakInput({
  prompt, spokenSentence, micState, onClick,
}) {
  const isCorrectSentence = _.isString(spokenSentence) && spokenSentence.includes(prompt);

  useEffect(() => {
    if (isCorrectSentence) {
      sound.play();
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
