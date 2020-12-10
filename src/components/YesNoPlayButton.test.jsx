import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import YesNoPlayButton from './YesNoPlayButton';

describe('YesNoPlayButton', () => {
  const playButton = 'play';

  const handleClick = jest.fn();

  const renderYesNoPlayButton = ({ isPlaying }) => render(
    <YesNoPlayButton
      isPlaying={isPlaying}
      onClick={handleClick}
    />,
  );

  beforeEach(() => {
    handleClick.mockClear();
  });

  context('when sound is not playing', () => {
    const isPlaying = false;

    it('user can click play button', () => {
      const { getByTitle } = renderYesNoPlayButton({ isPlaying });

      fireEvent.click(getByTitle(playButton));

      expect(handleClick).toBeCalled();
    });
  });

  context('when sound is playing', () => {
    const isPlaying = true;

    it('user cannot click play button', () => {
      const { getByTitle } = renderYesNoPlayButton({ isPlaying });

      fireEvent.click(getByTitle(playButton));

      expect(handleClick).not.toBeCalled();
    });
  });
});
