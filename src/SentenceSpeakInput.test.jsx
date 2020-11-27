import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import SentenceSpeakInput from './SentenceSpeakInput';

import MicState from './enums/MicState';

describe('SentenceSpeakInput', () => {
  const spokenSentence = '사과가 맛있네요';
  const micButton = 'mic';

  const handleClick = jest.fn();

  const playStub = jest
    .spyOn(window.HTMLAudioElement.prototype, 'play')
    .mockImplementation(() => {});

  const renderSentenceSpeakInput = ({ prompt, sentence, micState = MicState.OFF } = {}) => render(
    <SentenceSpeakInput
      prompt={prompt}
      spokenSentence={sentence}
      onClick={handleClick}
      micState={micState}
    />,
  );

  beforeEach(() => {
    playStub.mockClear();
    handleClick.mockClear();
  });

  it('renders spoken sentence with sentence', () => {
    const { container } = renderSentenceSpeakInput({
      sentence: spokenSentence,
    });

    expect(container).toHaveTextContent(spokenSentence);
  });

  it('renders speak sentence button', () => {
    const { getByTitle } = renderSentenceSpeakInput();

    fireEvent.click(getByTitle(micButton));

    expect(handleClick).toBeCalled();
  });

  context('when spoken sentence contains prompt', () => {
    it('play correct sound ', () => {
      renderSentenceSpeakInput({
        prompt: '사과',
        sentence: '사과는 맛있다',
      });

      expect(playStub).toBeCalled();
    });
  });

  context('when spoken sentence does not contain prompt', () => {
    it('does not play correct sound', () => {
      renderSentenceSpeakInput({
        prompt: '사과',
        sentence: '포도는 맛있다',
      });

      expect(playStub).not.toBeCalled();
    });
  });
});
