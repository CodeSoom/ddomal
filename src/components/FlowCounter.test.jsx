import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import FlowCounter from './FlowCounter';

describe('FlowCounter', () => {
  const increaseButton = '위';
  const decreaseButton = '아래';
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
    const { getByText } = renderFlowCounter();

    fireEvent.click(getByText(increaseButton));

    expect(handleClickIncrease).toBeCalled();
  });

  it('renders decrease button', () => {
    const { getByText } = renderFlowCounter();

    fireEvent.click(getByText(decreaseButton));

    expect(handleClickDecrease).toBeCalled();
  });

  it('cannot click increase if number of question is over MAX', () => {
    const { getByText } = renderFlowCounter({ numberOfQuestions: MAX_Q + 1 });

    fireEvent.click(getByText(increaseButton));

    expect(handleClickIncrease).not.toBeCalled();
  });

  it('cannot click decrease if number of question is below MIN', () => {
    const { getByText } = renderFlowCounter({ numberOfQuestions: MIN_Q - 1 });

    fireEvent.click(getByText(decreaseButton));

    expect(handleClickDecrease).not.toBeCalled();
  });
});
