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

  it('plays yes no question on entering', () => {
    render(<YesNoPage />);

    expect(dispatch).toBeCalledWith({
      type: 'playYesNoQuestion',
    });
  });

  it('renders Yes button', () => {
    const { getByText } = render(<YesNoPage />);

    fireEvent.click(getByText('네'));
  });

  it('renders No button', () => {
    const { getByText } = render(<YesNoPage />);

    fireEvent.click(getByText('아니오'));
  });
});
