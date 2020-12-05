import React from 'react';

import ActiveButton from '../styles/CommonButton';
import InactiveButton from '../styles/CommonButtonInactive';

export default function SentenceSubmitButton({
  onClickExit, onClickNext, isComplete, isCorrectSentence,
}) {
  const Button = isCorrectSentence ? ActiveButton : InactiveButton;

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
