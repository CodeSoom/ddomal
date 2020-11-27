import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import SentenceSpeakInput from './SentenceSpeakInput';

import MicState from './enums/MicState';

describe('SentenceSpeakInput', () => {
  const spokenSentence = '사과가 맛있네요';
  const micButton = 'mic';

  const handleClick = jest.fn();

  const renderSentenceSpeakInput = ({ sentence, micState = MicState.OFF } = {}) => render(
    <SentenceSpeakInput
      spokenSentence={sentence}
      onClick={handleClick}
      micState={micState}
    />,
  );

  beforeEach(() => {
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
});
