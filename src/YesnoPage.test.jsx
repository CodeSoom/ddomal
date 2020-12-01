import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import YesNoPage from './YesNoPage';

describe('YesNoPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
  });

  it('renders Yes button', () => {
    const { getByText } = render(<YesNoPage />);

    fireEvent.click(getByText('네'));
  });

  it('renders No button', () => {
    const { getByText } = render(<YesNoPage />);

    fireEvent.click(getByText('아니오'));
  });

  // TODO: Fix this to click or touch screen
  it('renders play button', () => {
    const { getByText } = render(<YesNoPage />);

    fireEvent.click(getByText('재생'));

    expect(dispatch).toBeCalledWith({
      type: 'getNextYesNoQuestion',
    });
  });
});
