import React from 'react';

import { render } from '@testing-library/react';

import SentenceAnswer from './SentenceAnswer';

jest.mock('react-redux');
jest.mock('../services/speechRecognitionService.js');

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

  it('renders answer', () => {
    const { prompt, spokenSentence } = answer;

    const { container } = render(<SentenceAnswer answer={answer} />);

    expect(container).toHaveTextContent(prompt);
    expect(container).toHaveTextContent(spokenSentence);
  });

  it('renders examples', () => {
    const { container } = render(<SentenceAnswer answer={answer} />);

    examples.forEach((example) => {
      expect(container).toHaveTextContent(example);
    });
  });
});
