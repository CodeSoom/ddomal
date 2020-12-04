import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import SelectPage from './SelectPage';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('SelectPage', () => {
  const title = '문장 만들기';
  const startButton = '시작하기';

  it('renders title', () => {
    const { container } = render(<SelectPage />);

    expect(container).toHaveTextContent(title);
  });

  it('renders start button', () => {
    const { getByText } = render(<SelectPage />);

    fireEvent.click(getByText(startButton));

    expect(mockPush).toBeCalledWith('/sentence');
  });
});
