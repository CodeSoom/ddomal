import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import given from 'given2';

import { useDispatch, useSelector } from 'react-redux';

import YesNoContainer from './YesNoContainer';

import { playYesNoQuestion } from '../redux/slice';

describe('YesNoContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      isPlaying: given.playing,
    }));
  });

  it('renders Yes button', () => {
    const { getByText } = render(<YesNoContainer />);

    fireEvent.click(getByText('네'));
  });

  it('renders No button', () => {
    const { getByText } = render(<YesNoContainer />);

    fireEvent.click(getByText('아니오'));
  });

  context('When question is being played', () => {
    given('playing', () => true);

    it('renders playing sign', () => {
      const { container } = render(<YesNoContainer />);

      expect(container).toHaveTextContent('재생중입니다');
    });

    it('cannot click play button', () => {
      const { getByText } = render(<YesNoContainer />);

      fireEvent.click(getByText('재생'));

      expect(dispatch).not.toBeCalled();
    });
  });

  context('When question is not being played', () => {
    given('playing', () => false);

    it('renders not playing sign', () => {
      const { container } = render(<YesNoContainer />);

      expect(container).toHaveTextContent('재생중이 아닙니다');
    });

    it('can click play button', () => {
      const { getByText } = render(<YesNoContainer />);

      fireEvent.click(getByText('재생'));

      expect(dispatch).toBeCalledWith(playYesNoQuestion('안녕하세요'));
    });
  });
});
