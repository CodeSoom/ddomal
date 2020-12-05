import React from 'react';

import { render } from '@testing-library/react';

import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('renders current number and max number', () => {
    const { container } = render(<ProgressBar maxNumber={5} currentNumber={3} />);

    expect(container).toHaveTextContent(5);
    expect(container).toHaveTextContent(3);
  });
});
