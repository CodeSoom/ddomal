import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import YesNoAnswer from './YesNoAnswer';

describe('YesNoAnswer', () => {
  const replayButton = 'replay';

  const question = '코끼리는 쥐보다 가볍나요?';
  const noAnswer = 'N';
  const noAnswerText = '아니에요';
  const yesAnswer = 'Y';
  const userAnswer = 'Y';

  const handleClickReplay = jest.fn();

  const renderYesNoAnswer = ({ answer } = { answer: noAnswer }) => render(
    <YesNoAnswer
      question={question}
      answer={answer}
      userAnswer={userAnswer}
      onClick={handleClickReplay}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('show answer', () => {
    const { container } = renderYesNoAnswer();

    expect(container).toHaveTextContent(question);
    expect(container).toHaveTextContent(noAnswerText);
  });

  it('renders replay button on each answer', () => {
    const { getByTitle } = renderYesNoAnswer();

    fireEvent.click(getByTitle(replayButton));

    expect(handleClickReplay).toBeCalledWith(question);
  });

  it('renders correct picture when user answer is equal to answer', () => {
    const { queryByTitle } = renderYesNoAnswer({
      answer: yesAnswer,
    });

    expect(queryByTitle('correct')).not.toBeNull();
  });

  it('renders wrong picture when user answer is different with answer', () => {
    const { queryByTitle } = renderYesNoAnswer({
      answer: noAnswer,
    });

    expect(queryByTitle('wrong')).not.toBeNull();
  });
});
