import React from 'react';

import { render } from '@testing-library/react';

import SentenceAnswers from './SentenceAnswers';

jest.mock('react-redux');
jest.mock('../services/speechRecognitionService.js');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('SentenceAnswers', () => {
  const answers = [
    { prompt: '사과', spokenSentence: '사과는 맛있다' },
    { prompt: '양파', spokenSentence: '양파는 맛없다' },
  ];

  it('renders answers', () => {
    const { container } = render(<SentenceAnswers answers={answers} />);

    answers.forEach(({ prompt, spokenSentence }) => {
      expect(container).toHaveTextContent(prompt);
      expect(container).toHaveTextContent(spokenSentence);
    });
  });
});
