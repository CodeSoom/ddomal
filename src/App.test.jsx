import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import App from './App';

jest.mock('react-redux');

describe('App', () => {
  const prompt = '사과';

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      testSentence: '상태 테스트',
    }));
  });

  it('renders prompt', () => {
    const { queryByText } = render(<App />);

    expect(queryByText(prompt)).not.toBeNull();
  });

  // TODO: delete this
  it('renders state', () => {
    const { queryByText } = render(<App />);

    expect(queryByText('상태 테스트')).not.toBeNull();
  });
});
