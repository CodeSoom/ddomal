import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import MakeSentencePage from './MakeSentencePage';

jest.mock('react-redux');
jest.mock('./services/speechRecognition.js');

describe('MakeSentencePage', () => {
  const prompt = '사과';
  const explanation = '제시어를 보고 문장을 만들어 보세요!';

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      prompt,
      spokenSentence: '',
    }));
  });

  it('renders prompt', () => {
    const { queryByText } = render(<MakeSentencePage />);

    expect(queryByText(prompt)).not.toBeNull();
  });

  it('renders text contents', () => {
    const { container } = render(<MakeSentencePage />);

    expect(container).toHaveTextContent(explanation);
  });
});
