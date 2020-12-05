import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import SentenceSpeakInput from './SentenceSpeakInput';

import MicState from '../enums/MicState';

describe('SentenceSpeakInput', () => {
  const spokenSentence = '사과가 맛있네요';
  const micButton = 'mic';
  const warningMessage = '제시어를 사용해서 문장을 말해보세요~';

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
    const prompt = '사과';
    const sentence = '사과는 맛있다';

    it('play correct sound ', () => {
      renderSentenceSpeakInput({
        prompt,
        sentence,
      });

      expect(playStub).toBeCalled();
    });

    it('does not show warning message', () => {
      const { container } = renderSentenceSpeakInput({
        prompt,
        sentence,
      });

      expect(container).not.toHaveTextContent(warningMessage);
    });
  });

  context('when spoken sentence does not contain prompt', () => {
    const prompt = '사과';
    const sentence = '포도는 맛있다';

    it('does not play correct sound', () => {
      renderSentenceSpeakInput({
        prompt,
        sentence,
      });

      expect(playStub).not.toBeCalled();
    });

    it('shows warning message', () => {
      const { container } = renderSentenceSpeakInput({
        prompt,
        sentence,
      });

      expect(container).toHaveTextContent(warningMessage);
    });
  });
});
