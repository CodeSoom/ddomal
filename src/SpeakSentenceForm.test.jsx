import React from 'react';

import { render } from '@testing-library/react';

import SpeakSentenceForm from './SpeakSentenceForm';

describe('SpeakSentenceForm', () => {
  const spokenSentence = '사과가 맛있네요';
  const micButton = 'Mic';

  const renderSpeakSentenceForm = () => render(
    <SpeakSentenceForm sentence={spokenSentence} />,
  );

  it('renders spoken sentence', () => {
    const { container } = renderSpeakSentenceForm();

    expect(container).toHaveTextContent(spokenSentence);
  });

  it('renders speak sentence button', () => {
    const { queryByText } = renderSpeakSentenceForm();

    expect(queryByText(micButton)).not.toBeNull();
  });
});
