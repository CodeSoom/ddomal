import React from 'react';

import styled from '@emotion/styled';
import { emphasisColor } from '../styles/colors';

const CorrectPicture = styled.div({
  position: 'absolute',
  top: '-1.4vh',
  left: '0',
  display: 'inline-block',
  backgroundImage: 'url("/assets/images/correct.png")',
  width: '2.94rem',
  height: '2.94rem',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  padding: '.3rem .3rem',
});

const WrongPicture = styled.div({
  position: 'absolute',
  top: '-1vh',
  left: '0',
  display: 'inline-block',
  backgroundImage: 'url("/assets/images/wrong.png")',
  width: '2.94rem',
  height: '2.94rem',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
});

const ReplayButton = styled.button({
  backgroundImage: 'url("/assets/images/replay.png")',
  width: '1.5rem',
  height: '1.5rem',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  transform: 'translate(.4rem, .3rem)',
});

const Text = styled.div({
  color: 'white',
  fontSize: '1.125rem',
  zIndex: '50',
});

const Container = styled.div({
  display: 'grid',
  gridGap: '2.34vh',
  position: 'relative',
  paddingLeft: '2rem',
  paddingTop: '0.8rem',
});

const AnswerIs = styled.span({
  color: emphasisColor,
});

export default function YesNoAnswer({
  question, answer, userAnswer, onClick,
}) {
  const isCorrect = answer === userAnswer;

  const Picture = isCorrect ? CorrectPicture : WrongPicture;
  const title = isCorrect ? 'correct' : 'wrong';
  const answerText = answer === 'Y' ? '맞아요' : '아니에요';

  return (
    <Container>
      <Picture title={title} />
      <Text>
        {question}
        <ReplayButton
          type="button"
          title="replay"
          onClick={() => onClick(question)}
        />
      </Text>
      <Text>
        {'답: '}
        <AnswerIs>
          {answerText}
        </AnswerIs>
      </Text>
    </Container>
  );
}
