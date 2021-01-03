import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import SentenceAnswers from './SentenceAnswers';

jest.mock('react-redux');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('SentenceAnswers', () => {
  const replayButton = 'replay';
  const examples1 = [
    '사과는 빨갛다',
    '사과하나 주세요',
  ];

  const answers = [
    { prompt: '사과', spokenSentence: '사과는 맛있다', examples: examples1 },
    { prompt: '양파', spokenSentence: '양파는 맛없다', examples: examples1 },
  ];

  const handleClickReplay = jest.fn();

  it('renders answers', () => {
    const { container } = render(<SentenceAnswers answers={answers} />);

    answers.forEach(({ prompt, spokenSentence }) => {
      expect(container).toHaveTextContent(prompt);
      expect(container).toHaveTextContent(spokenSentence);
    });
  });

  it('renders examples', () => {
    const { container } = render(<SentenceAnswers answers={answers} />);

    examples1.forEach((example) => {
      expect(container).toHaveTextContent(example);
    });
  });

  it('renders replay button', () => {
    const { getAllByTitle } = render(
      <SentenceAnswers
        answers={answers}
        onClickReplay={handleClickReplay}
      />,
    );

    fireEvent.click(getAllByTitle(replayButton)[0]);
  });
});
