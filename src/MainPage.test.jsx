import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import MainPage from './MainPage';

describe('MainPage', () => {
  const title = '또 다시 말해요';
  const startButton = '시작 하기';

  it('renders title', () => {
    const { container } = render(<MainPage />);

    expect(container).toHaveTextContent(title);
  });

  it('renders start button', () => {
    const { getByText } = render(<MainPage />);

    fireEvent.click(getByText(startButton));
  });
});
