import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import AnswersContainer from './AnswersContainer';

jest.mock('react-redux');

describe('AnswersContainer', () => {
  const answers = [
    { prompt: '사과', spokenSentence: '사과는 맛있다' },
    { prompt: '양파', spokenSentence: '양파는 맛없다' },
  ];

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      answers,
    }));
  });

  it('renders answers', () => {
    const { container } = render(<AnswersContainer />);

    answers.forEach(({ prompt, spokenSentence }) => {
      expect(container).toHaveTextContent(prompt);
      expect(container).toHaveTextContent(spokenSentence);
    });
  });
});
