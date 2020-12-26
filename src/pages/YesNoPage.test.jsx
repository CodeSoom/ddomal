import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import YesNoPage from './YesNoPage';

import { getNextYesNoQuestion } from '../redux/slices/yesNoSlice';

global.HTMLMediaElement.prototype.pause = jest.fn();

describe('YesNoPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      application: { answers: [] },
      yesno: {},
    }));
  });

  it('gets next question on mount', () => {
    render(<YesNoPage />);

    expect(dispatch).toBeCalledWith(getNextYesNoQuestion());
  });
});
