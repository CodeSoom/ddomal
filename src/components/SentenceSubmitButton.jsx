import React from 'react';

import ActiveButton from '../styles/CommonButtonActive';
import InactiveButton from '../styles/CommonButtonInactive';

export default function SentenceSubmitButton({
  onClickExit, onClickNext, isComplete, isCorrectSentence, className,
}) {
  const Button = isCorrectSentence ? ActiveButton : InactiveButton;

  return (
    isComplete
      ? (
        <Button type="button" onClick={onClickExit} className={className}>
          종료
        </Button>
      )
      : (
        <Button type="button" onClick={onClickNext} className={className}>
          다음 문제
        </Button>
      )
  );
}
