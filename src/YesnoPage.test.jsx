import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import YesnoPage from './YesnoPage';

describe('YesnoPage', () => {
  it('renders Yes button', () => {
    const { getByText } = render(<YesnoPage />);

    fireEvent.click(getByText('네'));
  });

  it('renders No button', () => {
    const { getByText } = render(<YesnoPage />);

    fireEvent.click(getByText('아니오'));
  });
});
