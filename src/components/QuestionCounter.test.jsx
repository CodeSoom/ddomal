import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import FlowCounter from './QuestionCounter';

describe('FlowCounter', () => {
  const increaseButton = 'arrowup';
  const decreaseButton = 'arrowdown';
  const MIN_Q = 1;
  const MAX_Q = 5;

  const handleClickIncrease = jest.fn();
  const handleClickDecrease = jest.fn();

  const renderFlowCounter = ({ numberOfQuestions } = { numberOfQuestions: 3 }) => render(
    <FlowCounter
      numberOfQuestions={numberOfQuestions}
      onClickIncrease={handleClickIncrease}
      onClickDecrease={handleClickDecrease}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders increase button', () => {
    const { getByTitle } = renderFlowCounter();

    fireEvent.click(getByTitle(increaseButton));

    expect(handleClickIncrease).toBeCalled();
  });

  it('renders decrease button', () => {
    const { getByTitle } = renderFlowCounter();

    fireEvent.click(getByTitle(decreaseButton));

    expect(handleClickDecrease).toBeCalled();
  });

  it('cannot click increase if number of question is over MAX', () => {
    const { getByTitle } = renderFlowCounter({ numberOfQuestions: MAX_Q + 1 });

    fireEvent.click(getByTitle(increaseButton));

    expect(handleClickIncrease).not.toBeCalled();
  });

  it('cannot click decrease if number of question is below MIN', () => {
    const { getByTitle } = renderFlowCounter({ numberOfQuestions: MIN_Q - 1 });

    fireEvent.click(getByTitle(decreaseButton));

    expect(handleClickDecrease).not.toBeCalled();
  });
});
