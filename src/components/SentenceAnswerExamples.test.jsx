import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import SentenceAnswerExamples from './SentenceAnswerExamples';

jest.mock('react-redux');
jest.mock('../services/speechRecognitionService.js');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('SentenceAnswerExamples', () => {
  const prompt = '사과';
  const examples = [
    '사과는 빨갛다',
    '사과하나 주세요',
  ];

  const handleClickReplay = jest.fn();

  const renderSentenceAnswerExamples = () => render(
    <SentenceAnswerExamples
      prompt={prompt}
      examples={examples}
      onClickReplay={handleClickReplay}
    />,
  );

  beforeEach(() => {
    handleClickReplay.mockClear();
  });

  it('renders examples', () => {
    const { container } = renderSentenceAnswerExamples();

    examples.forEach((example) => {
      expect(container).toHaveTextContent(example);
    });
  });

  it('renders replay button on each side of example', () => {
    const { getAllByTitle } = renderSentenceAnswerExamples();

    examples.forEach((example, idx) => {
      fireEvent.click(getAllByTitle('replay')[idx]);

      expect(handleClickReplay).toBeCalledWith(example);
    });
  });
});
