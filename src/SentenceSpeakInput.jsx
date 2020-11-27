import React, { useEffect } from 'react';

import { MdMic } from 'react-icons/md';

import _ from 'lodash';

import styled from '@emotion/styled';

import correctSound from '../sounds/CorrectAnswer.mp3';

import { flexBoxCenter } from './styles/common';

import SpokenSentence from './SpokenSentence';

import MicState from './enums/MicState';

const Container = styled.div({
  ...flexBoxCenter,
  flexDirection: 'column',
});

const SentenceBox = styled.div({
  ...flexBoxCenter,
  flexDirection: 'column',
  padding: '12vh 0',
});

const WarningMessage = styled.div({
  fontSize: '.9rem',
  fontWeight: '600',
  color: '#5555DD',
  marginBottom: 0,
  height: '.9rem',
});

const StyledMic = styled(MdMic)`
  cursor: pointer;
  color: ${({ speaking }) => (speaking ? 'green' : 'black')};
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
      <StyledMic
        title="mic"
        testid="mic"
        type="button"
        onClick={onClick}
        size={70}
        speaking={micState === MicState.SPEAKING ? 1 : 0}
      />
    </Container>
  );
}
