import React from 'react';

import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import YesNoAnswersPage from './YesNoAnswersPage';

jest.mock('react-redux');

describe('YesNoPage', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      answers: [],
    }));
  });

  it('gets next question on mount', () => {
    const { container } = render(<YesNoAnswersPage />);

    expect(container).toHaveTextContent('정답 확인');
  });
});
