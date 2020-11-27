import React from 'react';

import { render } from '@testing-library/react';

import SpokenSentence from './SpokenSentence';

import MicState from './enums/MicState';

describe('Sentence', () => {
  const defaultMessage = '문장을 소리내어 말해보세요';
  const waiting = '...';
  const highlightColor = 'blue';

  const renderSpokenSentence = ({ prompt, sentence, micState = MicState.OFF }) => (
    render(<SpokenSentence
      prompt={prompt}
      spokenSentence={sentence}
      micState={micState}
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

  it('renders waiting while user is inputting', () => {
    [MicState.SPEAKING, MicState.ON].forEach((micState) => {
      const { container } = renderSpokenSentence({
        micState,
      });

      expect(container).toHaveTextContent(waiting);
    });
  });

  it('doesnt render loading sign while user is not inputting', () => {
    const { container } = renderSpokenSentence({
      micState: MicState.OFF,
    });

    expect(container).not.toHaveTextContent(waiting);
  });

  it('highlight prompt in the spoken sentence', () => {
    const { getByText } = renderSpokenSentence({
      sentence: '사과는 맛있다',
      prompt: '사과',
    });

    expect(getByText('사과')).toHaveStyle(`color: ${highlightColor}`);
  });
});
