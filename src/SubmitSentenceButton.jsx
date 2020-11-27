import React from 'react';

import Button from './styles/Button';

export default function SubmitSentenceButton({ onClickExit, onClickNext, isComplete }) {
  return (
    isComplete
      ? (
        <Button type="button" onClick={onClickExit}>
          종료
        </Button>
      )
      : (
        <Button type="button" onClick={onClickNext}>
          다음 문제
        </Button>
      )
  );
}
