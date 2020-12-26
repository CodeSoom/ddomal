import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import SetQuestionNumberContainer from './SetQuestionNumberContainer';

import { setNumberOfQuestions } from '../redux/slices/applicationSlice';

jest.mock('react-redux');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('SetQuestionNumberContainer', () => {
  const increaseButton = 'arrowup';
  const descreaseButton = 'arrowdown';

  const numberOfQuestions = 3;

  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useSelector.mockImplementation((selector) => selector({
      application: {
        numberOfQuestions,
      },
    }));

    useDispatch.mockImplementation(() => dispatch);
  });

  it('renders increase button', () => {
    const { getByTitle } = render(<SetQuestionNumberContainer />);

    fireEvent.click(getByTitle(increaseButton));

    expect(dispatch).toBeCalledWith(setNumberOfQuestions(numberOfQuestions + 1));
  });

  it('renders descrease button', () => {
    const { getByTitle } = render(<SetQuestionNumberContainer />);

    fireEvent.click(getByTitle(descreaseButton));

    expect(dispatch).toBeCalledWith(setNumberOfQuestions(numberOfQuestions - 1));
  });
});
