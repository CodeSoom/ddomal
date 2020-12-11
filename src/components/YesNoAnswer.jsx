import React from 'react';

import styled from '@emotion/styled';

const CorrectPicture = styled.div({
  backgroundImage: 'url("/assets/images/correct.png")',
  width: '2.94rem',
  height: '2.94rem',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  padding: '.3rem .3rem',
});

const WrongPicture = styled.div({
  backgroundImage: 'url("/assets/images/wrong.png")',
  width: '2.94rem',
  height: '2.94rem',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
});

const ReplayButton = styled.button({
  backgroundImage: 'url("/assets/images/replay.png")',
  width: '1.06rem',
  height: '1.06rem',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});

export default function YesNoAnswer({
  question, answer, userAnswer, onClick,
}) {
  const isCorrect = answer === userAnswer;

  const Picture = isCorrect ? CorrectPicture : WrongPicture;
  const title = isCorrect ? 'correct' : 'wrong';
  const answerText = answer === 'Y' ? '맞아요' : '아니에요';

  return (
    <>
      <Picture title={title} />
      <p>
        {question}
        <ReplayButton type="button" title="replay" onClick={() => onClick(question)} />
      </p>
      <p>
        {'답: '}
        {answerText}
      </p>
    </>
  );
}
