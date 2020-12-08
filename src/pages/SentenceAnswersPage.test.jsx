import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import SentenceAnswersPage from './SentenceAnswersPage';

jest.mock('react-redux');
jest.mock('../services/speechRecognitionService.js');

describe('SentenceAnswersPage', () => {
  const answer = {
    prompt: '사과',
    spokenSentence: '사과는 맛있다',
    examples: [],
  };

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      answers: [answer],
    }));

    useDispatch.mockImplementation(() => jest.fn());
  });

  it('renders answer', () => {
    const { container } = render(<SentenceAnswersPage />);

    expect(container).toHaveTextContent(answer.prompt);
    expect(container).toHaveTextContent(answer.spokenSentence);
  });
});
