import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const prompt = '사과';
  it('renders prompt', () => {
    const { queryByText } = render(<App />);

    expect(queryByText(prompt)).not.toBeNull();
  });
});
