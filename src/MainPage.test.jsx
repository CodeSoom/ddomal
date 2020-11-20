import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import MainPage from './MainPage';

describe('MainPage', () => {
  const title = '문장 만들기';
  const startButton = '시작하기';

  it('renders title', () => {
    const { container } = render(<MainPage />);

    expect(container).toHaveTextContent(title);
  });

  it('renders title', () => {
    const { getByText } = render(<MainPage />);

    fireEvent.click(getByText(startButton));
  });
});
