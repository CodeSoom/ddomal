import React from 'react';

import { render } from '@testing-library/react';

import SpeechPage from './SpeechPage';

jest.mock('react-redux');

describe('SpeechPage', () => {
  it('renders input', () => {
    const { container } = render(<SpeechPage />);

    expect(container).toHaveTextContent('버튼을 누르고 문장을 말해보세요');
  });
});
