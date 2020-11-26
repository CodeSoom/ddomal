import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import AnswersPage from './AnswersPage';

jest.mock('react-redux');
jest.mock('./services/speechRecognitionService.js');

describe('AnswersPage', () => {
  const answer = {
    prompt: '사과',
    spokenSentence: '사과는 맛있다',
  };

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      answers: [answer],
    }));
  });

  it('renders answer', () => {
    const { container } = render(<AnswersPage />);

    expect(container).toHaveTextContent(answer.prompt);
    expect(container).toHaveTextContent(answer.spokenSentence);
  });
});
