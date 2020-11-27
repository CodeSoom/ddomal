import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import SpeakSentenceForm from './SpeakSentenceForm';

describe('SpeakSentenceForm', () => {
  const spokenSentence = '사과가 맛있네요';
  const micButton = 'mic';

  const handleClick = jest.fn();

  const renderSpeakSentenceForm = ({ sentence, speakStatus } = {}) => render(
    <SpeakSentenceForm
      spokenSentence={sentence}
      onClick={handleClick}
      speakStatus={speakStatus}
    />,
  );

  beforeEach(() => {
    handleClick.mockClear();
  });

  it('renders spoken sentence with sentence', () => {
    const { container } = renderSpeakSentenceForm({
      sentence: spokenSentence,
    });

    expect(container).toHaveTextContent(spokenSentence);
  });

  it('renders speak sentence button', () => {
    const { getByTitle } = renderSpeakSentenceForm();

    fireEvent.click(getByTitle(micButton));

    expect(handleClick).toBeCalled();
  });
});
