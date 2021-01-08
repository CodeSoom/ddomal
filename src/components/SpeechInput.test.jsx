import React from 'react';

import { render } from '@testing-library/react';

import SpeechInput from './SpeechInput';

import MicState from '../enums/MicState';

import { emphasisColor } from '../styles/colors';

describe('SpeechInput', () => {
  const placeholder = '버튼을 누르고 문장을 말해보세요';
  const waiting = '...';
  const highlightColor = emphasisColor;

  const renderSpeechInput = ({ prompt, speech, micState = MicState.OFF }) => (
    render(<SpeechInput
      prompt={prompt}
      speech={speech}
      micState={micState}
    />)
  );

  context('with sentence', () => {
    const speech = '사과는 맛있다';

    it('renders sentence', () => {
      const { container } = renderSpeechInput({ speech });

      expect(container).toHaveTextContent(speech);
    });
  });

  context('without sentence', () => {
    const sentence = null;

    it('renders default message', () => {
      const { container } = renderSpeechInput({ sentence });

      expect(container).toHaveTextContent(placeholder);
    });
  });

  it('renders waiting while user is inputting', () => {
    [MicState.SPEAKING, MicState.ON].forEach((micState) => {
      const { container } = renderSpeechInput({
        micState,
      });

      expect(container).toHaveTextContent(waiting);
    });
  });

  it('doesnt render loading sign while user is not inputting', () => {
    const { container } = renderSpeechInput({
      micState: MicState.OFF,
    });

    expect(container).not.toHaveTextContent(waiting);
  });

  it('highlight prompt in the spoken sentence', () => {
    const { getByText } = renderSpeechInput({
      speech: '사과는 맛있다',
      prompt: '사과',
    });

    expect(getByText('사과')).toHaveStyle(`color: ${highlightColor}`);
  });
});
