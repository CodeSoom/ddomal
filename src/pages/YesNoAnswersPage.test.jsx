import React from 'react';

import { render } from '@testing-library/react';

import YesNoAnswersPage from './YesNoAnswersPage';

describe('YesNoPage', () => {
  it('gets next question on mount', () => {
    const { container } = render(<YesNoAnswersPage />);

    expect(container).toHaveTextContent('결과확인');
  });
});
