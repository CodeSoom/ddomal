import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import YesNoAnswersContainer from './YesNoAnswersContainer';

import { initializeState } from '../redux/slice';

jest.mock('react-redux');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('YesNoAnswersContainer', () => {
  const goHomeButton = '처음으로';

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

  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useSelector.mockImplementation((selector) => selector({
      answers,
    }));

    useDispatch.mockImplementation(() => dispatch);
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

  it('renders go home button', () => {
    const { getByText } = render(<YesNoAnswersContainer />);

    fireEvent.click(getByText(goHomeButton));

    expect(dispatch).toBeCalledWith(initializeState());
    expect(mockPush).toBeCalledWith('/');
  });
});
