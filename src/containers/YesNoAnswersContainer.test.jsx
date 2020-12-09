import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import YesNoAnswersContainer from './YesNoAnswersContainer';

jest.mock('react-redux');

describe('YesNoAnswersContainer', () => {
  const answers = [
    {
      question: '코끼리는 쥐보다 가볍나요?',
      answer: 'N',
      userAnswer: 'Y',
    },
    {
      question: '사자는 쥐한테 잡아먹히나요?',
      answer: 'N',
      userAnswer: 'N',
    },
  ];

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      answers,
    }));
  });

  it('show answers', () => {
    const { container } = render(<YesNoAnswersContainer />);

    answers.forEach((each) => {
      const { question, answer, userAnswer } = each;

      expect(container).toHaveTextContent(question);
      expect(container).toHaveTextContent(answer);
      expect(container).toHaveTextContent(userAnswer);
    });
  });
});
