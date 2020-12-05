import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import MainPage from './MainPage';

describe('MainPage', () => {
  const startButton = '시작 하기';

  it('renders start button', () => {
    const { getByText } = render(<MainPage />);

    fireEvent.click(getByText(startButton));
  });
});
