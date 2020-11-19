import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import App from './App';

jest.mock('react-redux');
jest.mock('./services/speechRecognition.js');

describe('App', () => {
  const prompt = '사과';

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      spokenSentence: '',
    }));
  });

  it('renders prompt', () => {
    const { queryByText } = render(<App />);

    expect(queryByText(prompt)).not.toBeNull();
  });
});
