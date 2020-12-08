import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import given from 'given2';

import { useDispatch, useSelector } from 'react-redux';

import YesNoContainer from './YesNoContainer';

import SoundState from '../enums/SoundState';

describe('YesNoContainer', () => {
  const yesButton = '네';
  const noButton = '아니오';
  const playButton = '재생';

  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      soundState: given.soundState,
    }));
  });

  context('on idle state', () => {
    given('soundState', () => SoundState.IDLE);

    it('does not render Yes button', () => {
      const { queryByText } = render(<YesNoContainer />);

      expect(queryByText(yesButton)).toBeNull();
    });

    it('does not render No button', () => {
      const { queryByText } = render(<YesNoContainer />);

      expect(queryByText(noButton)).toBeNull();
    });
  });

  context('When question is being played', () => {
    given('soundState', () => SoundState.PLAYING);

    it('renders playing sign', () => {
      const { container } = render(<YesNoContainer />);

      expect(container).toHaveTextContent('재생중입니다');
    });

    it('cannot click play button', () => {
      const { getByText } = render(<YesNoContainer />);

      fireEvent.click(getByText(playButton));

      expect(dispatch).not.toBeCalled();
    });
  });

  context('When question is not being played', () => {
    given('soundState', () => SoundState.STOP);

    it('renders not playing sign', () => {
      const { container } = render(<YesNoContainer />);

      expect(container).toHaveTextContent('재생중이 아닙니다');
    });

    it('can click play button', () => {
      const { getByText } = render(<YesNoContainer />);

      fireEvent.click(getByText(playButton));

      expect(dispatch).toBeCalled();
    });
  });
});
