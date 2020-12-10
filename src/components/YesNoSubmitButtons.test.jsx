import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import YesNoSubmitButtons from './YesNoSubmitButtons';

describe('YesNoSubmitButtons', () => {
  const yesButton = '맞아요';
  const noButton = '아니에요';

  const handleClick = jest.fn();

  const renderYesNoSubmitButtons = () => render(
    <YesNoSubmitButtons onClick={handleClick} />,
  );

  beforeEach(() => {
    handleClick.mockClear();
  });

  it('renders yes button', () => {
    const { getByText } = renderYesNoSubmitButtons();

    fireEvent.click(getByText(yesButton));

    expect(handleClick).toBeCalled();
  });

  it('renders no button', () => {
    const { getByText } = renderYesNoSubmitButtons();

    fireEvent.click(getByText(noButton));

    expect(handleClick).toBeCalled();
  });
});
