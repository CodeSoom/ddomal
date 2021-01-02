import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import SentenceAnswer from './SentenceAnswer';

jest.mock('react-redux');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('SentenceAnswer', () => {
  const examples = [
    '사과는 빨갛다',
    '사과하나 주세요',
  ];

  const answer = {
    prompt: '사과',
    spokenSentence: '사과는 맛있다',
    examples,
  };

  const handleClickReplay = jest.fn();

  const renderSentenceAnswer = () => render(
    <SentenceAnswer
      answer={answer}
      onClickReplay={handleClickReplay}
    />,
  );

  beforeEach(() => {
    handleClickReplay.mockClear();
  });

  it('renders answer', () => {
    const { prompt, spokenSentence } = answer;

    const { container } = renderSentenceAnswer();

    expect(container).toHaveTextContent(prompt);
    expect(container).toHaveTextContent(spokenSentence);
  });

  it('renders examples', () => {
    const { container } = renderSentenceAnswer();

    examples.forEach((example) => {
      expect(container).toHaveTextContent(example);
    });
  });

  it('renders replay button on each side of example', () => {
    const { getAllByTitle } = renderSentenceAnswer();

    examples.forEach((example, idx) => {
      fireEvent.click(getAllByTitle('replay')[idx]);

      expect(handleClickReplay).toBeCalledWith(example);
    });
  });
});
