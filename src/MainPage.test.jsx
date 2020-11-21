import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import MainPage from './MainPage';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('MainPage', () => {
  const title = '문장 만들기';
  const startButton = '시작하기';

  it('renders title', () => {
    const { container } = render(<MainPage />);

    expect(container).toHaveTextContent(title);
  });

  it('renders start button', () => {
    const { getByText } = render(<MainPage />);

    fireEvent.click(getByText(startButton));

    expect(mockPush).toBeCalledWith('/sentence');
  });
});
