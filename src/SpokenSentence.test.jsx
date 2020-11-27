import React from 'react';

import { render } from '@testing-library/react';

import SpokenSentence from './SpokenSentence';

describe('Sentence', () => {
  const defaultMessage = '문장을 소리내어 말해보세요';
  const loadingSign = '...';
  const highlightColor = 'blue';

  const renderSpokenSentence = ({ prompt, sentence, speakStatus }) => (
    render(<SpokenSentence
      prompt={prompt}
      spokenSentence={sentence}
      speakStatus={speakStatus}
    />)
  );

  context('with sentence', () => {
    const sentence = '사과는 맛있다';

    it('renders sentence', () => {
      const { container } = renderSpokenSentence({ sentence });

      expect(container).toHaveTextContent(sentence);
    });
  });

  context('without sentence', () => {
    const sentence = null;

    it('renders default message', () => {
      const { container } = renderSpokenSentence({ sentence });

      expect(container).toHaveTextContent(defaultMessage);
    });
  });

  it('renders loading sign while user is inputting', () => {
    ['SPEAKING', 'MIC_ON'].forEach((inputStatus) => {
      const { container } = renderSpokenSentence({
        speakStatus: inputStatus,
      });

      expect(container).toHaveTextContent(loadingSign);
    });
  });

  it('doesnt render loading sign while user is not inputting', () => {
    const { container } = renderSpokenSentence({
      speakStatus: 'MIC_OFF',
    });

    expect(container).not.toHaveTextContent(loadingSign);
  });

  it('highlight prompt in the spoken sentence', () => {
    const { getByText } = renderSpokenSentence({
      speakStatus: 'MIC_OFF',
      sentence: '사과는 맛있다',
      prompt: '사과',
    });

    expect(getByText('사과')).toHaveStyle(`color: ${highlightColor}`);
  });
});