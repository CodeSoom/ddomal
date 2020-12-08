import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import YesNoPage from './YesNoPage';

import { getNextYesNoQuestion } from '../redux/slice';

describe('YesNoPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
  });

  it('gets next question on mount', () => {
    render(<YesNoPage />);

    expect(dispatch).toBeCalledWith(getNextYesNoQuestion());
  });
});