import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import MainPage from './MainPage';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('MainPage', () => {
  const startButton = '시작 하기';

  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders start button', () => {
    const { getByText } = render(<MainPage />);

    fireEvent.click(getByText(startButton));

    expect(mockPush).toBeCalledWith('/select');
  });
});
