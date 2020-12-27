import React from 'react';

import { render } from '@testing-library/react';

import * as R from 'ramda';

import QuestionNumbers from './QuestionNumbers';

describe('QuestionNumbers', () => {
  const MAX = 5;
  const MIN = 1;

  it('renders all numbers between min and max', () => {
    const { container } = render(<QuestionNumbers max={MAX} min={MIN} />);

    R.range(MIN, MAX + 1).forEach((number) => {
      expect(container).toHaveTextContent(number);
    });
  });
});
