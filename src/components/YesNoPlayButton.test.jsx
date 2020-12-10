import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import YesNoPlayButton from './YesNoPlayButton';

describe('YesNoPlayButton', () => {
  const playButton = 'play';

  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  it('renders play button', () => {
    const { getByTitle } = render(<YesNoPlayButton onClick={handleClick} />);

    fireEvent.click(getByTitle(playButton));

    expect(handleClick).toBeCalled();
  });
});
